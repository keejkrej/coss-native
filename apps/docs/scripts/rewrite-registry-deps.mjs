import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUTPUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '../public/r/nativewind');
const REMOTE_PREFIX = 'https://coss-native.dev/r/nativewind/';

for (const file of readdirSync(OUTPUT_DIR)) {
  if (!file.endsWith('.json')) continue;

  const path = join(OUTPUT_DIR, file);
  const json = JSON.parse(readFileSync(path, 'utf8'));

  if (Array.isArray(json.registryDependencies)) {
    json.registryDependencies = json.registryDependencies.map((dep) => {
      if (typeof dep !== 'string') return dep;
      if (dep.startsWith(REMOTE_PREFIX)) {
        return join(OUTPUT_DIR, dep.slice(REMOTE_PREFIX.length)).replace(/\\/g, '/');
      }
      if (!dep.includes('/') && !dep.endsWith('.json')) {
        return join(OUTPUT_DIR, `${dep}.json`).replace(/\\/g, '/');
      }
      return dep;
    });
  }

  writeFileSync(path, `${JSON.stringify(json, null, 2)}\n`);
}

console.log(`Rewrote registry dependencies in ${OUTPUT_DIR}`);
