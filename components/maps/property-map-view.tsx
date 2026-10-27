"use client";

import { useState } from "react";
import type { PropertyListing } from "@/lib/properties/data";
import { MapPin, KeyRound } from "lucide-react";

interface PropertyMapViewProps {
  properties: PropertyListing[];
  onSelectProperty?: (property: PropertyListing) => void;
  onArrangeInspection?: (property: PropertyListing) => void;
  onViewDueDiligence?: (property: PropertyListing) => void;
}

export function PropertyMapView({
  properties,
  onArrangeInspection,
  onViewDueDiligence,
}: PropertyMapViewProps) {
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing>(properties[0]);
  const [mapType, setMapType] = useState<"standard" | "satellite">("standard");

  const embedUrl = `https://maps.google.com/maps?q=${selectedProperty.coordinates.lat},${selectedProperty.coordinates.lng}&hl=en&z=15&output=embed${
    mapType === "satellite" ? "&t=k" : ""
  }`;

  return (
    <div className="overflow-hidden rounded-2xl border border-charcoal/15 bg-white shadow-md">
      {/* Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal/10 bg-navy px-5 py-3.5 text-white">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
            Interactive Property Geospatial Map
          </span>
          <h3 className="font-display text-base font-bold text-white">
            {selectedProperty.title} · {selectedProperty.area}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex rounded-md bg-white/10 p-1">
            <button
              className={`rounded px-2.5 py-1 font-medium transition-colors ${
                mapType === "standard" ? "bg-gold text-navy font-bold" : "text-white/80 hover:text-white"
              }`}
              onClick={() => setMapType("standard")}
              type="button"
            >
              Map View
            </button>
            <button
              className={`rounded px-2.5 py-1 font-medium transition-colors ${
                mapType === "satellite" ? "bg-gold text-navy font-bold" : "text-white/80 hover:text-white"
              }`}
              onClick={() => setMapType("satellite")}
              type="button"
            >
              Satellite
            </button>
          </div>

          <a
            className="inline-flex items-center gap-1.5 rounded-md border border-white/30 bg-white/10 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-white/20"
            href={selectedProperty.googleMapsUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <MapPin className="h-3.5 w-3.5 text-gold" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Property List on Left / Map on Right */}
      <div className="grid lg:grid-cols-[380px_1fr]">
        {/* Properties Selector Panel */}
        <div className="border-b lg:border-b-0 lg:border-r border-charcoal/10 bg-[#f8fafc] p-4 max-h-[520px] overflow-y-auto space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/60 px-1">
            Select Listed Property Pin
          </p>

          {properties.map((prop) => {
            const isSelected = prop.ref === selectedProperty.ref;
            return (
              <div
                className={`cursor-pointer rounded-xl border p-3.5 transition-all text-xs ${
                  isSelected
                    ? "border-navy bg-white shadow-md ring-2 ring-gold/50"
                    : "border-charcoal/15 bg-white/70 hover:bg-white hover:border-charcoal/30"
                }`}
                key={prop.ref}
                onClick={() => setSelectedProperty(prop)}
              >
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-navy">{prop.area}</span>
                  <span className="font-mono text-[11px] text-charcoal/50">{prop.ref}</span>
                </div>
                <h4 className="mt-1 font-display text-sm font-bold text-navy line-clamp-1">
                  {prop.title}
                </h4>
                <p className="text-charcoal/60 text-[11px] mt-0.5">{prop.subLocality}</p>

                <div className="mt-2.5 flex items-center justify-between border-t border-charcoal/10 pt-2">
                  <span className="font-bold text-navy">{prop.reservePriceDisplay}</span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>SmartDoor {prop.smartDoorDevice}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Google Map Embed Frame */}
        <div className="relative min-h-[420px] lg:min-h-[520px] bg-navy/5">
          <iframe
            className="h-full w-full border-0"
            loading="lazy"
            src={embedUrl}
            title={`Google Map preview for ${selectedProperty.title}`}
          />

          {/* Floating Property Info Overlay Badge on Map */}
          <div className="absolute bottom-4 left-4 right-4 max-w-md rounded-xl border border-charcoal/20 bg-white/95 p-4 shadow-xl backdrop-blur-md text-xs sm:left-4 sm:right-auto">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="rounded bg-navy/10 px-2 py-0.5 text-[10px] font-bold text-navy">
                  {selectedProperty.unitConfig}
                </span>
                <h4 className="mt-1 font-display text-sm font-bold text-navy">
                  {selectedProperty.title}
                </h4>
                <p className="text-[11px] text-charcoal/60">
                  Coordinates: {selectedProperty.coordinates.lat}° N, {selectedProperty.coordinates.lng}° E
                </p>
              </div>
              <div className="text-right">
                <span className="font-bold text-navy text-sm">{selectedProperty.reservePriceDisplay}</span>
                <p className="text-[10px] text-charcoal/60">Auction: {selectedProperty.auctionDate}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 border-t border-charcoal/10 pt-3">
              {onViewDueDiligence && (
                <button
                  className="rounded-md bg-navy px-3 py-1.5 font-semibold text-white transition-colors hover:bg-navy/90 text-[11px]"
                  onClick={() => onViewDueDiligence(selectedProperty)}
                  type="button"
                >
                  Due Diligence Report
                </button>
              )}
              {onArrangeInspection && (
                <button
                  className="rounded-md border border-navy/40 bg-white px-3 py-1.5 font-semibold text-navy transition-colors hover:bg-navy/5 text-[11px]"
                  onClick={() => onArrangeInspection(selectedProperty)}
                  type="button"
                >
                  <KeyRound className="h-3 w-3 inline mr-1" />
                  <span>SmartDoor Inspection</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
