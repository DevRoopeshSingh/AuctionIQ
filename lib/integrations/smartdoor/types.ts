export type SmartDoorPassStatus = "active" | "used" | "expired" | "revoked";

export interface SmartDoorDevice {
  deviceId: string;
  propertyId: string;
  isOnline: boolean;
  batteryLevelPercent: number;
  lockType: "smart_mortise" | "gateway_padlock" | "digital_keybox";
  lastHeartbeat: string;
}

export interface GenerateSmartDoorPassParams {
  propertyRef: string;
  deviceId: string;
  visitorName: string;
  visitorPhone: string;
  kycVerificationRef: string;
  validFrom: Date;
  validTo: Date;
}

export interface SmartDoorAccessPassResult {
  passId: string;
  deviceId: string;
  propertyRef: string;
  dynamicPinCode: string; // 6-digit door lock keypad PIN
  bluetoothToken: string;  // BLE crypto handshake token
  qrPayload: string;       // Dynamic QR code content
  validFrom: string;
  validTo: string;
  status: SmartDoorPassStatus;
  entryInstructions: string[];
}

export interface SmartDoorWebhookPayload {
  eventId: string;
  event: "door.unlocked" | "door.locked" | "pass.expired" | "tamper.detected";
  deviceId: string;
  passId?: string;
  timestamp: string;
  metadata?: {
    unlockMethod?: "keypad_pin" | "bluetooth_ble" | "remote_override";
    batteryLevel?: number;
    doorSensorState?: "open" | "closed";
  };
}
