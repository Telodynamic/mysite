# Telodynamic V2 — client review

Preview: https://telodynamic-client-preview.vercel.app/

Review branch: `rajasatyavardhan/mysite`, `telodynamic-v2`.

## Ready for review

- Home: concise introduction, three capability gateways and clear enquiry actions.
- Services: the existing equipment service list, accessible keyboard tabs, one combined hot-cell/telemanipulator explanation with an interactive conceptual schematic.
- Products: five product entries from the existing catalogue, category filters and product-specific enquiry links. Technical specifications remain unpublished.
- About: focused company positioning and an interactive service-discussion process without invented founder credentials or company metrics.
- Contact: verified phone, email and Formspree endpoint; enquiry preselection; accessible form labels; success/error feedback with input retained after errors and stalled submissions.

The navy/cyan/white/steel design is retained. Source names stay on the separate credits page rather than the main photo captions. The original laboratory image leads Home, and all four original Home photos remain in About. Locally optimized photography now shows real remote-handling, hot-cell, shielding and precision-manipulation applications, with source attribution and licenses at `/image-credits/`. The four working Home images from the original website are retained in the About engineering-context gallery. Product photography illustrates industry applications rather than identifying Telodynamic products. Placeholder labels have been removed. The hot-cell drawing is educational, not a product design or technical specification.

## QA

Six pages (including image credits) tested at 320, 390, 768, 1024 and 1440 px widths: no horizontal overflow, working local links/assets and one primary heading per page. Keyboard tabs, mobile menu/Escape, filters, hot-cell markers, enquiry preselection and form success/error states checked. JavaScript-disabled service content remains available. Form responses were intercepted; no test enquiry was sent to Telodynamic. Inbox delivery still requires a coordinated live test.

Page titles, descriptions, canonical URLs, social metadata, sitemap and legacy redirects reviewed. The separate preview blocks indexing and excludes CNAME. Upstream main and the fork's main were not changed.

Automated axe-core scans at phone and desktop sizes found no reported violations after fixes. Gradient and image backgrounds require manual contrast review; this is a review check, not an accessibility certification. Hero text uses a strengthened navy overlay, and application-image captions use an opaque navy background.

## Before live release

1. Review the application photographs; Telodynamic equipment photographs can replace them when available.
2. Confirm public service/product wording and the proposed process with Pavan. Add company/founder information only if supplied and approved.
3. Confirm technical data before publishing any dimensions, materials, ratings, certifications or compliance statements.
4. Coordinate a real Formspree delivery test and confirm receipt.
5. Approve the review branch before merging upstream pull request https://github.com/Telodynamic/mysite/pull/1.

The upstream pull request is open and unmerged. The old site is preserved on the fork branch `original-site-backup-2026-10-10` at commit `4d1fdfe925701deb752003aea3657a82cde48563`. No domain change or live-site release is part of this imagery update.
