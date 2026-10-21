import { describe, expect, it } from "vitest";
import {
  authClient,
  AuthNotProvisionedError,
  type AuthClient,
} from "@/lib/auth/client";

const contract: AuthClient = authClient;

describe.skip("AuthClient interface contract — A17 pending", () => {
  it("exposes signup, signin, signout, reset, session, and state-change methods (A17 pending)", () => {
    expect(Object.keys(contract).sort()).toEqual([
      "getSession", "onAuthStateChange", "resetPassword", "signIn", "signOut", "signUp",
    ]);
  });

  it("uses the typed NOT_PROVISIONED error before provider setup (A17 pending)", async () => {
    await expect(contract.getSession()).rejects.toBeInstanceOf(AuthNotProvisionedError);
    await expect(contract.signUp({ email: "user@example.test", password: "password" })).rejects.toBeInstanceOf(AuthNotProvisionedError);
    await expect(contract.signIn({ email: "user@example.test", password: "password" })).rejects.toBeInstanceOf(AuthNotProvisionedError);
    await expect(contract.signOut()).rejects.toBeInstanceOf(AuthNotProvisionedError);
    await expect(contract.resetPassword("user@example.test")).rejects.toBeInstanceOf(AuthNotProvisionedError);
    expect(() => contract.onAuthStateChange(() => undefined)).toThrow(AuthNotProvisionedError);
    expect(new AuthNotProvisionedError().code).toBe("NOT_PROVISIONED");
  });
});
