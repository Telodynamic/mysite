# Website operations and SEO audit — 2026-10-30

## What runs where

The public website is static HTML/CSS/JavaScript deployed by GitHub Pages from `Telodynamic/mysite:main`. There is no application server, database, login system or custom API in this repository. The contact form posts to the existing Formspree endpoint `https://formspree.io/f/xzddeqqj`. Form processing, spam decisions and notification delivery are managed by Formspree; a working frontend does not prove mailbox delivery.

## Audit findings and changes

| Area | Finding / action |
| --- | --- |
| Hosting | Latest production build succeeded at `95d153c6f278f746fe68d2915c658ad8ccd5dc12` before this audit. All five main routes returned 200. |
| Domain | HTTP and the HTTPS www hostname redirected to https://telodynamic.com/. Production CNAME is preserved. |
| Crawling | robots.txt permits crawling; sitemap lists the five main canonical routes. The missing-page response returns HTTP 404 and has noindex. |
| Search metadata | Existing titles/descriptions/canonicals were present. Service and product titles now identify their subject more clearly. |
| Structured data | Expanded the existing Organization data with the existing brand mark; added WebSite, page identity and breadcrumb markup. No location, hours, ratings or business metrics are invented. |
| Social sharing | Added branded 1200×630 sharing artwork, matching image descriptions and per-page social metadata. |
| Navigation | Added the missing `#windows` anchor, keeping service-tab selection and incoming links consistent. |
| Contact form | Retained the endpoint and reply email field. Added the documented Formspree honeypot and a native submission option after verification/validation errors. Rate-limit responses preserve data; timeout feedback acknowledges uncertainty instead of claiming non-delivery. |
| Quality checks | Added `node tools/check-site.cjs` and a read-only GitHub Actions check for PRs and main pushes. Checks cover titles, canonical URLs, schema JSON, links/anchors, domain and production indexability. |

## Verification

Local browser QA passed 30 page/width combinations at 320, 390, 768, 1024 and 1440 px. Navigation, keyboard tabs, filters, product-enquiry context, conceptual-diagram markers, 404 links and no-JavaScript service content passed. Form success, server failure, rate limiting, stalled requests and native verification recovery were intercepted in the browser; no live test enquiry was sent. The original message and reply address were retained through the verification fallback. The static checker passes.

Preview deployments must exclude CNAME and block indexing; production must retain its canonical domain and allow crawling. Google search appearance and ranking are not guaranteed by valid metadata. This audit does not establish Search Console ownership, indexing coverage, or a Google Business Profile.

## Before Pavan's content updates

1. Fetch the latest upstream main and create a branch from it, rather than uploading an older full-site copy.
2. Update visible service/product copy using verified information. Retain image-source licenses when replacing assets.
3. Update the page description/title when its purpose changes, then run `node tools/update-seo.cjs` to refresh related social and structured metadata from that copy.
4. Run `node tools/check-site.cjs`; review mobile layouts and contact links for any edited pages.
5. Merge the reviewed change and confirm that GitHub Pages deploys the resulting commit.

## Owner-side items still unverified

- Formspree dashboard: whether the form is enabled, current submission quota, spam/challenge settings and notification recipient. Check these in the existing account; do not replace the endpoint casually.
- Real inbox receipt: send one coordinated, clearly labeled enquiry only with approval, then have Pavan confirm receipt and the reply address.
- Search Console: confirm ownership of the existing property, inspect the canonical pages and submit `https://telodynamic.com/sitemap.xml` if needed. No verification token or account access was available in this audit.
- Google Business Profile and Ads remain separate from this technical work. Confirm real business details, targets and budget before submission or activation.

## References

- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/
