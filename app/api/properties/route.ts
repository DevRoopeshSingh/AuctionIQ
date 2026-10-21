import { projectPropertyPublic } from "@/lib/projections/property";

// M1 stub: property storage is not connected until later milestones.
// Keep the public response shape safe while returning no seeded records.
export async function GET(_request: Request) {
  // The authenticated and anonymous list stubs intentionally share this response.
  void _request.headers.get("authorization");
  const rows: Record<string, unknown>[] = [];
  return Response.json({ data: rows.map(projectPropertyPublic) });
}
