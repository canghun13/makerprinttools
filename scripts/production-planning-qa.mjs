import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assets/js/production-planning.js', import.meta.url), 'utf8');
const cases = [
  ['farm-capacity', { printers: 4, hoursPerDay: 16, days: 7, availability: 90, utilization: 80 }, '322.56 productive printer-hours', ['Theoretical printer-hours', '448']],
  ['required-printers', { goodUnits: 120, partsPerCycle: 4, cycleHours: 6, days: 5, hoursPerDay: 16, availability: 90, utilization: 80, failureRate: 0 }, '4 printers required', ['Required printer-hours', '180']],
  ['required-printers', { goodUnits: 5, partsPerCycle: 4, cycleHours: 6, days: 1, hoursPerDay: 9, availability: 100, utilization: 100, failureRate: 0 }, '2 printers required', ['Whole print cycles', '2']],
  ['required-printers', { goodUnits: 4, partsPerCycle: 4, cycleHours: 6, days: 1, hoursPerDay: 6, availability: 100, utilization: 100, failureRate: 0 }, '1 printer required', ['Whole print cycles', '1']],
  ['required-printers', { goodUnits: 9, partsPerCycle: 4, cycleHours: 6, days: 1, hoursPerDay: 9, availability: 100, utilization: 100, failureRate: 0 }, '3 printers required', ['Complete cycles per printer', '1']],
  ['required-printers', { goodUnits: 8, partsPerCycle: 4, cycleHours: 6, days: 1, hoursPerDay: 9, availability: 100, utilization: 100, failureRate: 0 }, '2 printers required', ['Complete cycles per printer', '1']],
  ['required-printers', { goodUnits: 12, partsPerCycle: 4, cycleHours: 6, days: 1, hoursPerDay: 12, availability: 100, utilization: 100, failureRate: 0 }, '2 printers required', ['Complete cycles per printer', '2']],
  ['required-printers', { goodUnits: 3, partsPerCycle: 1, cycleHours: 0.1, days: 1, hoursPerDay: 0.3, availability: 100, utilization: 100, failureRate: 0 }, '1 printer required', ['Complete cycles per printer', '3']],
  ['queue-completion', { queueHours: 240, printers: 5, hoursPerDay: 18, availability: 90, utilization: 85, turnaround: 0 }, '3.486 operating days', ['Effective farm capacity per day', '68.85']],
  ['printer-utilization', { printers: 6, availableHours: 120, productiveHours: 480, maintenanceHours: 0, blockedHours: 0 }, '66.667% productive utilization', ['Gross available printer-hours', '720']],
  ['downtime-impact', { printers: 10, hoursPerDay: 20, days: 30, downtime: 15, cycleHours: 5, partsPerCycle: 2 }, '900 lost printer-hours', ['Approximate lost units', '360']],
  ['batch-throughput', { printers: 5, partsPerCycle: 4, cycleHours: 8, hoursPerDay: 16, availability: 90, utilization: 80, yield: 95, operatingDaysMonth: 22 }, '27.36 expected good units/day', ['Attempted units/day', '28.8']]
];
function execute(type, values) {
  const result = { textContent: '' }, details = { innerHTML: '' }, error = { textContent: '' }, listeners = {}, print = { disabled: false }, copy = { disabled: false };
  const form = { dataset: { calculator: type }, elements: Object.fromEntries(Object.entries(values).map(([key, value]) => [key, { value: String(value) }])), addEventListener(name, fn) { listeners[name] = fn; } };
  globalThis.document = { querySelector(selector) { return ({ 'form[data-calculator]': form, '#result-main': result, '#result-details': details, '#form-error': error, '#print-result': print, '#copy-result': copy }[selector] || null); } };
  new Function(source)();
  return { form, result, details, error, listeners, print, copy };
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

const requiredBase = { goodUnits: 120, partsPerCycle: 4, cycleHours: 6, days: 5, hoursPerDay: 16, availability: 90, utilization: 80, failureRate: 0 };
for (const values of [
  { ...requiredBase, days: 1, hoursPerDay: 9, cycleHours: 10, availability: 100, utilization: 100 },
  { ...requiredBase, days: 1, hoursPerDay: 5.9999, cycleHours: 6, availability: 100, utilization: 100 },
  { ...requiredBase, goodUnits: 1e300 },
  { ...requiredBase, goodUnits: 1.5 },
  { ...requiredBase, partsPerCycle: 4.5 },
  { ...requiredBase, days: 1e300, hoursPerDay: 1e300 }
]) {
  const state = execute('required-printers', requiredBase);
  for (const [field, value] of Object.entries(values)) state.form.elements[field].value = String(value);
  state.listeners.input();
  if (!state.error.textContent || state.result.textContent !== '—' || state.details.innerHTML || !state.print.disabled || !state.copy.disabled) failures.push('required-printers: impossible or unrepresentable schedule retained a result or enabled record actions');
}
// Compare the UI result with an independent integer cycle-allocation oracle.
for (let cycles = 1; cycles <= 25; cycles++) {
  for (const budget of [3, 4, 6, 7, 9, 10, 12, 15, 18, 21]) {
    const state = execute('required-printers', { ...requiredBase, goodUnits: cycles, partsPerCycle: 1, cycleHours: 3, days: 1, hoursPerDay: budget, availability: 100, utilization: 100 });
    const expectedPrinters = Math.ceil(cycles / Math.floor(budget / 3));
    const expectedResult = `${expectedPrinters} printer${expectedPrinters === 1 ? '' : 's'} required`;
    if (state.error.textContent || state.result.textContent !== expectedResult) failures.push(`required-printers: allocation mismatch for ${cycles} cycles / ${budget} hours`);
  }
}
for (const field of ['goodUnits', 'partsPerCycle', 'cycleHours', 'days', 'hoursPerDay', 'availability', 'utilization']) {
  for (const invalid of ['', 'not-a-number', 'NaN', 'Infinity', '-1', '0']) {
    const state = execute('required-printers', requiredBase);
    state.form.elements[field].value = invalid;
    state.listeners.input();
    if (!state.error.textContent || state.result.textContent !== '—' || state.details.innerHTML || !state.print.disabled || !state.copy.disabled) failures.push(`required-printers: ${field} ${JSON.stringify(invalid)} did not clear a prior result and block record actions`);
  }
}
for (const invalidFailure of ['', 'not-a-number', 'NaN', 'Infinity', '-1', '100', '101']) {
  const state = execute('required-printers', requiredBase);
  state.form.elements.failureRate.value = invalidFailure;
  state.listeners.input();
  if (!state.error.textContent || state.result.textContent !== '—' || state.details.innerHTML) failures.push(`required-printers: failureRate ${JSON.stringify(invalidFailure)} did not clear a prior result`);
}
for (const values of [
  { ...requiredBase, availability: 100, utilization: 100, failureRate: 99 },
  { ...requiredBase, goodUnits: 1e9, partsPerCycle: 1e6, cycleHours: 1e3, days: 1e3, hoursPerDay: 24, availability: 100, utilization: 100, failureRate: 0 }
]) {
  const state = execute('required-printers', values);
  if (state.error.textContent || state.print.disabled || state.copy.disabled || /NaN|Infinity|undefined|∞/.test(state.result.textContent + state.details.innerHTML)) failures.push('required-printers: valid boundary or large finite input failed');
}
if (failures.length) throw Error(failures.join('\n'));
console.log(`Production planning QA PASS: 6 calculator types, ${cases.length} known-value fixtures, 250 cycle-allocation cases, invalid-input checks, and record-action guards.`);
