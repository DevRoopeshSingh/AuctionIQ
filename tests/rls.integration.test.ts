import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Pool, type PoolClient } from "pg";

const testUrl = process.env.RLS_TEST_DATABASE_URL;
const pool = testUrl ? new Pool({ connectionString: testUrl }) : undefined;
const tables = [
  "profiles", "subscriptions", "payments", "refunds", "invoices", "webhook_events",
  "properties", "property_photos", "property_documents", "property_status_history",
  "property_risk_indicators", "property_enquiries", "property_enquiry_messages",
  "forum_posts", "forum_votes", "forum_follows", "forum_reports", "watchlists",
  "inspections", "advocate_enquiries", "notifications", "simulation_sessions",
  "cost_calculations", "articles", "quizzes", "quiz_questions", "quiz_attempts",
  "badges", "user_badges", "learning_progress", "audit_logs",
] as const;

const expectedPolicyOperations: Record<string, string[]> = {
  profiles: ["SELECT", "UPDATE"], subscriptions: ["SELECT"], payments: ["SELECT"],
  refunds: ["SELECT"], invoices: ["SELECT"], webhook_events: [],
  properties: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  property_photos: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  property_documents: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  property_status_history: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  property_risk_indicators: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  property_enquiries: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  property_enquiry_messages: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  forum_posts: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  forum_votes: ["SELECT", "INSERT", "DELETE"],
  forum_follows: ["SELECT", "INSERT", "DELETE"],
  forum_reports: ["SELECT", "INSERT", "UPDATE"],
  watchlists: ["SELECT", "INSERT", "DELETE"],
  inspections: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  advocate_enquiries: ["SELECT", "INSERT", "UPDATE"],
  notifications: ["SELECT", "UPDATE"],
  simulation_sessions: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  cost_calculations: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  articles: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  quizzes: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  quiz_questions: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  quiz_attempts: ["SELECT", "INSERT"],
  badges: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  user_badges: ["SELECT"],
  learning_progress: ["SELECT", "INSERT", "UPDATE", "DELETE"],
  audit_logs: ["SELECT"],
};

const anonSelect = new Set([
  "articles", "quizzes", "quiz_questions", "badges",
]);
const authSelect = new Set(tables.filter((table) => ![
  "webhook_events", "properties", "property_photos", "property_documents",
].includes(table)));
const expectedTableGrants: Record<string, Record<string, string[]>> = {
  anon: {
    articles: ["SELECT"], badges: ["SELECT"], quiz_attempts: ["INSERT"],
    quiz_questions: ["SELECT"], quizzes: ["SELECT"],
    simulation_sessions: ["DELETE", "INSERT", "UPDATE"],
  },
  authenticated: {
    advocate_enquiries: ["INSERT", "SELECT", "UPDATE"],
    articles: ["INSERT", "SELECT"], audit_logs: ["SELECT"], badges: ["INSERT", "SELECT"],
    cost_calculations: ["DELETE", "INSERT", "SELECT", "UPDATE"],
    forum_follows: ["DELETE", "INSERT", "SELECT"],
    forum_posts: ["DELETE", "INSERT", "SELECT", "UPDATE"],
    forum_reports: ["DELETE", "INSERT", "SELECT", "UPDATE"],
    forum_votes: ["DELETE", "INSERT", "SELECT"],
    inspections: ["DELETE", "INSERT", "SELECT", "UPDATE"], invoices: ["SELECT"],
    learning_progress: ["DELETE", "INSERT", "SELECT", "UPDATE"], notifications: ["SELECT"],
    payments: ["SELECT"], profiles: ["SELECT"],
    property_enquiries: ["DELETE", "INSERT", "SELECT", "UPDATE"],
    property_enquiry_messages: ["DELETE", "INSERT", "SELECT", "UPDATE"],
    property_risk_indicators: ["DELETE", "INSERT", "SELECT", "UPDATE"],
    property_status_history: ["DELETE", "INSERT", "SELECT", "UPDATE"],
    quiz_attempts: ["INSERT", "SELECT"], quiz_questions: ["INSERT", "SELECT"],
    quizzes: ["INSERT", "SELECT"], refunds: ["SELECT"],
    simulation_sessions: ["DELETE", "INSERT", "SELECT", "UPDATE"],
    subscriptions: ["SELECT"], user_badges: ["SELECT"],
    watchlists: ["DELETE", "INSERT", "SELECT"],
  },
};
const identities = {
  anon: { role: "anon", id: "" },
  free: { role: "authenticated", id: "f0000000-0000-4000-8000-000000000001" },
  paid: { role: "authenticated", id: "b0000000-0000-4000-8000-000000000002" },
  expired: { role: "authenticated", id: "b0000000-0000-4000-8000-000000000005" },
  admin: { role: "authenticated", id: "c0000000-0000-4000-8000-000000000003" },
} as const;

async function asRole<T>(client: PoolClient, identity: { role: "anon" | "authenticated" | "service_role"; id: string }, callback: () => Promise<T>) {
  await client.query("SAVEPOINT role_context");
  await client.query(`SET LOCAL ROLE ${identity.role}`);
  await client.query("SELECT set_config('request.jwt.claim.sub', $1, true)", [identity.id]);
  await client.query("SELECT set_config('request.session_id', 'rls-test-session', true)");
  try {
    return await callback();
  } finally {
    await client.query("ROLLBACK TO SAVEPOINT role_context");
    await client.query("RELEASE SAVEPOINT role_context");
  }
}

async function expectPermissionDenied(client: PoolClient, sql: string) {
  await client.query("SAVEPOINT denied_operation");
  try {
    await client.query(sql);
    throw new Error(`Expected permission denied for: ${sql}`);
  } catch (error) {
    await client.query("ROLLBACK TO SAVEPOINT denied_operation");
    expect((error as { code?: string }).code).toBe("42501");
    expect((error as { message?: string }).message).toMatch(/permission denied/i);
  } finally {
    await client.query("RELEASE SAVEPOINT denied_operation");
  }
}

async function expectRlsViolation(client: PoolClient, sql: string) {
  await client.query("SAVEPOINT rls_denied_operation");
  try {
    await client.query(sql);
    throw new Error(`Expected RLS violation for: ${sql}`);
  } catch (error) {
    await client.query("ROLLBACK TO SAVEPOINT rls_denied_operation");
    expect((error as { code?: string }).code).toBe("42501");
    expect((error as { message?: string }).message).toMatch(/row-level security policy/i);
  } finally {
    await client.query("RELEASE SAVEPOINT rls_denied_operation");
  }
}

const describeDb = testUrl ? describe : describe.skip;

describeDb("M1-T9 local Postgres RLS integration", () => {
  beforeAll(async () => {
    await pool!.query("SELECT 1");
  });
  afterAll(async () => {
    await pool?.end();
  });

  it("enables RLS on every §6.1 table and has exactly the specified operation policies", async () => {
    const { rows } = await pool!.query<{ tablename: string; rowsecurity: boolean }>(
      "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = ANY($1)",
      [tables],
    );
    expect(rows.map((row) => row.tablename).sort()).toEqual([...tables].sort());
    expect(rows.every((row) => row.rowsecurity)).toBe(true);

    const policies = await pool!.query<{ tablename: string; cmd: string }>(
      "SELECT tablename, cmd FROM pg_policies WHERE schemaname = 'public' AND tablename = ANY($1)",
      [tables],
    );
    for (const table of tables) {
      expect(policies.rows.filter((row) => row.tablename === table).map((row) => row.cmd).sort())
        .toEqual([...expectedPolicyOperations[table]].sort());
    }
  });

  it("matches the anon/authenticated table-grant matrix and profile column restriction", async () => {
    const { rows } = await pool!.query<{ grantee: string; table_name: string; privilege_type: string }>(
      `SELECT grantee, table_name, privilege_type
       FROM information_schema.role_table_grants
       WHERE table_schema = 'public' AND grantee IN ('anon', 'authenticated')
         AND table_name = ANY($1)
       ORDER BY grantee, table_name, privilege_type`,
      [tables],
    );
    const actual: Record<string, Record<string, string[]>> = { anon: {}, authenticated: {} };
    for (const row of rows) {
      (actual[row.grantee][row.table_name] ??= []).push(row.privilege_type);
    }
    expect(actual).toEqual(expectedTableGrants);
    for (const column of ["full_name", "phone", "gstin", "updated_at", "deleted_at"]) {
      const { rows: privileges } = await pool!.query<{ can_update: boolean }>(
        "SELECT has_column_privilege('authenticated', 'profiles', $1, 'UPDATE') AS can_update",
        [column],
      );
      expect(privileges[0].can_update).toBe(true);
    }
    const roleUpdate = await pool!.query<{ can_update: boolean }>(
      "SELECT has_column_privilege('authenticated', 'profiles', 'role', 'UPDATE') AS can_update",
    );
    expect(roleUpdate.rows[0].can_update).toBe(false);
  });

  it("grants service_role the matrix operations, preserving audit/notification restrictions", async () => {
    for (const table of tables) {
      for (const operation of ["SELECT", "INSERT", "UPDATE", "DELETE"] as const) {
        const { rows } = await pool!.query<{ allowed: boolean }>(
          "SELECT has_table_privilege('service_role', $1, $2) AS allowed",
          [table, operation],
        );
        const expected = table === "audit_logs"
          ? operation === "INSERT"
          : table === "notifications"
            ? operation !== "UPDATE" && operation !== "DELETE"
            : table === "webhook_events"
              ? operation !== "UPDATE" && operation !== "DELETE"
              : true;
        expect(rows[0].allowed, `${table} ${operation}`).toBe(expected);
      }
    }
  });

  it("performs service-only writes through service_role and preserves append-only audit behavior", async () => {
    const client = await pool!.connect();
    const userId = "f1000000-0000-4000-8000-000000000001";
    const serviceProfileId = "f1000000-0000-4000-8000-000000000002";
    const subscriptionId = "f1000000-0000-4000-8000-000000000003";
    const paymentId = "f1000000-0000-4000-8000-000000000004";
    const badgeId = "f1000000-0000-4000-8000-000000000005";
    const quizId = "f1000000-0000-4000-8000-000000000006";
    const attemptId = "f1000000-0000-4000-8000-000000000007";
    try {
      await client.query("BEGIN");
      await client.query("INSERT INTO profiles (id, full_name) VALUES ($1, 'service fixture')", [userId]);
      await client.query(`INSERT INTO subscriptions (id, user_id, tier, status, razorpay_subscription_id, current_period_start, current_period_end)
        VALUES ($1, $2, 'essential', 'active', 'service-fixture-sub', now(), now() + interval '30 days')`, [subscriptionId, userId]);
      await client.query(`INSERT INTO payments (id, user_id, subscription_id, razorpay_payment_id, amount_inr, gst_amount_inr, status)
        VALUES ($1, $2, $3, 'service-fixture-payment', 1, 0, 'captured')`, [paymentId, userId, subscriptionId]);
      await client.query("INSERT INTO badges (id, code, name, description, icon_key, criteria) VALUES ($1, 'service-fixture-badge', 'Badge', 'Fixture', 'test', '{}'::jsonb)", [badgeId]);
      await client.query("INSERT INTO quizzes (id, slug, title, description, created_by) VALUES ($1, 'service-fixture-quiz', 'Quiz', 'Fixture', $2)", [quizId, userId]);
      await client.query(`INSERT INTO quiz_attempts (id, quiz_id, user_id, score, passed, answers, started_at, completed_at)
        VALUES ($1, $2, $3, 0, false, '{}'::jsonb, now(), now())`, [attemptId, quizId, userId]);

      await asRole(client, { role: "service_role", id: "" }, async () => {
        await client.query("INSERT INTO profiles (id, full_name) VALUES ($1, 'service write')", [serviceProfileId]);
        await client.query("UPDATE profiles SET full_name = 'service update' WHERE id = $1", [serviceProfileId]);
        await client.query("DELETE FROM profiles WHERE id = $1", [serviceProfileId]);

        await client.query(`INSERT INTO subscriptions (user_id, tier, status, razorpay_subscription_id, current_period_start, current_period_end)
          VALUES ($1, 'essential', 'pending', 'service-write-sub', now(), now() + interval '30 days')`, [userId]);
        await client.query("UPDATE subscriptions SET status = 'active' WHERE id = $1", [subscriptionId]);
        await client.query("DELETE FROM subscriptions WHERE razorpay_subscription_id = 'service-write-sub'");

        await client.query(`INSERT INTO payments (user_id, razorpay_payment_id, amount_inr, gst_amount_inr, status)
          VALUES ($1, 'service-write-payment', 1, 0, 'created')`, [userId]);
        await client.query("UPDATE payments SET status = 'captured' WHERE id = $1", [paymentId]);
        await client.query("DELETE FROM payments WHERE razorpay_payment_id = 'service-write-payment'");

        await client.query(`INSERT INTO refunds (payment_id, user_id, amount_inr, reason, requested_by)
          VALUES ($1, $2, 1, 'service probe', $2)`, [paymentId, userId]);
        await client.query("UPDATE refunds SET status = 'approved' WHERE payment_id = $1", [paymentId]);
        await client.query("DELETE FROM refunds WHERE payment_id = $1", [paymentId]);

        await client.query(`INSERT INTO invoices (invoice_number, user_id, subscription_id, payment_id, place_of_supply, taxable_value_inr, gst_rate, gst_amount_inr, total_amount_inr, description, pdf_path)
          VALUES ('AIQ/TEST/1', $1, $2, $3, 'MH', 1, 0, 0, 1, 'service probe', 'test.pdf')`, [userId, subscriptionId, paymentId]);
        await client.query("UPDATE invoices SET status = 'void' WHERE invoice_number = 'AIQ/TEST/1'");
        await client.query("DELETE FROM invoices WHERE invoice_number = 'AIQ/TEST/1'");

        await client.query("INSERT INTO webhook_events (razorpay_event_id, event_type, payload_hash) VALUES ('service-event', 'test.event', 'hash')");
        await expectPermissionDenied(client, "UPDATE webhook_events SET status = 'processed' WHERE razorpay_event_id = 'service-event'");
        await expectPermissionDenied(client, "DELETE FROM webhook_events WHERE razorpay_event_id = 'service-event'");

        await client.query("INSERT INTO notifications (user_id, type, title, body) VALUES ($1, 'account_created', 'Title', 'Body')", [userId]);
        await expectPermissionDenied(client, `UPDATE notifications SET read_at = now() WHERE user_id = '${userId}' AND title = 'Title'`);
        await expectPermissionDenied(client, `DELETE FROM notifications WHERE user_id = '${userId}' AND title = 'Title'`);

        await client.query("INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2)", [userId, badgeId]);
        await client.query("UPDATE user_badges SET awarded_at = now() WHERE user_id = $1 AND badge_id = $2", [userId, badgeId]);
        await client.query("DELETE FROM user_badges WHERE user_id = $1 AND badge_id = $2", [userId, badgeId]);

        await client.query("UPDATE quiz_attempts SET score = 1 WHERE id = $1", [attemptId]);
        await client.query("DELETE FROM quiz_attempts WHERE id = $1", [attemptId]);

        await client.query("INSERT INTO audit_logs (action, entity_type, entity_id) VALUES ('service_probe', 'test', 'entity')");
        await expectPermissionDenied(client, "UPDATE audit_logs SET action = 'changed' WHERE action = 'service_probe'");
        await expectPermissionDenied(client, "DELETE FROM audit_logs WHERE action = 'service_probe'");
      });
      await client.query("ROLLBACK");
    } finally {
      client.release();
    }
  });

  it("enforces profile column grants and self-only profile update", async () => {
    const client = await pool!.connect();
    try {
      await client.query("BEGIN");
      await client.query("INSERT INTO profiles (id, full_name) VALUES ($1, 'free')", [identities.free.id]);
      await client.query("INSERT INTO profiles (id, full_name) VALUES ($1, 'paid')", [identities.paid.id]);
      await client.query("INSERT INTO profiles (id, full_name, role) VALUES ($1, 'admin', 'admin')", [identities.admin.id]);
      await asRole(client, identities.free, async () => {
        const updated = await client.query("UPDATE profiles SET full_name = 'self updated' WHERE id = $1", [identities.free.id]);
        expect(updated.rowCount).toBe(1);
      });
      for (const identity of [identities.anon, identities.free, identities.paid, identities.expired, identities.admin]) {
        await asRole(client, identity, async () => {
          await expectPermissionDenied(client, `UPDATE profiles SET role = 'admin' WHERE id = '${identities.free.id}'`);
        });
      }
      await client.query("ROLLBACK");
    } finally { client.release(); }
  });

  it("enforces forum author-only 15-minute updates, excluding non-authors and admins", async () => {
    const client = await pool!.connect();
    const propertyId = "a1000000-0000-4000-8000-000000000001";
    const insideId = "a1000000-0000-4000-8000-000000000002";
    const outsideId = "a1000000-0000-4000-8000-000000000003";
    try {
      await client.query("BEGIN");
      await client.query("INSERT INTO profiles (id, full_name) VALUES ($1, 'paid')", [identities.paid.id]);
      await client.query("INSERT INTO profiles (id, full_name) VALUES ($1, 'free')", [identities.free.id]);
      await client.query("INSERT INTO profiles (id, full_name, role) VALUES ($1, 'admin', 'admin')", [identities.admin.id]);
      await client.query(`INSERT INTO subscriptions (user_id, tier, status, razorpay_subscription_id, current_period_start, current_period_end)
        VALUES ($1, 'premium', 'active', 'forum-window-sub', now(), now() + interval '30 days')`, [identities.paid.id]);
      await client.query(`INSERT INTO properties (id, reference_code, title, property_type, reserve_price_inr, general_location, created_by)
        VALUES ($1, 'FORUM-WINDOW', 'Forum fixture', 'residential_flat', 1, 'South Mumbai', $2)`, [propertyId, identities.admin.id]);
      await client.query(`INSERT INTO forum_posts (id, property_id, author_id, contribution_type, body, created_at)
        VALUES ($1, $2, $3, 'other', 'inside', now()), ($4, $2, $3, 'other', 'outside', now() - interval '16 minutes')`,
        [insideId, propertyId, identities.paid.id, outsideId]);

      await asRole(client, identities.paid, async () => {
        expect((await client.query("UPDATE forum_posts SET body = 'edited' WHERE id = $1", [insideId])).rowCount).toBe(1);
        expect((await client.query("UPDATE forum_posts SET body = 'edited' WHERE id = $1", [outsideId])).rowCount).toBe(0);
      });
      for (const identity of [identities.free, identities.admin]) {
        await asRole(client, identity, async () => {
          expect((await client.query("UPDATE forum_posts SET body = 'edited' WHERE id = $1", [insideId])).rowCount).toBe(0);
        });
      }
      await client.query("ROLLBACK");
    } finally { client.release(); }
  });

  it("allows self notification read_at updates and denies body/type changes", async () => {
    const client = await pool!.connect();
    try {
      await client.query("BEGIN");
      await client.query("INSERT INTO profiles (id, full_name) VALUES ($1, 'paid')", [identities.paid.id]);
      await client.query(`INSERT INTO subscriptions (user_id, tier, status, razorpay_subscription_id, current_period_start, current_period_end)
        VALUES ($1, 'essential', 'active', 'notification-sub', now(), now() + interval '30 days')`, [identities.paid.id]);
      await client.query("INSERT INTO notifications (user_id, type, title, body) VALUES ($1, 'account_created', 'Notice', 'Body')", [identities.paid.id]);
      await asRole(client, identities.paid, async () => {
        expect((await client.query("UPDATE notifications SET read_at = now() WHERE user_id = $1", [identities.paid.id])).rowCount).toBe(1);
        await expectPermissionDenied(client, `UPDATE notifications SET body = 'changed' WHERE user_id = '${identities.paid.id}'`);
        await expectPermissionDenied(client, `UPDATE notifications SET type = 'email_verified' WHERE user_id = '${identities.paid.id}'`);
      });
      await client.query("ROLLBACK");
    } finally { client.release(); }
  });

  it("runs SELECT as anon, free, paid, and admin across all 31 tables with deny-by-default", async () => {
    const client = await pool!.connect();
    try {
      await client.query("BEGIN");
      for (const [name, identity] of Object.entries(identities)) {
        await asRole(client, identity, async () => {
          for (const table of tables) {
            const shouldHaveGrant = name === "anon" ? anonSelect.has(table) : authSelect.has(table);
            if (!shouldHaveGrant) {
              await expectPermissionDenied(client, `SELECT * FROM public.${table} LIMIT 0`);
              continue;
            }
            const result = await client.query(`SELECT * FROM public.${table}`);
            // Random test identities have no records; an ungranted row must never appear.
            expect(result.rows, `${name} SELECT ${table}`).toHaveLength(0);
          }
        });
      }
      await client.query("ROLLBACK");
    } finally {
      client.release();
    }
  });

  it("denies direct SELECT on Class R property tables to all client roles", async () => {
    const client = await pool!.connect();
    try {
      await client.query("BEGIN");
      for (const identity of [identities.anon, identities.free, identities.paid, identities.expired, identities.admin]) {
        await asRole(client, identity, async () => {
          for (const table of ["properties", "property_photos", "property_documents"]) {
            await expectPermissionDenied(client, `SELECT * FROM public.${table}`);
          }
        });
      }
      await client.query("ROLLBACK");
    } finally {
      client.release();
    }
  });

  it("has and enforces the learning_progress XOR CHECK in PostgreSQL", async () => {
    const client = await pool!.connect();
    const userId = "d0000000-0000-4000-8000-000000000001";
    const articleId = "d0000000-0000-4000-8000-000000000002";
    const quizId = "d0000000-0000-4000-8000-000000000003";
    try {
      await client.query("BEGIN");
      await client.query("INSERT INTO profiles (id, full_name) VALUES ($1, 'check-test')", [userId]);
      await client.query(`INSERT INTO articles (id, slug, title, summary, body_markdown, category, created_by)
        VALUES ($1, 'xor-check-test', 'Check test', 'Check test', 'Check test', 'test', $2)`, [articleId, userId]);
      await client.query(`INSERT INTO quizzes (id, slug, title, description, created_by)
        VALUES ($1, 'xor-check-test', 'Check test', 'Check test', $2)`, [quizId, userId]);

      const constraint = await client.query<{ conname: string; definition: string }>(
        `SELECT conname, pg_get_constraintdef(oid) AS definition
         FROM pg_constraint
         WHERE conrelid = 'public.learning_progress'::regclass
           AND conname = 'learning_progress_exactly_one_target_check'`,
      );
      expect(constraint.rows).toHaveLength(1);
      expect(constraint.rows[0].definition).toContain("article_id IS NOT NULL");
      expect(constraint.rows[0].definition).toContain("quiz_id IS NOT NULL");

      async function expectCheckViolation(article: string | null, quiz: string | null) {
        await client.query("SAVEPOINT check_probe");
        try {
          await client.query(
            "INSERT INTO learning_progress (user_id, article_id, quiz_id) VALUES ($1, $2, $3)",
            [userId, article, quiz],
          );
          throw new Error("Expected PostgreSQL CHECK violation");
        } catch (error) {
          expect((error as { code?: string }).code).toBe("23514");
        } finally {
          await client.query("ROLLBACK TO SAVEPOINT check_probe");
          await client.query("RELEASE SAVEPOINT check_probe");
        }
      }

      await expectCheckViolation(null, null);
      await expectCheckViolation(articleId, quizId);
      await client.query(
        "INSERT INTO learning_progress (user_id, article_id) VALUES ($1, $2)", [userId, articleId],
      );
      await client.query(
        "INSERT INTO learning_progress (user_id, quiz_id) VALUES ($1, $2)", [userId, quizId],
      );
      await client.query("ROLLBACK");
    } finally {
      client.release();
    }
  });

  it("enforces anonymous session_id requirements for simulator and quiz inserts", async () => {
    const client = await pool!.connect();
    const quizId = "e0000000-0000-4000-8000-000000000001";
    try {
      await client.query("BEGIN");
      await client.query("INSERT INTO profiles (id, full_name) VALUES ($1, 'admin') ON CONFLICT DO NOTHING", [identities.admin.id]);
      await client.query(`INSERT INTO quizzes (id, slug, title, description, created_by)
        VALUES ($1, 'anonymous-session-test', 'Session test', 'Session test', $2)`, [quizId, identities.admin.id]);

      for (const [table, values] of [
        ["simulation_sessions", "(session_id, scenario_key, difficulty, budget_inr, outcome) VALUES ('rls-test-session', 'test', 'beginner', 1, 'test')"],
        ["quiz_attempts", "(quiz_id, session_id, score, passed, answers, started_at, completed_at) VALUES ('" + quizId + "', 'rls-test-session', 0, false, '{}'::jsonb, now(), now())"],
      ] as const) {
        await asRole(client, identities.anon, async () => {
          const withSession = await client.query(`INSERT INTO ${table} ${values}`);
          expect(withSession.rowCount).toBe(1);
          await client.query("SELECT set_config('request.session_id', '', true)");
          const withoutSession = table === "simulation_sessions"
            ? "(user_id, session_id, scenario_key, difficulty, budget_inr, outcome) VALUES (NULL, NULL, 'test', 'beginner', 1, 'test')"
            : `(quiz_id, user_id, session_id, score, passed, answers, started_at, completed_at) VALUES ('${quizId}', NULL, NULL, 0, false, '{}'::jsonb, now(), now())`;
          await expectRlsViolation(client, `INSERT INTO ${table} ${withoutSession}`);
        });
      }
      await client.query("ROLLBACK");
    } finally {
      client.release();
    }
  });

  it("applies property row policies for free, paid, and admin under a test-only SELECT grant", async () => {
    const client = await pool!.connect();
    const freeId = identities.free.id;
    const paidId = identities.paid.id;
    const adminId = identities.admin.id;
    const propertyId = "b0000000-0000-4000-8000-000000000004";
    try {
      await client.query("BEGIN");
      await client.query("INSERT INTO profiles (id, full_name) VALUES ($1, 'free'), ($2, 'paid'), ($3, 'admin')", [freeId, paidId, adminId]);
      await client.query("INSERT INTO profiles (id, full_name) VALUES ($1, 'expired')", [identities.expired.id]);
      await client.query("UPDATE profiles SET role = 'admin' WHERE id = $1", [adminId]);
      await client.query(`INSERT INTO subscriptions (user_id, tier, status, razorpay_subscription_id, current_period_start, current_period_end)
        VALUES ($1, 'premium', 'active', 'rls-paid-subscription', now(), now() + interval '30 days')`, [paidId]);
      await client.query(`INSERT INTO subscriptions (user_id, tier, status, razorpay_subscription_id, current_period_start, current_period_end)
        VALUES ($1, 'essential', 'expired', 'rls-expired-subscription', now() - interval '60 days', now() - interval '30 days')`, [identities.expired.id]);
      await client.query(`INSERT INTO properties (id, reference_code, title, property_type, reserve_price_inr, general_location, created_by)
        VALUES ($1, 'RLS-TEST', 'RLS test row', 'residential_flat', 1, 'South Mumbai', $2)`, [propertyId, adminId]);
      await client.query("INSERT INTO property_photos (property_id, storage_path) VALUES ($1, 'private/rls-test.jpg')", [propertyId]);
      await client.query("INSERT INTO property_documents (property_id, doc_type, storage_path, uploaded_by) VALUES ($1, 'test', 'private/rls-test.pdf', $2)", [propertyId, adminId]);
      await client.query("INSERT INTO property_risk_indicators (property_id, indicator, evidence_label, updated_by) VALUES ($1, 'possession', 'unknown', $2)", [propertyId, adminId]);
      const { rows: forumRows } = await client.query<{ id: string }>("INSERT INTO forum_posts (property_id, author_id, contribution_type, body) VALUES ($1, $2, 'other', 'private forum fixture') RETURNING id", [propertyId, paidId]);
      const postId = forumRows[0].id;
      const { rows: articleRows } = await client.query<{ id: string }>(`INSERT INTO articles (slug, title, summary, body_markdown, category, published_at, created_by)
        VALUES ('rls-property-article', 'Fixture', 'Fixture', 'Fixture', 'test', now(), $1) RETURNING id`, [adminId]);
      const { rows: quizRows } = await client.query<{ id: string }>(`INSERT INTO quizzes (slug, title, description, is_published, created_by)
        VALUES ('rls-property-quiz', 'Fixture', 'Fixture', true, $1) RETURNING id`, [adminId]);
      await client.query("INSERT INTO quiz_questions (quiz_id, question_text, options, correct_option_key) VALUES ($1, 'Question', '{}'::jsonb, 'a')", [quizRows[0].id]);
      await client.query("GRANT SELECT ON properties TO anon, authenticated");
      await client.query("GRANT SELECT ON property_photos TO anon, authenticated");

      for (const [identity, expected] of [
        [identities.anon, 0], [identities.free, 0],
        [identities.paid, 1], [identities.expired, 0], [identities.admin, 1],
      ] as const) {
        await asRole(client, identity, async () => {
          const properties = await client.query("SELECT id FROM properties WHERE id = $1", [propertyId]);
          const photos = await client.query("SELECT id FROM property_photos WHERE property_id = $1", [propertyId]);
          expect(properties.rows).toHaveLength(expected);
          expect(photos.rows).toHaveLength(expected);
          if (identity === identities.paid) {
            for (const table of ["property_risk_indicators", "forum_posts"]) {
              const result = await client.query(`SELECT id FROM ${table} WHERE property_id = $1`, [propertyId]);
              expect(result.rows).toHaveLength(1);
            }
          }
          if (identity === identities.expired) {
            for (const table of ["property_risk_indicators", "forum_posts"]) {
              const result = await client.query(`SELECT id FROM ${table} WHERE property_id = $1`, [propertyId]);
              expect(result.rows).toHaveLength(0);
            }
          }
          if (identity === identities.free) {
            for (const table of ["property_risk_indicators", "forum_posts"]) {
              const result = await client.query(`SELECT id FROM ${table} WHERE property_id = $1`, [propertyId]);
              expect(result.rows).toHaveLength(0);
            }
          }
          if (identity === identities.paid) {
            const inserts = [
              ["forum_posts", "(property_id, author_id, contribution_type, body) VALUES ($1, $2, 'other', 'paid insert')", [propertyId, paidId]],
              ["forum_votes", "(post_id, user_id) VALUES ($1, $2)", [postId, paidId]],
              ["forum_follows", "(user_id, property_id) VALUES ($1, $2)", [paidId, propertyId]],
              ["watchlists", "(user_id, property_id) VALUES ($1, $2)", [paidId, propertyId]],
              ["inspections", "(property_id, user_id, preferred_dates, consent_at) VALUES ($1, $2, '[]'::jsonb, now())", [propertyId, paidId]],
              ["advocate_enquiries", "(user_id, property_id, question, fee_disclosure, consent_at) VALUES ($1, $2, 'Question', '{}'::jsonb, now())", [paidId, propertyId]],
              ["property_enquiries", "(property_id, user_id, subject) VALUES ($1, $2, 'Subject')", [propertyId, paidId]],
              ["cost_calculations", "(user_id, inputs, outputs) VALUES ($1, '{}'::jsonb, '{}'::jsonb)", [paidId]],
              ["simulation_sessions", "(user_id, scenario_key, difficulty, budget_inr, outcome) VALUES ($1, 'test', 'beginner', 1, 'test')", [paidId]],
              ["quiz_attempts", "(quiz_id, user_id, score, passed, answers, started_at, completed_at) VALUES ($1, $2, 0, false, '{}'::jsonb, now(), now())", [quizRows[0].id, paidId]],
              ["learning_progress", "(user_id, article_id) VALUES ($1, $2)", [paidId, articleRows[0].id]],
            ] as const;
            for (const [table, values, params] of inserts) {
              const result = await client.query(`INSERT INTO ${table} ${values}`, [...params]);
              expect(result.rowCount, `${table} paid insert`).toBe(1);
            }
          }
          if (identity === identities.free || identity === identities.expired) {
            await expectRlsViolation(
              client,
              `INSERT INTO watchlists (user_id, property_id) VALUES ('${identity.id}', '${propertyId}')`,
            );
          }
        });
      }
      await client.query("ROLLBACK");
    } finally {
      client.release();
    }
  });
});
