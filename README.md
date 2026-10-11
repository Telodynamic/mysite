# Telodynamic V2

Development branch for the Telodynamic website redesign.

## Architecture
- Home: concise cinematic introduction and capability gateways
- Services: telemanipulators, hot cells, hot-cell windows, interactive explainers
- Products: filterable product catalogue
- About: company positioning and Inspect → Diagnose → Engineer → Service → Verify process
- Contact: maintenance / failure / custom-solution enquiry flow

## Development notes
- Existing `CNAME` is intentionally preserved for the eventual upstream merge.
- Real industry application photographs are stored locally as optimized WebP files. Sources, attribution and licenses are published at `/image-credits/`. Product images illustrate applications rather than identifying Telodynamic equipment.
- No unverified certifications, customer counts, years, technical specifications or regulatory claims are included.
- The existing Telodynamic Formspree endpoint is retained on the Contact page.

## Safe client preview

Review: https://telodynamic-client-preview.vercel.app/

The preview is hosted in the separate Vercel project `telodynamic-client-preview` under Raja's account. No custom domain or upstream repository connection is configured. `telodynamic.com` remains untouched.

Run `node tools/build-preview.cjs` to stage public files in `_preview/`. The preview excludes `CNAME`, blocks search indexing with robots.txt, HTML metadata and an HTTP header, and leaves production canonical URLs intact. Deploy only this staged directory to the separate preview project. Never enable GitHub Pages on the fork while its production CNAME is present.

See `CLIENT_REVIEW.md` for the review scope, QA evidence and launch prerequisites. The contact form uses the verified existing endpoint; browser QA uses intercepted responses and does not verify mailbox delivery.

## Finalisation checklist
1. Review the industry application photography and replace it with Telodynamic equipment assets when available.
2. Verify service/product wording and approved company/founder information with Pavan.
3. Test Formspree delivery and mobile layouts.
4. Run Lighthouse accessibility/performance checks.
5. Review SEO metadata, social preview image and legal pages if required.
6. Review and approve upstream PR https://github.com/Telodynamic/mysite/pull/1 before merging. The old website is preserved on the fork branch `original-site-backup-2026-10-10`.
