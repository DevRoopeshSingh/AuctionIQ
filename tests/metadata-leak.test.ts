import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { siteMetadata as metadata } from "@/lib/site-metadata";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

const restrictedKeys = [
  "exact_location", "building_name", "society_name", "sale_notice",
  "document_reference", "document_path", "documents", "property_documents",
];

function assertNoRestrictedNames(content: string) {
  for (const key of restrictedKeys) expect(content.toLowerCase()).not.toContain(key);
}

function collectHtml(directory: string): string[] {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectHtml(file);
    return entry.isFile() && entry.name.endsWith(".html") ? [readFileSync(file, "utf8")] : [];
  });
}

describe("L5/L6 metadata leak checks", () => {
  it("L5: sitemap, robots, meta, and JSON-LD contain no restricted keys", () => {
    assertNoRestrictedNames(JSON.stringify({ sitemap: sitemap(), robots: robots(), metadata }));
    const htmlFiles = collectHtml(path.join(process.cwd(), ".next/server/app"));
    expect(htmlFiles.length).toBeGreaterThan(0);
    for (const html of htmlFiles) {
      assertNoRestrictedNames(html);
      const jsonLdBlocks = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi) ?? [];
      for (const block of jsonLdBlocks) assertNoRestrictedNames(block);
    }
  });

  it("L6: Open Graph and meta tags contain no restricted keys", () => {
    assertNoRestrictedNames(JSON.stringify(metadata.openGraph ?? {}));
    const htmlFiles = collectHtml(path.join(process.cwd(), ".next/server/app"));
    expect(htmlFiles.length).toBeGreaterThan(0);
    for (const html of htmlFiles) {
      const metaAndOg = html.match(/<meta\b[^>]*>/gi) ?? [];
      for (const tag of metaAndOg) assertNoRestrictedNames(tag);
    }
  });
});
