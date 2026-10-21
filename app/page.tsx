import { Badge, Card } from "@/components/ui/primitives";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <section className="grid gap-10 py-16 md:grid-cols-[1.3fr_0.7fr] md:items-center md:py-24">
        <div>
          <Badge>South Mumbai · Navi Mumbai</Badge>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-navy sm:text-6xl">
            Make your next auction decision with better information.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-charcoal/75">
            AuctionIQ is building a clearer way to understand bank-auction properties, key dates, and due diligence.
          </p>
          <p className="mt-6 text-sm text-charcoal/70">The platform is in foundations setup. Property intelligence features are not live yet.</p>
        </div>
        <Card className="border-gold/40 bg-white p-7">
          <p className="font-display text-xl font-semibold text-navy">A more informed starting point</p>
          <p className="mt-3 leading-7 text-charcoal/75">Clear property facts, source context, and practical learning resources are planned for upcoming releases.</p>
          <p className="mt-5 text-sm font-semibold text-warning">Listings and member tools are coming soon.</p>
        </Card>
      </section>

      <section aria-label="Upcoming areas" className="grid gap-4 border-t border-charcoal/10 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["explore", "Explore auctions", "Property listings are coming soon."],
          ["simulator", "Auction simulator", "Educational practice tools are coming soon."],
          ["academy", "Learning academy", "Auction learning resources are coming soon."],
          ["plans", "Membership plans", "Membership details will appear here when available."],
        ].map(([id, title, text]) => (
          <Card className="min-h-36" id={id} key={id}>
            <h2 className="font-display text-lg font-semibold text-navy">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-charcoal/70">{text}</p>
          </Card>
        ))}
      </section>
      <section className="border-t border-charcoal/10 py-10" id="about">
        <h2 className="font-display text-2xl font-semibold text-navy">About AuctionIQ</h2>
        <p className="mt-3 max-w-3xl leading-7 text-charcoal/75">AuctionIQ is being developed as a property intelligence platform focused on bank auctions in South Mumbai and Navi Mumbai.</p>
      </section>
    </div>
  );
}
