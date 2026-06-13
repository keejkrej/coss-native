#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  assertRegistryAvailable,
  COMPONENTS,
  getRegistryJsonPath,
  REGISTRY_BASE,
} from './project-manifest.js';

const cwd = process.cwd();
const command = process.argv[2];

function log(message) {
  console.log(message);
}

function readProjectFile(names) {
  for (const name of names) {
    const path = join(cwd, name);
    if (existsSync(path)) {
      return { path, content: readFileSync(path, 'utf8') };
    }
  }
  return null;
}

function doctor() {
  const checks = [
    {
      name: 'Babel Config',
      files: ['babel.config.js', 'babel.config.ts'],
      includes: ['nativewind/babel', 'jsxImportSource'],
    },
    {
      name: 'Metro Config',
      files: ['metro.config.js', 'metro.config.ts'],
      includes: ['withNativeWind(', 'inlineRem', '16'],
    },
    {
      name: 'Root Layout',
      files: ['app/_layout.tsx', 'src/app/_layout.tsx'],
      includes: ['.css', '<PortalHost'],
    },
    {
      name: 'Tailwind Config',
      files: ['tailwind.config.js', 'tailwind.config.ts'],
      includes: ['nativewind/preset', '--background'],
    },
    {
      name: 'Theme',
      files: ['lib/theme.ts'],
      includes: ['NAV_THEME', 'background'],
    },
    {
      name: 'CSS',
      files: ['global.css', 'globals.css', 'src/global.css'],
      includes: ['@tailwind base', '--background'],
    },
    {
      name: 'Utils',
      files: ['lib/utils.ts'],
      includes: ['function cn('],
    },
    {
      name: 'NativeWind Types',
      files: ['nativewind-env.d.ts'],
      includes: ['nativewind/types'],
    },
  ];

  let passed = 0;
  for (const check of checks) {
    const file = readProjectFile(check.files);
    if (!file) {
      log(`✗ ${check.name}: missing (${check.files.join(' or ')})`);
      continue;
    }
    const missing = check.includes.filter((item) => !file.content.includes(item));
    if (missing.length > 0) {
      log(`✗ ${check.name}: missing ${missing.join(', ')}`);
      continue;
    }
    log(`✓ ${check.name}`);
    passed += 1;
  }

  log(`\n${passed}/${checks.length} checks passed`);
  process.exit(passed === checks.length ? 0 : 1);
}

function add() {
  try {
    assertRegistryAvailable();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }

  const args = process.argv.slice(3).filter((arg) => !arg.startsWith('-'));
  const components = args.length > 0 ? args : COMPONENTS.filter((c) => c !== 'utils');
  const urls = components.map((component) => getRegistryJsonPath(component));

  log(`Using registry: ${REGISTRY_BASE}`);
  log(`Adding: ${components.join(', ')}`);

  const result = spawnSync('npx', ['shadcn@latest', 'add', ...urls], {
    cwd,
    stdio: 'inherit',
    shell: true,
  });

  process.exit(result.status ?? 1);
}

function init() {
  log('coss-native init');
  log('');
  log('The CLI is not published to npm yet. Use one of these:');
  log('');
  log('  # from the coss-native repo');
  log('  pnpm build:registry');
  log('  pnpm coss-native add button text');
  log('');
  log('  # from your Expo app');
  log('  COSS_REGISTRY_URL=/path/to/coss-native/apps/docs/public/r/nativewind \\');
  log('    node /path/to/coss-native/apps/cli/src/bin.js add button text');
  log('');
  log('1. Create an Expo app with TypeScript and Expo Router');
  log('2. Install core dependencies (see README.md)');
  log('3. Copy theme files from apps/showcase (global.css, tailwind.config.js, lib/theme.ts)');
  log('4. Configure babel.config.js, metro.config.js, nativewind-env.d.ts');
  log('5. Add PortalHost to app/_layout.tsx');
  log('6. Run add + doctor via the commands above');
}

function help() {
  log('Usage: coss-native <command>');
  log('');
  log('Commands:');
  log('  init     Print setup instructions');
  log('  add      Add registry components via shadcn CLI');
  log('  doctor   Verify NativeWind + coss-native setup');
  log('');
  log('Registry resolution (first match wins):');
  log('  1. COSS_REGISTRY_URL env var');
  log('  2. apps/docs/public/r/nativewind inside this monorepo');
  log('  3. https://coss-native.dev/r/nativewind (not live yet)');
}

switch (command) {
  case 'init':
    init();
    break;
  case 'add':
    add();
    break;
  case 'doctor':
    doctor();
    break;
  default:
    help();
    break;
}
