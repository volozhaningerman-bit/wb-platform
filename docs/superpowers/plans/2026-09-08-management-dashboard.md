# Management dashboard implementation plan

Goal: deliver a runnable desktop executive dashboard in the existing Next.js application.
Architecture: deterministic demo product/day records feed shared pure aggregation functions. A single client dashboard owns filters; independently scoped category and manager drilldowns consume the same records. Existing backend remains explicitly unconnected.
Constraints: desktop first, Railway, no payments or invented authentication, demo label always visible, one manager per product, unassigned bucket, no real WB token collection.

1. Restore reproducible web installation and root build/start scripts; configure TypeScript and Railway Docker build. Keep existing backend outside web build.
2. Add node tests for date/account/manager filtering, totals conservation, nested grouping, zero denominators, and control signals; run before implementing the shared analytics module.
3. Implement typed product and daily records, deterministic two-period demo data, aggregation and signals. Run tests until passing.
4. Replace dashboard entry and layout with one coherent executive interface: common filters, KPIs, daily trends, category and manager drilldowns, product details, manager table, signal details and CSV export. Keep all figures derived from records.
5. Run tests, TypeScript and production build. Correct blocking errors. Add CI and Railway instructions. Review diff and push feature branch with a draft pull request.

Acceptance: totals agree across both donuts and tables; drilldown has breadcrumb/back navigation; period and manager filters affect every data block; empty results are supported; demo is never represented as WB synchronization; npm ci/build/start commands are documented.
