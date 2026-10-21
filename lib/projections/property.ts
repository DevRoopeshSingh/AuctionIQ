export const PUBLIC_PROPERTY_FIELDS = [
  "id",
  "reference_code",
  "title",
  "property_type",
  "configuration",
  "description",
  "carpet_area_sqft",
  "built_up_area_sqft",
  "reserve_price_inr",
  "auction_date",
  "auction_time",
  "general_location",
  "listing_status",
  "published_at",
] as const;

export type PropertyProjectionRow = Record<string, unknown>;

export function projectPropertyPublic(row: PropertyProjectionRow) {
  return Object.fromEntries(
    PUBLIC_PROPERTY_FIELDS
      .filter((key) => Object.hasOwn(row, key))
      .map((key) => [key, row[key]]),
  );
}

export function projectPropertyMember(row: PropertyProjectionRow) {
  return { ...row };
}

export function projectPropertyAdmin(row: PropertyProjectionRow) {
  return { ...row };
}
