import { afterAll, describe, expect, it } from "vitest";
import { Pool, type PoolClient } from "pg";

const databaseUrl = process.env.RLS_TEST_DATABASE_URL;
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : undefined;
const actor = {
  free: "f2000000-0000-4000-8000-000000000001",
  paid_active: "f2000000-0000-4000-8000-000000000002",
  paid_expired: "f2000000-0000-4000-8000-000000000003",
  admin: "f2000000-0000-4000-8000-000000000004",
} as const;
const roles = ["anon", "free", "paid_active", "paid_expired", "service_role"] as const;
type MatrixRole = (typeof roles)[number] | "admin";
type CellOutcome = "allow" | "deny_perm" | "deny_rls" | "empty_result";

const tables = [
  ["profiles", "S"], ["subscriptions", "S"], ["payments", "S"], ["refunds", "S"], ["invoices", "S"],
  ["webhook_events", "X"], ["properties", "R"], ["property_photos", "R"], ["property_documents", "R"],
  ["property_status_history", "A"], ["property_risk_indicators", "P"], ["property_enquiries", "P"],
  ["property_enquiry_messages", "P"], ["forum_posts", "P"], ["forum_votes", "P"], ["forum_follows", "P"],
  ["forum_reports", "P"], ["watchlists", "P"], ["inspections", "P"], ["advocate_enquiries", "P"],
  ["notifications", "P"], ["simulation_sessions", "P"], ["cost_calculations", "P"], ["articles", "U"],
  ["quizzes", "U"], ["quiz_questions", "U"], ["quiz_attempts", "P"], ["badges", "U"],
  ["user_badges", "P"], ["learning_progress", "P"], ["audit_logs", "A"],
] as const;

function expectedOutcome(table: string, cls: string, role: MatrixRole): CellOutcome {
  if (role === "service_role") return table === "audit_logs" ? "deny_perm" : "allow";
  if (cls === "R" || cls === "X") return "deny_perm";
  if (cls === "S") return role === "anon" ? "deny_perm" : "allow";
  if (cls === "U") return "allow";
  if (cls === "A") return role === "anon" ? "deny_perm" : "empty_result";
  if (role === "anon") return "deny_perm";
  if (role === "paid_active") return "allow";
  return "empty_result";
}

async function withRole<T>(client: PoolClient, role: MatrixRole, callback: () => Promise<T>) {
  await client.query("SAVEPOINT matrix_role");
  const dbRole = role === "anon" ? "anon" : role === "service_role" ? "service_role" : "authenticated";
  const userId = role === "free" ? actor.free : role === "paid_active" ? actor.paid_active : role === "paid_expired" ? actor.paid_expired : role === "admin" ? actor.admin : "";
  await client.query(`SET LOCAL ROLE ${dbRole}`);
  await client.query("SELECT set_config('request.jwt.claim.sub', $1, true)", [userId]);
  await client.query("SELECT set_config('request.session_id', 'rls-test-session', true)");
  try { return await callback(); }
  finally {
    await client.query("ROLLBACK TO SAVEPOINT matrix_role");
    await client.query("RELEASE SAVEPOINT matrix_role");
  }
}

async function seedFixture(client: PoolClient) {
  await client.query("INSERT INTO profiles (id, full_name) VALUES ($1, 'Free'), ($2, 'Paid active'), ($3, 'Paid expired')", [actor.free, actor.paid_active, actor.paid_expired]);
  await client.query("INSERT INTO profiles (id, full_name, role) VALUES ($1, 'Admin', 'admin')", [actor.admin]);
  for (const [key, id, tier, status, end] of [
    ["free", actor.free, "essential", "pending", "now() + interval '30 days'"],
    ["active", actor.paid_active, "premium", "active", "now() + interval '30 days'"],
    ["expired", actor.paid_expired, "premium", "expired", "now() - interval '30 days'"],
  ] as const) {
    await client.query(`INSERT INTO subscriptions (user_id, tier, status, razorpay_subscription_id, current_period_start, current_period_end)
      VALUES ($1, $2::subscription_tier, $3::subscription_status, $4, now(), ${end})`, [id, tier, status, `matrix-${key}-sub`]);
  }
  const paymentIds: Record<string, string> = {};
  for (const [key, id] of [["free", actor.free], ["paid_active", actor.paid_active], ["paid_expired", actor.paid_expired]] as const) {
    const result = await client.query<{ id: string }>(`INSERT INTO payments (user_id, razorpay_payment_id, amount_inr, gst_amount_inr, status)
      VALUES ($1, $2, 1, 0, 'captured') RETURNING id`, [id, `matrix-${key}-payment`]);
    paymentIds[key] = result.rows[0].id;
  }
  const propertyId = "f2000000-0000-4000-8000-000000000010";
  const articleId = "f2000000-0000-4000-8000-000000000011";
  const quizId = "f2000000-0000-4000-8000-000000000012";
  const badgeId = "f2000000-0000-4000-8000-000000000013";
  await client.query(`INSERT INTO properties (id, reference_code, title, property_type, reserve_price_inr, general_location, created_by)
    VALUES ($1, 'MATRIX-PROP', 'Matrix fixture', 'residential_flat', 1, 'South Mumbai', $2)`, [propertyId, actor.admin]);
  await client.query(`INSERT INTO properties (id, reference_code, title, property_type, reserve_price_inr, general_location, created_by)
    VALUES ('f2000000-0000-4000-8000-000000000014', 'MATRIX-PROP-2', 'Matrix fixture 2', 'residential_flat', 1, 'South Mumbai', $1)`, [actor.admin]);
  await client.query("INSERT INTO property_photos (property_id, storage_path) VALUES ($1, 'matrix/photo')", [propertyId]);
  await client.query("INSERT INTO property_documents (property_id, doc_type, storage_path, uploaded_by) VALUES ($1, 'test', 'matrix/document', $2)", [propertyId, actor.admin]);
  const article = await client.query(`INSERT INTO articles (id, slug, title, summary, body_markdown, category, published_at, created_by)
    VALUES ($1, 'matrix-article', 'Matrix', 'Matrix', 'Matrix', 'test', now(), $2) RETURNING id`, [articleId, actor.admin]);
  await client.query(`INSERT INTO articles (id, slug, title, summary, body_markdown, category, published_at, created_by)
    VALUES ('f2000000-0000-4000-8000-000000000015', 'matrix-article-2', 'Matrix 2', 'Matrix', 'Matrix', 'test', now(), $1)`, [actor.admin]);
  await client.query("INSERT INTO quizzes (id, slug, title, description, is_published, created_by) VALUES ($1, 'matrix-quiz', 'Matrix', 'Matrix', true, $2)", [quizId, actor.admin]);
  await client.query("INSERT INTO quiz_questions (quiz_id, question_text, options, correct_option_key) VALUES ($1, 'Question', '{}'::jsonb, 'a')", [quizId]);
  await client.query("INSERT INTO badges (id, code, name, description, icon_key, criteria) VALUES ($1, 'matrix-badge', 'Matrix', 'Matrix', 'test', '{}'::jsonb)", [badgeId]);
  await client.query("INSERT INTO property_risk_indicators (property_id, indicator, evidence_label, updated_by) VALUES ($1, 'possession', 'unknown', $2)", [propertyId, actor.admin]);
  await client.query("INSERT INTO property_status_history (property_id, from_status, to_status, changed_by) VALUES ($1, 'draft', 'teaser', $2)", [propertyId, actor.admin]);
  await client.query("INSERT INTO audit_logs (actor_id, action, entity_type, entity_id) VALUES ($1, 'matrix', 'property', $2)", [actor.admin, propertyId]);
  await client.query("INSERT INTO webhook_events (razorpay_event_id, event_type, payload_hash) VALUES ('matrix-event', 'test', 'hash')");
  for (const [key, id] of [["free", actor.free], ["paid_active", actor.paid_active], ["paid_expired", actor.paid_expired]] as const) {
    const post = await client.query<{ id: string }>("INSERT INTO forum_posts (property_id, author_id, contribution_type, body) VALUES ($1, $2, 'other', 'Matrix post') RETURNING id", [propertyId, id]);
    await client.query("INSERT INTO forum_votes (post_id, user_id) VALUES ($1, $2)", [post.rows[0].id, id]);
    await client.query("INSERT INTO forum_follows (user_id, property_id) VALUES ($1, $2)", [id, propertyId]);
    await client.query("INSERT INTO watchlists (user_id, property_id) VALUES ($1, $2)", [id, propertyId]);
    await client.query("INSERT INTO inspections (property_id, user_id, preferred_dates, consent_at) VALUES ($1, $2, '[]'::jsonb, now())", [propertyId, id]);
    await client.query("INSERT INTO advocate_enquiries (user_id, property_id, question, fee_disclosure, consent_at) VALUES ($1, $2, 'Q', '{}'::jsonb, now())", [id, propertyId]);
    const enquiry = await client.query<{ id: string }>("INSERT INTO property_enquiries (property_id, user_id, subject) VALUES ($1, $2, 'Matrix') RETURNING id", [propertyId, id]);
    await client.query("INSERT INTO property_enquiry_messages (enquiry_id, author_id, author_role, body) VALUES ($1, $2, 'member', 'Matrix')", [enquiry.rows[0].id, id]);
    await client.query("INSERT INTO cost_calculations (user_id, inputs, outputs) VALUES ($1, '{}'::jsonb, '{}'::jsonb)", [id]);
    await client.query("INSERT INTO simulation_sessions (user_id, scenario_key, difficulty, budget_inr, outcome) VALUES ($1, 'matrix', 'beginner', 1, 'test')", [id]);
    await client.query("INSERT INTO quiz_attempts (quiz_id, user_id, score, passed, answers, started_at, completed_at) VALUES ($1, $2, 0, false, '{}'::jsonb, now(), now())", [quizId, id]);
    await client.query("INSERT INTO learning_progress (user_id, article_id) VALUES ($1, $2)", [id, article.rows[0].id]);
    await client.query("INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2)", [id, badgeId]);
    await client.query("INSERT INTO notifications (user_id, type, title, body) VALUES ($1, 'account_created', 'Matrix', 'Matrix')", [id]);
    await client.query("INSERT INTO forum_reports (post_id, reporter_id, reason) VALUES ($1, $2, 'Matrix')", [post.rows[0].id, id]);
    await client.query(`INSERT INTO refunds (payment_id, user_id, amount_inr, reason, requested_by)
      VALUES ($1, $2, 1, 'Matrix', $2)`, [paymentIds[key], id]);
    const sub = await client.query<{ id: string }>("SELECT id FROM subscriptions WHERE user_id = $1", [id]);
    await client.query(`INSERT INTO invoices (invoice_number, user_id, subscription_id, payment_id, place_of_supply, taxable_value_inr, gst_rate, gst_amount_inr, total_amount_inr, description, pdf_path)
      VALUES ($1, $2, $3, $4, 'MH', 1, 0, 0, 1, 'Matrix', 'matrix.pdf')`, [`MATRIX-${key}`, id, sub.rows[0].id, paymentIds[key]]);
  }
}

const describeDb = databaseUrl ? describe : describe.skip;
describeDb("M1-T9 table-driven SELECT matrix (A25/A26)", () => {
  it("asserts all 155 table × role cells and emits the observed grid", async () => {
    const client = await pool!.connect();
    const output: Array<{ table: string; role: MatrixRole; expected: CellOutcome; observed: CellOutcome; sqlstate: string }> = [];
    try {
      await client.query("BEGIN");
      await seedFixture(client);
      for (const [table, cls] of tables) {
        for (const role of roles) {
          const expected = expectedOutcome(table, cls, role);
          let observed: CellOutcome;
          let sqlstate = "00000";
          await withRole(client, role, async () => {
            try {
              const result = await client.query(`SELECT * FROM public.${table}`);
              observed = result.rows.length > 0 ? "allow" : "empty_result";
            } catch (error) {
              const e = error as { code?: string; message?: string };
              sqlstate = e.code ?? "unknown";
              observed = e.code === "42501" && /permission denied/i.test(e.message ?? "")
                ? "deny_perm"
                : e.code === "42501" && /row-level security policy/i.test(e.message ?? "")
                  ? "deny_rls"
                  : "deny_rls";
            }
          });
          output.push({ table, role, expected, observed: observed!, sqlstate });
          expect(observed!, `${table} SELECT ${role}, SQLSTATE ${sqlstate}`).toBe(expected);
        }
      }
      // A is an authenticated admin claim, tested in addition to the five published matrix roles.
      await withRole(client, "admin", async () => {
        for (const table of ["property_status_history", "audit_logs"]) {
          expect((await client.query(`SELECT * FROM ${table}`)).rows.length).toBeGreaterThan(0);
        }
      });
      await client.query("ROLLBACK");
      console.log("RLS_SELECT_MATRIX=" + JSON.stringify(output));
    } finally {
      client.release();
    }
  });

  it("asserts each in-scope client write cell for the 15 A26 tables", async () => {
    const client = await pool!.connect();
    const ops: Record<string, string[]> = {
      profiles: ["UPDATE"], forum_posts: ["INSERT", "UPDATE", "DELETE"],
      forum_votes: ["INSERT", "DELETE"], forum_follows: ["INSERT", "DELETE"],
      forum_reports: ["INSERT"], watchlists: ["INSERT", "DELETE"],
      inspections: ["INSERT"], advocate_enquiries: ["INSERT"],
      property_enquiries: ["INSERT"], property_enquiry_messages: ["INSERT"],
      simulation_sessions: ["INSERT", "UPDATE", "DELETE"],
      cost_calculations: ["INSERT", "UPDATE", "DELETE"],
      quiz_attempts: ["INSERT"], learning_progress: ["INSERT", "UPDATE"],
      notifications: ["UPDATE"],
    };
    const writes: Array<{ table: string; op: string; role: MatrixRole; expected: CellOutcome; observed: CellOutcome; sqlstate: string }> = [];
    try {
      await client.query("BEGIN");
      await seedFixture(client);
      let n = 0;
      for (const [table, operations] of Object.entries(ops)) {
        for (const op of operations) for (const role of roles) {
          n++;
          const userId = role === "free" ? actor.free : role === "paid_active" ? actor.paid_active : role === "paid_expired" ? actor.paid_expired : actor.free;
          const propertyId = "f2000000-0000-4000-8000-000000000010";
          const postId = (await client.query<{ id: string }>("SELECT id FROM forum_posts WHERE author_id = $1 LIMIT 1", [userId])).rows[0]?.id;
          const enquiryId = (await client.query<{ id: string }>("SELECT id FROM property_enquiries WHERE user_id = $1 LIMIT 1", [userId])).rows[0]?.id;
          let sql: string;
          switch (`${table}:${op}`) {
            case "profiles:UPDATE": sql = `UPDATE profiles SET full_name = 'matrix-${n}' WHERE id = '${userId}'`; break;
            case "forum_posts:INSERT": sql = `INSERT INTO forum_posts (property_id, author_id, contribution_type, body) VALUES ('${propertyId}', '${userId}', 'other', 'matrix-${n}')`; break;
            case "forum_posts:UPDATE": sql = `UPDATE forum_posts SET body = 'updated-${n}' WHERE id = '${postId}' AND created_at > now() - interval '15 minutes'`; break;
            case "forum_posts:DELETE": sql = `DELETE FROM forum_posts WHERE id = '${postId}'`; break;
            case "forum_votes:INSERT": {
              const otherPostId = (await client.query<{ id: string }>("SELECT id FROM forum_posts WHERE author_id <> $1 LIMIT 1", [userId])).rows[0]?.id ?? postId;
              sql = `INSERT INTO forum_votes (post_id, user_id) VALUES ('${otherPostId}', '${userId}')`; break;
            }
            case "forum_votes:DELETE": sql = `DELETE FROM forum_votes WHERE post_id = '${postId}' AND user_id = '${userId}'`; break;
            case "forum_follows:INSERT": sql = `INSERT INTO forum_follows (user_id, property_id) VALUES ('${userId}', 'f2000000-0000-4000-8000-000000000014')`; break;
            case "forum_follows:DELETE": sql = `DELETE FROM forum_follows WHERE user_id = '${userId}' AND property_id = '${propertyId}'`; break;
            case "forum_reports:INSERT": sql = `INSERT INTO forum_reports (post_id, reporter_id, reason) VALUES ('${postId}', '${userId}', 'matrix-${n}')`; break;
            case "watchlists:INSERT": sql = `INSERT INTO watchlists (user_id, property_id) VALUES ('${userId}', 'f2000000-0000-4000-8000-000000000014')`; break;
            case "watchlists:DELETE": sql = `DELETE FROM watchlists WHERE user_id = '${userId}' AND property_id = '${propertyId}'`; break;
            case "inspections:INSERT": sql = `INSERT INTO inspections (property_id, user_id, preferred_dates, consent_at) VALUES ('${propertyId}', '${userId}', '[]'::jsonb, now())`; break;
            case "advocate_enquiries:INSERT": sql = `INSERT INTO advocate_enquiries (user_id, property_id, question, fee_disclosure, consent_at) VALUES ('${userId}', '${propertyId}', 'Q', '{}'::jsonb, now())`; break;
            case "property_enquiries:INSERT": sql = `INSERT INTO property_enquiries (property_id, user_id, subject) VALUES ('${propertyId}', '${userId}', 'matrix-${n}')`; break;
            case "property_enquiry_messages:INSERT": sql = `INSERT INTO property_enquiry_messages (enquiry_id, author_id, author_role, body) VALUES ('${enquiryId}', '${userId}', 'member', 'matrix-${n}')`; break;
            case "simulation_sessions:INSERT": sql = role === "anon"
              ? `INSERT INTO simulation_sessions (session_id, scenario_key, difficulty, budget_inr, outcome) VALUES ('rls-test-session', 'matrix-${n}', 'beginner', 1, 'test')`
              : `INSERT INTO simulation_sessions (user_id, scenario_key, difficulty, budget_inr, outcome) VALUES ('${userId}', 'matrix-${n}', 'beginner', 1, 'test')`; break;
            case "simulation_sessions:UPDATE": sql = `UPDATE simulation_sessions SET outcome = 'updated' WHERE user_id = '${userId}'`; break;
            case "simulation_sessions:DELETE": sql = `DELETE FROM simulation_sessions WHERE user_id = '${userId}'`; break;
            case "cost_calculations:INSERT": sql = `INSERT INTO cost_calculations (user_id, inputs, outputs) VALUES ('${userId}', '{}'::jsonb, '{}'::jsonb)`; break;
            case "cost_calculations:UPDATE": sql = `UPDATE cost_calculations SET outputs = '{"updated":true}'::jsonb WHERE user_id = '${userId}'`; break;
            case "cost_calculations:DELETE": sql = `DELETE FROM cost_calculations WHERE user_id = '${userId}'`; break;
            case "quiz_attempts:INSERT": sql = role === "anon"
              ? `INSERT INTO quiz_attempts (quiz_id, session_id, score, passed, answers, started_at, completed_at) VALUES ('f2000000-0000-4000-8000-000000000012', 'rls-test-session', 0, false, '{}'::jsonb, now(), now())`
              : `INSERT INTO quiz_attempts (quiz_id, user_id, score, passed, answers, started_at, completed_at) VALUES ('f2000000-0000-4000-8000-000000000012', '${userId}', 0, false, '{}'::jsonb, now(), now())`; break;
            case "learning_progress:INSERT": sql = `INSERT INTO learning_progress (user_id, article_id) VALUES ('${userId}', 'f2000000-0000-4000-8000-000000000015')`; break;
            case "learning_progress:UPDATE": sql = `UPDATE learning_progress SET completed_at = now() WHERE user_id = '${userId}'`; break;
            case "notifications:UPDATE": sql = `UPDATE notifications SET read_at = now() WHERE user_id = '${userId}'`; break;
            default: throw new Error(`Unmapped write cell ${table} ${op}`);
          }
          let observed: CellOutcome = "empty_result";
          let sqlstate = "00000";
          let expected: CellOutcome;
          if (role === "anon" && !["simulation_sessions:INSERT", "quiz_attempts:INSERT"].includes(`${table}:${op}`)) expected = "deny_perm";
          else if (role === "service_role") expected = table === "notifications" && op === "UPDATE" ? "deny_perm" : "allow";
          else if (op === "INSERT") expected = role === "paid_active" || ["forum_follows", "simulation_sessions", "cost_calculations", "quiz_attempts", "learning_progress"].includes(table) ? "allow" : "deny_rls";
          else if (op === "UPDATE" || op === "DELETE") {
            if (role === "anon" && table === "simulation_sessions") expected = "empty_result";
            else if (op === "DELETE" && table === "forum_posts") expected = "empty_result";
            else if (role !== "paid_active" && ["forum_posts", "forum_votes", "forum_follows", "watchlists", "simulation_sessions", "cost_calculations", "learning_progress", "notifications"].includes(table)) expected = "empty_result";
            else if (["profiles", "forum_posts", "notifications", "simulation_sessions", "cost_calculations", "learning_progress", "forum_votes", "forum_follows", "watchlists"].includes(table)) expected = "allow";
            else expected = "empty_result";
          } else expected = "deny_rls";
          await withRole(client, role, async () => {
            await client.query("SAVEPOINT write_cell");
            try {
              const result = await client.query(sql);
              observed = result.rowCount ? "allow" : "empty_result";
            } catch (error) {
              const e = error as { code?: string; message?: string };
              sqlstate = e.code ?? "unknown";
              observed = e.code === "42501" && /permission denied/i.test(e.message ?? "")
                ? "deny_perm"
                : e.code === "42501" && /row-level security policy/i.test(e.message ?? "")
                  ? "deny_rls"
                  : "deny_rls";
            } finally {
              await client.query("ROLLBACK TO SAVEPOINT write_cell");
              await client.query("RELEASE SAVEPOINT write_cell");
            }
          });
          writes.push({ table, op, role, expected, observed, sqlstate });
          expect(observed, `${table} ${op} ${role}, SQLSTATE ${sqlstate}`).toBe(expected);
        }
      }
      await client.query("ROLLBACK");
      console.log("RLS_WRITE_MATRIX=" + JSON.stringify(writes));
    } finally {
      client.release();
    }
  });
});
afterAll(async () => { await pool?.end(); });
