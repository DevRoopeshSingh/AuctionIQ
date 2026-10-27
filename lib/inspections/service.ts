import { resolveEntitlement, type SubscriptionSnapshot } from "@/lib/entitlements/resolve";
import { visitorKycService } from "@/lib/integrations/ekyc/service";
import type { VerifiedVisitorIdentity } from "@/lib/integrations/ekyc/types";
import { smartDoorClient } from "@/lib/integrations/smartdoor/client";
import type { SmartDoorAccessPassResult } from "@/lib/integrations/smartdoor/types";

export interface InspectionBookingRequest {
  propertyRef: string;
  propertyTitle: string;
  smartDoorDeviceId?: string;
  scheduledSlot: {
    date: string;       // YYYY-MM-DD
    startTime: string;  // HH:mm
    endTime: string;    // HH:mm
  };
  visitor: {
    fullName: string;
    phone: string;
    aadhaarOrDocNumber: string;
    consentGiven: boolean;
    otpCode: string;
  };
  notes?: string;
}

export interface InspectionArrangementResult {
  inspectionId: string;
  propertyRef: string;
  status: "confirmed" | "kyc_pending" | "declined";
  scheduledStart: string;
  scheduledEnd: string;
  visitor: {
    fullName: string;
    phone: string;
    maskedAadhaar: string;
    kycReference: string;
    verifiedAt: string;
  };
  smartDoorPass: SmartDoorAccessPassResult;
  quotaRemainingThisMonth?: number;
}

export class InspectionArrangementService {
  /**
   * Asserts whether a user is entitled to arrange property inspections.
   * Free users are denied access. Essential gets 5/mo. Premium gets fair-use.
   */
  checkEntitlement(
    subscription: SubscriptionSnapshot | null,
    usedThisMonth = 0,
  ): {
    canArrange: boolean;
    tier: "free" | "essential" | "premium";
    remainingQuota: number | "unlimited";
    message?: string;
  } {
    const entitlement = resolveEntitlement(subscription);

    if (entitlement.tier === "free" || !entitlement.canWritePaidFeatures) {
      return {
        canArrange: false,
        tier: "free",
        remainingQuota: 0,
        message: "Physical property inspections are an exclusive benefit for active Essential and Premium subscribers.",
      };
    }

    if (entitlement.tier === "essential") {
      const remaining = Math.max(0, 5 - usedThisMonth);
      return {
        canArrange: remaining > 0,
        tier: "essential",
        remainingQuota: remaining,
        message:
          remaining > 0
            ? `${remaining} of 5 inspection requests remaining this month.`
            : "Monthly inspection quota limit of 5 requests reached. Upgrades to Premium offer unlimited fair-use.",
      };
    }

    return {
      canArrange: true,
      tier: "premium",
      remainingQuota: "unlimited",
      message: "Premium member: Unlimited fair-use inspection requests.",
    };
  }

  /**
   * Executes the end-to-end inspection arrangement:
   * 1. Validates subscription entitlement and monthly quota
   * 2. Verifies visitor eKYC via DigiLocker / Aadhaar OTP
   * 3. Interconnects with SmartDoor to issue a time-bound digital IoT access pass
   */
  async arrangeInspection(
    req: InspectionBookingRequest,
    subscription: SubscriptionSnapshot | null,
    usedThisMonth = 0,
  ): Promise<InspectionArrangementResult> {
    const entitlementCheck = this.checkEntitlement(subscription, usedThisMonth);
    if (!entitlementCheck.canArrange) {
      throw new Error(entitlementCheck.message || "Subscription required for property inspection arrangement.");
    }

    // 1. Mandatory Visitor eKYC Verification
    const verifiedIdentity: VerifiedVisitorIdentity = await visitorKycService.verifyOtp(
      {
        sessionId: `sess_${Date.now()}`,
        otp: req.visitor.otpCode,
        idNumber: req.visitor.aadhaarOrDocNumber,
        consentGiven: req.visitor.consentGiven,
      },
      req.visitor.fullName,
      req.visitor.phone,
    );

    // 2. Compute slot window
    const [startH, startM] = req.scheduledSlot.startTime.split(":").map(Number);
    const [endH, endM] = req.scheduledSlot.endTime.split(":").map(Number);
    const validFrom = new Date(`${req.scheduledSlot.date}T00:00:00Z`);
    validFrom.setUTCHours(startH, startM, 0, 0);

    const validTo = new Date(`${req.scheduledSlot.date}T00:00:00Z`);
    validTo.setUTCHours(endH, endM, 0, 0);

    const deviceId = req.smartDoorDeviceId || `SD_LOCK_${req.propertyRef.replace(/[^a-zA-Z0-9]/g, "")}`;

    // 3. Issue SmartDoor Digital Access Pass
    const smartDoorPass = await smartDoorClient.generateAccessPass({
      propertyRef: req.propertyRef,
      deviceId,
      visitorName: verifiedIdentity.fullName,
      visitorPhone: verifiedIdentity.phone,
      kycVerificationRef: verifiedIdentity.verificationRef,
      validFrom,
      validTo,
    });

    const inspectionId = `insp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    return {
      inspectionId,
      propertyRef: req.propertyRef,
      status: "confirmed",
      scheduledStart: validFrom.toISOString(),
      scheduledEnd: validTo.toISOString(),
      visitor: {
        fullName: verifiedIdentity.fullName,
        phone: verifiedIdentity.phone,
        maskedAadhaar: verifiedIdentity.maskedIdNumber,
        kycReference: verifiedIdentity.verificationRef,
        verifiedAt: verifiedIdentity.verifiedAt.toISOString(),
      },
      smartDoorPass,
      quotaRemainingThisMonth:
        entitlementCheck.remainingQuota === "unlimited"
          ? undefined
          : entitlementCheck.remainingQuota - 1,
    };
  }
}

export const inspectionArrangementService = new InspectionArrangementService();
