import { describe, expect, it } from "vitest";
import { projectPropertyPublic } from "@/lib/projections/property";

const restrictedKeys = [
  "exact_location", "building_name", "society_name", "sale_notice",
  "document_reference", "document_path", "documents", "property_documents",
  "source_reference", "official_source_ref", "reported_dues_inr",
  "dues_verification_status", "possession_source", "created_by", "verified_by",
  "second_reviewer_id",
];
const publicFields = [
  "id", "reference_code", "title", "property_type", "configuration", "description",
  "carpet_area_sqft", "built_up_area_sqft", "reserve_price_inr", "auction_date",
  "auction_time", "general_location", "listing_status", "published_at",
];
const fixture = {
  ...Object.fromEntries(publicFields.map((key) => [key, "fixture"])),
  exact_location: "Flat 4B, Sea Breeze CHS, Colaba",
  building_name: "Sea Breeze CHS",
  society_name: "Sea Breeze",
  sale_notice: "Restricted sale notice fixture",
  document_reference: "document-ref-fixture",
  document_path: "private/documents/fixture.pdf",
  documents: [{ path: "private/documents/fixture.pdf" }],
  property_documents: [{ storage_path: "private/documents/fixture.pdf" }],
  source_reference: "https://bank.example.test/notice/42",
  official_source_ref: "SARFAESI-2026-0042",
  reported_dues_inr: 250000,
  dues_verification_status: "verified_source",
  possession_source: "bank_officer_email",
  created_by: "00000000-0000-4000-8000-000000000001",
  verified_by: "00000000-0000-4000-8000-000000000002",
  second_reviewer_id: "00000000-0000-4000-8000-000000000003",
};

function expectNoRestrictedKeys(value: unknown) {
  if (Array.isArray(value)) {
    for (const item of value) expectNoRestrictedKeys(item);
    return;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    for (const key of restrictedKeys) expect(keys).not.toContain(key);
    for (const nested of Object.values(value)) expectNoRestrictedKeys(nested);
  }
}

describe("public property projection and leak checks", () => {
  it("projection allowlists keys and omits restricted fixture keys", () => {
    const output = projectPropertyPublic(fixture);
    expect(Object.keys(output)).toEqual([
      "id", "reference_code", "title", "property_type", "configuration", "description",
      "carpet_area_sqft", "built_up_area_sqft", "reserve_price_inr", "auction_date",
      "auction_time", "general_location", "listing_status", "published_at",
    ]);
    expect(Object.keys(output)).not.toEqual(expect.arrayContaining(restrictedKeys));
  });

  it("L1: public property projection omits restricted keys from a populated fixture", () => {
    // M1 endpoint-contract check: the public API stub has no storage rows yet.
    // TODO(M2): replace with an HTTP-level test against seeded property data.
    expectNoRestrictedKeys(projectPropertyPublic(fixture));
  });

  it("L1b: free-tier property projection omits restricted keys from the same populated fixture", () => {
    // Free-tier public data uses projectPropertyPublic in M1, the same projection as anon.
    // TODO(M2): replace with an HTTP-level test against seeded property data.
    expectNoRestrictedKeys(projectPropertyPublic(fixture));
  });
});

describe("entitled property projections", () => {
  it("preserves the member row for an already-authorized caller", async () => {
    const { projectPropertyMember } = await import("@/lib/projections/property");
    expect(Object.keys(projectPropertyMember(fixture))).toEqual(Object.keys(fixture));
  });

  it("preserves the admin row for an already-authorized caller", async () => {
    const { projectPropertyAdmin } = await import("@/lib/projections/property");
    expect(Object.keys(projectPropertyAdmin(fixture))).toEqual(Object.keys(fixture));
  });
});
