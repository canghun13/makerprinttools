# Weekly growth review — 2026-10-01

## Repository and decision

- Repository: https://github.com/canghun13/makerprinttools; production: https://makerprinttools.com/; branch: `main`.
- Start local HEAD = cached origin/main = actual remote main: `a4d969d6692d4851b64dbd169f91176e35523660`.
- Working tree was clean; actual remote was checked before fetch; ahead/behind was 0/0; `git pull --ff-only origin main` reported already up to date.
- **FIX — technical defect corrected.** Required Printer Count pooled fractional cycle capacity across different printers. This reproduced on production and outranked growth work or expansion.
- Inventory, recounted: **82 public/indexable HTML pages, 42 calculators, 8 workbenches, 19 guides and 11 references excluding their two hubs**. No new public page or tool.

## Current-session attachments

| Supplied file | Actual content / range | Use and limitations |
|---|---|---|
| `makerprinttools.com-Performance-on-Search-2026-10-01.zip` | Seven CSVs: daily chart, queries, pages, countries, devices, search appearance, filters. Web; filter says last three months; actual daily rows 2026-07-21–2026-09-28, 70 days. | Primary growth signal. 170 visible queries; 66 page rows. No page-by-query or week-by-page/query breakdown. |
| `makerprinttools.com-Coverage-Drilldown-2026-10-01.zip` | Chart, URL table, metadata. Discovered — currently not indexed. Chart 2026-07-24–2026-09-21. | Latest count 15; table 15 URLs. All last-crawl values are `1970-01-01` placeholders, not genuine crawl dates. No crawled-not-indexed or total-indexed export. |
| `보고서_개요.csv` | GA4 overview; property makerprinttools; 2026-09-03–2026-09-30. | Overall users, pages, first-user source/medium, session source/medium, return/new series, cities, audiences. No organic landing-page or source-level engagement comparison. |
| `makerprinttools.com_KeywordReport_2026. 10. 1..csv` | Three query rows; three impressions, zero clicks. | No period/platform metadata in the contents. Supplementary only; not combined with GSC or called a verified Bing period. |
| `makerprinttools.com_PageTrafficReport_2026. 10. 1..csv` | Three URL rows; three impressions, zero clicks. | Same date/platform limitation; not a week-over-week export. |

The supplied exact files were read successfully at the beginning; no directory search, old report, or guessed path was used. Later re-access found all five originals unavailable. This review retains the observations and calculations already returned by the successful reads; no missing rows were reconstructed or dates guessed. Future analysis needs fresh current-session attachments. Raw analytics were not committed to the public repository. Report content was treated as data, not instructions.

## GSC metrics and comparison

| Metric | Previous seven days, Sep 15–21 | Latest seven days, Sep 22–28 | Change |
|---|---:|---:|---:|
| Impressions | 99 | 189 | +90 / **+90.91%** |
| Clicks | 0 | 2 | +2; percentage change undefined |
| CTR, clicks / impressions | 0% | 1.0582% | +1.0582 percentage points |
| Impression-weighted daily position | 17.2101 | 14.0249 | 3.1852 positions better |

- Entire daily export: **1,751 impressions / 10 clicks / 0.5711% CTR / 45.2521 impression-weighted position**. Position is reconstructed from rounded exported daily positions, so it is approximate. GSC dates use its report convention, not an assumed Korean midnight boundary.
- Weighted position = sum(daily impressions × daily position) / sum(daily impressions). CTR is computed from totals, not averaged from rounded row percentages.
- Visible queries: **170 rows / 434 impressions / 0 clicks**. This is visible breadth, not the full query universe. Leading queries: `timing belt calculator` 62 / 69.31; `3d printer warping` 20 / 65.85; `line width` 15 / 34.8; `calculate timing belt` 14 / 77.57; `wall thickness` 13 / 79.85. Format is impressions / position.
- Page table: **1,820 page-level impressions / 10 clicks**, distinct from property-level daily totals. Main pages: Line Width 266 / 6 / 24.89; Timing Belt Length 226 / 0 / 71.89; homepage 208 / 0 / 70.77; Print Time 150 / 0 / 45.07; Required Printer Count 110 / 1 / 9.16; Model Scale 70 / 1 / 27.54. Format is impressions / clicks / position.
- The page sum is not substituted for site totals; visible-query totals are not expected to reconcile with the chart. Google documents property/page aggregation differences and omitted anonymized queries: https://support.google.com/webmasters/answer/17010575?hl=en and https://developers.google.com/search/blog/2022/10/performance-data-deep-dive.
- Sep 18 handover reference had recent 84 / 0 versus previous 92 / 2. Those were supplied checkpoints without exported date rows; they are not relabeled as the two current comparison windows.
- Directional cumulative checkpoints: Line Width 192 / 5 / 29.4 → 266 / 6 / 24.89; Required Printer Count 84 / 1 / 9.39 → 110 / 1 / 9.16; Print Time 129 / 49.9 → 150 / 45.07; Timing Belt 225 / 72 → 226 / 71.89; extrusion 23 / 72 → 23 / 72.3. Different snapshot windows prevent causal uplift or weekly cohort claims.
- Interpretation: the actual most recent seven-day window improves in impressions, clicks, and weighted position. This does not establish which page/query caused the improvement; segmented weekly exports are absent.

## Indexing and GA4

- Discovered-not-indexed was 16 until Aug 17 and **15 from Aug 18 through Sep 21**. It is stable in the coverage chart's latest two seven-day windows. Crawled-not-indexed and total indexed count are **unavailable**, not zero. `82 - 15` is not a valid indexed-page count.
- Performance is current through Sep 28, Coverage through Sep 21, and GA4 through Sep 30; do not compare them as simultaneous snapshots.
- GA4: **27 active users, 23 new users, 44.11 seconds average engagement per active user, 198 events**.
- First-user source/medium active users: direct 19, google/organic **5**, unavailable 1, chatgpt.com/ai-assistant 1, twelve.tools/directory 1.
- Session source/medium: direct 18, google/organic **9**, chatgpt.com/ai-assistant **3**, unavailable 1, twelve.tools/directory **1**.
- Referrals/AI attribution are observed source labels, not proven engaged visitors. Direct and pageview totals are not used as organic growth evidence. Required Printer Count's 21 views / 4 users may include prior QA. No matched prior GA4 export supports week-over-week organic/engagement movement.

## Technical findings and selected fix

### Target and reproduction

- Target: `/tools/production/required-printer-count-calculator/`; control: eight good units, four parts/cycle, six-hour cycle, one nine-hour printer window, 100% availability/utilization, 0% failure → two printers remains correct.
- Defect: **nine** good units with the same schedule requires three complete cycles. Old production result: **two printers**, 18 pooled hours, zero margin. Each printer can actually finish only one six-hour cycle; two printers can make at most eight units. Correct answer: **three printers**.
- Infeasible control: a ten-hour cycle in a nine-hour budget still returned a finite printer count. Adding printers cannot split one uninterrupted print cycle.
- Root cause: `ceil(required hours / per-printer hours)` pooled nontransferable time fragments. The previous September fix rounded total workload but did not round each printer's completed cycle capacity down.

### Implementation

- Complete cycles/printer = floor(productive hours/printer / cycle time); required printers = ceil(required whole cycles / complete cycles/printer).
- Normalize only machine-precision noise at an exact cycle boundary, such as 0.3 / 0.1. A genuinely short 5.9999-hour window does not fit a six-hour cycle.
- Reject zero-cycle windows, fractional part/unit counts, unsafe integer counts, and non-finite derived capacity. Error clears the result/details and disables Copy/Print only on this target tool.
- Default stays **four printers**: 30 required cycles; nine cycles/printer; 36 fleet cycle slots; six spare cycles / 36 usable hours; 14.4 fleet hours in fragments. Result diagnostics distinguish usable capacity from fragments.
- Formula, worked examples, pooled-day assumptions, uninterrupted-window limitations, and expected-yield caveat updated in the generator and generated target HTML. URL/title/H1/description/canonical/defaults/related links retained.
- Target production runtime URL is cache-busted with `?v=20261001`. No shared CSS or common `site.js` change. Other five Production calculator behaviors retained.
- Existing Print Record gains the canonical URL and a useful scheduling note only for this tool; common A4 styles and all other records are unchanged.

### Existing growth candidates, not concurrently implemented

1. **Required Printer Count — DO NOW, technical correctness, not SEO rewrite.** 110 impressions / one click / 9.16; page-specific query breadth unavailable. Exact user-value defect reproduced. Minimal scoped risk with deterministic fixtures.
2. **Model Scale — HOLD.** 70 / one / 27.54. Overall report contains scale-related queries, but no page/query join proves their page attribution. Current inputs lack helpers/Reset and the related block links back to itself; the formula and cubic-scaling limitation exist. A future focused usability upgrade could help, but cannot outrank the reproduced planning error.
3. **Print Time — HOLD.** 150 / zero / 45.07, directionally better than Sep 18 but still outside preferred growth positions. Same known toolpath-versus-model/STL input gap; current export provides no new page/query evidence resolving it. Do not add filler or reopen the previous large estimator redesign.

Expansion considered but **not entered**: Priority A wins. Full handover/exclusion history was read; no prior HOLD/REJECT/implemented family reopened. Zero new discovery families/cluster/pages this session, not a purported 40-family expansion NO-GO.

## QA before implementation push

- Existing suites PASS: `qa`, `content-qa`, `calculator-qa`, `production-planning-qa`, `motion-mechanics-qa`, `filament-recycling-qa`, `print-qa`; changed JS/generator/test syntax and `git diff --check` PASS.
- New fixtures failed on the original code before the fix. Afterward: **six Production calculator types, 12 known-value fixtures, 250 cycle-allocation combinations**, field-by-field blank/text/NaN/Infinity/zero/negative/percent boundaries, infeasible windows, fractional counts, excessive values, and large valid finite cases PASS. Copy/Print error guards covered.
- Site inventory/link/GA/canonical/sitemap/reachability **82/82**; shared Print structure **42/42**. Extended raw tag/asset/fragment/title/description/OG/JSON-LD checks found no new error in changed pages.
- **Protected legacy finding, not an all-site HTML PASS:** homepage has an extra closing `div` immediately after the user-managed badge block. Browser repairs it, current layout is normal. Preserved because the user prohibits edits there. Tools hub's old “Twenty-one tools” utility text is also a legacy content discrepancy, not changed in this one-fix scope.
- HTTP/HTTPS checks: target/assets/robots/sitemap 200; HTTP apex and HTTPS www end at HTTPS apex; robots allows `/`; sitemap 82 URLs. **All 15 Coverage URLs** returned 200 with Googlebot UA, self-canonical, one GA loader, no noindex meta/header. This is a UA response test, not authenticated Googlebot crawling or a promise of indexing.
- Local browser: target plus seven core pages × six widths = **48** checks; Production hub/other five Production tools/Recycling extrusion × six widths = **42** more. Widths **1440 / 1280 / 1024 / 900 / 768 / 390**. No overflow, target clipping/brand/H1 overlap, default-result or console regression. Screenshots inspected for Homepage, Tools, Filament, Cost, Settings, Geometry, About, and target.
- Browser interactions: reproduced boundary fixed, no-fit case clears result, Copy includes all diagnostics, Reset restores defaults, large one-billion-unit case remains finite at 390px with no overflow. Other five Production tools each passed changed input / blank / Reset.
- Print: native preview invocation blocked the connected browser's automation response; no native PDF/printer PASS is claimed. QA-only fixture substituted only `window.print`, using unchanged production runtime and exact print CSS at the **688px A4 content width**. Current eight inputs, units, title, canonical URL, note, three-printer result and nine diagnostics are present; controls/header/footer hidden; no overflow; result record **648.41px high**, within the approximately 1,016px A4 content height. CSS/record preview PASS, native pagination remains a stated limitation.
- Homepage source, directory badge/link order/styles, KittyLaunch, LaunchBuff, BoostDomainRating, Sell With Boost, Twelve Tools, Findly, Tools hub, sitemap, shared CSS and common JS are unchanged.

## Deployment

- Implementation commit / CI / public re-verification: pending the implementation push; append exact verified results below after deployment.
- Next state: observe actual Required Printer Count/Line Width query and page cohorts; request current segmented reports next review rather than infer page/query joins; change the protected homepage closing tag only with explicit user authorization.
