export interface AuditEntry {
  actorId: string | null;
  actorRole: string | null;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  ip?: string | null;
  userAgent?: string | null;
}

export interface SqlExecutor {
  query<T extends Record<string, unknown> = Record<string, unknown>>(
    text: string,
    values?: unknown[],
  ): Promise<{ rows: T[] }>;
}

export async function writeAuditLog(executor: SqlExecutor, entry: AuditEntry) {
  const result = await executor.query<{
    id: string;
    actor_id: string | null;
    action: string;
    entity_type: string;
    entity_id: string;
    created_at: Date;
  }>(
    `INSERT INTO audit_logs (actor_id, actor_role, action, entity_type, entity_id, metadata, ip, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8)
     RETURNING id, actor_id, action, entity_type, entity_id, created_at`,
    [entry.actorId, entry.actorRole, entry.action, entry.entityType, entry.entityId,
      JSON.stringify(entry.metadata ?? {}), entry.ip ?? null, entry.userAgent ?? null],
  );
  return result.rows[0];
}
