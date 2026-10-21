# UI/UX Wireframe Plan

## 7.1 Navigation

- Public header: Home · Explore Auctions · Simulator · Academy · Plans · About · Login/Sign up.
- Member header: Dashboard · Explore · Forum · Tools · Watchlist · Notifications · Account.
- Admin: separate `/admin` shell with sidebar (Listings, Users, Payments, Reports, Inspections, Enquiries, Content, Audit).
- Footer: policies (Terms, Privacy, Refund, Community), grievance contact, company details.

## 7.2 Page-by-Page (18 required + admin)

| Page | Key wireframe notes |
|---|---|
| Home | Hero headline; simulator preview card; latest teasers (3); “How auctions work” strip; tools preview; approved sample community content; advocate/due-diligence section; plan comparison; FAQ; footer |
| Explore Auctions | Filter bar (type, reserve range, area, status); teaser cards with lock indicators; pagination; empty state |
| Property Detail | Gallery; public facts; locked panels with plan comparison CTA; member view adds exact location, documents, forum entry, inspection button |
| Membership Plans | Side-by-side matrix; inclusions/exclusions; advocate fee disclosure; GST note; consent at checkout |
| Simulator | Setup → bidding screen (timer, current bid, budget bar) → result/report; difficulty selector; educational banner persistent |
| Learning Academy | Article list, reading view, progress; video embeds; FAQ accordion |
| Quizzes & Challenges | Quiz runner, results, badges, leaderboard (optional) |
| Property Comparison | Up to 3 columns; difference highlighting; locked rows prompt upgrade |
| Investor Community | Property forum page; type filters; post composer; helpful answers; report |
| Property Intelligence Tools | Calculator, max-bid planner (Premium/Phase 2), assumptions panel |
| Advocate & Due-Diligence | Service description, scope, fee disclosure, enquiry form (Premium) |
| User Dashboard | Cards: saved properties, threads, enquiries, inspections, documents, dates, calculations, simulation history, membership |
| About / Contact & Support | General support only; no property enquiry for free users |
| Legal pages | Static, versioned |

## 7.3 States

Loading skeletons; empty states with next action; locked state (blur + CTA, no data in DOM); error with retry; expired-state banner with renewal CTA; permission-denied page.

## 7.4 Design System

- Colours: ivory `#FAF8F3`, charcoal `#1F1F1F`, deep navy `#0F2740`, gold `#B08D57`, success/warn/error restrained.
- Typography: serif display for headings, clean sans for body; 8px spacing scale.
- Components: buttons (primary navy, secondary outline, gold accent), forms with inline validation, cards, tables, tabs, badges, modals (no intrusive pop-ups), toasts.
- Accessibility: AA contrast, visible focus, labelled inputs, alt text.

---
