import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Pool } from "pg";
import { writeAuditLog } from "@/lib/audit/write";

const testUrl = process.env.RLS_TEST_DATABASE_URL;
const pool = testUrl ? new Pool({ connectionString: testUrl }) : undefined;
const describeDb = testUrl ? describe : describe.skip;

describeDb("M1-T11 audit write helper on local Postgres", () => {
  beforeAll(async () => { await pool!.query("SELECT 1"); });
  afterAll(async () => { await pool?.end(); });

  it("writes actor, action, entity identifiers, and timestamp for an admin action", async () => {
    const client = await pool!.connect();
    const actorId = "d0000000-0000-4000-8000-000000000004";
    try {
      await client.query("BEGIN");
      await client.query("INSERT INTO profiles (id, full_name, role) VALUES ($1, 'audit admin', 'admin')", [actorId]);
      const executor = {
        query: async (sql: string, values?: unknown[]) =>
          client.query(sql, values as never[] | undefined),
      };
      const row = await writeAuditLog(executor, {
        actorId,
        actorRole: "admin",
        action: "property.publish",
        entityType: "properties",
        entityId: "RLS-TEST-ENTITY",
        metadata: { source: "integration-test" },
      });
      expect(row).toMatchObject({
        actor_id: actorId,
        action: "property.publish",
        entity_type: "properties",
        entity_id: "RLS-TEST-ENTITY",
      });
      expect(row?.created_at).toBeInstanceOf(Date);
      await client.query("ROLLBACK");
    } finally {
      client.release();
    }
  });
});
