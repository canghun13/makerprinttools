import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const main={textContent:''},details={innerHTML:''},error={textContent:''};
const copy={disabled:false,addEventListener(){}},print={disabled:false,addEventListener(){}};
globalThis.document={querySelector(s){return {'#result-main':main,'#result-details':details,'#form-error':error,'#copy-result':copy,'#print-result':print}[s]},querySelectorAll(){return []}};
eval(`${fs.readFileSync(new URL('../assets/js/site.js',import.meta.url),'utf8')}\nglobalThis.runSupport=calculate;`);
const defaults={supportVolume:18,supportDensity:1.24,supportOverhead:15,supportReserve:5};
const fmt=(v,d)=>new Intl.NumberFormat('en-US',{maximumFractionDigits:d}).format(v);
function run(values={}){runSupport({dataset:{calculator:'support-material'},elements:Object.fromEntries(Object.entries({...defaults,...values}).map(([k,v])=>[k,{value:String(v)}]))})}
function good(values,grams,allowance){run(values);assert.equal(error.textContent,'');assert.equal(main.textContent,`${fmt(grams,1)} g`);assert.match(details.innerHTML,new RegExp(`Total allowance:</strong> ${String(allowance).replace('.','\\.')}%`));assert.equal(copy.disabled,false);assert.equal(print.disabled,false);assert.doesNotMatch(main.textContent+details.innerHTML,/NaN|Infinity|undefined|∞/)}
function bad(values,label){good({},26.9514,20.75);run(values);assert.ok(error.textContent,label);assert.equal(main.textContent,'—');assert.doesNotMatch(details.innerHTML,/Base support mass:|Total allowance:|NaN|Infinity|undefined|∞/);assert.equal(copy.disabled,true);assert.equal(print.disabled,true)}
// Fails on the original public runtime: 132 g on a 100 g base was labeled 30%, not 32%.
good({supportVolume:100,supportDensity:1,supportOverhead:20,supportReserve:10},132,32);
const cases=[
 [{},26.9514,20.75],
 [{supportVolume:100,supportDensity:1,supportOverhead:0,supportReserve:0},100,0],
 [{supportVolume:100,supportDensity:1,supportOverhead:20,supportReserve:0},120,20],
 [{supportVolume:100,supportDensity:1,supportOverhead:0,supportReserve:10},110,10],
 [{supportVolume:100,supportDensity:1,supportOverhead:100,supportReserve:100},400,300],
 [{supportVolume:25,supportDensity:1.2,supportOverhead:12.5,supportReserve:7.5},36.28125,20.9375],
 [{supportVolume:1000000,supportDensity:1,supportOverhead:20,supportReserve:10},1320000,32]
];
for(const[v,g,a]of cases)good(v,g,fmt(a,2));
run({supportVolume:100,supportDensity:1,supportOverhead:20,supportReserve:10});
assert.match(details.innerHTML,/Interface \/ purge addition:<\/strong> 20 g/);assert.match(details.innerHTML,/Loss reserve addition:<\/strong> 12 g/);
// Do not overflow an intermediate base * percent when the final mass is finite.
run({supportVolume:'1e308',supportDensity:1,supportOverhead:20,supportReserve:10});
assert.equal(error.textContent,'');assert.doesNotMatch(main.textContent+details.innerHTML,/NaN|Infinity|undefined|∞/);assert.equal(copy.disabled,false);assert.equal(print.disabled,false);
let grid=0;
// Independent integer-percent mass and allowance oracles, not reused product functions.
for(const volume of [1,10,100,1000])for(const density of [1,1.24,1.5])for(const overhead of [0,5,20,100])for(const reserve of [0,10,25,100]){
 const allowance=overhead+reserve+overhead*reserve/100,grams=volume*density*(10000+100*overhead+100*reserve+overhead*reserve)/10000;
 good({supportVolume:volume,supportDensity:density,supportOverhead:overhead,supportReserve:reserve},grams,fmt(allowance,2));grid++;
}
let invalid=0;
for(const field of Object.keys(defaults))for(const value of ['',' ','abc','NaN','Infinity','-Infinity','-1',...(['supportVolume','supportDensity'].includes(field)?['0']:['100.01'])]){bad({[field]:value},`${field}=${value}`);invalid++}
for(const values of [{supportVolume:'1e308',supportDensity:'1e308'},{supportVolume:'1e308',supportDensity:1,supportOverhead:100,supportReserve:100},{supportVolume:'1e-308',supportDensity:'1e-308'}]){bad(values,'unsafe derived arithmetic');invalid++}
const outputs=new Map();
const generator=fs.readFileSync(new URL('./generate-phase5-pages.mjs',import.meta.url),'utf8').replace("import fs from 'node:fs';import path from 'node:path';",'').replace("new URL('..',import.meta.url)","new URL('file:///fixture/')");
new Function('fs','path','console',generator)({mkdirSync(){},writeFileSync(file,html){outputs.set(file,html)}},path,{log(){}});
const target=[...outputs].find(([f])=>f.includes('support-material-estimator'));assert.ok(target);assert.ok(target[1].includes('/assets/js/site.js?v=20261110'));
// Apply the pre-existing shared header normalization in memory only.
const normalized=target[1].replace('<a href="/tools/">Tools</a><a href="/guides/">Guides</a><a href="/about/">About</a>','<a aria-current="page" href="/tools/">Tools</a><a href="/guides/">Guides</a><a href="/about/">About</a><a href="/contact/">Contact</a>');
assert.equal(normalized,fs.readFileSync(new URL('../tools/filament/support-material-estimator/index.html',import.meta.url),'utf8').trim());
console.log(`Support Material QA PASS: ${cases.length+1} known cases, ${grid} ordinary combinations, ${invalid} invalid/range cases; staged allowance, action guards and generator parity.`);
