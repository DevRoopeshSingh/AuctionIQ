import { describe, expect, it } from "vitest";
import { guardMemberRoute, guardPaidRoute } from "@/lib/auth/guards";

describe("server route guards", () => {
  it("returns 401 for unauthenticated member routes", () => {
    expect(guardMemberRoute(false)).toEqual({
      allowed: false, status: 401, reason: "unauthenticated",
    });
  });

  it("allows authenticated member routes", () => {
    expect(guardMemberRoute(true)).toEqual({ allowed: true, status: 200 });
  });

  it("returns 401 before checking entitlement on paid routes", () => {
    expect(guardPaidRoute(false, true)).toEqual({
      allowed: false, status: 401, reason: "unauthenticated",
    });
  });

  it("returns 403 for free authenticated requests to paid routes", () => {
    expect(guardPaidRoute(true, false)).toEqual({
      allowed: false, status: 403, reason: "forbidden",
    });
  });

  it("allows paid authenticated requests", () => {
    expect(guardPaidRoute(true, true)).toEqual({ allowed: true, status: 200 });
  });
});
