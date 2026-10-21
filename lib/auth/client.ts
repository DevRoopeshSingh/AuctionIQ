export interface AuthUser {
  id: string;
  email: string | null;
}

export interface AuthSession {
  accessToken: string;
  user: AuthUser;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthClient {
  signUp(credentials: AuthCredentials): Promise<AuthSession>;
  signIn(credentials: AuthCredentials): Promise<AuthSession>;
  signOut(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  getSession(): Promise<AuthSession | null>;
  onAuthStateChange(callback: (session: AuthSession | null) => void): () => void;
}

export class AuthNotProvisionedError extends Error {
  readonly code = "NOT_PROVISIONED" as const;

  constructor() {
    super("Supabase Auth is unavailable until A17 is provisioned.");
    this.name = "AuthNotProvisionedError";
  }
}

function notProvisioned(): never {
  throw new AuthNotProvisionedError();
}

export const authClient: AuthClient = {
  signUp: async () => notProvisioned(),
  signIn: async () => notProvisioned(),
  signOut: async () => notProvisioned(),
  resetPassword: async () => notProvisioned(),
  getSession: async () => notProvisioned(),
  onAuthStateChange: () => notProvisioned(),
};
