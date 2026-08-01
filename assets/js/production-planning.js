(() => {
  const form = document.querySelector('form[data-calculator]');
  if (!form) return;
  const $ = selector => document.querySelector(selector);
  const result = $('#result-main');
  const details = $('#result-details');
  const error = $('#form-error');
  const fmt = (value, digits = 2) => Number(value).toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: 0 });
  const value = name => Number(form.elements[name]?.value);
  const positive = number => Number.isFinite(number) && number > 0;
  const percentage = number => Number.isFinite(number) && number >= 0 && number <= 100;
  const clear = message => { result.textContent = '—'; details.innerHTML = ''; error.textContent = message; };
  const show = (main, lines) => { error.textContent = ''; result.textContent = main; details.innerHTML = lines.map(([label, output]) => `<p><strong>${label}:</strong> ${output}</p>`).join(''); };
  function calculate() {
    const type = form.dataset.calculator;
    try {
      let main; let lines;
      if (type === 'farm-capacity') {
        const printers = value('printers'), hours = value('hoursPerDay'), days = value('days'), availability = value('availability'), utilization = value('utilization');
        if (![printers, hours, days].every(positive) || ![availability, utilization].every(percentage)) throw Error('Use positive printer, hour, and day values plus percentages from 0% to 100%.');
        const theoretical = printers * hours * days, available = theoretical * availability / 100, productive = available * utilization / 100;
        main = `${fmt(productive)} productive printer-hours`;
        lines = [['Theoretical printer-hours', fmt(theoretical)], ['Availability-adjusted hours', fmt(available)], ['Lost from downtime', fmt(theoretical - available)], ['Lost from idle / turnaround', fmt(available - productive)]];
      }
      if (type === 'required-printers') {
        const good = value('goodUnits'), parts = value('partsPerCycle'), cycle = value('cycleHours'), days = value('days'), hours = value('hoursPerDay'), availability = value('availability'), utilization = value('utilization'), failure = value('failureRate');
        if (![good, parts, cycle, days, hours].every(positive) || ![availability, utilization, failure].every(percentage) || failure >= 100) throw Error('Use positive workload and schedule values; availability, utilization, and failure must be below 100%.');
        const attempts = good / (1 - failure / 100), required = attempts / parts * cycle, perPrinter = days * hours * availability / 100 * utilization / 100, printers = Math.ceil(required / perPrinter), margin = printers * perPrinter - required;
        main = `${fmt(printers, 0)} printers required`;
        lines = [['Total required attempts', fmt(attempts)], ['Required printer-hours', fmt(required)], ['Capacity per printer', fmt(perPrinter)], ['Spare capacity with rounded count', fmt(margin)]];
      }
      if (type === 'queue-completion') {
        const queue = value('queueHours'), printers = value('printers'), hours = value('hoursPerDay'), availability = value('availability'), utilization = value('utilization'), turnaround = value('turnaround');
        if (![queue, printers, hours].every(positive) || ![availability, utilization, turnaround].every(percentage)) throw Error('Use positive queue, printer, and hour values plus percentages from 0% to 100%.');
        const daily = printers * hours * availability / 100 * utilization / 100, adjusted = queue * (1 + turnaround / 100), days = adjusted / daily;
        main = `${fmt(days, 3)} operating days`;
        lines = [['Effective farm capacity per day', fmt(daily)], ['Adjusted queue workload', fmt(adjusted)], ['Estimated operating hours', fmt(days * hours)], ['Capacity margin after one operating day', fmt(daily - adjusted)]];
      }
      if (type === 'printer-utilization') {
        const printers = value('printers'), available = value('availableHours'), productive = value('productiveHours'), maintenance = value('maintenanceHours'), blocked = value('blockedHours');
        if (![printers, available].every(positive) || ![productive, maintenance, blocked].every(number => Number.isFinite(number) && number >= 0)) throw Error('Use positive printer and available-hour values; recorded hours cannot be negative.');
        const gross = printers * available, net = gross - maintenance;
        if (net <= 0 || productive + blocked > net) throw Error('Maintenance must leave positive net capacity, and productive plus blocked time cannot exceed it.');
        const idle = Math.max(0, net - productive - blocked), unaccounted = net - productive - blocked - idle;
        main = `${fmt(productive / net * 100, 3)}% productive utilization`;
        lines = [['Gross available printer-hours', fmt(gross)], ['Net available printer-hours', fmt(net)], ['Idle / blocked hours', fmt(idle + blocked)], ['Unaccounted hours', fmt(unaccounted)]];
      }
      if (type === 'downtime-impact') {
        const printers = value('printers'), hours = value('hoursPerDay'), days = value('days'), downtime = value('downtime'), cycle = value('cycleHours'), parts = value('partsPerCycle');
        if (![printers, hours, days, cycle, parts].every(positive) || !percentage(downtime)) throw Error('Use positive printer, schedule, cycle, and part values plus downtime from 0% to 100%.');
        const baseline = printers * hours * days, lost = baseline * downtime / 100, remaining = baseline - lost, cycles = lost / cycle, units = cycles * parts;
        main = `${fmt(lost)} lost printer-hours`;
        lines = [['Baseline capacity', fmt(baseline)], ['Remaining printer-hours', fmt(remaining)], ['Approximate lost cycles', fmt(cycles)], ['Approximate lost units', fmt(units)]];
      }
      if (type === 'batch-throughput') {
        const printers = value('printers'), parts = value('partsPerCycle'), cycle = value('cycleHours'), hours = value('hoursPerDay'), availability = value('availability'), utilization = value('utilization'), yieldRate = value('yield'), monthDays = value('operatingDaysMonth');
        if (![printers, parts, cycle, hours, monthDays].every(positive) || ![availability, utilization, yieldRate].every(percentage)) throw Error('Use positive capacity values and percentages from 0% to 100%.');
        const effective = printers * hours * availability / 100 * utilization / 100, cycles = effective / cycle, attempted = cycles * parts, good = attempted * yieldRate / 100;
        main = `${fmt(good)} expected good units/day`;
        lines = [['Effective printer-hours/day', fmt(effective)], ['Cycles/day', fmt(cycles)], ['Attempted units/day', fmt(attempted)], ['Weekly estimate (7 operating days)', fmt(good * 7)], ['Monthly estimate', fmt(good * monthDays)]];
      }
      if (!main || !lines || /NaN|Infinity/.test(`${main}${lines}`)) throw Error('Enter valid finite values to calculate this plan.');
      show(main, lines);
    } catch (exception) { clear(exception.message || 'Enter valid finite values to calculate this plan.'); }
  }
  form.addEventListener('submit', event => { event.preventDefault(); calculate(); });
  form.addEventListener('input', calculate);
  form.addEventListener('reset', () => setTimeout(calculate, 0));
  calculate();
})();
