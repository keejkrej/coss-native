# coss-native

React Native port of the [coss](https://coss.com/ui) design system, built with **NativeWind v4** and **@rn-primitives**. Components are distributed via a copy-paste registry (shadcn-style), following the architecture of [react-native-reusables](https://reactnativereusables.com).

## Quick start

### Run the showcase

```bash
pnpm install
pnpm --filter @coss/showcase start
```

### Add components to your Expo app

The CLI is **not published to npm yet**. Use the local CLI from this repo:

```bash
# 1. Build registry JSON (once, or after component changes)
pnpm build:registry

# 2. From the coss-native repo root
pnpm coss-native add button text

# 3. Verify setup in your Expo app directory
pnpm coss-native doctor
```

From a separate Expo app, point at the built registry:

```bash
export COSS_REGISTRY_URL=/path/to/coss-native/apps/docs/public/r/nativewind
node /path/to/coss-native/apps/cli/src/bin.js add button text
node /path/to/coss-native/apps/cli/src/bin.js doctor
```

Or call shadcn directly with absolute paths to the JSON files:

```bash
npx shadcn@latest add \
  /path/to/coss-native/apps/docs/public/r/nativewind/button.json \
  /path/to/coss-native/apps/docs/public/r/nativewind/text.json
```

When `@coss/native-cli` is published, `npx @coss/native-cli add button text` will work. Until then, use the commands above.

## MVP components

| Component | Primitive |
|-----------|-----------|
| Text | Foundation (TextClassContext) |
| Button | Pressable + CVA (coss variants/sizes) |
| Input | TextInput |
| Card | View composition |
| Badge | View + CVA |
| Separator | @rn-primitives/separator |
| Switch | @rn-primitives/switch |
| Checkbox | @rn-primitives/checkbox |
| Dialog | @rn-primitives/dialog |
| Select | @rn-primitives/select |

Shared infrastructure: `icon`, `spinner`, `native-only-animated-view`, `utils`.

## Monorepo structure

```
packages/registry/   # Source of truth (@coss/native-registry)
apps/showcase/       # Expo Router demo app
apps/docs/           # Registry JSON build target
apps/cli/            # @coss/native-cli
```

## Usage

```tsx
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export function Example() {
  return (
    <Button variant="outline" size="sm">
      <Text>Press me</Text>
    </Button>
  );
}
```

On React Native, button labels must be wrapped in `<Text>`.

## Root layout requirements

```tsx
import '../global.css';
import { PortalHost } from '@rn-primitives/portal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        {/* your navigator */}
        <PortalHost />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
```

## Build registry JSON

```bash
pnpm build:registry
```

Output: `apps/docs/public/r/nativewind/*.json`

## License

AGPL-3.0-or-later (consistent with `@coss/ui`).

See [PORTING.md](./PORTING.md) for web→native translation notes and deferred components.
