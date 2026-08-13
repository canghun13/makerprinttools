import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(new URL('..',import.meta.url).pathname.replace(/^\/(?:([A-Za-z]:))/, '$1'));
const walk=directory=>fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(directory,entry.name)):[path.join(directory,entry.name)]);
const calculators=walk(root).filter(file=>file.endsWith('.html')).filter(file=>/data-calculator=/.test(fs.readFileSync(file,'utf8')));
const css=fs.readFileSync(path.join(root,'assets/css/site.css'),'utf8');
const js=fs.readFileSync(path.join(root,'assets/js/site.js'),'utf8');
const errors=[];

for(const file of calculators){
  const html=fs.readFileSync(file,'utf8');
  const relative=path.relative(root,file);
  if((html.match(/data-calculator=/g)||[]).length!==1)errors.push(`${relative}: expected one calculator form`);
  if(!/<form class="calc-panel"[^>]*data-calculator=/i.test(html))errors.push(`${relative}: missing common calculator form`);
  if(!/<aside class="result-panel"/i.test(html))errors.push(`${relative}: missing result panel`);
  if(!/id="print-result"/.test(html))errors.push(`${relative}: missing print control`);
  if(!/src="\/assets\/js\/site\.js"/.test(html))errors.push(`${relative}: missing common print runtime`);
}

for(const needle of ['.print-record{display:none}', '@page{size:A4 portrait', '.print-record-ready .calc-panel{display:none!important}', '.print-record-ready .result-panel', '.print-input-list', 'break-inside:avoid-page']){
  if(!css.includes(needle))errors.push(`site.css: missing print contract ${needle}`);
}
for(const needle of ['function addPrintRecord(form)', "form.addEventListener('reset'", "globalThis.addEventListener?.('beforeprint'", "$('#print-result')?.addEventListener('click'"]){
  if(!js.includes(needle))errors.push(`site.js: missing print runtime ${needle}`);
}

console.log(`Print QA checked ${calculators.length} calculator pages.`);
if(calculators.length!==37)errors.push(`calculator count changed: expected 37, got ${calculators.length}`);
if(errors.length)throw Error(errors.join('\n'));
console.log('Print QA PASS: shared print runtime, record structure, controls, and 37-page coverage are present.');
