import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';

const main={textContent:''},details={innerHTML:''},error={textContent:''};
const copy={disabled:false,addEventListener(){}},print={disabled:false,addEventListener(){}};
globalThis.document={querySelector(selector){return {'#result-main':main,'#result-details':details,'#form-error':error,'#copy-result':copy,'#print-result':print}[selector]},querySelectorAll(){return []}};
eval(`${fs.readFileSync(new URL('../assets/js/site.js',import.meta.url),'utf8')}\nglobalThis.runScale=calculate;`);
const defaults={original:80,target:120,weight:50};
function run(values={}){runScale({dataset:{calculator:'scale'},elements:Object.fromEntries(Object.entries({...defaults,...values}).map(([key,value])=>[key,{value:String(value)}]))})}
function good(values,expected){run(values);assert.equal(error.textContent,'');assert.equal(main.textContent,expected);assert.equal(copy.disabled,false);assert.equal(print.disabled,false);assert.doesNotMatch(main.textContent+details.innerHTML,/NaN|Infinity|undefined|∞/)}
function bad(values,label){good({},'150%');run(values);assert.ok(error.textContent,label);assert.equal(main.textContent,'—',label);assert.doesNotMatch(details.innerHTML,/Scale factor:|Estimated new weight:|Volume:|NaN|Infinity|undefined|∞/);assert.equal(copy.disabled,true,`${label}: Copy must be disabled`);assert.equal(print.disabled,true,`${label}: Print must be disabled`)}
// Fails on the public original: required blank clears the result but leaves actions enabled.
bad({original:''},'blank required dimension');
const cases=[
 [{},'150%','337.5%','168.8 g'],
 [{original:100,target:100,weight:80},'100%','100%','80 g'],
 [{original:100,target:50,weight:80},'50%','12.5%','10 g'],
 [{target:160},'200%','800%','400 g'],
 [{original:2.5,target:25,weight:.5},'1,000%','100,000%','500 g'],
 [{weight:''},'150%','337.5%',null],
 [{weight:0},'150%','337.5%',null],
 [{original:1000000,target:2000000,weight:1000000},'200%','800%','8,000,000 g']
];
for(const[values,expected,volume,weight]of cases){good(values,expected);assert.ok(details.innerHTML.includes(volume));if(weight)assert.ok(details.innerHTML.includes(weight));else assert.doesNotMatch(details.innerHTML,/Estimated new weight/)}
good({weight:' '},'150%');assert.doesNotMatch(details.innerHTML,/Estimated new weight/);
let invalid=0;
for(const field of Object.keys(defaults))for(const value of ['abc','NaN','Infinity','-Infinity','-1',...(field==='weight'?[]:['',' ','0'])]){bad({[field]:value},`${field}=${value}`);invalid++}
for(const values of [
 {original:'1e-200',target:'1e200'},
 {original:1,target:'1e308'},
 {original:1,target:'1e110'},
 {original:1,target:'5e102'},
 {original:1,target:2,weight:'1e308'},
 {original:'1e308',target:'1e-308'},
 {original:'1e200',target:1},
 {original:1,target:'1e-50',weight:'1e-308'}
]){bad(values,'unsafe derived arithmetic');invalid++}
let grid=0;
for(const original of [1,10,25.4,80,1000])for(const target of [1,20,50,120,2000])for(const weight of [0,1,50,1000000]){
 const ratio=target/original;good({original,target,weight},`${new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(ratio*100)}%`);grid++;
}
const outputs=new Map();
const generator=fs.readFileSync(new URL('./generate-calculator-pages.mjs',import.meta.url),'utf8').replace("import fs from 'node:fs';import path from 'node:path';",'').replace(/^const root=.*$/m,"const root='/fixture';");
new Function('fs','path','console',generator)({mkdirSync(){},writeFileSync(file,html){outputs.set(file,html)}},path,{log(){}});
let targetFound=false;
for(const[file,html]of outputs){const target=file.includes('model-scale-calculator'),flow=file.includes('volumetric-flow-calculator'),layers=file.includes('layer-count-calculator');assert.ok(html.includes(target?'/assets/js/site.js?v=20261028':flow?'/assets/js/site.js?v=20261015':layers?'/assets/js/site.js?v=20261009':'/assets/js/site.js"'));if(target)targetFound=true}
assert.ok(targetFound);
console.log(`Model Scale QA PASS: ${cases.length} known cases, ${grid} normal combinations, ${invalid} invalid/range cases; optional weight, error action guards and scoped generator version.`);
