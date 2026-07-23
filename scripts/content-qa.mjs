import fs from 'node:fs';import path from 'node:path';
const root=path.resolve(new URL('..',import.meta.url).pathname.replace(/^\/(?:([A-Za-z]:))/, '$1'));
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const pages=walk(root).filter(f=>f.endsWith('.html'));const seen=new Set([path.join(root,'index.html')]),queue=[path.join(root,'index.html')];
while(queue.length){const file=queue.shift(),text=fs.readFileSync(file,'utf8');for(const href of [...text.matchAll(/<a\s+[^>]*href="([^"]+)"/gi)].map(x=>x[1])){if(!href.startsWith('/')||href.startsWith('//'))continue;let target=path.join(root,href.split(/[?#]/)[0]);if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');if(pages.includes(target)&&!seen.has(target)){seen.add(target);queue.push(target)}}}
const orphans=pages.filter(f=>!seen.has(f));if(orphans.length)throw Error(`Orphan pages:\n${orphans.map(f=>path.relative(root,f)).join('\n')}`);console.log(`Content QA PASS: ${pages.length} pages are reachable from the homepage.`);
