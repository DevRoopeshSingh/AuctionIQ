import { describe, expect, it } from "vitest";
import { resolveEntitlement, type SubscriptionState, type SubscriptionTier } from "@/lib/entitlements/resolve";

const tiers: SubscriptionTier[] = ["essential", "premium"];
const states: SubscriptionState[] = ["pending", "active", "past_due", "cancelled", "expired"];
const now = new Date("2026-10-21T00:00:00.000Z");

describe("subscription entitlement matrix", () => {
  for (const tier of tiers) {
    for (const status of states) {
      it(`${tier}/${status}`, () => {
        const result = resolveEntitlement({
          tier, status,
          currentPeriodEnd: new Date(status === "expired" ? "2026-10-20T00:00:00Z" : "2026-10-22T00:00:00Z"),
        }, now);
        const expectedFull = status === "active" || status === "cancelled" || status === "past_due";
        expect(result.canReadPaidFeatures).toBe(expectedFull);
        expect(result.canWritePaidFeatures).toBe(expectedFull);
        expect(result.canReadOwnRecords).toBe(true);
        expect(result.isReadOnly).toBe(!expectedFull);
        expect(result.tier).toBe(expectedFull ? tier : "free");
      });
    }
  }

  it("keeps past_due access for three days, then downgrades to own-record read-only", () => {
    const subscription = {
      tier: "essential" as const,
      status: "past_due" as const,
      currentPeriodEnd: new Date("2026-10-20T00:00:00.000Z"),
    };
    expect(resolveEntitlement(subscription, now).canReadPaidFeatures).toBe(true);
    expect(resolveEntitlement(subscription, new Date("2026-10-24T00:00:00Z")).isReadOnly).toBe(true);
  });

  it("treats pending and expired subscriptions as read-only for own records", () => {
    for (const status of ["pending", "expired"] as const) {
      const result = resolveEntitlement({
        tier: "premium", status, currentPeriodEnd: new Date("2026-10-20T00:00:00Z"),
      }, now);
      expect(result.canReadOwnRecords).toBe(true);
      expect(result.isReadOnly).toBe(true);
    }
  });

  it("keeps an account without a subscription on the free tier", () => {
    expect(resolveEntitlement(null, now)).toMatchObject({
      tier: "free", status: "none", canReadPaidFeatures: false,
      canWritePaidFeatures: false, canReadOwnRecords: true, isReadOnly: false,
    });
  });
});
