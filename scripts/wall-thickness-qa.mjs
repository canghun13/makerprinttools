import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const main={textContent:''},details={innerHTML:''},error={textContent:''};
const copy={disabled:false,addEventListener(){}},print={disabled:false,addEventListener(){}};
globalThis.document={querySelector(selector){return {'#result-main':main,'#result-details':details,'#form-error':error,'#copy-result':copy,'#print-result':print}[selector]},querySelectorAll(){return []}};
eval(`${fs.readFileSync(new URL('../assets/js/site.js',import.meta.url),'utf8')}\nglobalThis.runWall=calculate;`);
const defaults={targetWall:1.6,wallLine:.45,minimumWalls:2};
function run(values={}){runWall({dataset:{calculator:'wall-thickness'},elements:Object.fromEntries(Object.entries({...defaults,...values}).map(([k,v])=>[k,{value:String(v)}]))})}
function good(values,count){run(values);assert.equal(error.textContent,'');assert.equal(main.textContent,`${new Intl.NumberFormat('en-US').format(count)} ${count===1?'wall':'walls'}`);assert.equal(copy.disabled,false);assert.equal(print.disabled,false);assert.doesNotMatch(main.textContent+details.innerHTML,/NaN|Infinity|undefined|∞/);assert.doesNotMatch(details.innerHTML,/Above target by:<\/strong> -/)}
function bad(values,label){good({},4);run(values);assert.ok(error.textContent,label);assert.equal(main.textContent,'—');assert.doesNotMatch(details.innerHTML,/Actual wall thickness:|Above target by:|NaN|Infinity|undefined|∞/);assert.equal(copy.disabled,true);assert.equal(print.disabled,true)}
// Fails against the public original: 2.1 / 0.3 is just above 7 in binary arithmetic.
good({targetWall:2.1,wallLine:.3},7);
const cases=[
 [{},4], [{targetWall:1.6,wallLine:.4},4],
 [{targetWall:'2.100000000000001',wallLine:.3},8],
 [{targetWall:'2.099999999999999',wallLine:.3},7],
 [{targetWall:.9,wallLine:.3},3], [{targetWall:.28,wallLine:.04},7],
 [{targetWall:.2,wallLine:.4,minimumWalls:1},1],
 [{targetWall:1,wallLine:.4,minimumWalls:8},8],
 [{targetWall:1,wallLine:.4,minimumWalls:2.1},3],
 [{targetWall:'2.1e-5',wallLine:'3e-6'},7],
 [{targetWall:'1e-307',wallLine:'1e-308'},10],
 [{targetWall:1000000,wallLine:.2},5000000],
 [{targetWall:100000000000000.3,wallLine:.2},500000000000002]
];
for(const[values,count]of cases)good(values,count);
let grid=0;
// Independent integer-hundredths oracle, with exact on/above/below boundaries.
for(let target=10;target<=310;target+=3)for(const line of [10,20,30,40,45,60])for(const minimum of [1,2,5]){
 const count=Math.max(Math.floor(target/line)+(target%line?1:0),minimum);
 good({targetWall:(target/100).toFixed(2),wallLine:(line/100).toFixed(2),minimumWalls:minimum},count);grid++;
}
let invalid=0;
for(const name of Object.keys(defaults))for(const value of ['',' ','abc','NaN','Infinity','-Infinity','0','-1']){bad({[name]:value},`${name}=${value}`);invalid++}
for(const values of [{minimumWalls:21},{targetWall:'1e308',wallLine:'1e-308'},{targetWall:1,wallLine:'1e-20'},{targetWall:'1.7e308',wallLine:'1e308'}]){bad(values,'unsafe count/thickness');invalid++}
const outputs=new Map();
const generator=fs.readFileSync(new URL('./generate-calculator-pages.mjs',import.meta.url),'utf8').replace("import fs from 'node:fs';import path from 'node:path';",'').replace(/^const root=.*$/m,"const root='/fixture';");
new Function('fs','path','console',generator)({mkdirSync(){},writeFileSync(file,html){outputs.set(file,html)}},path,{log(){}});
const target=[...outputs].find(([file])=>file.includes('wall-thickness-calculator'));
assert.ok(target);assert.ok(target[1].includes('/assets/js/site.js?v=20261103'));
// The historical generator precedes the shared Guides navigation normalization.
const normalized=target[1].replace('<a href="/about/">About</a>','<a href="/guides/">Guides</a><a href="/about/">About</a>');
assert.equal(normalized,fs.readFileSync(new URL('../tools/print-settings/wall-thickness-calculator/index.html',import.meta.url),'utf8').trim());
console.log(`Wall Thickness QA PASS: ${cases.length+1} known cases, ${grid} decimal-grid cases, ${invalid} invalid/range cases; error action guards and target generator parity.`);
