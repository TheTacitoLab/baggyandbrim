// Scans source for prohibited language, em dashes and exclamation marks
// (build spec Section 10.2). Runs over content and components.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIRS = ['src/content', 'src/components', 'src/app'];

const PHRASES = [
  'where tradition meets innovation',
  'crafted to perfection',
  'passion for excellence',
  'redefining the game',
  'more than just a cap',
  'elevate your game',
  'game-changing',
  'unlock',
  'seamless',
  'journey',
  'curated',
  'bespoke luxury',
  'world-class',
  'cutting-edge',
  'best in class',
  'industry-leading',
  'solutions',
];

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const files = DIRS.flatMap((d) => (fs.existsSync(path.join(ROOT, d)) ? walk(path.join(ROOT, d)) : []));
const problems = [];

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const lower = text.toLowerCase();
  for (const phrase of PHRASES) {
    let idx = lower.indexOf(phrase);
    while (idx !== -1) {
      const line = text.slice(0, idx).split('\n').length;
      problems.push(`${path.relative(ROOT, file)}:${line} prohibited phrase: "${phrase}"`);
      idx = lower.indexOf(phrase, idx + 1);
    }
  }
  // Em dashes and exclamation marks are only a problem inside string literals
  // (visible copy). Code comments may use them freely.
  const strings = text.match(/(['"`])(?:\\.|(?!\1).)*\1/g) ?? [];
  for (const s of strings) {
    if (s.includes('—')) {
      problems.push(`${path.relative(ROOT, file)} em dash (—) in: ${s.slice(0, 60)}`);
    }
    if (s.includes('!')) {
      problems.push(`${path.relative(ROOT, file)} exclamation mark in: ${s.slice(0, 60)}`);
    }
  }
}

if (problems.length === 0) {
  console.log(`OK — no prohibited language, em dashes or stray exclamation marks (scanned ${files.length} files).`);
  process.exit(0);
}
console.error('COPY ISSUES:');
problems.forEach((p) => console.error('  ' + p));
process.exit(1);
