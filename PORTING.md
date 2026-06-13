# Porting coss to React Native

This document describes how coss web components map to coss-native, what is approximate, and what is deferred.

## Architecture

| Layer | Web (coss) | Native (coss-native) |
|-------|------------|----------------------|
| Headless | @base-ui/react | @rn-primitives/* |
| Styling | Tailwind CSS v4 + globals.css | NativeWind v4 + tailwind.config.js |
| Distribution | @coss/ui npm subpaths | Copy-paste registry + CLI |
| Polymorphism | useRender + render prop | Slot + asChild |

## Design tokens

Semantic token **names** match coss (`background`, `primary`, `destructive`, `info`, `success`, `warning`, `sidebar-*`, etc.).

Values are converted from coss Tailwind v4 expressions (`--alpha()`, `color-mix()`, `before:` shadows) to static HSL channel variables in:

- `apps/showcase/global.css`
- `apps/showcase/tailwind.config.js`
- `apps/showcase/lib/theme.ts`

Visual parity is approximate; API parity is the goal.

## Styling gaps (cannot port 1:1)

- `before:` / `after:` pseudo-element shadows and inset shadows
- `inset-shadow`, `not-dark:bg-clip-padding`
- `pointer-coarse:after:min-h-11` → use explicit heights or `hitSlop`
- `bottomStickOnMobile` dialog sheet behavior → defer to future Sheet/Drawer port
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

coss uses `DialogPopup` and `DialogBackdrop`. coss-native exports both names plus shadcn aliases:

- `DialogPopup` = `DialogContent`
- `DialogBackdrop` = `DialogOverlay`

## MVP scope (implemented)

- Text, Button, Input, Card, Badge, Separator, Switch, Checkbox, Dialog, Select
- Infrastructure: icon, spinner, native-only-animated-view, utils

## Deferred (43 remaining primitives)

Accordion, Alert, Alert Dialog, Autocomplete, Avatar, Breadcrumb, Calendar, Checkbox Group, Collapsible, Combobox, Command, Drawer, Empty, Field, Fieldset, Form, Frame, Group, Input Group, Kbd, Label, Menu, Meter, Number Field, OTP Field, Pagination, Popover, Preview Card, Progress, Radio Group, Scroll Area, Sheet, Sidebar, Skeleton, Slider, Table, Tabs, Textarea, Toast, Toggle, Toggle Group, Toolbar, Tooltip

## Particles

The ~484 composed patterns in coss registry are out of scope until primitives are ported.

## Install flow

The CLI is not on npm yet. From this repo:

```bash
pnpm build:registry
pnpm coss-native add button text
pnpm coss-native doctor
```

From another Expo app, set `COSS_REGISTRY_URL` to `apps/docs/public/r/nativewind` and run `node apps/cli/src/bin.js add …`.

When published, `npx @coss/native-cli add button` will work against a hosted registry.

## Reference repos

- Source design system: `../coss`
- RN architecture reference: `../react-native-reusables`
