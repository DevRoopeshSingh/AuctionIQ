import { describe, expect, it } from "vitest";
import { Pool } from "pg";

describe.skip("auth.users profile trigger — A17 pending", () => {
  it("appears in pg_trigger after the unapplied A17 migration is installed (A17 pending)", async () => {
    const pool = new Pool({ connectionString: process.env.RLS_TEST_DATABASE_URL });
    try {
      const result = await pool.query<{ trigger_name: string }>(
        "SELECT tgname AS trigger_name FROM pg_trigger WHERE tgname = 'on_auth_user_created' AND NOT tgisinternal",
      );
      expect(result.rows.map((row) => row.trigger_name)).toContain("on_auth_user_created");
    } finally {
      await pool.end();
    }
  });
});
