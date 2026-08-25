// Verifies no body paragraph appears on more than one commercial page
// (build spec Section 13.1). Reads the content files as text and extracts string
// literals, then reports any long string shared across files. Process step
// descriptions and volume brackets live in shared modules, so they never appear
// inline here and cannot trip this check.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const FILES = [
  'src/content/homepage.ts',
  'src/content/pages/custom-cricket-caps.ts',
  'src/content/pages/baggy-cricket-caps.ts',
  'src/content/pages/cricket-sun-hats.ts',
  'src/content/pages/cricket-presentation-caps.ts',
];

const MIN = 50; // paragraph-length threshold
const seen = new Map(); // normalized string -> [files]

for (const rel of FILES) {
  const text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  // Match single-quoted and double-quoted string literals.
  const matches = text.match(/(['"])(?:\\.|(?!\1).)*\1/g) ?? [];
  const strings = new Set(
    matches
      .map((s) => s.slice(1, -1).replace(/\\'/g, "'").trim())
      .filter((s) => s.length >= MIN),
  );
  for (const s of strings) {
    const key = s.toLowerCase();
    if (!seen.has(key)) seen.set(key, []);
    if (!seen.get(key).includes(rel)) seen.get(key).push(rel);
  }
}

const dupes = [...seen.entries()].filter(([, files]) => files.length > 1);
if (dupes.length === 0) {
  console.log(`OK — no body paragraph appears on more than one page (checked ${FILES.length} files).`);
  process.exit(0);
}

console.error('DUPLICATE COPY FOUND across pages:');
for (const [text, files] of dupes) {
  console.error(`\n  "${text.slice(0, 80)}..."\n    in: ${files.join(', ')}`);
}
process.exit(1);
