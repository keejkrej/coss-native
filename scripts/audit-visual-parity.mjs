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
  { id: 'before-pseudo', pattern: /before:/, cossExpect: 'RN approximation (shadow/border)' },
];

function extractCvaBlocks(content) {
  const blocks = [];
  const re = /cva\s*\(\s*(?:cn\s*\()?['"`]([^'"`]+)['"`]/gs;
  let m;
  while ((m = re.exec(content)) !== null) {
    blocks.push(m[1].replace(/\s+/g, ' ').trim());
  }
  return blocks;
}

function extractVariantKeys(content) {
  const keys = new Set();
  const variantSection = content.match(/variants:\s*\{([\s\S]*?)\n\s*\}/);
  if (!variantSection) return keys;
  for (const m of variantSection[1].matchAll(/^\s+(\w+[-\w]*):\s*\{/gm)) {
    keys.add(m[1]);
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

  const nativeVariants = extractVariantKeys(native);
  const cossVariants = extractVariantKeys(coss);
  const missingVariantGroups = [...cossVariants].filter((k) => !nativeVariants.has(k));

  return {
    file: name,
    nativeCvaCount: extractCvaBlocks(native).length,
    cossCvaCount: extractCvaBlocks(coss).length,
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
      console.log(`- Missing variant groups vs coss: ${r.missingVariantGroups.join(', ')}`);
    }
    console.log('');
  }
}

main();
