# Porting coss to React Native

This document describes how coss web components map to coss-native, what is approximate, and what is deferred.

## Architecture

| Layer | Web (coss) | Native (coss-native) |
|-------|------------|----------------------|
| Headless | @base-ui/react | @rn-primitives/* + custom primitives |
| Styling | Tailwind CSS v4 + globals.css | NativeWind v4 + tailwind.config.js |
| Distribution | @coss/ui npm subpaths | Copy-paste registry + CLI |
| Polymorphism | useRender + render prop | Slot + asChild |

## Design tokens

Semantic token **names** match coss (`background`, `primary`, `destructive`, `info`, `success`, `warning`, `sidebar-*`, etc.).

Values are converted from coss Tailwind v4 expressions to static HSL channel variables in:

- `apps/showcase/global.css`
- `apps/showcase/tailwind.config.js`
- `apps/showcase/lib/theme.ts`

Visual parity is approximate; API parity is the goal.

## Styling gaps (cannot port 1:1)

- `before:` / `after:` pseudo-element shadows and inset shadows
- `inset-shadow`, `not-dark:bg-clip-padding`
- `pointer-coarse:after:min-h-11` → use explicit heights or `hitSlop`
- CSS `data-*` descendant selectors (`in-[[data-slot=...]]`)

## RN-specific patterns

### TextClassContext

React Native does not cascade text styles. Any component with text children uses `TextClassContext` so variants propagate to nested `<Text>`.

### Explicit Text children

```tsx
// Web coss
<Button>Save</Button>

// coss-native
<Button><Text>Save</Text></Button>
```

### Platform.select

Web gets `hover:` / `focus-visible:`; native gets `active:`.

## Dialog naming (coss compatibility)

coss uses `DialogPopup` and `DialogBackdrop`. coss-native exports both names plus shadcn aliases.

## Implemented components (56 registry UI items)

All coss web primitives are ported except particles (~484 composed patterns).

**Phase 4 additions:** OTP Field, Number Field, Calendar, Autocomplete, Combobox, Command, Sidebar, Drawer

See [README.md](README.md) for the full component list.

## Phase 4 simplifications

| Component | Web behavior | Native approximation |
|-----------|--------------|----------------------|
| number-field | Mouse scrub area | `NumberFieldScrubArea` renders label only (no drag) |
| calendar | `react-day-picker` | `@marceloprado/flash-calendar`; single-date first |
| sidebar | cookies + Cmd/Ctrl+B | AsyncStorage persistence; no keyboard shortcut |
| drawer | swipe + nested stack | `@gorhom/bottom-sheet` on native; dialog fallback on web |
| autocomplete/combobox | Base UI positioning | Popover-style list anchored to input |

## Particles

The ~484 composed patterns in coss registry are out of scope until needed for docs/examples.

## Install flow

The CLI is not on npm yet. From this repo:

```bash
pnpm build:registry
pnpm coss-native add button text
pnpm coss-native doctor
```

From another Expo app, set `COSS_REGISTRY_URL` to `apps/docs/public/r/nativewind` and run `node apps/cli/src/bin.js add …`.

## Reference repos

- Source design system: `../coss`
- RN architecture reference: `../react-native-reusables`
