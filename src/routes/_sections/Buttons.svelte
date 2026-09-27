<script lang="ts">
  import { Badge, Button, IconButton } from '$lib/index.js'
  import Example from '../_demo/Example.svelte'
  import Section from '../_demo/Section.svelte'
  import StateGrid from '../_demo/StateGrid.svelte'
  import { force } from '../_demo/states.js'

  const variants = ['primary', 'secondary', 'ghost', 'danger'] as const
  const states = ['Default', 'Hover', 'Active', 'Focus', 'Disabled', 'Loading'] as const

  let saving = $state(false)
  function save() {
    saving = true
    setTimeout(() => (saving = false), 1500)
  }
</script>

<Section
  id="button"
  title="Button"
  primitive="Button"
  description="One primary action per view. Secondary is the default. Danger stays quiet until hovered, so the destructive option never has the most visual weight. Loading keeps focus on the button and blocks repeat clicks."
>
  <Example title="Variants × states" note="Hover, active and focus are forced with data-force-state.">
    <StateGrid rows={variants} columns={states} corner="variant">
      {#snippet cell(variant, state)}
        <Button
          {variant}
          data-force-state={force(state)}
          disabled={state === 'Disabled'}
          loading={state === 'Loading'}
        >
          {variant === 'danger' ? 'Delete' : 'Save'}
        </Button>
      {/snippet}
    </StateGrid>
  </Example>

  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Sizes" note="28 · 32 · 40px" class="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Example>
    <Example title="With visuals" class="flex flex-wrap items-center gap-3">
      <Button leadingIcon="plus" variant="primary">New match</Button>
      <Button trailingIcon="chevron-down">Event</Button>
      <Button leadingIcon="download" variant="ghost">Export</Button>
      <Button>
        Notes
        {#snippet trailing()}<Badge size="sm">12</Badge>{/snippet}
      </Button>
    </Example>
  </div>

  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Try it" note="Loads for 1.5s." class="flex flex-wrap items-center gap-3">
      <Button variant="primary" loading={saving} onclick={save}>{saving ? 'Saving…' : 'Save notes'}</Button>
      <Button href="#button" variant="ghost" trailingIcon="external-link">As a link</Button>
    </Example>
    <Example title="Block" note="Fills its container, for narrow forms and mobile.">
      <Button variant="primary" block>Sign in</Button>
    </Example>
  </div>
</Section>

<Section
  id="icon-button"
  title="IconButton"
  primitive="Button"
  description="A square button with an icon and a required label. The label becomes the accessible name and appears as a tooltip on hover and keyboard focus."
>
  <Example title="Variants × states">
    <StateGrid rows={variants} columns={states} corner="variant">
      {#snippet cell(variant, state)}
        <IconButton
          {variant}
          icon={variant === 'danger' ? 'trash' : 'settings'}
          label={variant === 'danger' ? 'Delete' : 'Settings'}
          data-force-state={force(state)}
          disabled={state === 'Disabled'}
          loading={state === 'Loading'}
          tooltip={state === 'Default'}
        />
      {/snippet}
    </StateGrid>
  </Example>
  <Example title="Sizes" class="flex flex-wrap items-center gap-3">
    <IconButton size="sm" icon="refresh-cw" label="Refresh" />
    <IconButton size="md" icon="refresh-cw" label="Refresh" />
    <IconButton size="lg" icon="refresh-cw" label="Refresh" />
    <span class="mx-2 h-6 w-px bg-border"></span>
    <IconButton variant="ghost" size="sm" icon="copy" label="Copy team number" />
    <IconButton variant="ghost" icon="star" label="Add to watchlist" tooltipSide="bottom" />
  </Example>
</Section>
