import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const CLI_DIR = dirname(fileURLToPath(import.meta.url));
const MONOREPO_ROOT = resolve(CLI_DIR, '../../..');
const LOCAL_REGISTRY_DIR = join(MONOREPO_ROOT, 'apps/docs/public/r/nativewind');

export const REGISTRY_BASE =
  process.env.COSS_REGISTRY_URL?.replace(/\/$/, '') ?? resolveLocalRegistryBase();

function resolveLocalRegistryBase() {
  if (existsSync(join(LOCAL_REGISTRY_DIR, 'registry.json'))) {
    return LOCAL_REGISTRY_DIR;
  }
  return 'https://coss-native.dev/r/nativewind';
}

export function getRegistryJsonPath(component) {
  const name = component.toLowerCase();
  if (name.startsWith('http') || name.startsWith('file://')) {
    return name;
  }
  if (REGISTRY_BASE.startsWith('http')) {
    return `${REGISTRY_BASE}/${name}.json`;
  }
  return join(REGISTRY_BASE, `${name}.json`);
}

export function assertRegistryAvailable() {
  if (REGISTRY_BASE.startsWith('http')) {
    return;
  }
  const sample = join(REGISTRY_BASE, 'button.json');
  if (!existsSync(sample)) {
    throw new Error(
      [
        `Registry not found at ${REGISTRY_BASE}.`,
        'From the coss-native repo run: pnpm build:registry',
        'Or set COSS_REGISTRY_URL to a directory containing built *.json files.',
      ].join('\n')
    );
  }
}

export const COMPONENTS = [
  'text',
  'icon',
  'native-only-animated-view',
  'spinner',
  'utils',
  'separator',
  'badge',
  'card',
  'input',
  'switch',
  'checkbox',
  'button',
  'dialog',
  'select',
  'skeleton',
  'alert',
  'label',
  'avatar',
  'empty',
  'kbd',
  'frame',
  'breadcrumb',
  'pagination',
  'checkbox-group',
  'textarea',
  'radio-group',
  'toggle',
  'toggle-group',
  'slider',
  'progress',
  'accordion',
  'collapsible',
  'tabs',
  'alert-dialog',
  'tooltip',
  'popover',
  'preview-card',
  'toolbar',
  'field',
  'fieldset',
  'form',
  'group',
  'input-group',
  'meter',
  'scroll-area',
  'table',
  'sheet',
  'menu',
  'toast',
];

export const CORE_DEPENDENCIES = [
  'expo',
  'react-native-reanimated',
  'react-native-safe-area-context',
  'react-native-screens',
  'react-native-svg',
  'react-native-gesture-handler',
  'react-native-keyboard-controller',
  'tailwindcss-animate',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  'nativewind',
  'react-native-css-interop',
  'lucide-react-native',
];

export const PRIMITIVE_DEPS = {
  separator: ['@rn-primitives/separator'],
  checkbox: ['@rn-primitives/checkbox'],
  switch: ['@rn-primitives/switch'],
  dialog: ['@rn-primitives/dialog', '@rn-primitives/portal'],
  select: ['@rn-primitives/select', '@rn-primitives/portal'],
  badge: ['@rn-primitives/slot'],
  text: ['@rn-primitives/slot'],
  label: ['@rn-primitives/label'],
  avatar: ['@rn-primitives/avatar'],
  'radio-group': ['@rn-primitives/radio-group'],
  toggle: ['@rn-primitives/toggle'],
  'toggle-group': ['@rn-primitives/toggle-group'],
  slider: ['@rn-primitives/slider'],
  progress: ['@rn-primitives/progress'],
  accordion: ['@rn-primitives/accordion'],
  collapsible: ['@rn-primitives/collapsible'],
  tabs: ['@rn-primitives/tabs'],
  'alert-dialog': ['@rn-primitives/alert-dialog', '@rn-primitives/portal'],
  tooltip: ['@rn-primitives/tooltip'],
  popover: ['@rn-primitives/popover', '@rn-primitives/portal'],
  'preview-card': ['@rn-primitives/hover-card'],
  toolbar: ['@rn-primitives/toolbar'],
  table: ['@rn-primitives/table'],
  menu: ['@rn-primitives/dropdown-menu', '@rn-primitives/portal'],
  toast: ['@rn-primitives/toast'],
};

export const REGISTRY_DEPS = {
  icon: ['text'],
  spinner: ['icon'],
  button: ['text', 'spinner', 'icon'],
  badge: ['text'],
  card: ['text'],
  checkbox: ['icon'],
  dialog: ['text', 'icon', 'native-only-animated-view'],
  select: ['text', 'icon', 'native-only-animated-view'],
  alert: ['text', 'icon'],
  empty: ['text'],
  kbd: ['text'],
  frame: ['text'],
  breadcrumb: ['text'],
  pagination: ['text', 'button'],
  'checkbox-group': ['checkbox'],
  toggle: ['text', 'icon'],
  'toggle-group': ['text', 'icon', 'toggle'],
  accordion: ['text', 'icon'],
  tabs: ['text'],
  'alert-dialog': ['text', 'button', 'native-only-animated-view'],
  tooltip: ['text', 'native-only-animated-view'],
  popover: ['text', 'native-only-animated-view'],
  'preview-card': ['text', 'native-only-animated-view'],
  field: ['text', 'label'],
  fieldset: ['text'],
  group: ['text', 'separator'],
  'input-group': ['text', 'input', 'textarea'],
  meter: ['text'],
  table: ['text'],
  sheet: ['text', 'icon', 'native-only-animated-view', 'dialog'],
  menu: ['text', 'icon', 'native-only-animated-view'],
  toast: ['text'],
};
