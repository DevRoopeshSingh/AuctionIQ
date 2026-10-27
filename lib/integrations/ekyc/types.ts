export type KycStatus = "pending" | "verified" | "failed" | "expired";

export interface InitiateKycRequest {
  userId: string;
  fullName: string;
  phone: string;
  idType?: "aadhaar_digilocker" | "pan_card" | "passport";
  consent: boolean;
}

export interface InitiateKycResponse {
  sessionId: string;
  status: KycStatus;
  expiresAt: string;
  maskedPhone: string;
  verificationProvider: "digilocker_aadhaar" | "sandbox_provider";
}

export interface VerifyOtpRequest {
  sessionId: string;
  otp: string;
  idNumber: string; // 12-digit Aadhaar or doc number
  consentGiven: boolean;
}

export interface VerifiedVisitorIdentity {
  verificationRef: string;
  fullName: string;
  maskedIdNumber: string; // e.g. "XXXX-XXXX-4589"
  idType: string;
  phone: string;
  verifiedAt: Date;
  status: KycStatus;
}
