import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assets/js/production-planning.js', import.meta.url), 'utf8');
const cases = [
  ['farm-capacity', { printers: 4, hoursPerDay: 16, days: 7, availability: 90, utilization: 80 }, '322.56 productive printer-hours', ['Theoretical printer-hours', '448']],
  ['required-printers', { goodUnits: 120, partsPerCycle: 4, cycleHours: 6, days: 5, hoursPerDay: 16, availability: 90, utilization: 80, failureRate: 0 }, '4 printers required', ['Required printer-hours', '180']],
  ['queue-completion', { queueHours: 240, printers: 5, hoursPerDay: 18, availability: 90, utilization: 85, turnaround: 0 }, '3.486 operating days', ['Effective farm capacity per day', '68.85']],
  ['printer-utilization', { printers: 6, availableHours: 120, productiveHours: 480, maintenanceHours: 0, blockedHours: 0 }, '66.667% productive utilization', ['Gross available printer-hours', '720']],
  ['downtime-impact', { printers: 10, hoursPerDay: 20, days: 30, downtime: 15, cycleHours: 5, partsPerCycle: 2 }, '900 lost printer-hours', ['Approximate lost units', '360']],
  ['batch-throughput', { printers: 5, partsPerCycle: 4, cycleHours: 8, hoursPerDay: 16, availability: 90, utilization: 80, yield: 95, operatingDaysMonth: 22 }, '27.36 expected good units/day', ['Attempted units/day', '28.8']]
];
function execute(type, values) {
  const result = { textContent: '' }, details = { innerHTML: '' }, error = { textContent: '' }, listeners = {};
  const form = { dataset: { calculator: type }, elements: Object.fromEntries(Object.entries(values).map(([key, value]) => [key, { value: String(value) }])), addEventListener(name, fn) { listeners[name] = fn; } };
  globalThis.document = { querySelector(selector) { return ({ 'form[data-calculator]': form, '#result-main': result, '#result-details': details, '#form-error': error }[selector] || null); } };
  new Function(source)();
  return { form, result, details, error, listeners };
}
const failures = [];
for (const [type, values, expected, detail] of cases) {
  const state = execute(type, values);
  if (state.error.textContent || state.result.textContent !== expected || !state.details.innerHTML.includes(detail[0]) || !state.details.innerHTML.includes(detail[1]) || /NaN|Infinity/.test(state.result.textContent + state.details.innerHTML)) failures.push(`${type}: expected result mismatch`);
  for (const invalid of ['', '-1', 'Infinity', 'NaN']) {
    const probe = execute(type, { ...values, [Object.keys(values)[0]]: invalid });
    if (!probe.error.textContent || probe.result.textContent !== '—') failures.push(`${type}: invalid ${JSON.stringify(invalid)} not rejected`);
  }
  const percentField = Object.keys(values).find(key => /availability|utilization|failure|downtime|yield|turnaround/i.test(key));
  if (percentField) {
    const probe = execute(type, { ...values, [percentField]: 101 });
    if (!probe.error.textContent || probe.result.textContent !== '—') failures.push(`${type}: percentage above 100 not rejected`);
  }
}
if (failures.length) throw Error(failures.join('\n'));
console.log(`Production planning QA PASS: ${cases.length} calculators passed formulas and invalid-input checks.`);
