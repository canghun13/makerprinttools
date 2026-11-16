import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const main={textContent:''},details={innerHTML:''},error={textContent:''};
const copy={disabled:false,addEventListener(){}},print={disabled:false,addEventListener(){}};
globalThis.document={querySelector(s){return {'#result-main':main,'#result-details':details,'#form-error':error,'#copy-result':copy,'#print-result':print}[s]},querySelectorAll(){return []}};
eval(`${fs.readFileSync(new URL('../assets/js/site.js',import.meta.url),'utf8')}\nglobalThis.runYield=calculate;`);
const defaults={bottleMl:1000,modelMl:65,resinWaste:10,resinQuantity:12};
function run(values={}){runYield({dataset:{calculator:'resin-yield'},elements:Object.fromEntries(Object.entries({...defaults,...values}).map(([k,v])=>[k,{value:String(v)}]))})}
function good(values,count,bottles){run(values);assert.equal(error.textContent,'');assert.equal(main.textContent,`${new Intl.NumberFormat('en-US').format(count)} ${count===1?'print':'prints'}`);assert.ok(details.innerHTML.includes(`Bottles needed:</strong> ${new Intl.NumberFormat('en-US').format(bottles)}</p>`));assert.equal(copy.disabled,false);assert.equal(print.disabled,false);assert.doesNotMatch(main.textContent+details.innerHTML,/NaN|Infinity|undefined|∞/)}
// The production implementation returned five prints and two bottles at this exact boundary.
good({bottleMl:660,modelMl:100,resinWaste:10,resinQuantity:6},6,1);
const cases=[
 [{},13,1],
 [{bottleMl:660,modelMl:110,resinWaste:0,resinQuantity:6},6,1],
 [{bottleMl:660,modelMl:100,resinWaste:10.0001,resinQuantity:6},5,2],
 [{bottleMl:660,modelMl:100,resinWaste:9.9999,resinQuantity:6},6,1],
 [{bottleMl:659.9999999999999,modelMl:100,resinWaste:10,resinQuantity:6},5,2],
 [{bottleMl:660.0000000000001,modelMl:100,resinWaste:10,resinQuantity:6},6,1],
 [{bottleMl:.66,modelMl:.1,resinWaste:10,resinQuantity:6},6,1],
 [{bottleMl:100,modelMl:100,resinWaste:0,resinQuantity:1},1,1],
 [{bottleMl:100,modelMl:100,resinWaste:100,resinQuantity:1},0,2],
 [{bottleMl:'1e308',modelMl:'1e307',resinWaste:10,resinQuantity:1},9,1],
 [{bottleMl:1000000,modelMl:1,resinWaste:0,resinQuantity:100000},1000000,1]
];
for(const [values,count,bottles]of cases)good(values,count,bottles);
let grid=0;
// Integer-hundredths oracle: adjusted model hundredths = model * (100 + waste).
for(const bottle of [1,11,110,660,1000])for(const model of [1,10,100])for(const waste of [0,10,25,100])for(const quantity of [1,6,12]){
 const per=model*(100+waste),available=bottle*100;
 good({bottleMl:bottle,modelMl:model,resinWaste:waste,resinQuantity:quantity},Math.floor(available/per),Math.floor((per*quantity+available-1)/available));grid++;
}
let invalid=0;
function bad(values){good({},13,1);run(values);assert.ok(error.textContent);assert.equal(main.textContent,'—');assert.doesNotMatch(details.innerHTML,/Adjusted resin|Bottles needed|NaN|Infinity|undefined|∞/);assert.equal(copy.disabled,true);assert.equal(print.disabled,true);invalid++}
for(const field of Object.keys(defaults))for(const value of ['',' ','abc','NaN','Infinity','-Infinity','-1',...(field==='resinWaste'?['100.01']:['0'])])bad({[field]:value});
for(const values of [{resinQuantity:1.5},{resinQuantity:100001},{bottleMl:'1e-308',modelMl:'1e308'},{modelMl:'1e308',resinQuantity:12},{bottleMl:'1e308',modelMl:'1e-308'}])bad(values);
const outputs=new Map();
const generator=fs.readFileSync(new URL('./generate-calculator-pages.mjs',import.meta.url),'utf8').replace("import fs from 'node:fs';import path from 'node:path';",'').replace(/^const root=.*$/m,"const root='/fixture';");
new Function('fs','path','console',generator)({mkdirSync(){},writeFileSync(file,html){outputs.set(file,html)}},path,{log(){}});
const target=[...outputs].find(([f])=>f.includes('resin-bottle-yield-calculator'));assert.ok(target);assert.ok(target[1].includes('/assets/js/site.js?v=20261116'));
const normalized=target[1].replace('<a href="/about/">About</a>','<a href="/guides/">Guides</a><a href="/about/">About</a>');
assert.equal(normalized,fs.readFileSync(new URL('../tools/resin/resin-bottle-yield-calculator/index.html',import.meta.url),'utf8').trim());
console.log(`Resin Yield QA PASS: ${cases.length+1} known cases, ${grid} ordinary combinations, ${invalid} invalid/range cases; exact boundary counts, action guards and target generator parity.`);
