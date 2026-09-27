# @vanguard/design

Dark-only Svelte 5 components for Vanguard, built on [Bits UI](https://bits-ui.com/) primitives.

The look comes from [Vanguard 1.0](https://ftcvanguard.org/) ([source](https://github.com/smerobotics/ftcvanguard)): VS Code–style charcoal surfaces, `#0078d4` blue, teal/amber/coral status colors and JetBrains Mono throughout. The structure comes from GitHub's [Primer](https://primer.style/): functional color roles, a quiet default button, danger actions that stay subdued until hovered, and labels that are required on icon-only controls.

## Install

```sh
npm install @vanguard/design bits-ui
```

Import the stylesheet (and optionally the bundled font) once, and wrap the app in `TooltipProvider` so tooltips share timing:

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import '@vanguard/design/font.css'
  import '@vanguard/design/styles.css'
  import { TooltipProvider } from '@vanguard/design'

  let { children } = $props()
</script>

<TooltipProvider>{@render children()}</TooltipProvider>
```

```svelte
<script lang="ts">
  import { Button, Field, Input } from '@vanguard/design'
  let team = $state('')
</script>

<Field label="Team number" description="Your FTC team." required error={team && !/^\d+$/.test(team) ? 'Digits only.' : undefined}>
  {#snippet children(props)}<Input {...props} bind:value={team} />{/snippet}
</Field>
<Button variant="primary">Save</Button>
```

`styles.css` is prebuilt: it contains Tailwind's preflight, the tokens, base styles and every utility the components use, so your app doesn't need Tailwind. If your app does use Tailwind 4, you can use the same roles in your own markup:

```css
@import 'tailwindcss';
@import '@vanguard/design/theme.css';
```

That enables `bg-surface`, `text-fg-muted`, `border-border`, `bg-accent-emphasis`, `text-danger` and the rest. Note that the theme also sets the type scale (`text-base` is 13px) for a dense monospace UI.

## Color

Every hue has four steps, and components only ever reference roles:

| Role        | Text (`fg`) | Fill (`emphasis`) | Use                                   |
| ----------- | ----------- | ----------------- | ------------------------------------- |
| `accent`    | `#4da6ff`   | `#0078d4`         | Primary actions, links, selection     |
| `success`   | `#4ec9b0`   | `#16705e`         | Wins, saved, healthy                  |
| `attention` | `#f0ad4e`   | `#9a6700`         | Ties, pending, warnings               |
| `danger`    | `#ff6b6b`   | `#c42a32`         | Losses, errors, destructive actions   |

Plus `*-muted` tints and `*-border` edges. Neutrals run `inset → chrome → canvas → surface → control`, darkest to lightest. `alliance-red` and `alliance-blue` are kept separate from `danger` and `accent` so "red alliance" never reads as "error".

All text roles pass WCAG AA (4.5:1) on every background; white on every `*-emphasis` fill passes AA; checkbox, radio and switch outlines pass the 3:1 non-text minimum. Override any `--vd-*` variable to retune a role everywhere.

## Components

| Group      | Components                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| Actions    | `Button`, `IconButton`, `DropdownMenu.*`                                                                |
| Forms      | `Field`, `Label`, `Input`, `Textarea`, `Checkbox`, `Switch`, `RadioGroup.*`, `Select`, `SegmentedControl`, `Slider` |
| Navigation | `Tabs.*`, `Accordion.*`                                                                                 |
| Overlays   | `Dialog`, `AlertDialog`, `Popover`, `Tooltip`, `TooltipProvider`                                        |
| Feedback   | `Badge`, `Alert`, `Progress`, `Spinner`                                                                 |
| Display    | `Card`, `Avatar`, `Separator`, `Kbd`, `Icon`                                                            |

Every interactive component wraps the matching Bits UI primitive, so focus management, keyboard navigation and ARIA come from Bits. Components that open something (`Dialog`, `AlertDialog`, `Popover`, `Tooltip`) take a `trigger` snippet; spread its `props` onto your element:

```svelte
<Dialog title="Edit team">
  {#snippet trigger({ props })}<Button {...props}>Edit</Button>{/snippet}
  …
</Dialog>
```

`cn()` (clsx + tailwind-merge) and `buttonClasses()` are exported for building your own pieces in the same style.

## Develop

```sh
bun install
bun run dev        # component gallery at http://localhost:5173
bun run check      # svelte-check
bun run package    # dist/: components, types, prebuilt styles.css; runs publint
bun run build      # static gallery in build/
```

The gallery (`src/routes`) renders every component in every state. Hover, active and focus are forced statically with `data-force-state="hover|active|focus"`, which the library's interaction variants honor; use it the same way when documenting new components.

Library code lives in `src/lib`. Build interactive components on a Bits UI primitive, use complete Tailwind class names (no string-built classes), reference roles rather than colors, and add the component's states to the gallery.

## Publish

Bump the version in `package.json`, then:

```sh
npm publish --access public
```

`prepublishOnly` runs the checks and builds `dist/`.
