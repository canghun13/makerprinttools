import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname.replace(/^\/(?:([A-Za-z]:))/, '$1'));
const navPattern = /<div class="nav-links">.*?<\/div>/;

function pagesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(directory, entry.name);
    if (entry.name === '.git' || entry.name === 'scripts') return [];
    if (entry.isDirectory()) return pagesIn(full);
    return entry.name === 'index.html' ? [full] : [];
  });
}

for (const file of pagesIn(root)) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  const active = relative.startsWith('tools/') ? 'tools' : relative.startsWith('guides/') ? 'guides' : relative.startsWith('about/') ? 'about' : relative.startsWith('contact/') ? 'contact' : '';
  const link = (name, href) => '<a' + (active === name ? ' aria-current="page"' : '') + ' href="' + href + '">' + name[0].toUpperCase() + name.slice(1) + '</a>';
  const navigation = '<div class="nav-links">' + link('tools', '/tools/') + link('guides', '/guides/') + link('about', '/about/') + link('contact', '/contact/') + '</div>';
  const html = fs.readFileSync(file, 'utf8');
  if (!navPattern.test(html)) throw new Error('Missing nav-links in ' + relative);
  fs.writeFileSync(file, html.replace(navPattern, navigation));
}

console.log('Normalized header navigation on all public pages.');
