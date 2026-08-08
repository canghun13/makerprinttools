(() => {
  const form = document.querySelector('form[data-calculator]');
  if (!form) return;

  const result = document.querySelector('#result-main');
  const details = document.querySelector('#result-details');
  const error = document.querySelector('#form-error');
  const fmt = (number, digits = 4) => Number(number).toLocaleString(undefined, { maximumFractionDigits: digits });
  const value = name => {
    const raw = form.elements[name]?.value;
    return raw == null || raw.trim() === '' ? Number.NaN : Number(raw);
  };
  const positive = number => Number.isFinite(number) && number > 0;
  const clear = message => {
    result.textContent = '—';
    details.innerHTML = '';
    error.textContent = message;
  };
  const show = (main, lines) => {
    if (/NaN|Infinity/.test(main + JSON.stringify(lines))) throw Error('Enter valid finite values to calculate this motion setup.');
    error.textContent = '';
    result.textContent = main;
    details.innerHTML = lines.map(([label, output]) => '<p><strong>' + label + ':</strong> ' + output + '</p>').join('');
  };

  function calculate() {
    try {
      const type = form.dataset.calculator;
      if (type === 'belt-steps') {
        const angle = value('stepAngle');
        const microsteps = value('microsteps');
        const pitch = value('beltPitch');
        const teeth = value('pulleyTeeth');
        const ratio = value('gearRatio');
        if (![angle, microsteps, pitch, teeth, ratio].every(positive) || angle > 90 || microsteps > 1024 || teeth > 1000 || ratio > 100) throw Error('Use positive motor, microstep, belt, pulley, and ratio values within realistic ranges.');
        const fullSteps = 360 / angle;
        const travel = pitch * teeth;
        const stepsPerMm = fullSteps * microsteps * ratio / travel;
        const fullStepDistance = travel / (fullSteps * ratio);
        show(fmt(stepsPerMm) + ' steps/mm', [
          ['Travel per output revolution', fmt(travel) + ' mm'],
          ['Klipper rotation_distance', fmt(travel) + ' mm'],
          ['Full-step distance', fmt(fullStepDistance, 6) + ' mm'],
          ['Microstep distance', fmt(1 / stepsPerMm, 6) + ' mm']
        ]);
        return;
      }
      if (type === 'lead-screw-steps') {
        const angle = value('stepAngle');
        const microsteps = value('microsteps');
        const pitch = value('screwPitch');
        const starts = value('threadStarts');
        const ratio = value('gearRatio');
        if (![angle, microsteps, pitch, starts, ratio].every(positive) || angle > 90 || microsteps > 1024 || starts > 100 || ratio > 100) throw Error('Use positive motor, microstep, screw, start-count, and ratio values within realistic ranges.');
        const fullSteps = 360 / angle;
        const lead = pitch * starts;
        const stepsPerMm = fullSteps * microsteps * ratio / lead;
        const fullStepDistance = lead / (fullSteps * ratio);
        show(fmt(stepsPerMm) + ' steps/mm', [
          ['Lead / travel per output revolution', fmt(lead) + ' mm'],
          ['Klipper rotation_distance', fmt(lead) + ' mm'],
          ['Full-step distance', fmt(fullStepDistance, 6) + ' mm'],
          ['Microstep distance', fmt(1 / stepsPerMm, 6) + ' mm']
        ]);
        return;
      }
      if (type === 'axis-calibration') {
        const currentSteps = value('currentSteps');
        const currentRotation = value('currentRotation');
        const commanded = value('commandedDistance');
        const measured = value('measuredDistance');
        if (![currentSteps, currentRotation, commanded, measured].every(positive) || currentSteps > 1000000 || currentRotation > 100000 || commanded > 100000 || measured > 100000) throw Error('Use positive finite settings and measured distances within realistic ranges.');
        const newSteps = currentSteps * commanded / measured;
        const newRotation = currentRotation * measured / commanded;
        const change = (newSteps / currentSteps - 1) * 100;
        show(fmt(newSteps) + ' corrected steps/mm', [
          ['Steps/mm change', (change >= 0 ? '+' : '') + fmt(change, 4) + '%'],
          ['Corrected Klipper rotation_distance', fmt(newRotation) + ' mm'],
          ['Measured error', fmt(measured - commanded, 4) + ' mm'],
          ['Scale correction factor', fmt(commanded / measured, 6) + '×']
        ]);
        return;
      }
      if (type === 'belt-length') {
        const pitch = value('beltPitch');
        const driverTeeth = value('driverTeeth');
        const drivenTeeth = value('drivenTeeth');
        const center = value('centerDistance');
        if (![pitch, driverTeeth, drivenTeeth, center].every(positive) || pitch > 100 || driverTeeth > 1000 || drivenTeeth > 1000 || center > 100000) throw Error('Use positive belt pitch, pulley tooth counts, and center distance within realistic ranges.');
        const driverDiameter = driverTeeth * pitch / Math.PI;
        const drivenDiameter = drivenTeeth * pitch / Math.PI;
        const exactLength = 2 * center + Math.PI * (driverDiameter + drivenDiameter) / 2 + (drivenDiameter - driverDiameter) ** 2 / (4 * center);
        const beltTeeth = Math.max(1, Math.round(exactLength / pitch));
        const standardLength = beltTeeth * pitch;
        const a = Math.PI * (driverDiameter + drivenDiameter) / 2;
        const b = (drivenDiameter - driverDiameter) ** 2 / 4;
        const discriminant = (standardLength - a) ** 2 - 8 * b;
        if (discriminant < 0) throw Error('These pulley and belt values do not produce a valid open-belt geometry.');
        const adjustedCenter = ((standardLength - a) + Math.sqrt(discriminant)) / 4;
        show(beltTeeth + '-tooth belt', [
          ['Nearest whole-pitch belt length', fmt(standardLength) + ' mm'],
          ['Calculated pitch-line length', fmt(exactLength) + ' mm'],
          ['Center distance with rounded belt', fmt(adjustedCenter) + ' mm'],
          ['Center-distance adjustment', (adjustedCenter - center >= 0 ? '+' : '') + fmt(adjustedCenter - center, 4) + ' mm']
        ]);
        return;
      }
      if (type === 'pulse-rate') {
        const stepsPerMm = value('stepsPerMm');
        const speed = value('linearSpeed');
        const angle = value('stepAngle');
        const microsteps = value('microsteps');
        if (![stepsPerMm, speed, angle, microsteps].every(positive) || stepsPerMm > 1000000 || speed > 100000 || angle > 90 || microsteps > 1024) throw Error('Use positive steps/mm, speed, motor-angle, and microstep values within realistic ranges.');
        const pulses = stepsPerMm * speed;
        const stepsPerRev = 360 / angle * microsteps;
        const rpm = pulses / stepsPerRev * 60;
        const travelPerRev = stepsPerRev / stepsPerMm;
        show(fmt(pulses, 2) + ' step pulses/s', [
          ['Step frequency', fmt(pulses / 1000, 4) + ' kHz'],
          ['Motor speed', fmt(rpm, 2) + ' rpm'],
          ['Pulse interval', fmt(1000000 / pulses, 4) + ' µs'],
          ['Travel per motor revolution', fmt(travelPerRev, 4) + ' mm']
        ]);
        return;
      }
      throw Error('This motion calculator is not configured.');
    } catch (exception) {
      clear(exception.message || 'Enter valid finite values to calculate this motion setup.');
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
