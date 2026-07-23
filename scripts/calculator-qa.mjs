import fs from 'node:fs';

const resultMain={textContent:''},resultDetails={innerHTML:''},formError={textContent:''};
globalThis.document={querySelector(selector){return({'#result-main':resultMain,'#result-details':resultDetails,'#form-error':formError}[selector])},querySelectorAll(){return[]}};
eval(`${fs.readFileSync(new URL('../assets/js/site.js',import.meta.url),'utf8')}\nglobalThis.__calculate=calculate;`);

const cases=[
 ['filament-needed',{partGrams:85,quantity:3,waste:5,reserve:10,available:300},'partGrams'],
 ['purge-waste',{modelGrams:70,changes:120,purgePerChange:.35,tower:18,recovered:0},'modelGrams'],
 ['failed-print',{material:4.5,powerCost:.4,machineCost:2,laborCost:1.5,failedAttempts:1,recovery:0},'material'],
 ['batch-cost',{units:12,unitCost:5.2,setup:12,failureRate:5,unitHours:2.5},'units'],
 ['depreciation',{purchase:650,resale:100,lifetime:3000,maintenance:250,jobHours:8},'purchase'],
 ['profit-margin',{salePrice:32,production:12,fixedOrder:3,feeRate:12},'salePrice'],
 ['line-width',{nozzle:.4,ratio:112,perimeters:3},'nozzle'],
 ['wall-thickness',{targetWall:1.6,wallLine:.45,minimumWalls:2},'targetWall'],
 ['resin-yield',{bottleMl:1000,modelMl:65,resinWaste:10,resinQuantity:12},'bottleMl'],
 ['hollow-savings',{solidMl:180,hollowMl:75,resinPrice:32,bottleSize:1000,hollowQuantity:4},'solidMl']
];
function form(type,values){return{dataset:{calculator:type},elements:Object.fromEntries(Object.entries(values).map(([key,value])=>[key,{value:String(value)}]))}};
const errors=[];
for(const [type,values,invalid] of cases){const f=form(type,values);__calculate(f);if(formError.textContent||!resultMain.textContent||resultMain.textContent==='—'||/NaN|Infinity/.test(resultMain.textContent+resultDetails.innerHTML))errors.push(`${type}: invalid default result`);f.elements[invalid].value='-1';__calculate(f);if(!formError.textContent||resultMain.textContent!=='—')errors.push(`${type}: invalid input not rejected`)}
if(errors.length)throw Error(errors.join('\n'));
console.log(`Calculator QA PASS: ${cases.length} new calculators passed default and invalid-input checks.`);
