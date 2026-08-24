(() => {
  const form = document.querySelector('form[data-calculator]');
  if (!form) return;

  const result = document.querySelector('#result-main');
  const details = document.querySelector('#result-details');
  const error = document.querySelector('#form-error');
  const fmt = (number, digits = 3) => Number(number).toLocaleString(undefined, { maximumFractionDigits: digits });
  const value = name => {
    const raw = form.elements[name]?.value;
    return raw == null || raw.trim() === '' ? Number.NaN : Number(raw);
  };
  const positive = number => Number.isFinite(number) && number > 0;
  const percent = number => Number.isFinite(number) && number >= 0 && number < 100;
  const clear = message => {
    result.textContent = '—';
    details.innerHTML = '';
    error.textContent = message;
  };
  const show = (main, lines) => {
    if (/NaN|Infinity|undefined/.test(main + JSON.stringify(lines))) throw Error('Enter valid finite values to calculate this recycling setup.');
    error.textContent = '';
    result.textContent = main;
    details.innerHTML = lines.map(([label, output]) => '<p><strong>' + label + ':</strong> ' + output + '</p>').join('');
  };
  const readings = name => {
    const raw = form.elements[name]?.value?.trim();
    if (!raw) return [];
    const parsed = raw.split(/[\s,;]+/).filter(Boolean).map(Number);
    if (!parsed.length || parsed.some(number => !positive(number) || number > 20)) throw Error('Use positive diameter readings in millimetres, separated by commas, spaces, semicolons, or new lines.');
    return parsed;
  };

  function calculate() {
    try {
      const type = form.dataset.calculator;
      if (type === 'recycling-blend') {
        const finished = value('finishedMass');
        const recycledPercent = value('recycledPercent');
        const additivePercent = value('additivePercent');
        const loss = value('processLoss');
        if (!positive(finished) || finished > 100000 || !Number.isFinite(recycledPercent) || recycledPercent < 0 || recycledPercent > 100 || !percent(additivePercent) || !percent(loss)) throw Error('Use a positive target mass, recycled share from 0–100%, and additive and loss percentages from 0 to below 100%.');
        const totalInput = finished / (1 - loss / 100);
        const additive = totalInput * additivePercent / 100;
        const polymer = totalInput - additive;
        const recycled = polymer * recycledPercent / 100;
        const virgin = polymer - recycled;
        show(fmt(totalInput) + ' kg total input', [
          ['Recycled polymer', fmt(recycled) + ' kg'],
          ['Virgin polymer', fmt(virgin) + ' kg'],
          ['Masterbatch / additive', fmt(additive) + ' kg'],
          ['Planned process loss', fmt(totalInput - finished) + ' kg'],
          ['Recycled share of all input', fmt(recycled / totalInput * 100, 2) + '%']
        ]);
        return;
      }
      if (type === 'recycling-yield') {
        const scrap = value('scrapMass');
        const sorting = value('sortingLoss');
        const size = value('sizeLoss');
        const extrusion = value('extrusionLoss');
        const qc = value('qcLoss');
        const spool = value('spoolMass');
        if (!positive(scrap) || scrap > 100000 || ![sorting, size, extrusion, qc].every(percent) || !positive(spool) || spool > 100000) throw Error('Use positive masses and stage-loss percentages from 0 to below 100%.');
        const afterSorting = scrap * (1 - sorting / 100);
        const afterSize = afterSorting * (1 - size / 100);
        const afterExtrusion = afterSize * (1 - extrusion / 100);
        const usable = afterExtrusion * (1 - qc / 100);
        const fullSpools = Math.floor((usable + 1e-12) / spool);
        const remainder = usable - fullSpools * spool;
        show(fmt(usable) + ' kg usable filament', [
          ['After sorting', fmt(afterSorting) + ' kg'],
          ['After shredding / screening', fmt(afterSize) + ' kg'],
          ['After extrusion / startup', fmt(afterExtrusion) + ' kg'],
          ['Overall yield', fmt(usable / scrap * 100, 2) + '%'],
          ['Spool output', fullSpools + ' full spool' + (fullSpools === 1 ? '' : 's') + ' + ' + fmt(remainder) + ' kg']
        ]);
        return;
      }
      if (type === 'extrusion-rate') {
        const diameter = value('filamentDiameter');
        const density = value('materialDensity');
        const speed = value('lineSpeed');
        const batch = value('batchMass');
        if (![diameter, density, speed, batch].every(positive) || diameter > 20 || density > 30 || speed > 10000 || batch > 100000) throw Error('Use positive finished diameter, density, line speed, and batch mass within realistic finite ranges.');
        const areaMm2 = Math.PI * diameter ** 2 / 4;
        const volumeCm3Min = areaMm2 * speed;
        const gramsMin = volumeCm3Min * density;
        const kgHour = gramsMin * 60 / 1000;
        const hours = batch / kgHour;
        show(fmt(kgHour) + ' kg/h theoretical output', [
          ['Cross-sectional area', fmt(areaMm2, 4) + ' mm²'],
          ['Volume rate', fmt(volumeCm3Min, 3) + ' cm³/min'],
          ['Mass rate', fmt(gramsMin, 3) + ' g/min'],
          ['Time for planned batch', fmt(hours, 3) + ' h'],
          ['Filament length in batch', fmt(batch * 1000000 / (areaMm2 * density) / 1000, 1) + ' m']
        ]);
        return;
      }
      if (type === 'diameter-quality') {
        const nominal = value('nominalDiameter');
        const tolerance = value('diameterTolerance');
        const primary = readings('diameterReadings');
        const cross = readings('crossAxisReadings');
        if (!positive(nominal) || nominal > 20 || !positive(tolerance) || tolerance >= nominal || !primary.length) throw Error('Use a positive nominal diameter, a positive tolerance smaller than nominal, and at least one primary reading.');
        if (primary.length > 10000 || cross.length > 10000) throw Error('Limit each reading list to 10,000 samples.');
        if (cross.length && cross.length !== primary.length) throw Error('Cross-axis readings must be blank or have the same sample count as the primary list.');
        const effective = cross.length ? primary.map((number, index) => Math.sqrt(number * cross[index])) : primary;
        const mean = effective.reduce((sum, number) => sum + number, 0) / effective.length;
        const variance = effective.reduce((sum, number) => sum + (number - mean) ** 2, 0) / effective.length;
        const stdev = Math.sqrt(variance);
        const lower = nominal - tolerance;
        const upper = nominal + tolerance;
        const passing = effective.filter(number => number >= lower && number <= upper).length;
        const min = Math.min(...effective);
        const max = Math.max(...effective);
        const maxOvality = cross.length ? Math.max(...primary.map((number, index) => Math.abs(number - cross[index]) / ((number + cross[index]) / 2) * 100)) : null;
        show(fmt(passing / effective.length * 100, 1) + '% of samples in tolerance', [
          ['Samples', String(effective.length) + (cross.length ? ' paired positions' : ' single-axis readings')],
          ['Mean equivalent diameter', fmt(mean, 4) + ' mm'],
          ['Population standard deviation', fmt(stdev, 4) + ' mm'],
          ['Measured range', fmt(min, 4) + '–' + fmt(max, 4) + ' mm'],
          ['Acceptance band', fmt(lower, 4) + '–' + fmt(upper, 4) + ' mm'],
          ['Maximum ovality', maxOvality == null ? 'Not calculated — add paired readings' : fmt(maxOvality, 3) + '%']
        ]);
        return;
      }
      if (type === 'winder-traverse') {
        const filament = value('winderFilamentDiameter');
        const pitch = value('windingPitch');
        const speed = value('winderLineSpeed');
        const core = value('coreDiameter');
        const fill = value('fillDiameter');
        const width = value('traverseWidth');
        if (![filament, pitch, speed, core, fill, width].every(positive) || filament > 20 || pitch > 100 || speed > 10000 || core > 100000 || fill > 100000 || width > 100000 || fill <= core || pitch > width) throw Error('Use positive values, a target fill diameter larger than the core, and a traverse pitch no larger than the usable width.');
        const rpmCore = speed * 1000 / (Math.PI * core);
        const rpmFill = speed * 1000 / (Math.PI * fill);
        const traverseCore = pitch * rpmCore / 60;
        const traverseFill = pitch * rpmFill / 60;
        const turns = width / pitch;
        const passesPerMinuteCore = rpmCore / turns;
        const passesPerMinuteFill = rpmFill / turns;
        show(fmt(rpmCore, 2) + ' → ' + fmt(rpmFill, 2) + ' spool rpm', [
          ['Traverse speed at empty core', fmt(traverseCore, 3) + ' mm/s'],
          ['Traverse speed at target fill', fmt(traverseFill, 3) + ' mm/s'],
          ['Spool turns per one-way pass', fmt(turns, 2)],
          ['One-way pass time at core', fmt(60 / passesPerMinuteCore, 2) + ' s'],
          ['One-way pass time at target fill', fmt(60 / passesPerMinuteFill, 2) + ' s'],
          ['Pitch relative to filament', fmt(pitch / filament, 3) + '× diameter']
        ]);
        return;
      }
      throw Error('This recycling calculator is not configured.');
    } catch (exception) {
      clear(exception.message || 'Enter valid finite values to calculate this recycling setup.');
    }
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    calculate();
  });
  form.addEventListener('input', calculate);
  form.addEventListener('reset', () => setTimeout(calculate, 0));
  calculate();
})();
