import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const main={textContent:''},details={innerHTML:''},error={textContent:''};
const copy={disabled:false,addEventListener(){}},print={disabled:false,addEventListener(){}};
globalThis.document={querySelector(s){return {'#result-main':main,'#result-details':details,'#form-error':error,'#copy-result':copy,'#print-result':print}[s]},querySelectorAll(){return []}};
eval(`${fs.readFileSync(new URL('../assets/js/site.js',import.meta.url),'utf8')}\nglobalThis.runBreakEven=calculate;`);
const defaults={fixedCost:180,unitPrice:28,variableCost:9,feePercent:12};
function run(values={}){runBreakEven({dataset:{calculator:'break-even-units'},elements:Object.fromEntries(Object.entries({...defaults,...values}).map(([k,v])=>[k,{value:String(v)}]))})}
const format=v=>new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(v);
function good(values,count){run(values);assert.equal(error.textContent,'');assert.equal(main.textContent,`${format(count)} ${count===1?'unit':'units'}`);assert.equal(copy.disabled,false);assert.equal(print.disabled,false);assert.doesNotMatch(main.textContent+details.innerHTML,/NaN|Infinity|undefined|∞/)}
// Original public runtime rounds this exact decimal break-even boundary up to 101.
good({fixedCost:185,unitPrice:3,variableCost:1,feePercent:5},100);
const cases=[
 [{},12],
 [{fixedCost:185,unitPrice:2.85,variableCost:1,feePercent:0},100],
 [{fixedCost:185.00000000000003,unitPrice:3,variableCost:1,feePercent:5},101],
 [{fixedCost:184.99999999999997,unitPrice:3,variableCost:1,feePercent:5},100],
 [{fixedCost:.6,unitPrice:.3,variableCost:.1,feePercent:0},3],
 [{fixedCost:0},0],
 [{fixedCost:1,unitPrice:2,variableCost:1,feePercent:0},1],
 [{fixedCost:100,unitPrice:10,variableCost:0,feePercent:0},10],
 [{fixedCost:1,unitPrice:100,variableCost:0,feePercent:99.99},100],
 [{fixedCost:1850000,unitPrice:3,variableCost:1,feePercent:5},1000000],
 [{fixedCost:'1e308',unitPrice:'1e308',variableCost:0,feePercent:0},1]
];
for(const [values,count]of cases)good(values,count);
let grid=0;
// Independent integer-cents oracle; fixed costs chosen on exact contribution boundaries.
for(const price of [3,7,10,19])for(const variable of [0,1,2])for(const fee of [0,5,15,30])for(const target of [1,10,100]){
 const cents=price*(100-fee)-variable*100;if(cents<=0)continue;
 good({fixedCost:cents*target/100,unitPrice:price,variableCost:variable,feePercent:fee},target);grid++;
}
let invalid=0;
function bad(values){good({},12);run(values);assert.ok(error.textContent);assert.equal(main.textContent,'—');assert.doesNotMatch(details.innerHTML,/Contribution per unit|Revenue at break-even|NaN|Infinity|undefined|∞/);assert.equal(copy.disabled,true);assert.equal(print.disabled,true);invalid++}
for(const field of Object.keys(defaults))for(const value of ['',' ','abc','NaN','Infinity','-Infinity','-1'])bad({[field]:value});
for(const values of [{unitPrice:0},{feePercent:100},{feePercent:100.01},{unitPrice:1,variableCost:2,feePercent:0},{unitPrice:1,variableCost:1,feePercent:0},{fixedCost:1,unitPrice:'1e-308',variableCost:0,feePercent:0},{fixedCost:'1e308',unitPrice:1,variableCost:0,feePercent:0},{fixedCost:'1e308',unitPrice:'1e308',variableCost:'5e307',feePercent:0}])bad(values);
const outputs=new Map();
const generator=fs.readFileSync(new URL('./generate-phase5-pages.mjs',import.meta.url),'utf8').replace("import fs from 'node:fs';import path from 'node:path';",'').replace("new URL('..',import.meta.url)","new URL('file:///fixture/')");
new Function('fs','path','console',generator)({mkdirSync(){},writeFileSync(file,html){outputs.set(file,html)}},path,{log(){}});
const target=[...outputs].find(([f])=>f.includes('break-even-units-calculator'));assert.ok(target);assert.ok(target[1].includes('/assets/js/site.js?v=20261123'));
const normalized=target[1].replace('<a href="/tools/">Tools</a><a href="/guides/">Guides</a><a href="/about/">About</a>','<a aria-current="page" href="/tools/">Tools</a><a href="/guides/">Guides</a><a href="/about/">About</a><a href="/contact/">Contact</a>');
const current=fs.readFileSync(new URL('../tools/business/break-even-units-calculator/index.html',import.meta.url),'utf8').trim();
// The existing Production integration is applied after this historical generator.
const productionLinks=current.match(/<section class="section" data-production-planning-related>[\s\S]*?<\/section>/)?.[0];
assert.ok(productionLinks);assert.equal(normalized.replace('</main>',productionLinks+'</main>'),current);
console.log(`Break-even QA PASS: ${cases.length+1} known cases, ${grid} decimal-boundary cases, ${invalid} invalid/range cases; action guards and target generator parity.`);
