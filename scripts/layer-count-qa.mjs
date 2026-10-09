import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';

const main={textContent:''},details={innerHTML:''},error={textContent:''};
const copy={disabled:false},print={disabled:false};
globalThis.document={
 querySelector(selector){return {'#result-main':main,'#result-details':details,'#form-error':error,'#copy-result':copy,'#print-result':print}[selector]},
 querySelectorAll(){return []}
};
copy.addEventListener=print.addEventListener=()=>{};
eval(`${fs.readFileSync(new URL('../assets/js/site.js',import.meta.url),'utf8')}\nglobalThis.runLayers=calculate;`);
function run(height,first,layer){runLayers({dataset:{calculator:'layers'},elements:{height:{value:String(height)},first:{value:String(first)},layer:{value:String(layer)}}})}
function expect(height,first,layer,count){
 run(height,first,layer);
 assert.equal(error.textContent,'',`${height}/${first}/${layer}: unexpected error`);
 assert.equal(main.textContent,`${new Intl.NumberFormat('en-US').format(count)} ${count===1?'layer':'layers'}`,`${height}/${first}/${layer}: incorrect count`);
 assert.equal(copy.disabled,false);assert.equal(print.disabled,false);
 assert.doesNotMatch(main.textContent+details.innerHTML,/NaN|Infinity|undefined|∞/);
}
const cases=[
 [50,.24,.2,250],[.8,.2,.2,4],[.6,.2,.2,3],
 [.80001,.2,.2,5],[.79999,.2,.2,4],
 [.800000000000001,.2,.2,5],[.2,.2,.2,1],
 [.200000000000001,.2,.2,2],
 [1,.3,.1,8],['8e-1','2e-1','2e-1',4],
 [200000000,.2,.2,1000000000],
 ['1e-307','1e-308','1e-308',10],
 [100000000000000.3,.2,.2,500000000000002]
];
for(const args of cases)expect(...args);
let checks=0;
// Expected counts come from integer hundredths, independently of decimal floating-point operations.
for(let height=20;height<=200;height+=3){
 for(const first of [5,10,20])for(const layer of [5,10,20,25]){
  const remaining=height-first;
  const count=1+Math.floor(remaining/layer)+(remaining%layer===0?0:1);
  expect((height/100).toFixed(2),(first/100).toFixed(2),(layer/100).toFixed(2),count);checks++;
 }
}
for(const field of ['height','first','layer'])for(const invalid of ['', 'abc', 'NaN','Infinity','0','-1']){
 expect(50,.24,.2,250);
 const values={height:'50',first:'.24',layer:'.2'};values[field]=invalid;
 run(values.height,values.first,values.layer);
 assert.ok(error.textContent,`${field}=${invalid}: not rejected`);
 assert.equal(main.textContent,'—');
 assert.doesNotMatch(details.innerHTML,/First layer:|Remaining layers:|NaN|Infinity|undefined|∞/);
 assert.equal(copy.disabled,true);assert.equal(print.disabled,true);
}
for(const args of [[.1,.2,.2],['1e308','.2','1e-308'],['1','.2','1e-20']]){
 expect(50,.24,.2,250);run(...args);
 assert.ok(error.textContent,'invalid/unsafe count not rejected');assert.equal(main.textContent,'—');
 assert.equal(copy.disabled,true);assert.equal(print.disabled,true);
 assert.doesNotMatch(details.innerHTML,/NaN|Infinity|undefined|∞/);
}
expect(50,.24,.2,250);
// Exercise only the generator's outputs in memory; never regenerate unrelated pages on disk.
const outputs=new Map();
const generator=fs.readFileSync(new URL('./generate-calculator-pages.mjs',import.meta.url),'utf8')
 .replace("import fs from 'node:fs';import path from 'node:path';",'')
 .replace(/^const root=.*$/m,"const root='/fixture';");
new Function('fs','path','console',generator)({mkdirSync(){},writeFileSync(file,html){outputs.set(file,html)}},path,{log(){}});
let layersFound=false;
for(const [file,html]of outputs){
 const target=file.includes('layer-count-calculator');
 assert.ok(html.includes(target?'/assets/js/site.js?v=20261009':'/assets/js/site.js"'),`unexpected runtime version: ${file}`);
 if(target)layersFound=true;
}
assert.ok(layersFound,'Layer Count missing from generator');
console.log(`Layer Count QA PASS: ${cases.length} known cases, ${checks} decimal-grid cases, invalid/unsafe boundaries and error Copy/Print guards.`);
