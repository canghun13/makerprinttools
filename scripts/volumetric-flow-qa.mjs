import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';

const main={textContent:''},details={innerHTML:''},error={textContent:''};
const copy={disabled:false,addEventListener(){}},print={disabled:false,addEventListener(){}};
globalThis.document={querySelector(selector){return {'#result-main':main,'#result-details':details,'#form-error':error,'#copy-result':copy,'#print-result':print}[selector]},querySelectorAll(){return []}};
eval(`${fs.readFileSync(new URL('../assets/js/site.js',import.meta.url),'utf8')}\nglobalThis.runFlow=calculate;`);
const defaults={width:'.45',height:'.2',speed:'100',maxFlow:'12'};
function run(values={}){runFlow({dataset:{calculator:'flow'},elements:Object.fromEntries(Object.entries({...defaults,...values}).map(([key,value])=>[key,{value:String(value)}]))})}
function good(values,expected){run(values);assert.equal(error.textContent,'');assert.equal(main.textContent,expected);assert.equal(copy.disabled,false);assert.equal(print.disabled,false);assert.doesNotMatch(main.textContent+details.innerHTML,/NaN|Infinity|undefined|∞/)}
function bad(values,label){good({},'9 mm³/s');run(values);assert.ok(error.textContent,label);assert.equal(main.textContent,'—',label);assert.doesNotMatch(details.innerHTML,/Hotend utilization|Speed at limit|NaN|Infinity|undefined|∞/);assert.equal(copy.disabled,true,label);assert.equal(print.disabled,true,label)}
// This regression must fail on the original runtime: zero height allowed infinity.
bad({height:'0'},'zero layer height must be rejected');
const cases=[
 [{},'9 mm³/s'],[{width:'.4',height:'.25',speed:'120',maxFlow:'15'},'12 mm³/s'],
 [{width:'.4',height:'.2',speed:'150'},'12 mm³/s'],
 [{width:'.6',height:'.3',speed:'100'},'18 mm³/s'],
 [{maxFlow:'0'},'9 mm³/s'],
 [{width:'1',height:'1',speed:'1000000',maxFlow:'2000000'},'1,000,000 mm³/s']
];
for(const [values,expected]of cases)good(values,expected);
let invalidChecks=0;
for(const field of Object.keys(defaults))for(const value of ['', ' ', 'abc','NaN','Infinity','-Infinity','-1']){bad({[field]:value},`${field}=${value}`);invalidChecks++}
for(const field of ['width','height','speed']){bad({[field]:'0'},`${field}=0`);invalidChecks++}
for(const values of [
 {width:'1e308',height:'1e308'},
 {width:'100',height:'1',speed:'1e308'},
 {width:'1e-300',height:'1e-300'},
 {speed:'1e-323'},
 {maxFlow:'1e-308'},
 {width:'1e-100',height:'1e-100',maxFlow:'1e308'}
]){bad(values,'unsafe derived arithmetic');invalidChecks++}
let gridChecks=0;
for(const width of [.2,.4,.45,.6,.8,1])for(const height of [.1,.2,.25,.3])for(const speed of [10,50,100,200]){
 const maxFlow=12,flow=width*height*speed;
 good({width,height,speed,maxFlow},`${new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(flow)} mm³/s`);
 assert.ok(details.innerHTML.includes(new Intl.NumberFormat('en-US',{maximumFractionDigits:1}).format(maxFlow/(width*height))));gridChecks++;
}
good({maxFlow:0},'9 mm³/s');assert.doesNotMatch(details.innerHTML,/Hotend utilization|Speed at limit/);
// Preserve in-memory generator consistency without overwriting unrelated pages.
const outputs=new Map();
const generator=fs.readFileSync(new URL('./generate-calculator-pages.mjs',import.meta.url),'utf8').replace("import fs from 'node:fs';import path from 'node:path';",'').replace(/^const root=.*$/m,"const root='/fixture';");
new Function('fs','path','console',generator)({mkdirSync(){},writeFileSync(file,html){outputs.set(file,html)}},path,{log(){}});
let targetFound=false;
for(const [file,html]of outputs){
 const target=file.includes('volumetric-flow-calculator'),layers=file.includes('layer-count-calculator');
 assert.ok(html.includes(target?'/assets/js/site.js?v=20261015':layers?'/assets/js/site.js?v=20261009':file.includes('model-scale-calculator')?'/assets/js/site.js?v=20261028':'/assets/js/site.js"'));
 if(target)targetFound=true;
}
assert.ok(targetFound);
console.log(`Volumetric Flow QA PASS: ${cases.length} known cases, ${gridChecks} positive combinations, ${invalidChecks} invalid/range cases, zero-as-unknown and error action guards.`);
