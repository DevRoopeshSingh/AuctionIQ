const legalPageNames: Record<string, string> = {
  terms: "Terms of Use",
  privacy: "Privacy Policy",
  refund: "Refund Policy",
  "community-guidelines": "Community Guidelines",
  contact: "Grievance and Support",
};

export default async function LegalPlaceholder({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = legalPageNames[slug];

  if (!title) return <main className="mx-auto max-w-3xl px-6 py-16"><h1 className="font-display text-3xl text-navy">Page not found</h1></main>;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl text-navy">{title}</h1>
      <p className="mt-5 rounded-md border border-warning/30 bg-white p-5 leading-7 text-charcoal/80">
        This page is a placeholder. The final policy and contact details require review and approval before publication.
      </p>
    </article>
  );
}
