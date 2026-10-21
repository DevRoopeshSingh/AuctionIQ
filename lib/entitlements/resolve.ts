export type SubscriptionTier = "essential" | "premium";
export type SubscriptionState = "pending" | "active" | "past_due" | "cancelled" | "expired";

export interface SubscriptionSnapshot {
  tier: SubscriptionTier;
  status: SubscriptionState;
  currentPeriodEnd: Date;
}

export interface Entitlement {
  tier: SubscriptionTier | "free";
  status: SubscriptionState | "none";
  canReadPaidFeatures: boolean;
  canWritePaidFeatures: boolean;
  canReadOwnRecords: true;
  isReadOnly: boolean;
  gracePeriodEndsAt: Date | null;
}

const GRACE_PERIOD_MS = 3 * 24 * 60 * 60 * 1000;

export function resolveEntitlement(
  subscription: SubscriptionSnapshot | null,
  now = new Date(),
): Entitlement {
  if (!subscription) {
    return {
      tier: "free", status: "none", canReadPaidFeatures: false,
      canWritePaidFeatures: false, canReadOwnRecords: true,
      isReadOnly: false, gracePeriodEndsAt: null,
    };
  }

  const { tier, status, currentPeriodEnd } = subscription;
  const periodIsCurrent = currentPeriodEnd.getTime() > now.getTime();
  const gracePeriodEndsAt = status === "past_due"
    ? new Date(currentPeriodEnd.getTime() + GRACE_PERIOD_MS)
    : null;
  const isInGracePeriod = status === "past_due" && now.getTime() <= gracePeriodEndsAt!.getTime();
  const hasFullAccess = (status === "active" && periodIsCurrent)
    || (status === "cancelled" && periodIsCurrent)
    || isInGracePeriod;

  return {
    tier: hasFullAccess ? tier : "free",
    status,
    canReadPaidFeatures: hasFullAccess,
    canWritePaidFeatures: hasFullAccess,
    canReadOwnRecords: true,
    isReadOnly: !hasFullAccess,
    gracePeriodEndsAt,
  };
}
