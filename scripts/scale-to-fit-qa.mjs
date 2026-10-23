import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';

const main={textContent:''},details={innerHTML:''},error={textContent:''};
const copy={disabled:false,addEventListener(){}},print={disabled:false,addEventListener(){}};
globalThis.document={querySelector(selector){return {'#result-main':main,'#result-details':details,'#form-error':error,'#copy-result':copy,'#print-result':print}[selector]},querySelectorAll(){return []}};
eval(`${fs.readFileSync(new URL('../assets/js/site.js',import.meta.url),'utf8')}\nglobalThis.runFit=calculate;`);
const defaults={modelX:220,modelY:180,modelZ:250,buildX:256,buildY:256,buildZ:256,clearance:5};
function run(values={}){runFit({dataset:{calculator:'scale-to-fit'},elements:Object.fromEntries(Object.entries({...defaults,...values}).map(([key,value])=>[key,{value:String(value)}]))})}
function good(values,expected){run(values);assert.equal(error.textContent,'');assert.equal(main.textContent,expected);assert.equal(copy.disabled,false);assert.equal(print.disabled,false);assert.doesNotMatch(main.textContent+details.innerHTML,/NaN|Infinity|undefined|∞/)}
function bad(values,label){run({});run(values);assert.ok(error.textContent,label);assert.equal(main.textContent,'—');assert.doesNotMatch(details.innerHTML,/Limiting axis|Scaled size|NaN|Infinity|undefined|∞/);assert.equal(copy.disabled,true);assert.equal(print.disabled,true)}
// Reproduces the public defect before implementation: zero dimensions yield Infinity/NaN.
bad({modelX:0,modelY:0,modelZ:0},'zero model dimensions must be rejected');
const cases=[
 [{},'98.4%','Z','216.5 × 177.1 × 246'],
 [{clearance:0},'102.4%','Z','225.3 × 184.3 × 256'],
 [{modelX:400},'61.5%','X','246 × 110.7 × 153.8'],
 [{modelY:400},'61.5%','Y','135.3 × 246 × 153.8'],
 [{modelX:100,modelY:100,modelZ:100,buildX:100,buildY:100,buildZ:100,clearance:0},'100%','X','100 × 100 × 100'],
 [{modelX:1e6,modelY:1e6,modelZ:1e6,buildX:1e6,buildY:1e6,buildZ:1e6,clearance:0},'100%','X','1,000,000 × 1,000,000 × 1,000,000']
];
for(const[values,expected,axis,size]of cases){good(values,expected);assert.ok(details.innerHTML.includes(`axis:</strong> ${axis}`));assert.ok(details.innerHTML.includes(size))}
let invalid=0;
for(const field of Object.keys(defaults))for(const value of ['', ' ', 'abc','NaN','Infinity','-Infinity','-1',...(field==='clearance'?[]:['0'])]){bad({[field]:value},`${field}=${value}`);invalid++}
for(const values of [{clearance:128},{clearance:129},{clearance:1e308},{modelX:1e-320,modelY:1e-320,modelZ:1e-320},{modelX:1e308,modelY:1e-320},{modelX:1e308,modelY:1e308,modelZ:1e308,buildX:1e-320,buildY:1e-320,buildZ:1e-320,clearance:0}]){bad(values,'unusable clearance or unsafe derived arithmetic');invalid++}
let grid=0;
for(const x of [50,100,220,400])for(const y of [50,180,300])for(const z of [100,250,350])for(const c of [0,5,20]){
 const ratio=Math.min((256-2*c)/x,(256-2*c)/y,(256-2*c)/z);
 good({modelX:x,modelY:y,modelZ:z,clearance:c},`${new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(ratio*100)}%`);grid++;
}
const outputs=new Map();
const generator=fs.readFileSync(new URL('./generate-phase5-pages.mjs',import.meta.url),'utf8').replace("import fs from 'node:fs';import path from 'node:path';",'').replace("new URL('..',import.meta.url)","new URL('file:///fixture/')");
new Function('fs','path','console',generator)({mkdirSync(){},writeFileSync(file,html){outputs.set(file,html)}},path,{log(){}});
assert.equal(outputs.size,5);
for(const[file,html]of outputs)assert.ok(html.includes(file.includes('scale-to-fit-build-volume-calculator')?'/assets/js/site.js?v=20261023':'/assets/js/site.js"'));
console.log(`Scale to Fit QA PASS: ${cases.length} known cases, ${grid} positive combinations, ${invalid} invalid/range cases; finite results, zero clearance, error action guards and scoped generator version.`);
