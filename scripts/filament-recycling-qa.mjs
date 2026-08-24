import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assets/js/filament-recycling.js', import.meta.url), 'utf8');
const cases = [
  ['recycling-blend', { finishedMass: 1, recycledPercent: 40, additivePercent: 2, processLoss: 8 }, '1.087 kg total input', ['Recycled polymer', '0.426 kg']],
  ['recycling-yield', { scrapMass: 2, sortingLoss: 5, sizeLoss: 3, extrusionLoss: 8, qcLoss: 5, spoolMass: 1 }, '1.611 kg usable filament', ['Overall yield', '80.54%']],
  ['extrusion-rate', { filamentDiameter: 1.75, materialDensity: 1.24, lineSpeed: 2, batchMass: 1 }, '0.358 kg/h theoretical output', ['Mass rate', '5.965 g/min']],
  ['diameter-quality', { nominalDiameter: 1.75, diameterTolerance: 0.05, diameterReadings: '1.74,1.75,1.76,1.73,1.75,1.77,1.74,1.75', crossAxisReadings: '1.75,1.76,1.75,1.74,1.75,1.76,1.75,1.74' }, '100% of samples in tolerance', ['Samples', '8 paired positions']],
  ['winder-traverse', { winderFilamentDiameter: 1.75, windingPitch: 1.8, winderLineSpeed: 2, coreDiameter: 90, fillDiameter: 190, traverseWidth: 65 }, '7.07 → 3.35 spool rpm', ['Traverse speed at empty core', '0.212 mm/s']]
];

function execute(type, values) {
  const result = { textContent: '' };
  const details = { innerHTML: '' };
  const error = { textContent: '' };
  const listeners = {};
  const form = {
    dataset: { calculator: type },
    elements: Object.fromEntries(Object.entries(values).map(([key, current]) => [key, { value: String(current) }])),
    addEventListener(name, listener) { listeners[name] = listener; }
  };
  globalThis.document = {
    querySelector(selector) {
      return {
        'form[data-calculator]': form,
        '#result-main': result,
        '#result-details': details,
        '#form-error': error
      }[selector] || null;
    }
  };
  new Function(source)();
  return { result, details, error, listeners };
}

const failures = [];
for (const [type, values, expectedMain, [detailLabel, detailValue]] of cases) {
  const state = execute(type, values);
  if (state.error.textContent || state.result.textContent !== expectedMain || !state.details.innerHTML.includes(detailLabel) || !state.details.innerHTML.includes(detailValue)) failures.push(type + ': known-value result mismatch');
  if (/NaN|Infinity|undefined/.test(state.result.textContent + state.details.innerHTML)) failures.push(type + ': non-finite output');
  if (!state.listeners.input || !state.listeners.reset || !state.listeners.submit) failures.push(type + ': missing input, reset, or submit behavior');
}

const invalidCases = [];
const addInvalid = (type, base, field, invalidValues) => invalidValues.forEach(invalid => invalidCases.push([type, { ...base, [field]: invalid }]));
const positiveInvalid = ['', 'invalid', 0, -1, 'Infinity', 'NaN'];
const percentInvalid = ['', 'invalid', -1, 100, 101, 'Infinity', 'NaN'];
const blendBase = cases[0][1];
addInvalid('recycling-blend', blendBase, 'finishedMass', positiveInvalid);
addInvalid('recycling-blend', blendBase, 'recycledPercent', ['', 'invalid', -1, 101, 'Infinity', 'NaN']);
addInvalid('recycling-blend', blendBase, 'additivePercent', percentInvalid);
addInvalid('recycling-blend', blendBase, 'processLoss', percentInvalid);
const yieldBase = cases[1][1];
addInvalid('recycling-yield', yieldBase, 'scrapMass', positiveInvalid);
for (const field of ['sortingLoss', 'sizeLoss', 'extrusionLoss', 'qcLoss']) addInvalid('recycling-yield', yieldBase, field, percentInvalid);
addInvalid('recycling-yield', yieldBase, 'spoolMass', positiveInvalid);
const rateBase = cases[2][1];
for (const field of Object.keys(rateBase)) addInvalid('extrusion-rate', rateBase, field, positiveInvalid);
const qualityBase = cases[3][1];
addInvalid('diameter-quality', qualityBase, 'nominalDiameter', positiveInvalid);
addInvalid('diameter-quality', qualityBase, 'diameterTolerance', ['', 'invalid', 0, -1, 1.75, 'Infinity', 'NaN']);
addInvalid('diameter-quality', qualityBase, 'diameterReadings', ['', 'invalid', '1.75,-1', 'Infinity', 'NaN']);
addInvalid('diameter-quality', qualityBase, 'crossAxisReadings', ['invalid', '1.75,-1', 'Infinity', 'NaN']);
invalidCases.push(['diameter-quality', { ...qualityBase, diameterReadings: '1.75,1.76', crossAxisReadings: '1.75' }]);
const winderBase = cases[4][1];
for (const field of Object.keys(winderBase)) addInvalid('winder-traverse', winderBase, field, positiveInvalid);
invalidCases.push(['winder-traverse', { ...winderBase, coreDiameter: 190, fillDiameter: 90 }]);
invalidCases.push(['winder-traverse', { ...winderBase, windingPitch: 66 }]);
for (const [type, values] of invalidCases) {
  const state = execute(type, values);
  if (!state.error.textContent || state.result.textContent !== '—' || state.details.innerHTML || /NaN|Infinity|undefined/.test(state.result.textContent + state.details.innerHTML)) failures.push(type + ': invalid input did not clear output');
}

const largeCases = [
  ['recycling-blend', { finishedMass: 99999, recycledPercent: 100, additivePercent: 10, processLoss: 10 }],
  ['recycling-yield', { scrapMass: 99999, sortingLoss: 1, sizeLoss: 1, extrusionLoss: 1, qcLoss: 1, spoolMass: 1000 }],
  ['extrusion-rate', { filamentDiameter: 10, materialDensity: 20, lineSpeed: 9999, batchMass: 99999 }],
  ['diameter-quality', { nominalDiameter: 10, diameterTolerance: 1, diameterReadings: '9.5,10,10.5', crossAxisReadings: '' }],
  ['winder-traverse', { winderFilamentDiameter: 10, windingPitch: 20, winderLineSpeed: 9999, coreDiameter: 1000, fillDiameter: 2000, traverseWidth: 1000 }]
];
for (const [type, values] of largeCases) {
  const state = execute(type, values);
  if (state.error.textContent || state.result.textContent === '—' || /NaN|Infinity|undefined/.test(state.result.textContent + state.details.innerHTML)) failures.push(type + ': large finite values failed');
}

if (failures.length) throw Error(failures.join('\n'));
console.log('Filament recycling QA PASS: 5 tools passed known values, validation, reset wiring, optional paired QC inputs, and large finite inputs.');
