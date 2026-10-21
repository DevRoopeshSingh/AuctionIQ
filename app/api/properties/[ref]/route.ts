import { projectPropertyPublic } from "@/lib/projections/property";

// M1 stub: property storage is not connected until later milestones.
export async function GET() {
  const row: Record<string, unknown> | null = null;
  return row
    ? Response.json({ data: projectPropertyPublic(row) })
    : Response.json({ error: "not_found" }, { status: 404 });
}
