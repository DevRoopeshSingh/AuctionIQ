"use client";

import { useState, useEffect } from "react";
import { Badge, Button } from "@/components/ui/primitives";
import { maskAadhaar } from "@/lib/integrations/ekyc/service";
import { X, Lock, ShieldCheck, CheckCircle2, Smartphone, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";

export interface PropertyInspectionDetails {
  ref: string;
  title: string;
  area: string;
  carpet: string;
  reserve: string;
  statutoryDate: string;
  possession: string;
  smartDoorDevice: string;
}

interface InspectionArrangementModalProps {
  property: PropertyInspectionDetails;
  isOpen: boolean;
  onClose: () => void;
}

type UserPersona = "essential" | "premium" | "free";
type Step = "entitlement" | "slot" | "kyc" | "access_pass";

export function InspectionArrangementModal({
  property,
  isOpen,
  onClose,
}: InspectionArrangementModalProps) {
  // Demo Persona Switcher (Allows testing Essential, Premium, or Free user paths)
  const [persona, setPersona] = useState<UserPersona>("essential");
  const [step, setStep] = useState<Step>("entitlement");

  // Form & Selection State
  const [selectedDate, setSelectedDate] = useState("2026-11-14");
  const [selectedSlot, setSelectedSlot] = useState("11:00 AM - 12:00 PM");
  const [visitorName, setVisitorName] = useState("Rupesh Singh");
  const [visitorPhone, setVisitorPhone] = useState("98200 45892");
  const [aadhaarInput, setAadhaarInput] = useState("8921 4452 7831");
  const [consentGiven, setConsentGiven] = useState(true);

  // eKYC State
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isVerifyingKyc, setIsVerifyingKyc] = useState(false);
  const [kycVerified, setKycVerified] = useState(false);
  const [kycRef, setKycRef] = useState<string | null>(null);

  // SmartDoor Pass & IoT Unlock Simulation State
  const [isGeneratingPass, setIsGeneratingPass] = useState(false);
  const [doorPassPin, setDoorPassPin] = useState("492 810");
  const [isUnlockingDoor, setIsUnlockingDoor] = useState(false);
  const [doorUnlocked, setDoorUnlocked] = useState(false);
  const [unlockMessage, setUnlockMessage] = useState("");

  // Key press Escape handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isFree = persona === "free";
  const quotaUsed = 2; // e.g., 2 used this calendar month
  const quotaRemaining = persona === "essential" ? 3 : persona === "premium" ? "Unlimited" : 0;

  const handleSendOtp = () => {
    if (!consentGiven) return;
    setOtpSent(true);
    setOtpCode("739201"); // Auto-fill demo OTP
  };

  const handleVerifyKyc = () => {
    setIsVerifyingKyc(true);
    setTimeout(() => {
      setIsVerifyingKyc(false);
      setKycVerified(true);
      setKycRef(`DL_UIDAI_${Date.now().toString(36).toUpperCase()}_042`);
    }, 900);
  };

  const handleGenerateSmartDoorPass = () => {
    setIsGeneratingPass(true);
    setTimeout(() => {
      setIsGeneratingPass(false);
      setDoorPassPin(Math.floor(100000 + Math.random() * 900000).toString().replace(/(\d{3})(\d{3})/, "$1 $2"));
      setStep("access_pass");
    }, 1100);
  };

  const handleTriggerBluetoothUnlock = () => {
    setIsUnlockingDoor(true);
    setUnlockMessage("Connecting to SmartDoor lock via BLE handshake...");
    setTimeout(() => {
      setUnlockMessage("Authenticating verified eKYC token with SmartDoor Gateway...");
    }, 800);
    setTimeout(() => {
      setIsUnlockingDoor(false);
      setDoorUnlocked(true);
      setUnlockMessage("Mortise bolt retracted. Entry allowed! Visit started audit logged.");
    }, 1800);
  };

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-charcoal/70 p-4 backdrop-blur-md"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative my-8 w-full max-w-2xl rounded-2xl border border-gold/40 bg-white shadow-2xl transition-all">
        {/* Header */}
        <div className="border-b border-charcoal/10 bg-navy px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                  SmartDoor Integrated Inspection
                </span>
                <span className="text-xs text-white/60">Ref: {property.ref}</span>
              </div>
              <h2 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
                Physical Inspection Arrangement
              </h2>
              <p className="text-xs text-white/80">{property.title} · {property.area}</p>
            </div>
            <button
              aria-label="Close dialog"
              className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors duration-200"
              onClick={onClose}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Interactive Persona Selector for Demonstration */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white/10 p-2.5 text-xs">
            <span className="font-semibold text-white/80">Simulate Member Account:</span>
            <div className="flex gap-1.5">
              <button
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  persona === "essential" ? "bg-gold text-navy font-bold shadow" : "bg-white/15 text-white hover:bg-white/25"
                }`}
                onClick={() => {
                  setPersona("essential");
                  setStep("entitlement");
                }}
                type="button"
              >
                Essential Member (5/mo)
              </button>
              <button
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  persona === "premium" ? "bg-gold text-navy font-bold shadow" : "bg-white/15 text-white hover:bg-white/25"
                }`}
                onClick={() => {
                  setPersona("premium");
                  setStep("entitlement");
                }}
                type="button"
              >
                Premium Member (Fair-Use)
              </button>
              <button
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  persona === "free" ? "bg-error text-white font-bold" : "bg-white/15 text-white hover:bg-white/25"
                }`}
                onClick={() => {
                  setPersona("free");
                  setStep("entitlement");
                }}
                type="button"
              >
                Free User (Gated)
              </button>
            </div>
          </div>
        </div>

        {/* Step Progression Bar (if entitled) */}
        {!isFree && (
          <div className="border-b border-charcoal/10 bg-ivory/60 px-6 py-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-charcoal/70">
              <div className={`flex items-center gap-1.5 ${step === "entitlement" ? "text-navy font-bold" : "text-charcoal/50"}`}>
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${step === "entitlement" ? "bg-navy text-white" : "bg-charcoal/20"}`}>1</span>
                <span>Entitlement</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-charcoal/30" />
              <div className={`flex items-center gap-1.5 ${step === "slot" ? "text-navy font-bold" : "text-charcoal/50"}`}>
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${step === "slot" ? "bg-navy text-white" : "bg-charcoal/20"}`}>2</span>
                <span>Select Slot</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-charcoal/30" />
              <div className={`flex items-center gap-1.5 ${step === "kyc" ? "text-navy font-bold" : "text-charcoal/50"}`}>
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${step === "kyc" ? "bg-navy text-white" : "bg-charcoal/20"}`}>3</span>
                <span>Visitor eKYC</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-charcoal/30" />
              <div className={`flex items-center gap-1.5 ${step === "access_pass" ? "text-navy font-bold" : "text-charcoal/50"}`}>
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${step === "access_pass" ? "bg-gold text-navy font-bold" : "bg-charcoal/20"}`}>4</span>
                <span>SmartDoor Pass</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {/* PATH A: FREE / UNENTITLED USER */}
          {isFree ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-warning/15 text-gold">
                <Lock className="h-8 w-8 text-[#C5A059]" />
              </div>
              <h3 className="font-display text-xl font-bold text-navy">
                Subscription Required for Inspection Arrangement
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-charcoal/75">
                Physical property inspections and SmartDoor digital entry passes are reserved exclusively for active <strong>Essential</strong> and <strong>Premium</strong> subscribers.
              </p>

              <div className="mx-auto mt-6 max-w-md rounded-xl border border-charcoal/15 bg-ivory/50 p-4 text-left text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-navy">Essential Plan:</span>
                  <span className="text-charcoal/80">5 physical inspection arrangements / mo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-navy">Premium Plan:</span>
                  <span className="text-charcoal/80">Unlimited fair-use inspection passes</span>
                </div>
                <div className="flex items-center justify-between border-t border-charcoal/10 pt-2">
                  <span className="font-semibold text-navy">Security Gating:</span>
                  <span className="text-charcoal/80">Mandatory visitor eKYC before access</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-3">
                <Button onClick={() => setPersona("essential")} tone="accent">
                  Upgrade to Essential Plan
                </Button>
                <Button onClick={onClose} tone="secondary">
                  Close Preview
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: ENTITLEMENT & PROPERTY ELIGIBILITY */}
              {step === "entitlement" && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-gold/40 bg-gold/10 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">
                          Active Entitlement
                        </span>
                        <h4 className="font-display text-lg font-bold text-navy capitalize">
                          {persona} Tier Member
                        </h4>
                      </div>
                      <Badge tone="success">Verified Active</Badge>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-4 border-t border-gold/30 pt-3 text-xs">
                      <div>
                        <p className="text-charcoal/60">Monthly Quota:</p>
                        <p className="font-semibold text-navy">
                          {persona === "essential" ? `${quotaUsed} of 5 used (${quotaRemaining} remaining)` : "Unlimited Fair-Use"}
                        </p>
                      </div>
                      <div>
                        <p className="text-charcoal/60">SmartDoor Lock:</p>
                        <p className="font-semibold text-emerald-700">Online &amp; IoT Ready (94% batt)</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-charcoal/15 bg-white p-4 text-xs space-y-2">
                    <h5 className="font-semibold text-navy">Statutory Inspection Notice</h5>
                    <p className="text-charcoal/75">
                      Under the SARFAESI public auction terms, access to <strong>{property.title}</strong> is scheduled in coordination with the authorized officer and secured by <strong>SmartDoor IoT mortise locks</strong>.
                    </p>
                    <ul className="list-disc pl-4 text-charcoal/70 space-y-1">
                      <li>Access is strictly granted to verified visitors whose eKYC matches the entry pass.</li>
                      <li>SmartDoor digital passes generate dynamic OTP codes and BLE keys valid only during the designated window.</li>
                    </ul>
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <Button onClick={onClose} tone="secondary">Cancel</Button>
                    <Button onClick={() => setStep("slot")} tone="primary" className="inline-flex items-center gap-2">
                      <span>Proceed to Slot Selection</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 2: SLOT SELECTION */}
              {step === "slot" && (
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                      1. Select Statutory Inspection Date
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {[
                        { date: "2026-11-14", label: "Sat, 14 Nov", tag: "Bank Window Day 1" },
                        { date: "2026-11-15", label: "Sun, 15 Nov", tag: "Bank Window Day 2" },
                        { date: "2026-11-18", label: "Wed, 18 Nov", tag: "Final Inspection Window" },
                      ].map((item) => (
                        <button
                          key={item.date}
                          className={`rounded-lg border p-3 text-left transition-all ${
                            selectedDate === item.date
                              ? "border-navy bg-navy/5 shadow-sm ring-1 ring-navy"
                              : "border-charcoal/20 bg-white hover:border-charcoal/40"
                          }`}
                          onClick={() => setSelectedDate(item.date)}
                          type="button"
                        >
                          <p className="font-display text-sm font-bold text-navy">{item.label}</p>
                          <p className="mt-1 text-[11px] text-charcoal/60">{item.tag}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                      2. Select 1-Hour Time Window
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {[
                        "10:00 AM - 11:00 AM",
                        "11:30 AM - 12:30 PM",
                        "02:00 PM - 03:00 PM",
                        "03:30 PM - 04:30 PM",
                      ].map((slot) => (
                        <button
                          key={slot}
                          className={`rounded-md border px-3 py-2 text-center text-xs font-semibold transition-all ${
                            selectedSlot === slot
                              ? "border-gold bg-gold text-navy shadow"
                              : "border-charcoal/20 bg-white text-charcoal/80 hover:bg-charcoal/5"
                          }`}
                          onClick={() => setSelectedSlot(slot)}
                          type="button"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span>
                      SmartDoor device <strong>{property.smartDoorDevice}</strong> confirmed online and synchronized for this slot.
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 pt-3 border-t border-charcoal/10">
                    <Button onClick={() => setStep("entitlement")} tone="secondary" className="inline-flex items-center gap-1.5">
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </Button>
                    <Button onClick={() => setStep("kyc")} tone="primary" className="inline-flex items-center gap-2">
                      <span>Next: Visitor eKYC Verification</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: VISITOR IDENTITY & MANDATORY eKYC */}
              {step === "kyc" && (
                <div className="space-y-4">
                  <div className="rounded-lg border border-navy/20 bg-navy/5 p-3.5 text-xs">
                    <div className="flex items-center gap-2 font-semibold text-navy">
                      <ShieldCheck className="h-4 w-4 text-[#C5A059] shrink-0" />
                      <span>Mandatory Visitor Verification (DPDP Act 2023 Compliant)</span>
                    </div>
                    <p className="mt-1 text-charcoal/70">
                      To prevent unauthorized trespassing and protect secured auction property, SmartDoor entry is tied to the verified identity of the person physically visiting. Full Aadhaar numbers are never stored; only masked identifiers are preserved.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-charcoal/80">Full Legal Name (as on Gov ID)</label>
                      <input
                        className="mt-1 w-full rounded-md border border-charcoal/25 p-2 text-sm text-navy font-medium"
                        onChange={(e) => setVisitorName(e.target.value)}
                        value={visitorName}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal/80">Visitor Mobile Number</label>
                      <input
                        className="mt-1 w-full rounded-md border border-charcoal/25 p-2 text-sm text-navy font-medium"
                        onChange={(e) => setVisitorPhone(e.target.value)}
                        value={visitorPhone}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-charcoal/80">
                      Aadhaar / DigiLocker 12-Digit Number
                    </label>
                    <div className="mt-1 flex gap-2">
                      <input
                        className="w-full rounded-md border border-charcoal/25 p-2 text-sm tracking-wider text-navy font-mono"
                        disabled={otpSent}
                        onChange={(e) => setAadhaarInput(e.target.value)}
                        value={aadhaarInput}
                      />
                      {!otpSent ? (
                        <button
                          className="shrink-0 rounded-md bg-navy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy/90 disabled:opacity-50"
                          disabled={!consentGiven}
                          onClick={handleSendOtp}
                          type="button"
                        >
                          Send OTP
                        </button>
                      ) : (
                        <span className="shrink-0 self-center flex items-center gap-1 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>OTP Dispatched</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Consent checkbox */}
                  <label className="flex items-start gap-2.5 text-xs text-charcoal/75 cursor-pointer">
                    <input
                      checked={consentGiven}
                      className="mt-0.5 rounded border-charcoal/30 text-navy"
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      type="checkbox"
                    />
                    <span>
                      I provide consent for AuctionIQ and SmartDoor to verify my visitor credentials through DigiLocker / UIDAI solely for statutory physical inspection access.
                    </span>
                  </label>

                  {/* OTP Verification Box */}
                  {otpSent && !kycVerified && (
                    <div className="mt-3 rounded-xl border border-gold/40 bg-gold/10 p-4">
                      <p className="text-xs font-semibold text-navy">
                        Enter 6-Digit DigiLocker Verification OTP
                      </p>
                      <p className="text-[11px] text-charcoal/60">Demo OTP auto-populated: 739201</p>
                      <div className="mt-2 flex gap-2">
                        <input
                          className="w-36 rounded-md border border-charcoal/30 bg-white p-2 text-center text-lg font-bold tracking-widest text-navy"
                          maxLength={6}
                          onChange={(e) => setOtpCode(e.target.value)}
                          value={otpCode}
                        />
                        <button
                          className="rounded-md bg-gold px-4 py-2 text-xs font-bold text-navy shadow hover:bg-gold/90 disabled:opacity-50"
                          disabled={isVerifyingKyc}
                          onClick={handleVerifyKyc}
                          type="button"
                        >
                          {isVerifyingKyc ? "Verifying with UIDAI..." : "Verify & Complete eKYC"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Verified Confirmation */}
                  {kycVerified && (
                    <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                        <h5 className="font-bold">Visitor eKYC Verified Successfully</h5>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-emerald-800">
                        <div>
                          <span className="opacity-70">Verified Name:</span>
                          <p className="font-semibold">{visitorName}</p>
                        </div>
                        <div>
                          <span className="opacity-70">Masked Aadhaar:</span>
                          <p className="font-mono font-semibold">{maskAadhaar(aadhaarInput)}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="opacity-70">Verification Token:</span>
                          <p className="font-mono text-[11px]">{kycRef}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between gap-3 pt-3 border-t border-charcoal/10">
                    <Button onClick={() => setStep("slot")} tone="secondary" className="inline-flex items-center gap-1.5">
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </Button>
                    <Button
                      disabled={!kycVerified || isGeneratingPass}
                      onClick={handleGenerateSmartDoorPass}
                      tone="accent"
                      className="inline-flex items-center gap-2"
                    >
                      <span>{isGeneratingPass ? "Generating SmartDoor Pass..." : "Issue SmartDoor Access Pass"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 4: SMARTDOOR DIGITAL ACCESS PASS */}
              {step === "access_pass" && (
                <div className="space-y-5">
                  <div className="relative overflow-hidden rounded-2xl border-2 border-gold bg-gradient-to-br from-navy via-[#112240] to-navy p-6 text-white shadow-xl">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold">
                          Official Inspection Digital Pass
                        </span>
                        <h4 className="mt-1 font-display text-xl font-bold text-white">
                          {property.title}
                        </h4>
                        <p className="text-xs text-white/70">{property.area} · Ref: {property.ref}</p>
                      </div>
                      <div className="text-right">
                        <Badge tone="success">Access Authorized</Badge>
                        <p className="mt-1 text-[11px] text-white/60">Lock ID: {property.smartDoorDevice}</p>
                      </div>
                    </div>

                    {/* Dynamic Keypad PIN Display */}
                    <div className="my-5 rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-widest text-white/70">
                        Door Lock Keypad Dynamic PIN
                      </p>
                      <div className="mt-1.5 flex items-center justify-center gap-3">
                        <span className="font-mono text-3xl font-extrabold tracking-widest text-gold sm:text-4xl drop-shadow">
                          {doorPassPin}
                        </span>
                        <button
                          className="rounded bg-white/10 px-2 py-1 text-[11px] text-white/80 hover:bg-white/20"
                          onClick={() => alert(`PIN ${doorPassPin} copied to clipboard.`)}
                          type="button"
                        >
                          Copy
                        </button>
                      </div>
                      <p className="mt-1 text-[11px] text-white/60">
                        Enter this 6-digit code on the door keypad followed by &quot;#&quot;
                      </p>
                    </div>

                    {/* Pass Details Grid */}
                    <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-3 text-xs">
                      <div>
                        <span className="text-white/50">Inspection Date:</span>
                        <p className="font-semibold text-white">{selectedDate}</p>
                      </div>
                      <div>
                        <span className="text-white/50">Access Window:</span>
                        <p className="font-semibold text-white">{selectedSlot}</p>
                      </div>
                      <div>
                        <span className="text-white/50">Authorized Visitor:</span>
                        <p className="font-semibold text-white">{visitorName}</p>
                      </div>
                      <div>
                        <span className="text-white/50">Visitor eKYC:</span>
                        <p className="font-mono font-semibold text-emerald-400">
                          {maskAadhaar(aadhaarInput)} (Verified)
                        </p>
                      </div>
                    </div>

                    {/* Interactive Bluetooth Quick-Unlock Simulator */}
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold text-white">On-Site Smart Unlock</p>
                          <p className="text-[11px] text-white/60">
                            When standing within 10 meters of the smart lock
                          </p>
                        </div>
                        <button
                          className={`rounded-lg px-4 py-2.5 text-xs font-bold transition-all shadow-md ${
                            doorUnlocked
                              ? "bg-emerald-600 text-white"
                              : "bg-gold text-navy hover:bg-gold/90"
                          }`}
                          disabled={isUnlockingDoor || doorUnlocked}
                          onClick={handleTriggerBluetoothUnlock}
                          type="button"
                        >
                          {isUnlockingDoor ? (
                            "Connecting..."
                          ) : doorUnlocked ? (
                            <span className="flex items-center justify-center gap-1">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>Door Unlocked</span>
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-1.5">
                              <Smartphone className="h-4 w-4" />
                              <span>Quick-Unlock via SmartDoor BLE</span>
                            </span>
                          )}
                        </button>
                      </div>

                      {unlockMessage && (
                        <div className="mt-3 rounded bg-white/10 p-2 text-xs text-gold animate-fadeIn">
                          {unlockMessage}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary & Quota Impact */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-lg border border-charcoal/15 bg-ivory/50 p-3 text-xs">
                    <div>
                      <span className="font-semibold text-navy">Calendar Month Quota Status:</span>
                      <p className="text-charcoal/70">
                        {persona === "essential"
                          ? `1 request deducted. 2 of 5 inspections remaining for ${persona} tier.`
                          : "Unlimited fair-use access logged. No quota deduction."}
                      </p>
                    </div>
                    <Button onClick={onClose} tone="primary">
                      Done / Close Pass
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
