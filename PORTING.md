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

- `packages/registry/src/nativewind/styles/global.css` (distributed via registry)
- `apps/showcase/global.css`
- `apps/showcase/tailwind.config.js`
- `apps/showcase/lib/theme.ts`

Dark-mode tokens (secondary/muted/accent/border/input, card/popover lift, muted-foreground) are recomputed from coss `color-mix` / `--alpha()` expressions. Light mode was already close to alpha equivalents.

Shared styling constants live in `packages/registry/src/nativewind/lib/utils.ts` (`DISABLED_OPACITY`, `SURFACE_SHADOW`, `DARK_INPUT_BG`, `BACKDROP_OVERLAY`).

Run `node scripts/audit-visual-parity.mjs` to compare registry components against `../coss`.

## Visual alignment (foundation + core)

The following have been tightened toward coss web visuals:

| Area | Changes |
|------|---------|
| **Tokens** | Dark surfaces, semantic foregrounds, card/popover lift, `radius-xl` |
| **Button** | Colored shadows, `opacity-64`, `/32` dark inputs, semantic border alphas, icon opacity |
| **Input** | `dark:bg-input/32`, invalid-state rings (web), height alignment |
| **Badge** | coss sizes (`h-5.5` etc.), `/8`/`/16` semantic tints |
| **Card** | `text-lg` title, unified `p-6` padding |
| **Alert** | Transparent default, `/32` borders, `/4` semantic backgrounds |
| **Checkbox / Switch / Tabs** | coss sizes, `opacity-64`, active tab shadow |
| **Dialog / AlertDialog / Sheet** | `bg-black/32` backdrop, popover surface, ghost close button, `rounded-2xl` |

Remaining components (popover, sidebar, table, etc.) still use pre-audit styling. See audit script output.

## Visual alignment (form + toggles)

| Area | Changes |
|------|---------|
| **Select** | `selectTriggerVariants` CVA, invalid rings, icon opacity, item min-heights |
| **Textarea** | Input-style wrapper, `rounded-lg`, shared constants |
| **Radio group** | `size-4.5`, `DARK_INPUT_BG`, invalid rings |
| **Toggle / Toggle group** | `rounded-lg`, pressed `bg-input/64`, outline `DARK_INPUT_BG` |
| **Menu** | `ELEVATED_SHADOW`, `rounded-lg` popup, destructive text-only variant, item min-heights |
| **Label / Accordion** | `opacity-64` disabled |
| **Input group / Number field / OTP field** | Shared surface constants |
| **Drawer** | Backdrop opacity `0.32` |

## Styling gaps (cannot port 1:1)

- `before:` / `after:` pseudo-element shadows and inset shadows
- `inset-shadow`, `not-dark:bg-clip-padding`
- `pointer-coarse:after:min-h-11` → use explicit heights or `hitSlop`
- CSS `data-*` descendant selectors (`in-[[data-slot=...]]`)
- Tabs sliding `Indicator` animation (active tab uses static shadow approximation)
- `CardFrame`, `CardAction`, `CardPanel` compound parts (not yet exported)
- Tabs `variant="underline"` API

## Deferred visual work

- Remaining overlays and layout primitives (popover, tooltip, command, sidebar, table, etc.)
- Particle-equivalent showcase previews for all components
- Full pseudo-depth parity (`before:` inset shadows → `SURFACE_SHADOW` approximation only)

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
