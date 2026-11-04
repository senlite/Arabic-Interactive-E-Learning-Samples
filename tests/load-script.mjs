import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createContext, runInContext } from 'node:vm';

export function loadScript(file, window) {
  const context = createContext(window);
  const filename = file instanceof URL ? fileURLToPath(file) : String(file);
  runInContext(readFileSync(filename, 'utf8'), context, { filename });
  return window;
}
