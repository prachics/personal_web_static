import fs from 'node:fs';
import path from 'node:path';

const siteRoot = 'src';
const indexPath = path.join(siteRoot, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
const failures = [];

function fail(message) {
  failures.push(message);
}

function localPathFromUrl(url) {
  if (!url || url.startsWith('#') || /^[a-z]+:/i.test(url)) return null;
  return path.join(siteRoot, url.replace(/^\.\//, '').split('#')[0]);
}

for (const attr of ['href', 'src']) {
  const regex = new RegExp(`${attr}="([^"]+)"`, 'g');
  for (const match of html.matchAll(regex)) {
    const localPath = localPathFromUrl(match[1]);
    if (localPath && !fs.existsSync(localPath)) {
      const sourceJs = localPath.endsWith('.min.js') ? localPath.replace(/\.min\.js$/, '.js') : null;
      if (!sourceJs || !fs.existsSync(sourceJs)) {
        fail(`Missing ${attr} target: ${match[1]}`);
      }
    }
  }
}

for (const id of html.matchAll(/id="([^"]+)"/g)) {
  const anchor = `#${id[1]}`;
  if (html.includes(`href="${anchor}"`)) continue;
}

for (const anchor of html.matchAll(/href="#([^"]+)"/g)) {
  if (!html.includes(`id="${anchor[1]}"`)) {
    fail(`Missing anchor target: #${anchor[1]}`);
  }
}

const requiredSnippets = [
  'name="viewport"',
  'property="og:title"',
  'property="og:description"',
  'property="og:image"',
  'name="twitter:card"',
  'name="twitter:image"',
  'class="nav-toggle"',
];
for (const snippet of requiredSnippets) {
  if (!html.includes(snippet)) {
    fail(`Missing required markup: ${snippet}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('static QA passed');
