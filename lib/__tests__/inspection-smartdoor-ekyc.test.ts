import { describe, expect, it } from "vitest";
import { visitorKycService, maskAadhaar, maskPhone } from "@/lib/integrations/ekyc/service";
import { smartDoorClient } from "@/lib/integrations/smartdoor/client";
import { inspectionArrangementService } from "@/lib/inspections/service";
import type { SubscriptionSnapshot } from "@/lib/entitlements/resolve";

describe("Visitor eKYC Service (DPDP Act Compliance)", () => {
  it("masks Aadhaar numbers preserving only the final 4 digits", () => {
    expect(maskAadhaar("554433221199")).toBe("XXXX-XXXX-1199");
    expect(maskAadhaar("1234 5678 9012")).toBe("XXXX-XXXX-9012");
  });

  it("masks phone numbers properly", () => {
    expect(maskPhone("9876543210")).toBe("98******10");
  });

  it("initiates eKYC session with mandatory consent", async () => {
    const res = await visitorKycService.initiateKyc({
      userId: "user-123",
      fullName: "Rupesh Singh",
      phone: "9876543210",
      consent: true,
    });
    expect(res.status).toBe("pending");
    expect(res.sessionId).toContain("kyc_sess_");
    expect(res.verificationProvider).toBe("digilocker_aadhaar");
  });

  it("throws when initiating eKYC without user consent", async () => {
    await expect(
      visitorKycService.initiateKyc({
        userId: "user-123",
        fullName: "Rupesh Singh",
        phone: "9876543210",
        consent: false,
      }),
    ).rejects.toThrow("consent is mandatory");
  });

  it("verifies OTP and returns verified identity with masked identifier", async () => {
    const res = await visitorKycService.verifyOtp(
      {
        sessionId: "kyc_sess_1",
        otp: "654321",
        idNumber: "998877665544",
        consentGiven: true,
      },
      "Rupesh Singh",
      "9876543210",
    );
    expect(res.status).toBe("verified");
    expect(res.maskedIdNumber).toBe("XXXX-XXXX-5544");
    expect(res.verificationRef).toContain("DL_UIDAI_");
    expect(res.fullName).toBe("Rupesh Singh");
  });
});

describe("SmartDoor IoT Client", () => {
  it("fetches device status and confirms online state", async () => {
    const status = await smartDoorClient.getDeviceStatus("SD_WORLI_01");
    expect(status.isOnline).toBe(true);
    expect(status.batteryLevelPercent).toBeGreaterThan(50);
  });

  it("generates time-bounded digital access pass with dynamic PIN and BLE token", async () => {
    const now = new Date();
    const later = new Date(now.getTime() + 60 * 60 * 1000);

    const pass = await smartDoorClient.generateAccessPass({
      propertyRef: "BOM-WOR-042",
      deviceId: "SD_WORLI_01",
      visitorName: "Rupesh Singh",
      visitorPhone: "9876543210",
      kycVerificationRef: "DL_UIDAI_REF_99",
      validFrom: now,
      validTo: later,
    });

    expect(pass.status).toBe("active");
    expect(pass.dynamicPinCode).toHaveLength(6);
    expect(pass.bluetoothToken).toContain("ble_key_");
    expect(pass.qrPayload).toContain(pass.passId);
  });

  it("simulates bluetooth unlock with audit event", async () => {
    const unlock = await smartDoorClient.triggerBluetoothUnlock("pass_123", "SD_WORLI_01");
    expect(unlock.success).toBe(true);
    expect(unlock.message).toContain("SD_WORLI_01 unlocked successfully");
  });
});

describe("InspectionArrangementService", () => {
  const future = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  it("denies inspection arrangement for free / unauthenticated users", () => {
    const freeCheck = inspectionArrangementService.checkEntitlement(null);
    expect(freeCheck.canArrange).toBe(false);
    expect(freeCheck.tier).toBe("free");
    expect(freeCheck.remainingQuota).toBe(0);
  });

  it("enforces 5 requests per month quota for Essential plan", () => {
    const essentialSub: SubscriptionSnapshot = {
      tier: "essential",
      status: "active",
      currentPeriodEnd: future,
    };

    const quota2Used = inspectionArrangementService.checkEntitlement(essentialSub, 2);
    expect(quota2Used.canArrange).toBe(true);
    expect(quota2Used.remainingQuota).toBe(3);

    const quotaExhausted = inspectionArrangementService.checkEntitlement(essentialSub, 5);
    expect(quotaExhausted.canArrange).toBe(false);
    expect(quotaExhausted.remainingQuota).toBe(0);
  });

  it("grants unlimited fair-use inspection requests for Premium plan", () => {
    const premiumSub: SubscriptionSnapshot = {
      tier: "premium",
      status: "active",
      currentPeriodEnd: future,
    };

    const premiumCheck = inspectionArrangementService.checkEntitlement(premiumSub, 8);
    expect(premiumCheck.canArrange).toBe(true);
    expect(premiumCheck.remainingQuota).toBe("unlimited");
  });

  it("successfully arranges inspection with eKYC and SmartDoor digital pass", async () => {
    const essentialSub: SubscriptionSnapshot = {
      tier: "essential",
      status: "active",
      currentPeriodEnd: future,
    };

    const result = await inspectionArrangementService.arrangeInspection(
      {
        propertyRef: "BOM-WOR-042",
        propertyTitle: "Sea-Facing Residence · Worli Sea Face",
        smartDoorDeviceId: "SD_LOCK_WORLI",
        scheduledSlot: {
          date: "2026-11-15",
          startTime: "11:00",
          endTime: "12:00",
        },
        visitor: {
          fullName: "Rupesh Singh",
          phone: "9876543210",
          aadhaarOrDocNumber: "889900112233",
          consentGiven: true,
          otpCode: "456789",
        },
      },
      essentialSub,
      1,
    );

    expect(result.status).toBe("confirmed");
    expect(result.visitor.maskedAadhaar).toBe("XXXX-XXXX-2233");
    expect(result.visitor.kycReference).toContain("DL_UIDAI_");
    expect(result.smartDoorPass.dynamicPinCode).toHaveLength(6);
    expect(result.quotaRemainingThisMonth).toBe(3); // 5 - (1 used + 1 current) = 3
  });
});
