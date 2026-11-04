import { copyFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const samples = ['feedback-scenario', 'safety-challenge'];
const files = [
  ['base.css', 'css/base.css'],
  ['i18n.js', 'js/i18n.js'],
  ['scorm12.js', 'js/scorm12.js'],
  ['xapi-stub.js', 'js/xapi-stub.js']
];

export async function syncShared(root = process.cwd()) {
  for (const sample of samples) {
    const sampleDir = path.join(root, sample);
    try {
      await access(sampleDir);
    } catch {
      throw new Error(`Missing sample folder: ${sample}`);
    }
    for (const [sourceName, destRel] of files) {
      const source = path.join(root, 'shared', sourceName);
      try {
        await access(source);
      } catch {
        continue;
      }
      const dest = path.join(sampleDir, destRel);
      await mkdir(path.dirname(dest), { recursive: true });
      await copyFile(source, dest);
    }
  }
}

if (import.meta.url === new URL(`file://${process.argv[1]}`).href || process.argv[1].endsWith('sync-shared.mjs')) {
  syncShared().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
