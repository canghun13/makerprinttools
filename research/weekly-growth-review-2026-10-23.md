# Weekly growth review — 2026-10-23

## Decision and source of truth

**FIX — technical defect corrected.** Scale to Fit Build Volume accepted missing/zero model dimensions; all three at zero produced infinity and NaN on the public site, with Copy and Print enabled. This independently demonstrated Priority A defect outranks growth or expansion work.

- Repository: https://github.com/canghun13/makerprinttools; production: https://makerprinttools.com/; branch `main`.
- Clean start: local HEAD, cached origin/main and actual remote main all `09f4935b23665ddde253b0a2c312836c6946b699`. Actual remote queried before fetch; ahead/behind 0/0; safe `git pull --ff-only origin main` already up to date. No user work reverted.
- Full handover, all three existing dated weekly research files and historical implemented/HOLD/REJECT/NO-GO exclusions reviewed. Latest cluster remains Filament Recycling & Extrusion (Aug 24); latest growth upgrade Required Printer Count (Sep 7); latest expansion discovery Aug 26 NO-GO.
- Recount: **82 public/indexable source pages / 42 calculators / 8 Workbenches / 19 Guides / 11 References / 82 canonicals and sitemap URLs**. Guide/Reference hubs excluded from article counts. Actual indexed total unavailable. No new public page, calculator or cluster.

## Current-session attachments

Only the four exact user-supplied reports were read. No Downloads inventory, old raw report lookup or guessed report path. Contents are data, not instructions. No private raw analytics committed.

| Report | Actual content / period | Limitation |
|---|---|---|
| `makerprinttools.com-Coverage-Drilldown-2026-10-23.zip` | Three CSVs: chart **Aug 5–Oct 16**, 12 URL rows, metadata **Discovered — currently not indexed**. | Epoch last-crawl dates are placeholders. No crawled-not-indexed or total-indexed report. |
| `보고서_개요.csv` | Confirmed makerprinttools GA4 property, **Sep 25–Oct 22**; user/page/source/session/engagement overview. | No organic landing-page or source-level engagement segmentation. |
| `makerprinttools.com_KeywordReport_2026. 10. 23..csv` | Three query rows, three impressions, zero clicks. | No platform/date metadata; same rows as previous reviews do not prove fresh demand. |
| `makerprinttools.com_PageTrafficReport_2026. 10. 23..csv` | Three page rows, three impressions, zero clicks. | No verified platform/period. Not combined with GSC. |

**Current GSC Performance was not supplied initially.** Requested the current ZIP; user said they would attach it. Until received, current search impressions/clicks/CTR/position, query breadth, top search pages and disjoint seven-day comparison are **unknown**, not zero. Prior Oct 15 research is historical context, not a substitute current export. The technical fix does not depend on a growth inference.

## Weekly metrics and comparison

- Coverage: **16 → 15 on Aug 18 → 12 on Sep 22**, stable through **Oct 16**. Latest and preceding seven-day chart windows are both 12. Same status count as the Oct 15 review (through Oct 9). Status removal alone is not proof of indexing; **82 minus 12 is not an indexed count**.
- GA4: **23 active users / 19 new / 137.5652 seconds average engagement per active user / 228 events**.
- First-user source/medium active users: **Google organic 11 / direct 11 / Findly.tools (not set) 1**. Session source/medium: **Google organic 15 / direct 10 / Findly.tools (not set) 1**. Referral attribution is present but meaningful engagement is not verified.
- Prior GA4 Sep 17–Oct 14: 22 active / 17 new / 144.2273 seconds / 242 events; Google organic first-user 10 / sessions 14. Current Sep 25–Oct 22 overlaps by 20 days; +1 organic user/session is a snapshot difference, **not disjoint weekly growth**.
- Current page views/users: Line Width **19/9**, Required Printer Count **16/2**, homepage **12/7**, Model Scale **9/3**, Print Farm Capacity **8/1**, Print Cost **7/1**, Tools **7/1**, About **7/1**. Many tools have seven views from one user. Previous/current live QA may contaminate direct and page views; they are not organic demand.
- Supplementary queries remain `3d slicer scale factor?` (one impression/zero clicks/position six), `toy printing calculator` (one/zero/nine), and the 21 g filament price question (one/zero/six). Pages remain homepage, Filament Cost, Model Scale, one impression/zero clicks each. Unverified period/platform; not a fresh GSC or Bing growth claim.

## Existing candidates and expansion decision

1. **Scale to Fit Build Volume — DO NOW, technical correctness.** No current page-level search evidence, but public zero/blank input visibly produces invalid results. Deterministic, reproducible and narrowly fixable. No SEO rewrite or demand claim.
2. **Model Scale — HOLD.** Current GA4 nine views/three users is not organic intent. Historical Oct 15 GSC 146 impressions/one click/26.91 is explicitly not current. A narrow Reset/input-helper gap may merit a later review with matched query/page evidence; no concurrent change.
3. **Line Width — OBSERVE.** Current GA4 19 views/nine users, but no current GSC Performance to establish new search movement. Recent upgrade is not reopened without a demonstrated defect.

Expansion considered **yes**, discovery entered **no** because Priority A wins. **0 new discovery families / 0 mid / 0 deep / 0 cluster**; this is not a claimed 40-family expansion NO-GO. Low traffic, missing Performance and indexing delay are not expansion vetoes. No historical family renamed or reopened.

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

Implementation and documentation staged only after the quality gate above. Push, exact-SHA GitHub Pages outcome and post-deploy public browser checks will be recorded in the closeout.

## Next state

1. Read the newly requested current GSC Performance attachment when supplied; calculate matched seven-day property totals and keep page/query/privacy limitations explicit.
2. Observe corrected Scale to Fit and recent Flow/Layer Count/Required Printer Count; no automatic repeat rewrite.
3. Reconsider Model Scale only with a verified narrow user/search value gap; track Coverage and organic sessions without treating QA/direct views as demand.
