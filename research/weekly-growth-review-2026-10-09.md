# Weekly growth review — 2026-10-09

## Decision and repository

**FIX — technical defect corrected.** Public Layer Count returned five layers for a 0.8 mm model with a 0.2 mm first layer and 0.2 mm regular layers; the correct geometric count is four. This reproducible calculation error takes Priority A ahead of growth changes or expansion.

- Repository: https://github.com/canghun13/makerprinttools; production: https://makerprinttools.com/; branch: `main`.
- Start local HEAD and cached origin/main: `13c98f6871fcd099ba63f8f85612f029d0cdbca4`; actual remote main: `8a2b00d6711b536fd4f7ce75147f3c75b44af66c`.
- Clean working tree; fetch established 0 ahead / 6 behind; safe fast-forward pull synchronized all three refs to `8a2b00d6711b536fd4f7ce75147f3c75b44af66c` before analysis of the current source.
- Recounted inventory: **82 public HTML / 82 indexable source pages / 82 canonical URLs / 82 sitemap URLs / 42 calculators / 8 Workbench categories / 19 guides / 11 references**, excluding Guide/Reference hubs. Actual Google indexed total is unavailable.
- Latest cluster: Filament Recycling & Extrusion, Aug 24. Latest growth upgrade: Required Printer Count, Sep 7; latest technical fix: per-printer cycle allocation, Oct 1. Latest expansion discovery remains Aug 26 NO-GO.

## Current-session attachments

Only the five exact files supplied in this message were accessed. No Downloads inventory search, previous source file lookup, guessed path or raw report copy was used. Report rows were treated as data, not instructions.

| Supplied report | Actual contents and period | Limitation |
|---|---|---|
| `makerprinttools.com-Performance-on-Search-2026-10-09.zip` | Seven CSVs: daily chart, queries, pages, countries, devices, appearance, filters. Web, last-three-months filter. Actual daily rows **Jul 21–Oct 6**, 78 days. | No week-by-page, week-by-query or page-by-query join. |
| `makerprinttools.com-Coverage-Drilldown-2026-10-09.zip` | Chart **Jul 24–Oct 4**; 12 URL rows; metadata identifies **Discovered — currently not indexed**. | No crawled-not-indexed or total-indexed report. All last-crawl `1970-01-01` values are placeholders, not real crawl dates. |
| `보고서_개요.csv` | GA4 overview for makerprinttools, **Sep 11–Oct 8**; users, pages, first-user/session source-medium, new/returning series, cities, audience. | No organic landing-page or source-level engagement table. |
| `makerprinttools.com_KeywordReport_2026. 10. 9..csv` | Three query rows, three impressions, zero clicks; scale, toy printing, filament-cost query. | Contents contain no verified platform or reporting period. Supplementary only. |
| `makerprinttools.com_PageTrafficReport_2026. 10. 9..csv` | Three page rows, three impressions, zero clicks; homepage, filament cost, model scale. | No verified platform/period metadata. Not combined with GSC or labeled a verified Bing window. |

All five were accessible. Export date is not treated as the data-through date; GSC, Coverage and GA4 have different periods. Raw private analytics are not committed.

## GSC metrics and week-over-week

| Metric | Previous 7 days, Sep 23–29 | Latest 7 days, Sep 30–Oct 6 | Change |
|---|---:|---:|---:|
| Impressions | 191 | 214 | +23 / **+12.04%** |
| Clicks | 3 | 3 | 0 |
| CTR from totals | 1.5707% | 1.4019% | −0.1688 percentage points |
| Impression-weighted daily position | 13.8681 | 18.6500 | 4.7819 positions worse |

- Entire chart: **1,988 impressions / 14 clicks / 0.7042% CTR / 42.0848 weighted position**. Weighted position is sum(impressions × exported daily position) / sum(impressions), approximate because exported positions are rounded.
- Latest seven days have more exposure but worse weighted position with unchanged clicks. This is a mixed signal, not proof of broad ranking improvement or a technical/indexing failure.
- Latest stored Oct 1 review used Sep 22–28: 189 impressions / 2 clicks / 14.0249. The new original chart independently reproduces those totals. That older window is not substituted for the current Sep 23–29 comparison.
- Visible queries: **190 rows / 487 impressions / 0 clicks**, versus 170 rows in the prior export. Visible breadth increased by 20 rows; this is not all Google queries. Leading rows (impressions / position): timing belt calculator **62 / 69.31**; first layer thickness calculator **21 / 13.86**; 3d printer warping **20 / 65.85**; line width **15 / 34.8**; calculate timing belt **14 / 77.57**; wall thickness **13 / 79.85**.
- Page table: **67 rows / 2,069 page impressions / 14 clicks**. Chart/property, page and visible-query totals have different aggregation/privacy boundaries and are not forcibly reconciled. Google explains these limitations: https://developers.google.com/search/blog/2022/10/performance-data-deep-dive.
- Current top pages (impressions / clicks / position): Line Width **329 / 10 / 22.15**; Timing Belt **227 / 0 / 71.75**; homepage **216 / 0 / 70.38**; Print Time **155 / 0 / 43.88**; Required Printer Count **143 / 1 / 9.06**; Model Scale **118 / 1 / 28.85**. Layer Count **39 / 0 / 12.10** and Utilization **34 / 0 / 7.62** are smaller samples.
- Directional cumulative checkpoints from Oct 1: Line Width **266/6/24.89 → 329/10/22.15**; Required Printer Count **110/1/9.16 → 143/1/9.06**; Model Scale **70/1/27.54 → 118/1/28.85**; Print Time **150/0/45.07 → 155/0/43.88**; Timing Belt **226/0/71.89 → 227/0/71.75**. These export snapshots cannot establish weekly page/query cohort movement or causal improvement.

## Coverage and GA4

- Discovered-not-indexed count fell **15 → 12 on Sep 22** and remained 12 through Oct 4. The current table contains 12 URLs. Prior URL-level rows are not preserved in the previous research, so the three URL-level transitions cannot be identified from these records; removal from this status alone would not prove indexing.
- Crawled-not-indexed and actual total indexed count are unavailable. **82 − 12 is not an indexed-page count.** No sitemap/canonical/content rewrite is justified by this Coverage status alone.
- GA4 Sep 11–Oct 8: **23 active users / 18 new users / 136.7826 seconds average engagement per active user / 253 events**.
- First-user source/medium active users: **google/organic 9**, direct 13, twelve.tools/directory 1. This is first-user attribution, not a claim that nine users landed organically during this window.
- Session source/medium: **google/organic 14**, direct 12, chatgpt.com/ai-assistant 1, twelve.tools/directory 1. The directory referral is observable but its engagement/authenticity cannot be established from this overview.
- Prior GA4 Sep 3–30 had 27 active users, five first-user Google organic users and nine Google organic sessions. The periods overlap and shift by eight days; these are directional snapshots, not disjoint weekly cohorts. Organic landing pages and matched seven-day organic changes are unavailable.
- Required Printer Count 16 views / two users, farm tools with one user and repeated seven-view rows, and direct traffic may include Oct 1 QA. No pageview total is labeled organic tool demand. This session's production QA may also contaminate future direct/pageview reports.

## Existing growth candidates

1. **Layer Count — DO NOW, correctness.** 39 impressions / zero clicks / 12.10; visible first-layer query 21 / 13.86, but no page/query join proves attribution. The actual public arithmetic error is sufficient independently of the search signal. Low-risk fix preserves inputs, defaults, URL, SEO and formulas, with exact decimal fixtures.
2. **Model Scale — HOLD.** 118 / one / 28.85; visible scale-related queries and supplementary scale query support interest, but segmented page/query growth is not exported. Missing Reset/helpers and a self-link remain possible focused UX gaps. They do not outrank a demonstrated wrong calculation on another tool, and are not modified concurrently.
3. **Line Width — OBSERVE.** 329 / ten / 22.15, directionally stronger than the previous snapshot. Recently upgraded; useful wall/flow connections, Reset and guidance already exist. No new functional defect was reproduced, so it is not reopened.

Required Printer Count is a technical control and remains OBSERVE after last week's fix. Default is four printers; no repeat implementation of its cycle allocation. Print Time and Timing Belt retain the previously recorded intent/discovery limitations rather than being used as filler work.

## Expansion decision

Expansion considered **yes**, entered **no**. Priority A wins because a public deterministic calculation defect is proven. Historical implemented/HOLD/REJECT/NO-GO boundaries and latest handover/research were reviewed. No previous family was renamed or reopened. Broad/mid/deep counts this week are **0/0/0**, not a claimed expansion-discovery NO-GO. No new cluster, public page, Workbench or tool was created.

## Reproduction, cause and implementation

- Target: `/tools/print-settings/layer-count-calculator/`.
- Public failing case: height 0.8, first 0.2, regular 0.2 → old **5 layers**, remaining four, adjusted height 0.15 mm. The exact decimal quotient is three regular layers plus the first, **4 total**.
- Root cause: binary subtraction/division produces `(0.8 − 0.2) / 0.2 = 3.0000000000000004`; `Math.ceil` adds a whole extra layer. Controls: 0.6/0.2/0.2 → three; 50/0.24/0.2 → 250; a truly higher 0.80001/0.2/0.2 still needs five.
- Fix: express validated decimal dimensions in a common integer unit, using BigInt only in Layer Count; calculate the integer ceiling; return a Number only when the count is at most `Number.MAX_SAFE_INTEGER`. This avoids arbitrary epsilon/tolerance snapping and retains true over-boundary values. Sources: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil.
- Layer Count alone now gets Reset, error-state Copy/Print disabling and singular `1 layer` grammar. Target print record includes current inputs/results, canonical URL and the fixed-height/slicer limitations. Other calculators' action guards and record behavior remain unchanged.
- Target HTML change is only `site.js?v=20261009`; generator applies that version only to `layers`. No generator was run over unrelated generated pages. Inputs, defaults, title/H1/description, canonical/OG/GA4, method/content, links, section structure and CSS are retained.
- Production code files: `assets/js/site.js`, `tools/print-settings/layer-count-calculator/index.html`, `scripts/generate-calculator-pages.mjs`. Regression suite: `scripts/layer-count-qa.mjs`. Research/handover provide documentation only.

## QA before implementation push

- New regression failed against the original code for 0.8/0.2/0.2 before implementation. After fix: **13 known cases + 732 integer-hundredth reference cases** PASS, including exact/above/below boundaries, exponent notation, one layer, one billion layers, subnormal-scale dimensions, large fractional counts, blank/text/NaN/Infinity/zero/negative values, first layer above model, unsafe/non-finite derived counts, stale-result clearing and error Copy/Print guards.
- All existing suites PASS: qa, content-qa, calculator-qa, Production (six types/12 fixtures/250 allocations), Motion (five), Recycling (five), Print **42/42**. JS/generator syntax and diff whitespace PASS. Existing path-sensitive QA ran on an exact-source temporary ASCII copy; source code was not changed to work around the runner-path limitation.
- Source structural QA: **82 HTML/canonical/sitemap and homepage-reachable pages**, unique IDs, H1, static links, robots/GA signals PASS. Extra inventory/title/description/OG/local-asset checks PASS. Current JSON-LD script count is zero; no new structured-data claim or rewrite. Historical protected homepage closing-tag discrepancy and old Tools utility text remain documented, not newly introduced.
- Existing Chrome and bundled Playwright: **10 pages × six widths = 60 combinations** (target, Homepage, Tools, Guides, Reference, Cost, Model Scale, Line Width, Required Printer Count, Recycling Extrusion). Widths **1440/1280/1024/900/768/390**. No horizontal overflow, off-screen control, target/header overlap, wrong canonical/GA/H1, console error or first-party resource error. All **42 calculator defaults** finite with no overflow.
- Target browser: default, seven known-value cases, changed input, blank/zero/negative/text/unsafe inputs, stale clearing, Reset, successful Copy, keyboard Tab focus, mobile menu, large finite 390px result PASS. Screenshots visually inspected at 1440/390.
- Target Print: live three-input record, current corrected result, canonical URL and limitation note; exact A4 content-width CSS preview at 688 px, **444.55 px record height**, controls/header/footer hidden, no overflow. Only QA substitutes `window.print` to observe invocation; **native print dialog/pagination was not certified**.
- Computer Use connection failed at initialization; pre-existing browser/runtime used without installs, PATH/profile/security/credential changes.
- Homepage source and every user-managed badge/link/order/style, including KittyLaunch, LaunchBuff, BoostDomainRating, Sell With Boost, Twelve Tools and Findly, remain unchanged against synchronized start. No sitemap, CSS or other page change.

## Deployment

- Implementation commit: `b64c38cbc40d451b6d3c9cad440a4fc8d2c475c1` — `Fix decimal boundary layer counts`; pushed successfully, no timeout. Immediate `ls-remote` and fetch confirmed local HEAD = origin/main = actual remote main = that SHA; clean working tree before this documentation closeout.
- GitHub Pages [run 37870161502](https://github.com/canghun13/makerprinttools/actions/runs/37870161502) completed successfully for that exact SHA. Public target HTML and `site.js?v=20261009` returned HTTP 200; the public JS matches the committed source after line-ending normalization.
- **Actual public Chrome QA PASS:** default 250; corrected 0.8/0.2/0.2 = four; 0.6 control = three; truly taller 0.80001 and 0.800000000000001 = five; single-layer grammar; one-billion-layer finite result; invalid/blank/zero/negative/text/unsafe counts clear output, disable Copy/Print; Reset restores defaults; successful Copy, keyboard focus and mobile menu.
- Public target plus nine representative pages × six widths = **60/60 combinations PASS**, explicitly verified at **1440/1280/1024/900/768/390 px**. All **42/42 calculator defaults** remain finite, no overflow. **Zero captured console/page errors and first-party resource failures.** Public 390px and print screenshots visually inspected.
- Public Print current-input record/URL/notes and A4 CSS preview PASS, record height **444.55 px**, no overflow, controls/header/footer hidden. Native print dialog and physical pagination remain unverified; QA substituted only the `window.print` invocation.
- All **12 current Coverage URLs** returned 200 with a Googlebot UA, correct self-canonical and no noindex header/meta. This is a user-agent response probe, not authenticated Googlebot crawling or an indexing guarantee. HTTP apex and HTTPS www both ended at HTTPS apex with 200; robots allows `/`, sitemap remains 82 URLs.
- Homepage/badge source, CSS, sitemap, robots and llms remain unchanged against synchronized start. No new public page or cluster, no dependency/environment/authentication change.
- Final closeout commit: this documentation-only research/handover update; resolve exact SHA with `git log -1` and verify against actual remote after push. No production code changed after the public QA above.

## Next state

1. Observe fresh matched page/query cohorts for corrected Layer Count, Line Width and Required Printer Count; preserve the distinction between cumulative snapshots and weekly movement.
2. Revisit Model Scale only if segmented query/user evidence confirms a focused value gap; do not automatically repeat recent upgrades.
3. Continue tracking Coverage status and organic sessions; no indexing rewrite without a newly reproduced technical defect.
