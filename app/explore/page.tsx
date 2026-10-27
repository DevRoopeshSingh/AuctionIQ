"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/primitives";
import { LISTED_PROPERTIES, type PropertyListing } from "@/lib/properties/data";
import { DueDiligenceModal } from "@/components/properties/due-diligence-modal";
import {
  InspectionArrangementModal,
  type PropertyInspectionDetails,
} from "@/components/inspections/inspection-arrangement-modal";
import { PropertyMapView } from "@/components/maps/property-map-view";
import {
  List,
  LayoutGrid,
  Map,
  Search,
  X,
  Landmark,
  MapPin,
  Maximize2,
  Building,
  Calendar,
  KeyRound,
  Coins,
} from "lucide-react";

type ViewMode = "list" | "grid" | "map";
type PriceFilter = "all" | "under-50l" | "50l-1cr" | "1cr-3cr" | "above-3cr";
type SortOption = "newest" | "price-asc" | "price-desc";

export default function ExplorePage() {
  const router = useRouter();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedPrice, setSelectedPrice] = useState<PriceFilter>("all");
  const [selectedPossession, setSelectedPossession] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Modals state
  const [activeDueDiligenceProp, setActiveDueDiligenceProp] = useState<PropertyListing | null>(null);
  const [activeInspectionProp, setActiveInspectionProp] = useState<PropertyInspectionDetails | null>(null);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCity("All");
    setSelectedType("All");
    setSelectedPrice("all");
    setSelectedPossession("All");
    setSortBy("newest");
  };

  // Filter properties reactively
  const filteredProperties = useMemo(() => {
    let list = LISTED_PROPERTIES.filter((prop) => {
      // Text Search
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        query === "" ||
        prop.title.toLowerCase().includes(query) ||
        prop.area.toLowerCase().includes(query) ||
        prop.subLocality.toLowerCase().includes(query) ||
        prop.ref.toLowerCase().includes(query) ||
        prop.bankName.toLowerCase().includes(query) ||
        prop.unitConfig.toLowerCase().includes(query);

      // City filter
      const matchesCity = selectedCity === "All" || prop.city === selectedCity;

      // Property type filter
      const matchesType = selectedType === "All" || prop.type === selectedType;

      // Price filter
      let matchesPrice = true;
      if (selectedPrice === "under-50l") matchesPrice = prop.reservePriceInr < 5000000;
      else if (selectedPrice === "50l-1cr") matchesPrice = prop.reservePriceInr >= 5000000 && prop.reservePriceInr <= 10000000;
      else if (selectedPrice === "1cr-3cr") matchesPrice = prop.reservePriceInr > 10000000 && prop.reservePriceInr <= 30000000;
      else if (selectedPrice === "above-3cr") matchesPrice = prop.reservePriceInr > 30000000;

      // Possession filter
      let matchesPossession = true;
      if (selectedPossession === "physical") matchesPossession = prop.possessionStatus === "Physical Possession Delivered";
      else if (selectedPossession === "symbolic") matchesPossession = prop.possessionStatus === "Symbolic Possession";

      return matchesSearch && matchesCity && matchesType && matchesPrice && matchesPossession;
    });

    // Sorting
    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.reservePriceInr - b.reservePriceInr);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.reservePriceInr - a.reservePriceInr);
    }

    return list;
  }, [searchQuery, selectedCity, selectedType, selectedPrice, selectedPossession, sortBy]);

  const handleOpenInspection = (prop: PropertyListing, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveInspectionProp({
      ref: prop.ref,
      title: prop.title,
      area: prop.area,
      carpet: `${prop.carpetAreaSqFt} sq.ft`,
      reserve: prop.reservePriceDisplay,
      statutoryDate: prop.statutoryInspectionDates,
      possession: prop.possessionStatus,
      smartDoorDevice: prop.smartDoorDevice,
    });
  };

  const handleOpenFinance = (prop: PropertyListing, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    router.push(`/finance?property=${encodeURIComponent(prop.ref)}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* 1. Page Header (Clean, Light, Simple & Elegant) */}
      <div className="flex flex-col justify-between gap-4 border-b border-charcoal/10 pb-6 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2">
            <Badge tone="warning">Curated Bank Auctions</Badge>
            <span className="text-xs text-charcoal/60">Verified SARFAESI &amp; DRT Notices</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Explore Auction Properties
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-charcoal/75">
            Discover verified bank auction opportunities across Mumbai, Navi Mumbai, Bengaluru, and Hyderabad. Every listing includes verified title and encumbrance checks, circle rate market comparisons, bid ceiling planning, and SmartDoor digital inspection access.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 rounded-lg border border-charcoal/20 bg-white p-1 text-xs font-semibold shadow-xs">
          <button
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors ${
              viewMode === "list" ? "bg-navy text-white shadow-xs" : "text-charcoal/70 hover:text-navy"
            }`}
            onClick={() => setViewMode("list")}
            type="button"
          >
            <List className="h-3.5 w-3.5" />
            <span>Simple List</span>
          </button>
          <button
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors ${
              viewMode === "grid" ? "bg-navy text-white shadow-xs" : "text-charcoal/70 hover:text-navy"
            }`}
            onClick={() => setViewMode("grid")}
            type="button"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Grid Cards</span>
          </button>
          <button
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors ${
              viewMode === "map" ? "bg-navy text-white shadow-xs" : "text-charcoal/70 hover:text-navy"
            }`}
            onClick={() => setViewMode("map")}
            type="button"
          >
            <Map className="h-3.5 w-3.5" />
            <span>Google Map</span>
          </button>
        </div>
      </div>

      {/* 2. Search Bar & Clean Filter Controls */}
      <div className="my-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-charcoal/45">
            <Search className="h-4 w-4" />
          </span>
          <input
            className="w-full rounded-xl border border-charcoal/25 bg-white py-3 pl-10 pr-10 text-sm text-navy placeholder:text-charcoal/50 shadow-xs transition-all focus:border-navy focus:outline-none focus:ring-2 focus:ring-gold/40"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by locality (Worli, Nariman Point, BKC, Yelahanka, Peerzadiguda), property ref (BOM-WOR-042), or bank name..."
            type="text"
            value={searchQuery}
          />
          {searchQuery && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs text-charcoal/40 hover:text-charcoal"
              onClick={() => setSearchQuery("")}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Quick Locality Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-charcoal/60 mr-1">City:</span>
          {["All", "Mumbai", "Navi Mumbai", "Bengaluru", "Hyderabad"].map((city) => (
            <button
              className={`rounded-full px-3 py-1 transition-all ${
                selectedCity === city
                  ? "bg-navy font-bold text-white shadow-xs"
                  : "bg-white border border-charcoal/15 text-charcoal/75 hover:border-charcoal/30"
              }`}
              key={city}
              onClick={() => setSelectedCity(city)}
              type="button"
            >
              {city}
            </button>
          ))}
        </div>

        {/* Unified Filter Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-charcoal/15 bg-white p-3 text-xs shadow-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Property Type Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-charcoal/60">Type:</span>
              <select
                className="rounded-md border border-charcoal/20 bg-ivory/50 px-2.5 py-1 text-xs text-navy font-medium focus:outline-none"
                onChange={(e) => setSelectedType(e.target.value)}
                value={selectedType}
              >
                <option value="All">All Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land / Plot</option>
              </select>
            </div>

            {/* Price Filter Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-charcoal/60">Budget:</span>
              <select
                className="rounded-md border border-charcoal/20 bg-ivory/50 px-2.5 py-1 text-xs text-navy font-medium focus:outline-none"
                onChange={(e) => setSelectedPrice(e.target.value as PriceFilter)}
                value={selectedPrice}
              >
                <option value="all">All Budgets</option>
                <option value="under-50l">Under ₹50 Lakhs</option>
                <option value="50l-1cr">₹50 Lakhs – ₹1 Crore</option>
                <option value="1cr-3cr">₹1 Crore – ₹3 Crores</option>
                <option value="above-3cr">Above ₹3 Crores</option>
              </select>
            </div>

            {/* Possession Status */}
            <div className="flex items-center gap-1.5">
              <span className="text-charcoal/60">Possession:</span>
              <select
                className="rounded-md border border-charcoal/20 bg-ivory/50 px-2.5 py-1 text-xs text-navy font-medium focus:outline-none"
                onChange={(e) => setSelectedPossession(e.target.value)}
                value={selectedPossession}
              >
                <option value="All">All Statuses</option>
                <option value="physical">Physical Possession (Move-in ready)</option>
                <option value="symbolic">Symbolic Possession (Assisted)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-charcoal/60">Sort:</span>
              <select
                className="rounded-md border border-charcoal/20 bg-ivory/50 px-2.5 py-1 text-xs text-navy font-medium focus:outline-none"
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                value={sortBy}
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Result Count & Reset */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-charcoal/80">
              Showing {filteredProperties.length} of {LISTED_PROPERTIES.length} verified listings
            </span>
            {(selectedCity !== "All" || selectedType !== "All" || selectedPrice !== "all" || selectedPossession !== "All" || searchQuery) && (
              <button
                className="font-bold text-[#C5A059] hover:underline"
                onClick={handleResetFilters}
                type="button"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Empty State */}
      {filteredProperties.length === 0 && (
        <div className="rounded-2xl border border-dashed border-charcoal/25 bg-white p-12 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-navy/10 text-navy">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="mt-3 font-display text-lg font-bold text-navy">
            No properties found matching your filter criteria
          </h3>
          <p className="mt-1 text-xs text-charcoal/65">
            Try resetting your budget or selecting a different city.
          </p>
          <button
            className="mt-4 rounded-md bg-navy px-4 py-2 text-xs font-semibold text-white shadow hover:bg-navy/90"
            onClick={handleResetFilters}
            type="button"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* 4. LIST VIEW (Default Simple & User-Friendly Format) */}
      {viewMode === "list" && filteredProperties.length > 0 && (
        <div className="space-y-4">
          {filteredProperties.map((prop) => {
            const isPhysical = prop.possessionStatus === "Physical Possession Delivered";

            return (
              <div
                className="flex flex-col justify-between gap-4 rounded-2xl border border-charcoal/15 bg-white p-5 shadow-xs transition-all hover:border-[#C5A059] hover:shadow-md lg:flex-row lg:items-center"
                key={prop.ref}
              >
                {/* Left Column: Property Info */}
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-navy/10 px-2 py-0.5 font-mono text-[11px] font-bold text-navy">
                      {prop.ref}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-charcoal/5 px-2 py-0.5 text-[11px] font-medium text-charcoal/80">
                      <Landmark className="h-3 w-3 text-[#C5A059]" />
                      <span>{prop.bankName}</span>
                    </span>
                    <span className="rounded bg-gold/15 px-2 py-0.5 text-[11px] font-bold text-[#9b7b37]">
                      {prop.noticeType}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-navy">
                    {prop.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal/70">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3 text-[#C5A059]" /> {prop.subLocality}, {prop.city}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1"><Maximize2 className="h-3 w-3 text-[#C5A059]" /> {prop.carpetAreaSqFt} sq.ft carpet</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1"><Building className="h-3 w-3 text-[#C5A059]" /> {prop.unitConfig}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3 text-[#C5A059]" /> Auction: {prop.auctionDate}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    {isPhysical ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Move-in ready (Physical Possession)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Occupied — we assist (Symbolic Possession)
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1.5 text-[11px] text-charcoal/65">
                      <KeyRound className="h-3 w-3 text-[#C5A059]" />
                      <span>SmartDoor Device:</span>
                      <span className="font-mono font-medium text-navy">{prop.smartDoorDevice}</span>
                    </span>
                  </div>
                </div>

                {/* Right Column: Pricing & Action Buttons */}
                <div className="flex flex-col justify-between gap-3 border-t border-charcoal/10 pt-3 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0 shrink-0 lg:text-right">
                  <div>
                    <span className="text-[11px] text-charcoal/60">Reserve Price</span>
                    <div className="font-display text-2xl font-black text-navy">
                      {prop.reservePriceDisplay}
                    </div>
                    {prop.marketValueDisplay && (
                      <div className="flex items-center gap-1.5 lg:justify-end text-xs text-charcoal/60 mt-0.5">
                        <span>Market: <span className="line-through">{prop.marketValueDisplay}</span></span>
                        {prop.discountPercent && (
                          <span className="font-bold text-emerald-700">
                            ({prop.discountPercent}% below)
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap lg:flex-col gap-2">
                    <button
                      className="rounded-md bg-navy px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-navy/90 active:scale-[0.98]"
                      onClick={() => setActiveDueDiligenceProp(prop)}
                      type="button"
                    >
                      View Details
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[#C5A059] bg-[#C5A059]/10 px-4 py-2 text-xs font-bold text-[#8a6c31] transition-all duration-200 hover:bg-[#C5A059]/20 active:scale-[0.98]"
                      onClick={(e) => handleOpenInspection(prop, e)}
                      type="button"
                    >
                      <KeyRound className="h-3.5 w-3.5" />
                      <span>SmartDoor Pass</span>
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-1.5 rounded-md border border-charcoal/20 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80 transition-all duration-200 hover:bg-charcoal/5 active:scale-[0.98]"
                      onClick={(e) => handleOpenFinance(prop, e)}
                      type="button"
                    >
                      <Coins className="h-3.5 w-3.5" />
                      <span>Auction Loan</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. GRID VIEW */}
      {viewMode === "grid" && filteredProperties.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((prop) => {
            const isPhysical = prop.possessionStatus === "Physical Possession Delivered";

            return (
              <div
                className="flex flex-col justify-between rounded-2xl border border-charcoal/15 bg-white p-5 shadow-xs transition-all hover:border-[#C5A059] hover:shadow-md"
                key={prop.ref}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded bg-navy/10 px-2 py-0.5 font-mono text-[11px] font-bold text-navy">
                      {prop.ref}
                    </span>
                    <span className="rounded bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-[#9b7b37]">
                      {prop.noticeType}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-navy line-clamp-2">
                    {prop.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-charcoal/70">
                    <p className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-[#C5A059]" /> {prop.subLocality}, {prop.city}</p>
                    <p className="flex items-center gap-1.5"><Landmark className="h-3 w-3 text-[#C5A059]" /> {prop.bankName}</p>
                    <p className="flex items-center gap-1.5"><Maximize2 className="h-3 w-3 text-[#C5A059]" /> {prop.carpetAreaSqFt} sq.ft • {prop.unitConfig}</p>
                    <p className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-[#C5A059]" /> Auction: {prop.auctionDate}</p>
                  </div>

                  <div className="border-t border-charcoal/10 pt-3">
                    <span className="text-[11px] text-charcoal/60">Reserve Price</span>
                    <div className="font-display text-xl font-black text-navy">
                      {prop.reservePriceDisplay}
                    </div>
                    {prop.marketValueDisplay && (
                      <div className="flex items-center gap-1.5 text-xs text-charcoal/60 mt-0.5">
                        <span>Market: <span className="line-through">{prop.marketValueDisplay}</span></span>
                        {prop.discountPercent && (
                          <span className="font-bold text-emerald-700">
                            (-{prop.discountPercent}%)
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    {isPhysical ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Move-in ready
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Occupied — we assist
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 space-y-2 border-t border-charcoal/10 pt-4">
                  <button
                    className="w-full rounded-md bg-navy py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-navy/90"
                    onClick={() => setActiveDueDiligenceProp(prop)}
                    type="button"
                  >
                    View Details
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className="inline-flex items-center justify-center gap-1 rounded-md border border-[#C5A059] bg-[#C5A059]/10 py-1.5 text-xs font-bold text-[#8a6c31] transition-all duration-200 hover:bg-[#C5A059]/20 active:scale-[0.98]"
                      onClick={(e) => handleOpenInspection(prop, e)}
                      type="button"
                    >
                      <KeyRound className="h-3 w-3" />
                      <span>Inspect</span>
                    </button>
                    <button
                      className="inline-flex items-center justify-center gap-1 rounded-md border border-charcoal/20 bg-white py-1.5 text-xs font-medium text-charcoal/80 transition-all duration-200 hover:bg-charcoal/5 active:scale-[0.98]"
                      onClick={(e) => handleOpenFinance(prop, e)}
                      type="button"
                    >
                      <Coins className="h-3 w-3" />
                      <span>Loan</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. GOOGLE MAP VIEW */}
      {viewMode === "map" && filteredProperties.length > 0 && (
        <div className="space-y-4">
          <PropertyMapView
            onArrangeInspection={(prop) => handleOpenInspection(prop)}
            onSelectProperty={(prop) => setActiveDueDiligenceProp(prop)}
            onViewDueDiligence={(prop) => setActiveDueDiligenceProp(prop)}
            properties={filteredProperties}
          />
        </div>
      )}

      {/* Interactive Modals */}
      {activeDueDiligenceProp && (
        <DueDiligenceModal
          isOpen={true}
          onApplyFinance={() => {
            const ref = activeDueDiligenceProp.ref;
            setActiveDueDiligenceProp(null);
            router.push(`/finance?property=${encodeURIComponent(ref)}`);
          }}
          onArrangeInspection={() => {
            const p = activeDueDiligenceProp;
            setActiveDueDiligenceProp(null);
            handleOpenInspection(p);
          }}
          onClose={() => setActiveDueDiligenceProp(null)}
          property={activeDueDiligenceProp}
        />
      )}

      {activeInspectionProp && (
        <InspectionArrangementModal
          isOpen={true}
          onClose={() => setActiveInspectionProp(null)}
          property={activeInspectionProp}
        />
      )}
    </div>
  );
}
