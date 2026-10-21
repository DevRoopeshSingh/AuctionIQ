import { describe, expect, it, vi } from "vitest";
import { createSentryReporter, type SentryAdapter } from "@/lib/observability/sentry";

describe("Sentry scaffolding", () => {
  it("uses a no-op when NEXT_PUBLIC_SENTRY_DSN is unset", () => {
    const adapter: SentryAdapter = { init: vi.fn(), captureException: vi.fn() };
    const reporter = createSentryReporter({}, adapter);
    expect(reporter.enabled).toBe(false);
    expect(reporter.captureException(new Error("ignored"))).toBe(false);
    expect(adapter.init).not.toHaveBeenCalled();
    expect(adapter.captureException).not.toHaveBeenCalled();
  });

  it.skip("calls captureException with a configured DSN and local adapter — A20 pending real DSN verification", () => {
    const adapter: SentryAdapter = { init: vi.fn(), captureException: vi.fn() };
    const reporter = createSentryReporter({ NEXT_PUBLIC_SENTRY_DSN: "https://local-mock.invalid/1" }, adapter);
    const error = new Error("scaffold probe");
    expect(reporter.enabled).toBe(true);
    expect(reporter.captureException(error)).toBe(true);
    expect(adapter.captureException).toHaveBeenCalledWith(error);
  });
});
