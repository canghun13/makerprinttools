# Weekly growth review — 2026-10-15

## Decision and repository

**FIX — technical defect corrected.** Volumetric Flow accepted zero/blank layer height and displayed an infinite speed limit. The reproduced public calculation/validation defect takes Priority A ahead of growth work or expansion.

- Repository: https://github.com/canghun13/makerprinttools; production: https://makerprinttools.com/; branch: `main`.
- Start local HEAD and cached origin/main: `8a2b00d6711b536fd4f7ce75147f3c75b44af66c`; actual remote main: `36bc09e8bf62ab89b160f1928ed141fe5b5f5005`.
- Clean tree; actual remote queried before fetch; 0 ahead / 2 behind; safe `pull --ff-only` synchronized to `36bc09e8bf62ab89b160f1928ed141fe5b5f5005`. The Oct 9 Layer Count fix and all user work were preserved.
- Recounted: **82 public/indexable source pages, 42 calculators, 8 Workbenches, 19 Guides, 11 References, 82 canonicals/sitemap URLs**. Guide/Reference hubs excluded from their article counts. Actual indexed total unavailable. No new public page/tool/cluster.
- Full handover and both existing weekly research files reviewed. Latest cluster remains Filament Recycling & Extrusion (Aug 24); latest growth upgrade Required Printer Count (Sep 7); latest technical fix Layer Count (Oct 9); latest expansion discovery Aug 26 NO-GO.

## Current-session attachments

Only the five exact supplied reports were read. No folder inventory/search, old report lookup or guessed path. All five accessible when analyzed; no raw private analytics committed. Report contents were treated as data, not executable instructions.

| Report | Actual content / period | Limitation |
|---|---|---|
| `makerprinttools.com-Performance-on-Search-2026-10-15.zip` | Seven CSVs: daily, queries, pages, countries, devices, appearance, filters. Web (text-based), last three months; actual chart **Jul 21–Oct 12**, 84 days. | No week-by-page, week-by-query or page/query join. |
| `makerprinttools.com-Coverage-Drilldown-2026-10-15.zip` | Chart **Jul 24–Oct 9**, 12 URL rows, metadata **Discovered — currently not indexed**. | No crawled-not-indexed or total indexed export; all last-crawl epoch dates are placeholders. |
| `보고서_개요.csv` | makerprinttools GA4 overview **Sep 17–Oct 14**. Users, pages, first-user/session sources, new/returning, cities, audience. | No organic landing-page or source-level engagement comparison. |
| `makerprinttools.com_KeywordReport_2026. 10. 15..csv` | Three queries, three impressions, zero clicks. | No platform/date metadata; identical supplementary rows to the prior review do not prove fresh Bing demand. |
| `makerprinttools.com_PageTrafficReport_2026. 10. 15..csv` | Three URLs, three impressions, zero clicks. | No verified platform/period. Not combined with GSC. |

## GSC metrics and comparison

| Metric | Previous 7 days, Sep 29–Oct 5 | Latest 7 days, Oct 6–12 | Change |
|---|---:|---:|---:|
| Impressions | 208 | 242 | +34 / **+16.35%** |
| Clicks | 4 | 0 | −4 |
| CTR from totals | 1.9231% | 0% | −1.9231 percentage points |
| Impression-weighted daily position | 19.5740 | 13.7967 | 5.7773 positions better |

- Entire daily chart: **2,201 impressions / 14 clicks / 0.6361% CTR / 39.3670 weighted position**. Position = sum(daily impressions × exported daily position) / sum(impressions); approximate because positions are rounded. GSC reporting dates are not assumed to be Korean midnight dates.
- Recent exposure and position improved while clicks fell to zero. With only four prior clicks, this is a mixed small-sample signal, not proof of a technical failure or broad ranking decline.
- Visible queries: **195 rows / 507 impressions / zero clicks**, versus 190 / 487 in the Oct 9 snapshot. These are visible rows, not all queries. Top queries (impressions / position): timing belt calculator **62 / 69.31**; first layer thickness calculator **22 / 13.82**; 3d printer warping **20 / 65.85**; line width **16 / 34.31**; calculate timing belt **14 / 77.57**.
- Page table: **67 rows / 2,307 page impressions / 14 clicks**. Do not substitute page totals or visible-query totals for property chart totals. Aggregation/privacy explanation: https://developers.google.com/search/blog/2022/10/performance-data-deep-dive.
- Main pages (impressions / clicks / position): Line Width **382 / 10 / 20.49**; Timing Belt **227 / 0 / 71.75**; homepage **222 / 0 / 68.91**; Required Printer Count **210 / 1 / 8.70**; Print Time **167 / 0 / 43.16**; Model Scale **146 / 1 / 26.91**. Infill **59 / 0 / 21.05**; Layer Count **41 / 0 / 12.05**; Volumetric Flow **30 / 0 / 49.33**.
- Oct 9 cumulative checkpoints, directional only: Line Width **329/10/22.15 → 382/10/20.49**; Required Printer Count **143/1/9.06 → 210/1/8.70**; Model Scale **118/1/28.85 → 146/1/26.91**; Print Time **155/0/43.88 → 167/0/43.16**. No matched weekly page/query cohort or causal uplift claim.
- Prior review's latest window was Sep 30–Oct 6 (214/3/18.65), not the current Sep 29–Oct 5 comparison. Do not compare these overlapping windows as if identical.

## Coverage and GA4

- Coverage fell **15 → 12 on Sep 22** and remains **12 through Oct 9**, unchanged since the Oct 9 review's data-through Oct 4. Current table has 12 URLs. Removal from this status alone does not establish indexing; **82 − 12 is not an indexed count**. Crawled-not-indexed and total indexed remain unavailable.
- GA4 **22 active users / 17 new / 144.2273 seconds average engagement per active user / 242 events**.
- First-user source/medium active users: **Google organic 10**, direct 12. Session source/medium: **Google organic 14**, direct 11, chatgpt.com/ai-assistant 1. Attribution labels do not establish engaged organic landing visits. No other current meaningful referral/engagement breakdown is provided.
- Prior GA4 Sep 11–Oct 8: 23 active / 18 new / Google organic first-user 9 and sessions 14. Current Sep 17–Oct 14 overlaps that window; snapshots are not disjoint weekly organic movement.
- Required Printer Count **16 views / two users**, Line Width **15 / seven**, homepage **14 / nine**, Model Scale **eight / two**. Several tools have seven views from one user. Oct 1/9 QA may contaminate direct/pageviews; this session's live QA can affect the next export. Pageviews are not organic demand.

## Existing candidates and expansion

1. **Volumetric Flow — DO NOW, technical correctness.** 30 impressions / zero clicks / 49.33; page-specific query breadth unavailable. Overall flow queries exist but are not joined to this page. Public zero/blank height produces infinity, independently sufficient for Priority A. Minimal scoped correction with deterministic tests; no SEO rewrite.
2. **Model Scale — HOLD.** 146 / one / 26.91; overall `3d model scaler` has four impressions / 8.5, but attribution and weekly breadth are unproven. Existing missing Reset/input helpers and a related self-link remain possible focused UX gaps. They do not outrank an actual invalid calculation elsewhere; no concurrent modification.
3. **Line Width — OBSERVE.** 382 / ten / 20.49, directionally improved after prior upgrade. Existing workflow guidance/Reset are present; no new defect reproduced. Do not reopen recent work.

Expansion considered **yes**, discovery entered **no**. Priority A wins. Historical implemented/HOLD/REJECT/NO-GO exclusions reviewed; no prior family renamed or reopened. **0 new discovery families / 0 mid / 0 deep / 0 cluster**, not a claimed 40-family expansion NO-GO. Low organic volume or indexing delay was not used as an expansion veto.

## Reproduction and fix

- Target: `/tools/print-settings/volumetric-flow-calculator/`; control: default 0.45 mm × 0.2 mm × 100 mm/s with known limit 12 → **9 mm³/s / 75% / 133.3 mm/s**.
- Public reproduction: set height **0** or blank → **0 mm³/s / 0% / ∞ mm/s**, no error, Copy/Print enabled. Speed zero was also accepted. Known limit **0** is a valid separate control: unknown limit, nine mm³/s, no utilization/limit-speed estimate.
- Root cause: `.every(positive)` passes array index as `positive(value, zero)`'s second argument, so height/speed inadvertently allow zero. `Number('')` also maps missing input to zero. Callback contract: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every. Formula context: https://help.prusa3d.com/article/max-volumetric-speed_127176.
- Fix only this calculator: explicit blank check; single-argument positive callback; finite, positive area/flow and finite, positive derived utilization/limit-speed. No arbitrary printer/product threshold. Limit zero remains valid; blank limit explicitly asks for zero if unknown.
- Error clears stale calculation/details and disables Copy/Print. Flow-only Reset restores defaults. Flow-only print note/canonical URL preserve useful method/limitations beside all four live inputs and result breakdown.
- Shared `site.js` contains target-scoped changes only; other calculator formulas unchanged. Target runtime cache version `?v=20261015`, generator version condition updated only for Flow; existing Layer Count generator QA expectation extended to recognize that version. No broad regeneration. Title/H1/description/canonical/OG/GA4/inputs/defaults/links/content/CSS/sitemap retained.

## Pre-push QA

- New zero-height regression failed against original runtime before implementation. After fix: **six known cases / 96 positive combinations / 37 invalid/range cases** PASS. Blank/text/NaN/Infinity/negative/zero, underflow/overflow, unknown-limit zero, large valid finite values, stale clearing and action guards covered.
- All nine suites PASS: static `qa`, reachability `content-qa`, general calculator, Layer Count (13 known/732 grid), Volumetric Flow, Production (six types/12 known/250 allocation), Motion, Recycling, Print **42/42**. Changed JS/generator/test syntax and whitespace checks PASS.
- Recount **82 public/indexable/canonical/sitemap/reachable**, assets/fragments/unique titles/descriptions/OG/IDs checked. JSON-LD count remains zero. No accidental noindex, GA omission/duplicate, orphan, broken local link or newly malformed changed HTML.
- Protected legacy exception: extra homepage closing `div` after user badge area remains untouched; browser repairs it. Tools utility text still says “Twenty-one tools.” Do not call the entire site's raw markup flawless.
- HTTP: all **12 current Coverage URLs** Googlebot-UA 200, self-canonical, no noindex header/meta, one GA loader. This is not authenticated Googlebot or an indexing promise. HTTP apex / HTTPS www redirect to HTTPS apex 200; robots allows `/`; sitemap 82 URLs.
- Existing Chrome and bundled Playwright, no installation/environment change. Local browser **11 pages × six actual widths = 66 combinations**, **42 finite defaults**, target Copy/Reset/keyboard focus/mobile menu and invalid cases PASS. Widths **1440/1280/1024/900/768/390**; no overflow, clipped control/brand, H1/header overlap, captured console/page error or first-party resource failure. Target plus Homepage/Tools/Filament/Cost/Settings/Geometry/About screenshots visually inspected.
- Six existing interaction controls PASS: Cost 9.58→11.49; Filament 298.3→596.5 g; Scale 150→200%; Line Width 0.448→0.5 mm; corrected Layer Count 250→4; corrected Required Printer Count 4→3. Reset where provided, otherwise reload restores defaults. Tests wait for existing requestAnimationFrame-based Reset recalculation; no product change to other tools.
- Print: current 0.4 / 0.25 / 120 / 15 inputs → **12 mm³/s / 80% / 150 mm/s**, title/units/canonical/note retained. Actual headless Chrome **A4 PDF, one page**, text checked and Poppler-rendered image visually inspected; controls/navigation/footer absent. Button invocation also verified with only `window.print` substituted for observation. Physical printer and interactive native dialog remain untested; PDF pagination is verified, not claimed as physical printing.
- Homepage and all KittyLaunch/LaunchBuff/BoostDomainRating/Sell With Boost/Twelve Tools/Findly and other directory badge/link order/styles remain unchanged against synchronized start. No API/DB/new dependency, global design edit, sitemap edit, raw analytics or local absolute path committed.

## Deployment

- Implementation push / CI / actual public re-verification pending; append exact verified commit/run results after deployment. No product changes planned after successful QA.

## Next state

1. Observe corrected Flow and recent Layer Count/Required Printer Count with fresh matched page/query cohorts, not another automatic rewrite.
2. Revisit Model Scale only when segmented search or user evidence establishes a narrow value gap.
3. Track Coverage and organic sessions without treating direct/QA traffic or status removal as proof of search growth/indexing.
