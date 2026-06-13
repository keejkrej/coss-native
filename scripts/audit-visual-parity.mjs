#!/usr/bin/env node
/**
 * Compare coss-native registry components against ../coss port origin.
 * Usage: node scripts/audit-visual-parity.mjs [--json]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const NATIVE_DIR = path.join(ROOT, 'packages/registry/src/nativewind/components/ui');
const COSS_DIR = path.resolve(ROOT, '../coss/packages/ui/src/components');

const FLAGS = [
  { id: 'opacity-50', pattern: /opacity-50/, cossExpect: 'opacity-64' },
  { id: 'dark-input-30', pattern: /dark:bg-input\/30/, cossExpect: 'dark:bg-input/32' },
  { id: 'backdrop-50', pattern: /bg-black\/50/, cossExpect: 'bg-black/32' },
  { id: 'semantic-bg-10', pattern: /bg-(destructive|info|success|warning)\/10/, cossExpect: '/4 or /8' },
  { id: 'semantic-border-30', pattern: /border-(destructive|info|success|warning)\/30/, cossExpect: '/32' },
  { id: 'raw-surface-shadow', pattern: /shadow-sm shadow-black\/5/, cossExpect: 'SURFACE_SHADOW constant' },
  { id: 'before-pseudo', pattern: /before:/, cossExpect: 'RN approximation (shadow/border)' },
];

function extractCvaVariantKeys(content) {
  const keys = new Set();
  let searchFrom = 0;

  while (searchFrom < content.length) {
    const variantsIndex = content.indexOf('variants:', searchFrom);
    if (variantsIndex === -1) break;

    const variantsStart = content.indexOf('{', variantsIndex);
    if (variantsStart === -1) break;

    let depth = 0;
    let variantsEnd = variantsStart;
    for (; variantsEnd < content.length; variantsEnd++) {
      const char = content[variantsEnd];
      if (char === '{') depth++;
      else if (char === '}') {
        depth--;
        if (depth === 0) break;
      }
    }

    const variantsBlock = content.slice(variantsStart + 1, variantsEnd);
    for (const match of variantsBlock.matchAll(/^\s+(\w+[-\w]*):\s*\{/gm)) {
      keys.add(match[1]);
    }

    searchFrom = variantsEnd + 1;
  }

  return keys;
}

function auditFile(name) {
  const nativePath = path.join(NATIVE_DIR, name);
  const cossPath = path.join(COSS_DIR, name);
  if (!fs.existsSync(nativePath) || !fs.existsSync(cossPath)) return null;

  const native = fs.readFileSync(nativePath, 'utf8');
  const coss = fs.readFileSync(cossPath, 'utf8');

  const nativeFlags = FLAGS.filter((f) => f.pattern.test(native)).map((f) => ({
    id: f.id,
    expect: f.cossExpect,
  }));
  const cossFlags = FLAGS.filter((f) => f.pattern.test(coss)).map((f) => f.id);

  const nativeVariants = extractCvaVariantKeys(native);
  const cossVariants = extractCvaVariantKeys(coss);
  const missingVariantGroups = [...cossVariants].filter((k) => !nativeVariants.has(k));

  return {
    file: name,
    nativeFlags,
    cossPatterns: cossFlags,
    missingVariantGroups,
  };
}

function main() {
  const json = process.argv.includes('--json');
  const files = fs.readdirSync(NATIVE_DIR).filter((f) => f.endsWith('.tsx') && !f.includes('-primitive'));
  const results = files.map(auditFile).filter(Boolean);
  const flagged = results.filter((r) => r.nativeFlags.length > 0 || r.missingVariantGroups.length > 0);

  if (json) {
    console.log(JSON.stringify({ total: results.length, flagged: flagged.length, results: flagged }, null, 2));
    return;
  }

  console.log('# Visual parity audit\n');
  console.log(`Compared ${results.length} component pairs.\n`);
  console.log(`Components with drift flags: ${flagged.length}\n`);

  for (const r of flagged.sort((a, b) => a.file.localeCompare(b.file))) {
    console.log(`## ${r.file}`);
    if (r.nativeFlags.length) {
      console.log('- Native flags:');
      for (const f of r.nativeFlags) {
        console.log(`  - \`${f.id}\` → expect \`${f.expect}\``);
      }
    }
    if (r.missingVariantGroups.length) {
      console.log(`- Missing CVA variant groups vs coss: ${r.missingVariantGroups.join(', ')}`);
    }
    console.log('');
  }
}

main();
