# Weekly growth review — 2026-10-23

## Decision and source of truth

**FIX — technical defect corrected.** Scale to Fit Build Volume accepted missing/zero model dimensions; all three at zero produced infinity and NaN on the public site, with Copy and Print enabled. This independently demonstrated Priority A defect outranks growth or expansion work.

- Repository: https://github.com/canghun13/makerprinttools; production: https://makerprinttools.com/; branch `main`.
- Clean start: local HEAD, cached origin/main and actual remote main all `09f4935b23665ddde253b0a2c312836c6946b699`. Actual remote queried before fetch; ahead/behind 0/0; safe `git pull --ff-only origin main` already up to date. No user work reverted.
- Full handover, all three existing dated weekly research files and historical implemented/HOLD/REJECT/NO-GO exclusions reviewed. Latest cluster remains Filament Recycling & Extrusion (Aug 24); latest growth upgrade Required Printer Count (Sep 7); latest expansion discovery Aug 26 NO-GO.
- Recount: **82 public/indexable source pages / 42 calculators / 8 Workbenches / 19 Guides / 11 References / 82 canonicals and sitemap URLs**. Guide/Reference hubs excluded from article counts. Actual indexed total unavailable. No new public page, calculator or cluster.

## Current-session attachments

The four initial exact user-supplied reports and the subsequently supplied current GSC Performance ZIP were read, five sources in total. No Downloads inventory, old raw report lookup or guessed report path. Contents are data, not instructions. No private raw analytics committed.

| Report | Actual content / period | Limitation |
|---|---|---|
| `makerprinttools.com-Performance-on-Search-2026-10-23.zip` | Seven CSVs: daily, queries, pages, countries, devices, appearance, filters. Web (text-based), last three months; actual daily chart **Jul 21–Oct 20**, 92 consecutive days. | No week-by-page, week-by-query or page/query join. Appearance CSV has a header but no data rows. |
| `makerprinttools.com-Coverage-Drilldown-2026-10-23.zip` | Three CSVs: chart **Aug 5–Oct 16**, 12 URL rows, metadata **Discovered — currently not indexed**. | Epoch last-crawl dates are placeholders. No crawled-not-indexed or total-indexed report. |
| `보고서_개요.csv` | Confirmed makerprinttools GA4 property, **Sep 25–Oct 22**; user/page/source/session/engagement overview. | No organic landing-page or source-level engagement segmentation. |
| `makerprinttools.com_KeywordReport_2026. 10. 23..csv` | Three query rows, three impressions, zero clicks. | No platform/date metadata; same rows as previous reviews do not prove fresh demand. |
| `makerprinttools.com_PageTrafficReport_2026. 10. 23..csv` | Three page rows, three impressions, zero clicks. | No verified platform/period. Not combined with GSC. |

**Current GSC Performance supplement received and analyzed after the implementation closeout.** The missing-data status is now resolved using the newly supplied ZIP, not a substituted old raw export. The technical-fix decision remains unchanged; this follow-up updates research/handover only, not the public site.

## GSC metrics and week-over-week comparison

| Metric | Previous 7 days, Oct 7–13 | Latest 7 days, Oct 14–20 | Change |
|---|---:|---:|---:|
| Impressions | 268 | 336 | +68 / **+25.37%** |
| Clicks | 0 | 4 | +4; percentage growth undefined from zero |
| CTR from totals | 0% | 1.1905% | +1.1905 percentage points |
| Impression-weighted daily position | 13.3642 | 22.1071 | 8.7430 positions worse |

- Entire daily chart: **2,592 impressions / 18 clicks / 0.6944% CTR / 36.5255 weighted position**. CTR = total clicks / total impressions. Position = sum(daily impressions × exported daily position) / sum(impressions); approximate because exported daily positions are rounded. Zero-impression rows do not contribute to position. Reporting dates are used as exported, not assumed to be Korean midnight dates.
- Exposure and clicks improved, but recent aggregate position worsened. With only four recent clicks, neither broad ranking recovery nor a site-wide technical decline is established. Query/page mix may differ, and the export does not provide matched weekly page/query cohorts to isolate the cause.
- The previous review's latest window was **Oct 6–12**, not the current **Oct 7–13** prior window. The current non-overlapping seven-day comparison is calculated entirely from this new daily chart.
- Visible query table: **209 rows / 549 impressions / zero clicks**, compared with the historical Oct 15 record's 195/507/zero. This is the visible query table, not all query traffic. It does not identify the queries behind the 18 property clicks. Do not replace property totals with query-row totals or infer no search clicks.
- Top visible queries (impressions / position): `timing belt calculator` **62/69.31**, `first layer thickness calculator` **22/13.82**, `3d printer warping` **20/65.85**, `line width` **17/33.76**, `calculate timing belt` **14/77.57**. More targeted examples include `line width 3d printing` **9/16.11**, `volumetric flow calculator` **9/65.22**, and `3d model scaler` **5/8.80**. These are whole-period query metrics, not page-attributed weekly cohorts.
- Page table: **68 rows / 2,698 page impressions / 18 clicks**. Page impressions are not substituted for property impressions. An extra performance row since the prior 67-row export does **not** mean a new public page was created. Inventory remains 82/42.

| Page | Impressions | Clicks | Exported CTR | Position |
|---|---:|---:|---:|---:|
| Line Width | 454 | 12 | 2.64% | 19.02 |
| Required Printer Count | 318 | 1 | 0.31% | 8.25 |
| Homepage | 236 | 0 | 0% | 68.58 |
| Timing Belt Length | 228 | 0 | 0% | 71.49 |
| Model Scale | 222 | 2 | 0.90% | 27.98 |
| Print Time | 179 | 0 | 0% | 41.90 |
| Layer Count | 43 | 1 | 2.33% | 11.65 |
| Volumetric Flow | 38 | 0 | 0% | 51.89 |
| Scale to Fit Build Volume | 14 | 0 | 0% | 35.43 |

- Historical Oct 15 record → current cumulative checkpoints: Line Width **382/10/20.49 → 454/12/19.02**; Required Printer Count **210/1/8.70 → 318/1/8.25**; Model Scale **146/1/26.91 → 222/2/27.98**; Layer Count **41/0/12.05 → 43/1/11.65**; Flow **30/0/49.33 → 38/0/51.89**. Period extends Jul 21–Oct 12 to Jul 21–Oct 20; these are directional cumulative checkpoints, **not matched seven-day page changes or causal uplift**.
- Devices over the entire 92 days: desktop **2,154 impressions/13 clicks**, mobile **431/five**, tablet **seven/zero**. Country and device totals each reconcile to property totals; page clicks also reconcile, while page impressions and visible-query totals retain their separate aggregation. Device samples do not prove an actual layout defect or justify a global design change.
- Search data ends **Oct 20**, before the **Oct 23** Scale to Fit deployment. These metrics cannot measure that fix's impact. The recently corrected Flow/Layer Count/Required Printer Count should likewise be observed with fresh matched evidence rather than automatically rewritten.

## Coverage and GA4

- Coverage: **16 → 15 on Aug 18 → 12 on Sep 22**, stable through **Oct 16**. Latest and preceding seven-day chart windows are both 12. Same status count as the Oct 15 review (through Oct 9). Status removal alone is not proof of indexing; **82 minus 12 is not an indexed count**.
- GA4: **23 active users / 19 new / 137.5652 seconds average engagement per active user / 228 events**.
- First-user source/medium active users: **Google organic 11 / direct 11 / Findly.tools (not set) 1**. Session source/medium: **Google organic 15 / direct 10 / Findly.tools (not set) 1**. Referral attribution is present but meaningful engagement is not verified.
- Prior GA4 Sep 17–Oct 14: 22 active / 17 new / 144.2273 seconds / 242 events; Google organic first-user 10 / sessions 14. Current Sep 25–Oct 22 overlaps by 20 days; +1 organic user/session is a snapshot difference, **not disjoint weekly growth**.
- Current page views/users: Line Width **19/9**, Required Printer Count **16/2**, homepage **12/7**, Model Scale **9/3**, Print Farm Capacity **8/1**, Print Cost **7/1**, Tools **7/1**, About **7/1**. Many tools have seven views from one user. Previous/current live QA may contaminate direct and page views; they are not organic demand.
- Supplementary queries remain `3d slicer scale factor?` (one impression/zero clicks/position six), `toy printing calculator` (one/zero/nine), and the 21 g filament price question (one/zero/six). Pages remain homepage, Filament Cost, Model Scale, one impression/zero clicks each. Unverified period/platform; not a fresh GSC or Bing growth claim.

## Existing candidates and expansion decision

1. **Scale to Fit Build Volume — FIX COMPLETED, technical correctness.** Current GSC **14 impressions/zero clicks/35.43**; page-specific query attribution unavailable. Public zero/blank input visibly produced invalid results, independently sufficient for Priority A. No SEO rewrite or demand claim. The report predates the deployment.
2. **Model Scale — HOLD / next focused review candidate.** Current GSC **222 impressions/two clicks/27.98**, versus historical cumulative 146/one/26.91; overall `3d model scaler` five impressions/8.80 is not a joined page/query cohort. Current GA4 nine views/three users is not organic intent. A narrow Reset/input-helper gap may merit a later focused review, but the new export does not justify adding another product change after this week's completed Priority A fix.
3. **Line Width — OBSERVE.** Current GSC **454 impressions/12 clicks/19.02**, versus historical cumulative 382/ten/20.49; current GA4 19 views/nine users. It remains the leading clicked page in this export. Recent upgrade is not reopened without a demonstrated new defect; cumulative extension is not causal proof.

Expansion considered **yes**, discovery entered **no** because Priority A wins. **0 new discovery families / 0 mid / 0 deep / 0 cluster**; this is not a claimed 40-family expansion NO-GO. The now-complete Performance review does not alter that choice. Low traffic or indexing delay is not an expansion veto. No historical family renamed or reopened.

## Public reproduction and targeted correction

- Target `/tools/geometry/scale-to-fit-build-volume-calculator/`. Default control: model 220/180/250 mm, build 256/256/256 mm, clearance five per side → **98.4%, Z limiting, 216.5 × 177.1 × 246 mm**.
- Before fix: all three model dimensions zero → **infinity percent / NaN × NaN × NaN mm**, no error, Copy/Print enabled. One zero or blank model X was silently accepted as zero. Clearance zero separately gives valid **102.4%**.
- Root cause: all seven values shared a non-negative check even though six dimensions must be strictly positive; `Number('')` treated a missing value as zero. Division by zero and non-finite derived arithmetic were not guarded.
- Target-only fix: require every field; strictly positive model/build dimensions; non-negative clearance leaving usable space on every axis; positive finite axis ratios, scale percent and final dimensions. No arbitrary printer/product thresholds or live specs.
- Invalid state clears stale results and disables Copy/Print. Target-only Reset restores defaults. Print gains the canonical URL and a note on fixed orientation, both-side clearance, rotation, supports/brims and real keep-outs; seven live input values/units and result breakdown are retained.
- Shared runtime changes are conditional on `scale-to-fit`; other formulas unchanged. Only target HTML and its Phase 5 generator gain cache version `20261023`; generator checked in memory, not run over unrelated pages. Titles/H1/meta/canonical/OG/GA4/defaults/content/links/CSS/sitemap unchanged.

## Pre-push quality gate

- New regression failed on original runtime before correction. After fix: **six known cases / 108 normal combinations / 61 invalid or range cases** PASS, covering blank/text/non-finite/negative/zero, clearance exhaustion, numeric underflow/overflow, safe large values, limiting axes and ties, stale clearing and action guards.
- All **ten** repository suites PASS: static, content reachability, general calculators, Layer Count, Volumetric Flow, Scale to Fit, Production Planning, Motion Mechanics, Filament Recycling, Print. Print contract **42/42**, syntax/whitespace checks PASS.
- Extended integrity **82/82 public/indexable/canonical/sitemap/reachable**; internal paths/fragments, unique titles/descriptions, OG, duplicate IDs, GA4 and accidental noindex checked. JSON-LD count remains zero. Protected existing extra homepage closing `div` remains a documented raw-markup exception; not a flawless full-site markup claim. Old Tools utility text “Twenty-one tools” also preserved.
- Public **12 Coverage URLs** all Googlebot-UA HTTP 200, self-canonical, no noindex header/meta, one GA loader. UA probe is not authenticated Googlebot or indexing proof. HTTP apex and HTTPS www end at HTTPS apex; robots permits `/`; sitemap 82.
- Existing Chrome + bundled Playwright only; no install/settings change. Local **11 pages × six widths = 66 combinations**, **42 finite defaults**, **six changed-input/restore controls**, target Copy/Reset/focus/menu and 20 browser invalid-input cases PASS. Actual widths **1440/1280/1024/900/768/390**. No overflow, clipped control/brand, header/H1 overlap, captured JS/console error or first-party resource failure. Required homepage/Tools/Filament/Cost/Settings/Geometry/About screenshots visually inspected.
- Initial local browser run hit sandbox-denied external resources; rerun with network permission passed without filtering errors. An initial suite command used an incorrect legacy test filename; rerun with the actual Production Planning/Motion Mechanics/Recycling filenames passed. These were QA harness invocation issues, not hidden product fixes.
- Print: model 100/80/50, build 220/200/180, clearance ten → **200%, X limiting, 200 × 160 × 100 mm**. Copy and print record checked. Actual headless Chrome A4 PDF **one page**, seven current values/units, title/result/breakdown/URL/note, no controls/navigation/footer; extracted text and Poppler-rendered page inspected. Multiplication signs render correctly (PDF text extraction alone substitutes some glyphs). Physical printer/interactive native dialog untested.
- Homepage source, CSS, sitemap, robots and llms unchanged against synchronized start. KittyLaunch, LaunchBuff, BoostDomainRating, Sell With Boost, Twelve Tools, Findly and other user-managed links/order/styles remain untouched. No API/DB/new dependency/private report/local absolute path added to Git.

## Deployment

- Implementation commit **`880767e88f5bad00aedb82baf50cd343246741de`**, `Fix scale-to-fit validation and non-finite results`, pushed successfully. Local HEAD/cached origin/main/actual remote matched that SHA; clean tree before this documentation-only closeout.
- GitHub Pages [run 39882861225](https://github.com/canghun13/makerprinttools/actions/runs/39882861225) **completed successfully for that exact SHA**. Public target HTML and `site.js?v=20261023` HTTP 200; public runtime equals committed source after line-ending normalization.
- Actual public Chrome QA PASS: **66/66 responsive combinations at 1440/1280/1024/900/768/390px, 42/42 finite calculator defaults, six changed-input/restore controls**, target Copy/Reset/focus/mobile menu, 20 invalid-input browser cases, clearance-zero control, exhausted clearance, text and unsafe arithmetic. Zero captured console/page errors or first-party resource failures.
- Public default remains **98.4%**; custom seven-input example gives **200% / X / 200 × 160 × 100 mm**, Copy includes the breakdown and Reset restores defaults. Additional actual-390px edge check: million-mm normal dimensions retain a finite size without overflow; all three zero model dimensions now show an error and em dash, clear numeric details and disable Copy/Print, no overflow or JS error. Desktop invalid-state and mobile full-page screenshots inspected.
- Public A4 Chrome PDF **one page**; all seven current input values/units, title, 200% result/breakdown, canonical URL and method/limitation note retained. Controls/navigation/footer absent; extracted text and Poppler rendering checked. A first PDF assertion incorrectly matched the explanatory sentence's word `Calculate` as a button; corrected to an exact standalone control-label check, then PASS without product/PDF change. Physical printer/interactive native dialog remain untested.
- Public Homepage/Tools/Filament/Cost/Settings/Geometry/About screenshots visually inspected. No product changes after public QA. Homepage/badges/order/styles, CSS, sitemap/robots/llms remain unchanged against synchronized start; QA-created browser instances and local servers closed, user browser/settings not changed.
- Original implementation closeout **`b8624b1512d4fee9c3ab97fb3bbbcff2f342bab8`** recorded public QA before the delayed Performance attachment arrived; [Pages run 39883189995](https://github.com/canghun13/makerprinttools/actions/runs/39883189995) succeeded. The follow-up below resolves that historical pending item.

## Delayed Performance supplement closeout

- Clean follow-up start: local/cached/actual remote `b8624b1512d4fee9c3ab97fb3bbbcff2f342bab8`, verified remote URL, actual SHA before fetch, 0/0, safe pull already up to date. Same full handover reviewed in the original task; current operational state and exact source continuity checked again for this supplement.
- Seven CSVs parsed with quoted/multiline fields preserved; 92 consecutive dates, all 68 page URLs on the correct MakerPrintTools origin. Independent JavaScript and Python CSV calculations agree on total and both seven-day metrics. Country/device/property totals reconcile. No raw report, extraction or analysis helper committed.
- Documentation-only change to this research and `handover.md`; public source/assets/sitemap/user-managed area unchanged from the fully QA-verified implementation. Existing visual/A4 results remain applicable because their source and dependencies are unchanged. No new tool/page, SEO rewrite, expansion, dependency, API/DB or environment change.
- Follow-up pre-push QA PASS: all ten repository suites, extended 82-page integrity, 42 Print contracts and whitespace/scope checks. Protected legacy homepage markup finding remains unchanged. Public implementation remains the already deployed Scale to Fit fix. Supplement commit/push and final SHA/Pages status are verified at closeout; resolve the documentation-only commit with `git log -1`.

## Next state

1. Observe the mixed **336 impressions/four clicks/22.1071 position** recent seven-day signal with the next export; obtain matched week-by-page/query evidence if a specific growth intervention is considered.
2. Observe corrected Scale to Fit and recent Flow/Layer Count/Required Printer Count; no automatic repeat rewrite.
3. Reconsider Model Scale only with a verified narrow user/search value gap; track Coverage and organic sessions without treating QA/direct views as demand.
