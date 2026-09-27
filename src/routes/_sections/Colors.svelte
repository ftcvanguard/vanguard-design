<script lang="ts">
  import { onMount } from 'svelte'
  import Example from '../_demo/Example.svelte'
  import Section from '../_demo/Section.svelte'

  type Swatch = { token: string; note: string }

  const backgrounds: Swatch[] = [
    { token: 'bg-inset', note: 'Inputs, wells' },
    { token: 'bg-chrome', note: 'Header, sidebar, status bar' },
    { token: 'bg-canvas', note: 'Page' },
    { token: 'bg-surface', note: 'Cards, menus, dialogs' },
    { token: 'bg-control', note: 'Secondary buttons' },
    { token: 'bg-control-hover', note: 'Control hover' },
    { token: 'bg-control-active', note: 'Pressed, selected segment' },
  ]
  const borders: Swatch[] = [
    { token: 'border-muted', note: 'Dividers within a surface' },
    { token: 'border', note: 'Cards, tables, surfaces' },
    { token: 'border-emphasis', note: 'Control edges' },
    { token: 'border-strong', note: 'Hover; checkbox, radio, switch' },
  ]
  const text = ['fg-strong', 'fg', 'fg-muted', 'fg-subtle', 'fg-disabled'] as const
  const textNotes: Record<(typeof text)[number], string> = {
    'fg-strong': 'Headings, selected',
    fg: 'Body',
    'fg-muted': 'Secondary text',
    'fg-subtle': 'Placeholders, hints',
    'fg-disabled': 'Disabled (exempt)',
  }
  const roles = [
    { name: 'accent', use: 'Primary actions, links, selection, info' },
    { name: 'success', use: 'Wins, saved, healthy' },
    { name: 'attention', use: 'Ties, pending, warnings' },
    { name: 'danger', use: 'Losses, errors, destructive actions' },
  ] as const

  // Filled in on mount from the live custom properties so the page can't drift from tokens.css.
  let values = $state<Record<string, string>>({})

  onMount(() => {
    const style = getComputedStyle(document.documentElement)
    const names = [
      ...backgrounds.map((s) => s.token),
      ...borders.map((s) => s.token),
      ...text,
      ...roles.flatMap((r) => [r.name, `${r.name}-emphasis`, `${r.name}-muted`]),
      'alliance-red',
      'alliance-blue',
    ]
    values = Object.fromEntries(names.map((n) => [n, style.getPropertyValue(`--vd-${n}`).trim()]))
  })

  function luminance(hex: string) {
    const [r, g, b] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  function contrast(fg: string | undefined, bg: string | undefined) {
    if (!fg?.startsWith('#') || !bg?.startsWith('#')) return null
    const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a)
    return (hi + 0.05) / (lo + 0.05)
  }
</script>

<Section
  foundation
  id="color"
  title="Color"
  description="Vanguard 1.0's charcoal and blue, organized into functional roles. Components use roles, never raw hex, so a role can be retuned in one place. Every text role clears WCAG AA on every background."
>
  <Example title="Backgrounds" note="Darkest to lightest. Elevation reads as lighter, not as heavier shadow.">
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {#each backgrounds as swatch}
        <div class="flex flex-col gap-2">
          <div class="h-14 rounded-md border border-border" style:background="var(--vd-{swatch.token})"></div>
          <div class="text-sm text-fg">{swatch.token.replace('bg-', '')}</div>
          <div class="-mt-2 text-xs text-fg-subtle">{values[swatch.token] ?? ''}</div>
          <div class="text-xs text-fg-muted">{swatch.note}</div>
        </div>
      {/each}
    </div>
  </Example>

  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Text" note="Contrast measured against canvas.">
      <ul class="flex flex-col gap-3">
        {#each text as token}
          {@const ratio = contrast(values[token], values['bg-canvas'])}
          <li class="flex items-center gap-4">
            <span class="w-24 text-lg font-semibold" style:color="var(--vd-{token})">Aa 1234</span>
            <span class="flex-1">
              <span class="block text-sm text-fg">{token}</span>
              <span class="block text-xs text-fg-subtle">{textNotes[token]}</span>
            </span>
            {#if ratio}
              <span class="text-xs tabular-nums {ratio >= 4.5 ? 'text-success' : ratio >= 3 ? 'text-attention' : 'text-fg-subtle'}">
                {ratio.toFixed(1)}:1 {ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA large' : ''}
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    </Example>

    <Example title="Borders">
      <ul class="flex flex-col gap-3">
        {#each borders as swatch}
          <li class="flex items-center gap-4">
            <span class="h-9 w-24 rounded-md border-2 bg-surface" style:border-color="var(--vd-{swatch.token})"></span>
            <span class="flex-1">
              <span class="block text-sm text-fg">{swatch.token}</span>
              <span class="block text-xs text-fg-subtle">{swatch.note}</span>
            </span>
            <span class="text-xs text-fg-subtle">{values[swatch.token] ?? ''}</span>
          </li>
        {/each}
      </ul>
    </Example>
  </div>

  <Example title="Roles" note="Each hue ships four steps: text, solid fill, tint and border.">
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {#each roles as role}
        {@const ratio = contrast(values[role.name], values['bg-canvas'])}
        <div class="flex flex-col gap-3 rounded-lg border p-3" style:border-color="var(--vd-{role.name}-border)" style:background="var(--vd-{role.name}-muted)">
          <div class="flex items-baseline justify-between">
            <span class="font-semibold" style:color="var(--vd-{role.name})">{role.name}</span>
            {#if ratio}<span class="text-xs text-fg-muted tabular-nums">{ratio.toFixed(1)}:1</span>{/if}
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="flex h-9 items-center justify-center rounded-md text-sm font-medium text-white" style:background="var(--vd-{role.name}-emphasis)">
              emphasis
            </div>
            <div class="flex h-9 items-center justify-center rounded-md border text-sm" style:color="var(--vd-{role.name})" style:border-color="var(--vd-{role.name}-border)">
              fg
            </div>
          </div>
          <p class="text-xs text-fg-muted">{role.use}</p>
        </div>
      {/each}
    </div>
  </Example>

  <Example
    title="Alliance"
    note="Separate from danger and accent so 'red alliance' never reads as 'error' in code."
  >
    <div class="flex flex-wrap gap-6">
      {#each ['red', 'blue'] as alliance}
        <div class="flex items-center gap-3">
          <span class="size-9 rounded-md" style:background="var(--vd-alliance-{alliance})"></span>
          <span>
            <span class="block text-sm text-fg">alliance-{alliance}</span>
            <span class="block text-xs text-fg-subtle">{values[`alliance-${alliance}`] ?? ''}</span>
          </span>
        </div>
      {/each}
    </div>
  </Example>
</Section>
