import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ga = '<script async src="https://www.googletagmanager.com/gtag/js?id=G-T6DZFFQJP3"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag(\'js\',new Date());gtag(\'config\',\'G-T6DZFFQJP3\');</script>';
const header = '<a class="skip-link" href="#main">Skip to content</a><div class="utility-bar">Measure twice. Slice once.</div><header class="site-header"><nav class="nav-shell"><a class="brand" href="/"><span class="brand-mark">MP</span>MakerPrintTools</a><button class="nav-toggle" aria-expanded="false">Menu</button><div class="nav-links"><a aria-current="page" href="/tools/">Tools</a><a href="/guides/">Guides</a><a href="/about/">About</a><a href="/contact/">Contact</a></div></nav></header>';
const footer = '<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a class="brand" href="/"><span class="brand-mark">MP</span>MakerPrintTools</a><p>Practical calculators for everyday 3D printing decisions.</p></div><div><strong>Workbench</strong><ul><li><a href="/tools/">All tools</a></li><li><a href="/tools/production/">Production planning</a></li></ul></div><div><strong>Site</strong><ul><li><a href="/about/">About</a></li><li><a href="/privacy/">Privacy</a></li><li><a href="/contact/">Contact</a></li></ul></div></div><div class="fine-print">© 2026 MakerPrintTools. Planning results are estimates; verify critical schedules.</div></div></footer><script src="/assets/js/site.js"></script><script src="/assets/js/production-planning.js"></script>';
function documentPage({ url, title, description, body }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | MakerPrintTools</title><meta name="description" content="${description}"><meta name="robots" content="index,follow"><link rel="canonical" href="https://makerprinttools.com/${url}"><meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="https://makerprinttools.com/${url}"><meta property="og:site_name" content="MakerPrintTools"><link rel="icon" href="/assets/icons/favicon.svg"><link rel="stylesheet" href="/assets/css/site.css">${ga}</head><body>${header}<main id="main">${body}</main>${footer}</body></html>`;
}
const links = '<div class="related"><a href="/tools/production/">Production Planning Tools</a><a href="/tools/cost/batch-print-cost-calculator/">Batch Print Cost</a><a href="/tools/business/break-even-units-calculator/">Break-even Units</a><a href="/tools/cost/machine-depreciation-calculator/">Machine Depreciation</a><a href="/tools/print-settings/print-time-estimator/">Print Time Estimator</a><a href="/tools/cost/failed-print-cost-calculator/">Failed Print Cost</a><a href="/guides/small-print-farm-scheduling/">Small Print Farm Scheduling Guide</a><a href="/reference/print-farm-capacity-reference/">Capacity Reference</a></div>';
const pct = (id, label, value, note = '') => `<div class="field"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="number" min="0" max="100" step="0.1" value="${value}">${note ? `<small>${note}</small>` : ''}</div>`;
const num = (id, label, value, note = '', step = '1') => `<div class="field"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="number" min="0" step="${step}" value="${value}">${note ? `<small>${note}</small>` : ''}</div>`;
const calculators = [
  {
    slug: 'print-farm-capacity-calculator', type: 'farm-capacity', title: '3D Print Farm Capacity Calculator', tag: 'Production planning',
    description: 'Calculate theoretical, availability-adjusted, and productive printer-hours for a 3D print farm schedule.',
    lede: 'Separate installed time from the time your farm is likely to be available and doing useful production work.',
    fields: num('printers', 'Number of printers', 4) + num('hoursPerDay', 'Scheduled operating hours per day', 16, '', '0.1') + num('days', 'Operating days', 7, '', '0.1') + pct('availability', 'Expected availability (%)', 90, 'Time the printers are able to run as planned.') + pct('utilization', 'Expected productive utilization (%)', 80, 'Share of available time assigned to productive printing.'),
    formula: 'Theoretical printer-hours = printers × scheduled hours/day × days. Availability-adjusted hours then apply availability; productive hours apply utilization after that.',
    use: 'Use the three layers together when checking whether a quoted delivery window has enough capacity. Availability covers outages and maintenance; utilization covers waiting, changeovers, and deliberately unassigned time.',
    example: 'Four printers scheduled for 16 hours across seven days offer 448 theoretical printer-hours. At 90% availability and 80% productive utilization, the plan has 322.56 expected productive hours.',
    assumptions: 'Each printer-hour is treated as equivalent. For mixed printers, convert each machine to compatible workload hours before combining them.',
    limitation: 'This is a planning capacity estimate, not a prediction of individual job finish times.',
    mistake: 'Do not multiply only one generic efficiency percentage and call it utilization: downtime and idle or turnaround time point to different operational fixes.'
  },
  {
    slug: 'required-printer-count-calculator', type: 'required-printers', title: 'Required Printer Count Calculator', tag: 'Production planning',
    description: 'Estimate how many compatible 3D printers are required to deliver a batch by a deadline after yield and capacity losses.',
    lede: 'Translate a good-unit target and delivery date into a count of compatible printers and the capacity margin behind it.',
    fields: num('goodUnits', 'Required good units', 120) + num('partsPerCycle', 'Parts per print cycle', 4) + num('cycleHours', 'Print cycle time (hours)', 6, '', '0.1') + num('days', 'Days until deadline', 5, '', '0.1') + num('hoursPerDay', 'Operating hours per day', 16, '', '0.1') + pct('availability', 'Availability (%)', 90) + pct('utilization', 'Productive utilization (%)', 80) + pct('failureRate', 'Expected failure rate (%)', 0),
    formula: 'Required attempts = good units ÷ (1 − failure rate). Required printer-hours = required attempts ÷ parts per cycle × cycle time. Required printers = ceiling(required printer-hours ÷ capacity per printer).',
    use: 'Run this before committing to a date or deciding whether a temporary compatible printer is needed. The result rounds up because a fraction of a printer cannot cover a deadline.',
    example: 'For 120 good units, four parts per six-hour cycle, five 16-hour days, 90% availability, 80% utilization, and no expected failures, the workload is 180 printer-hours. One printer supplies 57.6 productive hours, so four are required.',
    assumptions: 'All counted printers can run the part and the work can be divided among them without a setup bottleneck.',
    limitation: 'A calculated count does not reserve material, labor, finishing capacity, or shipping time.',
    mistake: 'Do not use planned units as attempts when failures matter; the schedule needs enough attempted cycles to create the required good units.'
  },
  {
    slug: 'print-queue-completion-time-calculator', type: 'queue-completion', title: 'Print Queue Completion Time Calculator', tag: 'Production planning',
    description: 'Estimate operating days to clear a 3D print queue using compatible printer count, availability, utilization, and turnaround allowance.',
    lede: 'Convert a backlog expressed in printer-hours into a completion estimate for a compatible, evenly shared farm.',
    fields: num('queueHours', 'Total queued printer-hours', 240, 'Sum slicer estimates for the queued work.', '0.1') + num('printers', 'Number of compatible printers', 5) + num('hoursPerDay', 'Operating hours per day', 18, '', '0.1') + pct('availability', 'Availability (%)', 90) + pct('utilization', 'Productive utilization (%)', 85) + pct('turnaround', 'Turnaround allowance (%)', 0, 'Optional extra workload for bed clearing, restart, and handoff.'),
    formula: 'Effective farm hours/day = printers × operating hours × availability × utilization. Adjusted queue = queued hours × (1 + turnaround allowance). Completion days = adjusted queue ÷ effective farm hours/day.',
    use: 'Use this for a queue already estimated in printer-hours, then adjust the allowance when the schedule contains many short jobs or hands-on changeovers.',
    example: 'A 240-hour queue on five printers working 18 hours/day at 90% availability and 85% utilization has 68.85 productive hours/day and clears in about 3.486 operating days before turnaround allowance.',
    assumptions: 'Compatible printers receive work evenly and no single oversized job becomes the bottleneck.',
    limitation: 'The calculator does not sequence dependencies or account for post-processing after a job leaves the printer.',
    mistake: 'Do not treat calendar days as operating days when the farm does not run every day or every hour.'
  },
  {
    slug: 'printer-utilization-calculator', type: 'printer-utilization', title: 'Printer Utilization Calculator', tag: 'Production planning',
    description: 'Calculate gross capacity, maintenance-adjusted capacity, productive utilization, idle time, and unaccounted printer-hours.',
    lede: 'Measure how much of the time you deliberately made available is turning into productive print time—not revenue or profit.',
    fields: num('printers', 'Number of printers', 6) + num('availableHours', 'Available hours per printer', 120, 'For the selected reporting period.', '0.1') + num('productiveHours', 'Actual productive print hours', 480, '', '0.1') + num('maintenanceHours', 'Scheduled maintenance hours (optional)', 0, '', '0.1') + num('blockedHours', 'Blocked / idle hours (optional)', 0, '', '0.1'),
    formula: 'Gross available hours = printers × available hours per printer. Net available hours = gross available hours − scheduled maintenance. Productive utilization = productive hours ÷ net available hours.',
    use: 'Use a weekly or monthly period to see whether adding capacity is justified or whether scheduling, changeover, or maintenance is the real constraint.',
    example: 'Six printers with 120 available hours each create 720 gross hours. With 480 productive hours and no maintenance, utilization is about 66.667%.',
    assumptions: 'Productive hours are recorded consistently, including only prints that were intentionally scheduled to make output.',
    limitation: 'A high utilization figure can still hide poor yield, excessive material waste, or low-margin work.',
    mistake: 'Do not count scheduled maintenance twice—remove it from net capacity, then keep blocked or idle time separate for diagnosis.'
  },
  {
    slug: 'print-farm-downtime-impact-calculator', type: 'downtime-impact', title: 'Print Farm Downtime Impact Calculator', tag: 'Production planning',
    description: 'Estimate the printer-hours, print cycles, and units a 3D print farm loses to expected downtime.',
    lede: 'Show the schedule consequence of downtime in the same units you use to plan production.',
    fields: num('printers', 'Number of printers', 10) + num('hoursPerDay', 'Operating hours per day', 20, '', '0.1') + num('days', 'Operating days', 30, '', '0.1') + pct('downtime', 'Expected downtime (%)', 15) + num('cycleHours', 'Average print cycle time (hours)', 5, '', '0.1') + num('partsPerCycle', 'Parts per cycle', 2, '', '0.1'),
    formula: 'Baseline hours = printers × hours/day × days. Lost hours = baseline × downtime rate. Lost cycles = lost hours ÷ cycle time. Lost units = lost cycles × parts per cycle.',
    use: 'Use it to put an operational buffer around a production plan and to show the economic effect of recurring repairs, failed starts, or unplanned holds.',
    example: 'Ten printers run 20 hours/day for 30 days create 6,000 baseline hours. At 15% downtime, the loss is 900 hours, or about 180 five-hour cycles and 360 two-part cycles.',
    assumptions: 'Downtime is spread across the schedule and the average cycle represents the mix of work.',
    limitation: 'Lost cycles and units are approximate; a downtime event that interrupts a long job can have a different outcome.',
    mistake: 'Do not subtract downtime from yield. Downtime reduces available time; yield describes how much attempted output becomes good output.'
  },
  {
    slug: 'batch-throughput-calculator', type: 'batch-throughput', title: 'Batch Throughput Calculator', tag: 'Production planning',
    description: 'Estimate daily, weekly, and monthly 3D print farm throughput from cycle time, capacity losses, and expected yield.',
    lede: 'Plan expected good units per day from the printer-hours your farm can actually turn into completed cycles.',
    fields: num('printers', 'Number of printers', 5) + num('partsPerCycle', 'Parts per plate / cycle', 4, '', '0.1') + num('cycleHours', 'Cycle time (hours)', 8, '', '0.1') + num('hoursPerDay', 'Operating hours per day', 16, '', '0.1') + pct('availability', 'Availability (%)', 90) + pct('utilization', 'Productive utilization (%)', 80) + pct('yield', 'Expected yield (%)', 95) + num('operatingDaysMonth', 'Operating days per month', 22, 'Used for the monthly planning estimate.', '0.1'),
    formula: 'Effective printer-hours/day = printers × operating hours × availability × utilization. Cycles/day = effective hours ÷ cycle time. Good units/day = cycles × parts per cycle × yield.',
    use: 'Use this for replenishment and capacity planning when jobs are similar enough to express as a representative cycle.',
    example: 'Five printers, four parts per eight-hour cycle, 16 operating hours/day, 90% availability, 80% utilization, and 95% yield create 57.6 effective hours/day, 7.2 cycles/day, 28.8 attempted units/day, and 27.36 expected good units/day.',
    assumptions: 'The selected cycle time and parts per cycle represent the work mix; weekly output uses seven operating days and monthly output uses your input.',
    limitation: 'This is not a plate-packing optimizer and should not override a slicer’s actual geometry or print time.',
    mistake: 'Do not apply yield to capacity before calculating attempted units; yield converts attempted units into expected good units.'
  }
];
function calculatorPage(c) {
  const url = `tools/production/${c.slug}/`;
  const body = `<header class="page-hero"><div class="container"><p class="breadcrumbs"><a href="/">Home</a> / <a href="/tools/">Tools</a> / <a href="/tools/production/">Production Planning</a> / ${c.title}</p><p class="eyebrow">${c.tag}</p><h1>${c.title}</h1><p class="lede">${c.lede}</p></div></header><section class="section"><div class="container calculator-layout"><form class="calc-panel" data-calculator="${c.type}" novalidate><h2>Inputs</h2><div class="field-grid">${c.fields}</div><p id="form-error" class="error" role="alert"></p><button class="button" type="submit">Calculate</button><button class="button secondary" type="reset">Reset</button></form><aside class="result-panel" aria-live="polite"><p class="eyebrow">Result</p><div id="result-main" class="result-value">—</div><div id="result-details" class="result-detail"></div><div class="button-row"><button class="button secondary" id="copy-result" type="button">Copy result</button><button class="button secondary" id="print-result" type="button">Print</button></div></aside></div></section><article class="section alt"><div class="container content"><h2>Calculation purpose and formula</h2><div class="formula">${c.formula}</div><h2>Interpret the result</h2><p>${c.use}</p><h2>Worked example</h2><p>${c.example}</p><h2>Assumptions and limitations</h2><p>${c.assumptions} ${c.limitation}</p><h2>Common planning mistake</h2><p>${c.mistake}</p><h2>Related planning tools</h2>${links}</div></article>`;
  return documentPage({ url, title: c.title, description: c.description, body });
}
const hubCards = calculators.map(c => `<a href="/tools/production/${c.slug}/"><strong>${c.title}</strong><br><small>${c.description}</small></a>`).join('');
const hub = documentPage({
  url: 'tools/production/', title: 'Print Farm Planning Tools', description: 'Plan 3D print farm capacity, queues, utilization, downtime, throughput, and printer requirements.',
  body: `<header class="page-hero"><div class="container"><p class="breadcrumbs"><a href="/">Home</a> / <a href="/tools/">Tools</a> / Production Planning</p><p class="eyebrow">Production planning</p><h1>Print Farm Planning Tools</h1><p class="lede">Turn printer-hours, availability, utilization, yield, and deadlines into an operating plan you can inspect.</p></div></header><section class="section"><div class="container content"><h2>Plan capacity before the queue becomes urgent</h2><p>These tools separate the time installed in a farm from the time that is available, productively scheduled, and converted into good units. Use the calculator that matches the decision: whether to quote a deadline, clear a backlog, investigate idle time, or plan recurring output.</p><div class="tool-list">${hubCards}</div><h2>Connect capacity to cost and delivery</h2>${links}</div></section>`
});
const guide = documentPage({
  url: 'guides/small-print-farm-scheduling/', title: 'How to Schedule a Small 3D Print Farm', description: 'Plan a small 3D print farm using printer-hours, compatibility, turnaround, buffers, yield, and maintenance time.',
  body: `<header class="page-hero"><div class="container"><p class="breadcrumbs"><a href="/">Home</a> / <a href="/guides/">Guides</a> / Small Print Farm Scheduling</p><p class="eyebrow">Production guide</p><h1>How to Schedule a Small 3D Print Farm</h1><p class="lede">A reliable schedule starts with compatible printer-hours, then makes room for the work that happens between prints.</p></div></header><article class="section"><div class="container content"><h2>Turn work into printer-hours</h2><p>Start with slicer estimates for complete cycles, including supports and any setup that keeps a printer occupied. A single printer-hour is useful only when the machine can actually run the job; separate incompatible materials, nozzles, or build volumes rather than pooling them.</p><h2>Place long and short jobs deliberately</h2><p>Long jobs can cover unattended periods, while short jobs are useful when someone is available to clear plates and restart quickly. Avoid a schedule that finishes every plate at the same inconvenient time. The calendar should reflect when a person can unload, inspect, and start the next cycle.</p><h2>Protect the deadline with real buffers</h2><p>Night operation, material changes, failed first layers, and reprints create risk even when the arithmetic looks comfortable. Reserve capacity for expected failures and leave a deadline buffer instead of treating every available hour as committed output.</p><h2>Subtract maintenance before judging utilization</h2><p>Planned maintenance is not idle time. Remove it from the period first, then compare productive print hours with net available hours. If utilization is low, investigate queue release, changeover, labor coverage, and blocked work before adding another printer.</p><h2>Use the production-planning workbench</h2>${links}</div></article>`
});
const reference = documentPage({
  url: 'reference/print-farm-capacity-reference/', title: 'Print Farm Capacity, Availability, Utilization and Throughput Reference', description: 'Definitions, formulas, units, and cautions for planning 3D print farm capacity and throughput.',
  body: `<header class="page-hero"><div class="container"><p class="breadcrumbs"><a href="/">Home</a> / <a href="/reference/">Reference</a> / Print Farm Capacity</p><p class="eyebrow">Production reference</p><h1>Print Farm Capacity, Availability, Utilization and Throughput Reference</h1><p class="lede">Use consistent terms before you compare schedules, printer counts, or production promises.</p></div></header><article class="section"><div class="container content"><h2>Capacity layers</h2><p><strong>Theoretical capacity</strong> is printers × scheduled hours and is measured in printer-hours. <strong>Available capacity</strong> is theoretical capacity × availability. <strong>Productive printer-hours</strong> are available capacity × productive utilization. Availability describes whether equipment can run; utilization describes how much usable time is assigned to productive printing.</p><h2>Output terms</h2><p><strong>Cycle time</strong> is the time one print cycle occupies a printer. <strong>Turnaround time</strong> covers clearing, inspection, restart, and other between-cycle work. <strong>Yield</strong> is good units ÷ attempted units. <strong>Throughput</strong> is good units produced per period after cycle time, capacity losses, and yield are applied.</p><h2>Queue and buffer</h2><p><strong>Queue workload</strong> is the printer-hours needed for pending work. Divide it by productive printer-hours per operating day for a completion estimate. <strong>Capacity buffer</strong> is the remaining productive capacity after planned work; it is the room for uncertainty, reprints, and late orders.</p><h2>Use with care</h2><p>Neither 100% availability nor 100% utilization is a normal default. Record actual results for a representative period, keep compatibility groups separate, and use measured cycle times where delivery risk matters.</p><h2>Related planning tools</h2>${links}</div></article>`
});
for (const [url, html] of [['tools/production/', hub], ['guides/small-print-farm-scheduling/', guide], ['reference/print-farm-capacity-reference/', reference], ...calculators.map(c => [`tools/production/${c.slug}/`, calculatorPage(c)])]) {
  const dir = path.join(root, url); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, 'index.html'), html);
}
function addBeforeMain(file, marker, fragment) {
  const target = path.join(root, file);
  let html = fs.readFileSync(target, 'utf8');
  if (!html.includes(marker)) html = html.replace('</main>', `${fragment}</main>`);
  fs.writeFileSync(target, html);
}
addBeforeMain('index.html', 'data-production-planning-home', '<section class="section alt" data-production-planning-home><div class="container"><div class="section-head"><div><p class="eyebrow">Production planning</p><h2>Plan a small print farm</h2></div><p>Use real printer-hours, downtime, yield, and turnaround assumptions before promising a delivery date or adding another machine.</p></div><div class="related"><a href="/tools/production/">Print Farm Planning Tools</a><a href="/tools/production/required-printer-count-calculator/">Required Printer Count</a><a href="/tools/production/print-queue-completion-time-calculator/">Queue Completion Time</a><a href="/guides/small-print-farm-scheduling/">Scheduling Guide</a></div></div></section>');
const toolsPath = path.join(root, 'tools/index.html');
let toolsHtml = fs.readFileSync(toolsPath, 'utf8');
if (!toolsHtml.includes('id="production"')) {
  toolsHtml = toolsHtml.replace('<a href="#resin">Resin</a>', '<a href="#resin">Resin</a><a href="#production">Production planning</a>');
  toolsHtml = toolsHtml.replace('</main>', '<section class="section" id="production"><div class="container"><section class="tool-group"><p class="kicker">PRODUCTION / 06</p><h2>Print farm production planning</h2><div class="tool-list"><a href="/tools/production/"><strong>Print Farm Planning Tools</strong><br><small>Capacity, queues, utilization, downtime, throughput, and delivery planning.</small></a>' + calculators.map(c => `<a href="/tools/production/${c.slug}/"><strong>${c.title}</strong><br><small>${c.description}</small></a>`).join('') + '</div></section></div></section></main>');
  fs.writeFileSync(toolsPath, toolsHtml);
}
addBeforeMain('guides/index.html', 'data-production-planning-guide', '<section class="section alt guide-section" data-production-planning-guide><div class="container"><div class="section-head"><div><p class="eyebrow">04 / Production planning</p><h2>Schedule the work, not just the print</h2></div><p>Use compatible printer-hours, maintenance time, and a deliberate failure buffer before committing to a deadline.</p></div><div class="guide-compact-grid"><a href="/guides/small-print-farm-scheduling/"><span>Operations guide</span><strong>How to Schedule a Small 3D Print Farm</strong></a><a href="/tools/production/print-queue-completion-time-calculator/"><span>Queue planning</span><strong>Estimate Queue Completion</strong></a><a href="/tools/production/required-printer-count-calculator/"><span>Capacity decision</span><strong>Estimate Required Printer Count</strong></a></div></div></section>');
addBeforeMain('reference/index.html', 'data-production-planning-reference', '<section class="section" data-production-planning-reference><div class="container content"><h2>Production planning reference</h2><p>Define capacity, availability, utilization, yield, throughput, cycle time, turnaround, queue workload, and capacity buffer before comparing print-farm plans.</p><div class="related"><a href="/reference/print-farm-capacity-reference/">Print Farm Capacity Reference</a><a href="/tools/production/">Print Farm Planning Tools</a></div></div></section>');
for (const file of ['tools/cost/batch-print-cost-calculator/index.html', 'tools/business/break-even-units-calculator/index.html', 'tools/cost/machine-depreciation-calculator/index.html', 'tools/print-settings/print-time-estimator/index.html', 'tools/cost/failed-print-cost-calculator/index.html']) {
  addBeforeMain(file, 'data-production-planning-related', '<section class="section" data-production-planning-related><div class="container content"><h2>Plan the production capacity</h2><p>Use the production-planning tools to turn a cost, cycle-time, or failure assumption into a farm-level capacity and deadline check.</p><div class="related"><a href="/tools/production/">Print Farm Planning Tools</a><a href="/tools/production/required-printer-count-calculator/">Required Printer Count</a><a href="/tools/production/print-queue-completion-time-calculator/">Queue Completion Time</a></div></div></section>');
}
const sitemapPath = path.join(root, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');
const sitemapUrls = ['tools/production/', ...calculators.map(c => `tools/production/${c.slug}/`), 'guides/small-print-farm-scheduling/', 'reference/print-farm-capacity-reference/'];
for (const url of sitemapUrls) if (!sitemap.includes(`https://makerprinttools.com/${url}`)) sitemap = sitemap.replace('</urlset>', `  <url><loc>https://makerprinttools.com/${url}</loc><lastmod>2026-08-01</lastmod></url>\n</urlset>`);
fs.writeFileSync(sitemapPath, sitemap);
const llmsPath = path.join(root, 'llms.txt');
let llms = fs.readFileSync(llmsPath, 'utf8');
if (!llms.includes('## Print Farm Production Planning')) {
  llms += '\n## Print Farm Production Planning\n- [Print Farm Planning Tools](https://makerprinttools.com/tools/production/): Capacity, printer count, queue, utilization, downtime, and throughput planning\n' + calculators.map(c => `- [${c.title}](https://makerprinttools.com/tools/production/${c.slug}/): ${c.description}\n`).join('') + '- [How to Schedule a Small 3D Print Farm](https://makerprinttools.com/guides/small-print-farm-scheduling/): Scheduling workflow, buffers, and maintenance planning\n- [Print Farm Capacity Reference](https://makerprinttools.com/reference/print-farm-capacity-reference/): Capacity and throughput definitions and formulas\n';
  fs.writeFileSync(llmsPath, llms);
}
console.log(`Generated ${calculators.length + 3} Print Farm Production Planning pages.`);
