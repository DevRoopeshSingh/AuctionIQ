export interface SupabaseClientConfig {
  url: string;
  anonKey: string;
  context: "browser" | "server";
}

export interface SupabaseServerConfig extends SupabaseClientConfig {
  context: "server";
  serviceRoleKey: string;
}

export class SupabaseNotProvisionedError extends Error {
  readonly code = "NOT_PROVISIONED" as const;

  constructor(missing: string[]) {
    super("Supabase configuration is unavailable until A17 is provisioned (" + missing.join(", ") + ").");
    this.name = "SupabaseNotProvisionedError";
  }
}

function required(value: string | undefined, variable: string, missing: string[]): string {
  if (!value) missing.push(variable);
  return value ?? "";
}

export function getBrowserSupabaseConfig(): SupabaseClientConfig {
  const missing: string[] = [];
  const url = required(process.env.NEXT_PUBLIC_SUPABASE_URL, "NEXT_PUBLIC_SUPABASE_URL", missing);
  const anonKey = required(process.env.SUPABASE_ANON_KEY, "SUPABASE_ANON_KEY", missing);
  if (missing.length) throw new SupabaseNotProvisionedError(missing);
  return { url, anonKey, context: "browser" };
}

export function getServerSupabaseConfig(): SupabaseServerConfig {
  const missing: string[] = [];
  const url = required(process.env.NEXT_PUBLIC_SUPABASE_URL, "NEXT_PUBLIC_SUPABASE_URL", missing);
  const anonKey = required(process.env.SUPABASE_ANON_KEY, "SUPABASE_ANON_KEY", missing);
  const serviceRoleKey = required(process.env.SUPABASE_SERVICE_ROLE_KEY, "SUPABASE_SERVICE_ROLE_KEY", missing);
  if (typeof window !== "undefined") throw new Error("The Supabase service-role context is server-only.");
  if (missing.length) throw new SupabaseNotProvisionedError(missing);
  return { url, anonKey, serviceRoleKey, context: "server" };
}
