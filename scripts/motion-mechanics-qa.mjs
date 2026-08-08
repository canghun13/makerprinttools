import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assets/js/motion-mechanics.js', import.meta.url), 'utf8');
const cases = [
  ['belt-steps', { stepAngle: 1.8, microsteps: 16, beltPitch: 2, pulleyTeeth: 20, gearRatio: 1 }, '80 steps/mm', ['Travel per output revolution', '40 mm']],
  ['lead-screw-steps', { stepAngle: 1.8, microsteps: 16, screwPitch: 2, threadStarts: 4, gearRatio: 1 }, '400 steps/mm', ['Lead / travel per output revolution', '8 mm']],
  ['axis-calibration', { currentSteps: 80, currentRotation: 40, commandedDistance: 100, measuredDistance: 99.5 }, '80.402 corrected steps/mm', ['Corrected Klipper rotation_distance', '39.8 mm']],
  ['belt-length', { beltPitch: 2, driverTeeth: 20, drivenTeeth: 20, centerDistance: 200 }, '220-tooth belt', ['Calculated pitch-line length', '440 mm']],
  ['pulse-rate', { stepsPerMm: 80, linearSpeed: 200, stepAngle: 1.8, microsteps: 16 }, '16,000 step pulses/s', ['Motor speed', '300 rpm']]
];

function execute(type, values) {
  const result = { textContent: '' };
  const details = { innerHTML: '' };
  const error = { textContent: '' };
  const listeners = {};
  const form = {
    dataset: { calculator: type },
    elements: Object.fromEntries(Object.entries(values).map(([key, number]) => [key, { value: String(number) }])),
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
  if (state.error.textContent || state.result.textContent !== expectedMain || !state.details.innerHTML.includes(detailLabel) || !state.details.innerHTML.includes(detailValue)) {
    failures.push(type + ': known-value result mismatch');
  }
  if (/NaN|Infinity/.test(state.result.textContent + state.details.innerHTML)) failures.push(type + ': non-finite output');
  if (!state.listeners.input || !state.listeners.reset || !state.listeners.submit) failures.push(type + ': missing input, reset, or submit behavior');
  for (const field of Object.keys(values)) {
    for (const invalid of ['', 'invalid', '0', '-1', 'Infinity', 'NaN']) {
      const probe = execute(type, { ...values, [field]: invalid });
      if (!probe.error.textContent || probe.result.textContent !== '—' || probe.details.innerHTML || /NaN|Infinity/.test(probe.result.textContent + probe.details.innerHTML)) {
        failures.push(type + ': ' + field + ' did not reject ' + JSON.stringify(invalid));
      }
    }
  }
}

const largeCases = [
  ['belt-steps', { stepAngle: 0.9, microsteps: 256, beltPitch: 5, pulleyTeeth: 120, gearRatio: 10 }],
  ['lead-screw-steps', { stepAngle: 0.9, microsteps: 256, screwPitch: 10, threadStarts: 8, gearRatio: 10 }],
  ['axis-calibration', { currentSteps: 999999, currentRotation: 99999, commandedDistance: 99999, measuredDistance: 99998 }],
  ['belt-length', { beltPitch: 20, driverTeeth: 900, drivenTeeth: 999, centerDistance: 99999 }],
  ['pulse-rate', { stepsPerMm: 999999, linearSpeed: 99999, stepAngle: 0.9, microsteps: 256 }]
];
for (const [type, values] of largeCases) {
  const probe = execute(type, values);
  if (probe.error.textContent || probe.result.textContent === '—' || /NaN|Infinity/.test(probe.result.textContent + probe.details.innerHTML)) failures.push(type + ': large finite values failed');
}

if (failures.length) throw Error(failures.join('\n'));
console.log('Motion mechanics QA PASS: 5 calculators passed known values, field-by-field blank/invalid/zero/negative checks, reset wiring, and large finite inputs.');
