export interface SentryAdapter {
  init(options: { dsn: string }): void;
  captureException(error: unknown): void;
}

export interface SentryEnvironment {
  NEXT_PUBLIC_SENTRY_DSN?: string;
  SENTRY_AUTH_TOKEN?: string;
}

export function readSentryEnvironment(): SentryEnvironment {
  return {
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  };
}

export function getSentryServerConfig() {
  if (typeof window !== "undefined") throw new Error("SENTRY_AUTH_TOKEN is server-only.");
  const { NEXT_PUBLIC_SENTRY_DSN } = readSentryEnvironment();
  return { dsn: NEXT_PUBLIC_SENTRY_DSN, authToken: process.env.SENTRY_AUTH_TOKEN };
}

export function createSentryReporter(environment: SentryEnvironment, adapter?: SentryAdapter) {
  const dsn = environment.NEXT_PUBLIC_SENTRY_DSN;
  const enabled = Boolean(dsn && adapter);
  if (enabled && dsn) adapter?.init({ dsn });

  return {
    enabled,
    captureException(error: unknown): boolean {
      if (!enabled || !adapter) return false;
      adapter.captureException(error);
      return true;
    },
  };
}

let reporter = createSentryReporter(readSentryEnvironment());

export function configureSentry(adapter: SentryAdapter): boolean {
  reporter = createSentryReporter(readSentryEnvironment(), adapter);
  return reporter.enabled;
}

export function reportSentryException(error: unknown): boolean {
  return reporter.captureException(error);
}
