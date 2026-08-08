import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ga = '<script async src="https://www.googletagmanager.com/gtag/js?id=G-T6DZFFQJP3"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-T6DZFFQJP3");</script>';
const header = active => '<a class="skip-link" href="#main">Skip to content</a><div class="utility-bar">Measure twice. Slice once.</div><header class="site-header"><nav class="nav-shell"><a class="brand" href="/"><span class="brand-mark">MP</span>MakerPrintTools</a><button class="nav-toggle" aria-expanded="false">Menu</button><div class="nav-links"><a' + (active === 'tools' ? ' aria-current="page"' : '') + ' href="/tools/">Tools</a><a' + (active === 'guides' ? ' aria-current="page"' : '') + ' href="/guides/">Guides</a><a href="/about/">About</a><a href="/contact/">Contact</a></div></nav></header>';
const footer = '<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a class="brand" href="/"><span class="brand-mark">MP</span>MakerPrintTools</a><p>Practical calculators for everyday 3D printing decisions.</p></div><div><strong>Workbench</strong><ul><li><a href="/tools/">All tools</a></li><li><a href="/tools/motion/">Motion mechanics</a></li></ul></div><div><strong>Site</strong><ul><li><a href="/about/">About</a></li><li><a href="/privacy/">Privacy</a></li><li><a href="/contact/">Contact</a></li></ul></div></div><div class="fine-print">© 2026 MakerPrintTools. Motion results are theoretical; verify settings on the machine.</div></div></footer><script src="/assets/js/site.js"></script><script src="/assets/js/motion-mechanics.js"></script>';

function documentPage({ url, title, description, body, article = false, nav = 'tools' }) {
  const ogType = article ? 'article' : 'website';
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + title + ' | MakerPrintTools</title><meta name="description" content="' + description + '"><meta name="robots" content="index,follow"><link rel="canonical" href="https://makerprinttools.com/' + url + '"><meta property="og:type" content="' + ogType + '"><meta property="og:title" content="' + title + '"><meta property="og:description" content="' + description + '"><meta property="og:url" content="https://makerprinttools.com/' + url + '"><meta property="og:site_name" content="MakerPrintTools"><link rel="icon" href="/assets/icons/favicon.svg"><link rel="stylesheet" href="/assets/css/site.css">' + ga + '</head><body>' + header(nav) + '<main id="main">' + body + '</main>' + footer + '</body></html>';
}

const related = '<div class="related"><a href="/tools/motion/">Motion Mechanics Tools</a><a href="/tools/motion/belt-steps-per-mm-calculator/">Belt Steps/mm</a><a href="/tools/motion/lead-screw-steps-per-mm-calculator/">Lead Screw Steps/mm</a><a href="/tools/motion/axis-steps-calibration-calculator/">Axis Calibration</a><a href="/tools/motion/timing-belt-length-calculator/">Timing Belt Length</a><a href="/tools/motion/step-pulse-rate-calculator/">Step Pulse Rate</a><a href="/guides/3d-printer-motion-settings/">Motion Settings Guide</a><a href="/reference/stepper-motion-reference/">Stepper Motion Reference</a></div>';
const num = (id, label, value, note = '', step = '1') => '<div class="field"><label for="' + id + '">' + label + '</label><input id="' + id + '" name="' + id + '" type="number" min="0" step="' + step + '" value="' + value + '">' + (note ? '<small>' + note + '</small>' : '') + '</div>';

const calculators = [
  {
    slug: 'belt-steps-per-mm-calculator',
    type: 'belt-steps',
    title: 'Belt Steps per mm Calculator',
    description: 'Calculate 3D printer or CNC belt-axis steps per mm, rotation distance, and theoretical step resolution from motor, microstepping, belt pitch, and pulley teeth.',
    lede: 'Turn motor and GT-style belt hardware into firmware-ready motion values before changing an X or Y axis.',
    fields: num('stepAngle', 'Motor step angle (degrees)', 1.8, '1.8° = 200 full steps/rev; 0.9° = 400.', '0.1') + num('microsteps', 'Configured microsteps', 16, 'Use the configured driver value, not interpolation.') + num('beltPitch', 'Belt pitch (mm)', 2, 'GT2 / 2GT belt pitch is 2 mm.', '0.1') + num('pulleyTeeth', 'Drive pulley teeth', 20) + num('gearRatio', 'Motor-to-output ratio', 1, 'Motor revolutions per output revolution; direct drive = 1.', '0.01'),
    formula: 'Full steps/rev = 360 ÷ motor step angle. Steps/mm = full steps/rev × microsteps × motor-to-output ratio ÷ (belt pitch × pulley teeth). For a direct belt drive, Klipper rotation_distance is belt pitch × pulley teeth.',
    use: 'Use this after changing a motor, stepper-driver microstep setting, drive pulley, belt pitch, or reduction stage. The result is a theoretical starting value for Marlin M92 or an equivalent firmware setting.',
    example: 'A 1.8° motor at 16 microsteps driving a 20-tooth GT2 pulley travels 40 mm per revolution. It needs 3,200 microsteps per revolution, so the result is 80 steps/mm and 0.0125 mm per microstep.',
    assumptions: 'The belt is synchronous, pulley tooth count is correct, and the entered ratio is motor revolutions per output revolution.',
    limitation: 'Theoretical microstep distance is not guaranteed positioning accuracy. Belt stretch, pulley runout, frame compliance, driver current, and lost steps remain mechanical limits.',
    mistake: 'Do not use a driver’s internal 256× interpolation when firmware is configured to send 16 microsteps.'
  },
  {
    slug: 'lead-screw-steps-per-mm-calculator',
    type: 'lead-screw-steps',
    title: 'Lead Screw Steps per mm Calculator',
    description: 'Calculate Z-axis or linear-stage steps per mm, screw lead, rotation distance, and theoretical resolution from motor angle, microsteps, pitch, starts, and ratio.',
    lede: 'Separate screw pitch from screw lead so a Z-axis hardware change produces the correct motion setting.',
    fields: num('stepAngle', 'Motor step angle (degrees)', 1.8, '1.8° = 200 full steps/rev; 0.9° = 400.', '0.1') + num('microsteps', 'Configured microsteps', 16) + num('screwPitch', 'Thread pitch (mm)', 2, 'Distance between adjacent thread crests.', '0.1') + num('threadStarts', 'Thread starts', 4, 'Lead = pitch × starts.') + num('gearRatio', 'Motor-to-screw ratio', 1, 'Motor revolutions per screw revolution; direct coupling = 1.', '0.01'),
    formula: 'Lead = screw pitch × thread starts. Steps/mm = full steps/rev × microsteps × motor-to-screw ratio ÷ lead. For direct coupling, Klipper rotation_distance equals the screw lead.',
    use: 'Use this when replacing a Z lead screw, changing a motor, changing configured microsteps, or adding a belt reduction between the motor and screw.',
    example: 'A common T8×8 screw has 2 mm pitch and four starts, giving 8 mm lead. A 1.8° motor at 16 microsteps and direct coupling produces 400 steps/mm.',
    assumptions: 'Pitch and start count describe the nut and screw pair actually installed, with no unmodeled gearbox.',
    limitation: 'Backlash, screw straightness, nut preload, coupler alignment, and bed mechanics are not captured by steps/mm.',
    mistake: 'Do not enter the 2 mm pitch of a four-start T8×8 screw as its travel per revolution; the lead is 8 mm.'
  },
  {
    slug: 'axis-steps-calibration-calculator',
    type: 'axis-calibration',
    title: 'Axis Steps Calibration Calculator',
    description: 'Correct 3D printer or CNC axis steps per mm and Klipper rotation distance from commanded travel and measured travel.',
    lede: 'Apply one measured motion test to a current firmware value without reversing the correction ratio.',
    fields: num('currentSteps', 'Current steps per mm', 80, '', '0.0001') + num('currentRotation', 'Current Klipper rotation_distance (mm)', 40, 'Enter the existing value even if you use only the steps/mm result.', '0.0001') + num('commandedDistance', 'Commanded movement (mm)', 100, 'Measure carriage travel, not a printed calibration cube.', '0.01') + num('measuredDistance', 'Measured movement (mm)', 99.5, '', '0.01'),
    formula: 'Corrected steps/mm = current steps/mm × commanded distance ÷ measured distance. Corrected rotation_distance = current rotation_distance × measured distance ÷ commanded distance.',
    use: 'Use this only after confirming the theoretical hardware value and measuring direct axis travel with backlash approached from the same direction.',
    example: 'If an axis set to 80 steps/mm is commanded 100 mm but moves 99.5 mm, the corrected value is 80.402 steps/mm. A 40 mm rotation_distance becomes 39.8 mm.',
    assumptions: 'The measurement error is proportional and repeatable across the tested distance.',
    limitation: 'A single scale correction cannot fix backlash, skew, loose pulleys, missed steps, thermal shrinkage, or nonlinear measurement error.',
    mistake: 'Do not calibrate machine motion by measuring a printed cube; material shrinkage and extrusion width add unrelated error.'
  },
  {
    slug: 'timing-belt-length-calculator',
    type: 'belt-length',
    title: 'Timing Belt Length Calculator',
    description: 'Estimate open timing-belt pitch length, whole-tooth belt size, and adjusted center distance for 3D printer, CNC, and maker pulley layouts.',
    lede: 'Translate pulley tooth counts and center distance into a whole-tooth synchronous belt size before ordering or modeling tension adjustment.',
    fields: num('beltPitch', 'Belt pitch (mm)', 2, 'GT2 / 2GT pitch is 2 mm.', '0.1') + num('driverTeeth', 'Driver pulley teeth', 20) + num('drivenTeeth', 'Driven pulley teeth', 20) + num('centerDistance', 'Shaft center distance (mm)', 200, 'Straight-line distance between pulley centers.', '0.1'),
    formula: 'Pitch diameters are teeth × pitch ÷ π. Open-belt length ≈ 2C + π(D₁ + D₂) ÷ 2 + (D₂ − D₁)² ÷ (4C). The result is rounded to the nearest whole tooth, then the matching center distance is solved from the same relation.',
    use: 'Use this for fixed or adjustable two-pulley layouts when choosing a stocked closed-loop belt or checking a CAD center distance.',
    example: 'Two 20-tooth GT2 pulleys at 200 mm center distance require a 440 mm pitch-line belt, exactly 220 teeth.',
    assumptions: 'This is an open, uncrossed two-pulley drive measured at the belt pitch line.',
    limitation: 'Tensioning travel, minimum pulley wrap, idlers, belt thickness outside the pitch line, and manufacturer installation allowances still need a mechanical check.',
    mistake: 'Do not use outside pulley diameter in place of pitch diameter, and do not order a fractional-tooth belt.'
  },
  {
    slug: 'step-pulse-rate-calculator',
    type: 'pulse-rate',
    title: 'Step Pulse Rate Calculator',
    description: 'Calculate required step pulse frequency, motor RPM, pulse interval, and travel per revolution from steps per mm and target linear speed.',
    lede: 'Check how a target axis speed translates into controller pulse load and motor rotational speed.',
    fields: num('stepsPerMm', 'Configured steps per mm', 80, '', '0.0001') + num('linearSpeed', 'Target linear speed (mm/s)', 200, '', '0.1') + num('stepAngle', 'Motor step angle (degrees)', 1.8, '', '0.1') + num('microsteps', 'Configured microsteps', 16),
    formula: 'Step pulse rate = steps/mm × linear speed. Motor RPM = pulse rate ÷ (full steps/rev × microsteps) × 60. Pulse interval is 1,000,000 ÷ pulse rate in microseconds.',
    use: 'Use this when checking whether a firmware, controller, or motion target demands an unusually high step rate or motor speed.',
    example: 'At 80 steps/mm and 200 mm/s, the controller must issue 16,000 step pulses/s. With a 1.8° motor at 16 microsteps, that is 300 rpm and 62.5 µs between pulses.',
    assumptions: 'The steps/mm already includes the complete drive ratio and the controller emits one pulse per configured microstep.',
    limitation: 'A pulse rate within controller capability does not prove the motor has enough torque or that the mechanics can sustain the speed without resonance or missed steps.',
    mistake: 'Do not confuse microstep pulse rate with full-step frequency or treat theoretical microstep resolution as guaranteed accuracy.'
  }
];

function calculatorPage(calculator) {
  const body = '<header class="page-hero"><div class="container"><p class="breadcrumbs"><a href="/">Home</a> / <a href="/tools/">Tools</a> / <a href="/tools/motion/">Motion Mechanics</a> / ' + calculator.title + '</p><p class="eyebrow">Motion mechanics</p><h1>' + calculator.title + '</h1><p class="lede">' + calculator.lede + '</p></div></header><section class="section"><div class="container calculator-layout"><form class="calc-panel" data-calculator="' + calculator.type + '" novalidate><h2>Inputs</h2><div class="field-grid">' + calculator.fields + '</div><p id="form-error" class="error" role="alert"></p><button class="button" type="submit">Calculate</button><button class="button secondary" type="reset">Reset</button></form><aside class="result-panel" aria-live="polite"><p class="eyebrow">Result</p><div id="result-main" class="result-value">—</div><div id="result-details" class="result-detail"></div><div class="button-row"><button class="button secondary" id="copy-result" type="button">Copy result</button><button class="button secondary" id="print-result" type="button">Print</button></div></aside></div></section><article class="section alt"><div class="container content"><h2>What this tool calculates</h2><p>' + calculator.lede + '</p><h2>Formula and method</h2><div class="formula">' + calculator.formula + '</div><h2>When to use it</h2><p>' + calculator.use + '</p><h2>Worked example</h2><p>' + calculator.example + '</p><h2>Assumptions and limitations</h2><p>' + calculator.assumptions + ' ' + calculator.limitation + '</p><h2>Common mistake</h2><p>' + calculator.mistake + '</p><h2>Related motion tools</h2>' + related + '</div></article>';
  return documentPage({ url: 'tools/motion/' + calculator.slug + '/', title: calculator.title, description: calculator.description, body });
}

const hubCards = calculators.map(calculator => '<a href="/tools/motion/' + calculator.slug + '/"><strong>' + calculator.title + '</strong><br><small>' + calculator.description + '</small></a>').join('');
const hub = documentPage({
  url: 'tools/motion/',
  title: '3D Printer Motion Mechanics Tools',
  description: 'Calculate belt and lead-screw steps per mm, measured axis corrections, timing-belt length, and step pulse rate for 3D printers, CNC machines, and maker motion systems.',
  body: '<header class="page-hero"><div class="container"><p class="breadcrumbs"><a href="/">Home</a> / <a href="/tools/">Tools</a> / Motion Mechanics</p><p class="eyebrow">Motion mechanics</p><h1>3D Printer Motion Mechanics Tools</h1><p class="lede">Turn motors, microsteps, belts, pulleys, lead screws, measurements, and speed targets into motion settings you can verify.</p></div></header><section class="section"><div class="container content"><h2>Start with the hardware relationship</h2><p>Motion settings connect step pulses to real travel. Use the hardware calculators first, then use a measured correction only when direct carriage travel is repeatably different. Keep belt, lead-screw, calibration, belt-sizing, and pulse-rate questions separate so one adjustment does not hide a mechanical problem.</p><div class="tool-list">' + hubCards + '</div><h2>Firmware names differ; the mechanics do not</h2><p>Marlin commonly stores steps per unit with M92. Klipper describes travel per full motor revolution as rotation_distance. Both come from the same motor, microstep, ratio, and drive geometry.</p><h2>Explore the motion workbench</h2>' + related + '</div></section>'
});

const guide = documentPage({
  url: 'guides/3d-printer-motion-settings/',
  title: 'How to Recalculate 3D Printer Motion Settings',
  description: 'Recalculate and verify 3D printer motion settings after changing a pulley, belt, lead screw, stepper motor, driver microsteps, or reduction ratio.',
  article: true,
  nav: 'guides',
  body: '<header class="page-hero"><div class="container"><p class="breadcrumbs"><a href="/">Home</a> / <a href="/guides/">Guides</a> / Motion Settings</p><p class="eyebrow">Motion guide</p><h1>How to Recalculate 3D Printer Motion Settings</h1><p class="lede">Treat steps/mm or rotation distance as a description of hardware, then use measurement to verify rather than compensate for loose mechanics.</p></div></header><article class="section"><div class="container content"><h2>Identify what changed</h2><p>A motor step angle, configured microstep value, pulley tooth count, belt pitch, screw lead, or reduction ratio can change the theoretical motion setting. Recalculate from those parts before touching a correction factor.</p><h2>Separate pitch from lead</h2><p>For a multi-start lead screw, pitch is the spacing between adjacent threads; lead is the travel per revolution. Multiply pitch by thread starts. A T8×8 screw commonly has 2 mm pitch and four starts, so its lead is 8 mm.</p><h2>Use the firmware value that matches the machine</h2><p>Marlin M92 expresses pulses as steps per unit. Klipper rotation_distance expresses travel per full motor revolution. They are inverse descriptions once full steps and configured microsteps are known.</p><h2>Measure direct axis travel</h2><p>Command a long, safe movement, approach the measurement from the same direction, and measure the carriage or gantry directly. Repeat the test. Do not use a printed cube because shrinkage, extrusion, skew, and first-layer effects contaminate the measurement.</p><h2>Check pulse rate before raising speed</h2><p>A correct distance setting can still demand too many pulses or too much motor RPM at high speed. Check pulse frequency, then validate torque, resonance, current, acceleration, and missed-step behavior on the machine.</p><h2>Use the motion calculators</h2>' + related + '</div></article>'
});

const reference = documentPage({
  url: 'reference/stepper-motion-reference/',
  title: 'Stepper Motion, Steps per mm and Rotation Distance Reference',
  description: 'Reference formulas and definitions for 3D printer and CNC stepper motion, microstepping, belt pitch, pulley teeth, lead screws, rotation distance, and pulse rate.',
  article: true,
  nav: 'reference',
  body: '<header class="page-hero"><div class="container"><p class="breadcrumbs"><a href="/">Home</a> / <a href="/reference/">Reference</a> / Stepper Motion</p><p class="eyebrow">Motion reference</p><h1>Stepper Motion, Steps per mm and Rotation Distance Reference</h1><p class="lede">Keep motor resolution, drive travel, firmware units, and measured correction in the right order.</p></div></header><article class="section"><div class="container content"><h2>Motor and driver terms</h2><p><strong>Full steps per revolution</strong> = 360 ÷ motor step angle. A 1.8° motor has 200 full steps; a 0.9° motor has 400. <strong>Microsteps</strong> are the subdivisions configured in the stepper driver and firmware. Higher microstepping can smooth motion, but theoretical subdivision is not the same as guaranteed positioning accuracy.</p><h2>Belt and screw travel</h2><p>For a synchronous belt axis, travel per pulley revolution = belt pitch × pulley teeth. For a lead screw, lead = pitch × thread starts. A reduction ratio multiplies the motor steps required for one output revolution.</p><h2>Firmware relationships</h2><div class="formula">Steps/mm = full steps/rev × microsteps × ratio ÷ travel per output revolution. Klipper rotation_distance is the travel per full motor revolution, or full steps/rev × microsteps ÷ steps/mm for a direct axis.</div><h2>Measured correction</h2><p>Corrected steps/mm = current steps/mm × commanded distance ÷ measured distance. Corrected rotation_distance uses the inverse ratio. Apply this only to repeatable direct-travel error after checking mechanics.</p><h2>Pulse rate</h2><p>Pulse rate in steps/s = steps/mm × mm/s. Motor RPM then follows from pulse rate and configured microsteps. Controller headroom and motor torque are separate constraints.</p><h2>Engineering cautions</h2><p>Backlash, compliance, belt tension, pulley eccentricity, screw error, resonance, driver current, and frame alignment are not corrected by theoretical resolution. Verify machine changes at low speed before restoring normal acceleration and travel limits.</p><h2>Primary documentation</h2><div class="related"><a href="https://marlinfw.org/docs/gcode/M092.html">Marlin M92</a><a href="https://www.klipper3d.org/Rotation_Distance.html">Klipper rotation_distance</a><a href="https://www.gates.com/content/dam/gates/home/knowledge-center/mectrol/whitepapers/belt-theory06sm.pdf">Gates Timing Belt Theory</a><a href="https://www.ti.com/lit/an/sloa293/sloa293.pdf">TI Microstepping Note</a></div><h2>Related motion tools</h2>' + related + '</div></article>'
});

const pages = [
  ['tools/motion/', hub],
  ...calculators.map(calculator => ['tools/motion/' + calculator.slug + '/', calculatorPage(calculator)]),
  ['guides/3d-printer-motion-settings/', guide],
  ['reference/stepper-motion-reference/', reference]
];
for (const [url, html] of pages) {
  const directory = path.join(root, url);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), html);
}

console.log('Generated ' + pages.length + ' 3D Printer Motion Mechanics pages.');
