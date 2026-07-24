// Lists image-manifest entries still without a real file (build spec 9.3). Warns;
// it does not fail. Zero placeholders is a blocking launch item, checked there.
import fs from 'node:fs';
import path from 'node:path';

const file = path.join(process.cwd(), 'src', 'content', 'assets', 'image-manifest.ts');
const text = fs.readFileSync(file, 'utf8');

// Split into per-asset chunks on the `id:` field.
const chunks = text.split(/\bid:\s*'/).slice(1);
const unfulfilled = [];
for (const chunk of chunks) {
  const id = chunk.slice(0, chunk.indexOf("'"));
  const body = chunk.slice(0, chunk.indexOf('\n  },') === -1 ? chunk.length : chunk.indexOf('\n  },'));
  if (/\bsrc:\s*null\b/.test(body)) unfulfilled.push(id);
}

if (unfulfilled.length === 0) {
  console.log('check-images: all manifest entries have a source file.');
} else {
  console.warn(
    `check-images: ${unfulfilled.length} image(s) still using placeholders:\n  ${unfulfilled.join('\n  ')}`,
  );
}
