export type GuardDecision =
  | { allowed: true; status: 200 }
  | { allowed: false; status: 401; reason: "unauthenticated" }
  | { allowed: false; status: 403; reason: "forbidden" };

export function guardMemberRoute(isAuthenticated: boolean): GuardDecision {
  return isAuthenticated
    ? { allowed: true, status: 200 }
    : { allowed: false, status: 401, reason: "unauthenticated" };
}

export function guardPaidRoute(isAuthenticated: boolean, hasPaidEntitlement: boolean): GuardDecision {
  if (!isAuthenticated) return { allowed: false, status: 401, reason: "unauthenticated" };
  if (!hasPaidEntitlement) return { allowed: false, status: 403, reason: "forbidden" };
  return { allowed: true, status: 200 };
}
