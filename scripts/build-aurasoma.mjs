import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Separate static output keeps the AURA SOMA hostname focused on digital guides.
// Run from the repository root: node scripts/build-aurasoma.mjs
const source = resolve('public');
const output = resolve('dist-aurasoma');
await mkdir(output, { recursive: true });

const files = [
  'aura-soma.html',
  'aura-soma-terms.html',
  'aura-soma-privacy.html',
  'aura-soma-refunds.html',
  'day3.mp4.mp4',
  'day4.mp4.mp4',
];

for (const file of files) {
  await copyFile(resolve(source, file), resolve(output, file));
}

const landing = await readFile(resolve(source, 'aura-soma.html'), 'utf8');
await writeFile(resolve(output, 'index.html'), landing);

// Canonical landing URL is the root of this dedicated project.
await writeFile(resolve(output, '_redirects'), '/aura-soma / 301\n/aura-soma.html / 301\n');
console.log('AURA SOMA: landing, three legal pages and two videos ready in dist-aurasoma.');
