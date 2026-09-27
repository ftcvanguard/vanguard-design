<script lang="ts">
  import { Checkbox, RadioGroup, Switch } from '$lib/index.js'
  import Example from '../_demo/Example.svelte'
  import Section from '../_demo/Section.svelte'
  import StateGrid from '../_demo/StateGrid.svelte'
  import { force } from '../_demo/states.js'

  const states = ['Default', 'Hover', 'Active', 'Focus', 'Disabled'] as const

  let alliances = $state({ red: true, blue: false })
  const all = $derived(alliances.red && alliances.blue)
  const some = $derived(alliances.red !== alliances.blue)

  let autoRefresh = $state(true)
  let compact = $state(false)
  let sort = $state('rank')
</script>

<Section
  id="checkbox"
  title="Checkbox"
  primitive="Checkbox"
  description="Independent on/off choices that take effect on submit. The label is part of the hit target. Indeterminate shows a parent whose children are partly selected."
>
  <Example title="States">
    <StateGrid rows={['Unchecked', 'Checked', 'Indeterminate'] as const} columns={states} corner="value">
      {#snippet cell(value, state)}
        <Checkbox
          checked={value === 'Checked'}
          indeterminate={value === 'Indeterminate'}
          data-force-state={force(state)}
          disabled={state === 'Disabled'}
          aria-label="{value} {state}"
        />
      {/snippet}
    </StateGrid>
  </Example>
  <Example title="Try it" note="The parent reflects its children." class="flex flex-col gap-3">
    <Checkbox
      label="Both alliances"
      checked={all}
      indeterminate={some}
      onCheckedChange={(v) => (alliances = { red: v, blue: v })}
    />
    <div class="ml-6 flex flex-col gap-3">
      <Checkbox label="Red alliance" bind:checked={alliances.red} />
      <Checkbox label="Blue alliance" bind:checked={alliances.blue} description="Includes surrogate matches." />
    </div>
    <Checkbox label="Archived events" disabled />
  </Example>
</Section>

<Section
  id="switch"
  title="Switch"
  primitive="Switch"
  description="A setting that applies immediately, like a light switch. If the change needs a Save button, use a Checkbox instead."
>
  <Example title="States">
    <StateGrid rows={['Off', 'On'] as const} columns={states} corner="value">
      {#snippet cell(value, state)}
        <Switch
          checked={value === 'On'}
          data-force-state={force(state)}
          disabled={state === 'Disabled'}
          aria-label="{value} {state}"
        />
      {/snippet}
    </StateGrid>
  </Example>
  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Settings list" class="flex flex-col divide-y divide-border-muted">
      <Switch label="Auto-refresh" description="Pull new scores every 30 seconds." labelPosition="start" bind:checked={autoRefresh} class="pb-3" />
      <Switch label="Compact rows" labelPosition="start" bind:checked={compact} class="py-3" />
      <Switch label="Push notifications" description="Requires the mobile app." labelPosition="start" disabled class="pt-3" />
    </Example>
    <Example title="Sizes" class="flex items-center gap-6">
      <Switch size="sm" checked aria-label="Small" />
      <Switch size="md" checked aria-label="Medium" />
    </Example>
  </div>
</Section>

<Section
  id="radio-group"
  title="RadioGroup"
  primitive="RadioGroup"
  description="One choice from a short list, all options visible. Arrow keys move the selection. For more than about five options, use a Select."
>
  <Example title="States">
    <StateGrid rows={['Unchecked', 'Checked'] as const} columns={states} corner="value">
      {#snippet cell(value, state)}
        <RadioGroup.Root value={value === 'Checked' ? 'x' : ''} aria-label="{value} {state}">
          <RadioGroup.Item value="x" data-force-state={force(state)} disabled={state === 'Disabled'} aria-label="{value} {state}" />
        </RadioGroup.Root>
      {/snippet}
    </StateGrid>
  </Example>
  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Vertical" note="Selected: {sort}">
      <RadioGroup.Root bind:value={sort} aria-label="Sort rankings by">
        <RadioGroup.Item value="rank" label="Rank" description="Official ranking points." />
        <RadioGroup.Item value="opr" label="OPR" description="Offensive power rating." />
        <RadioGroup.Item value="np" label="Non-penalty points" />
        <RadioGroup.Item value="epa" label="EPA" description="Not available for this season." disabled />
      </RadioGroup.Root>
    </Example>
    <Example title="Horizontal">
      <RadioGroup.Root value="quals" orientation="horizontal" aria-label="Match type">
        <RadioGroup.Item value="quals" label="Qualifications" />
        <RadioGroup.Item value="playoffs" label="Playoffs" />
        <RadioGroup.Item value="practice" label="Practice" />
      </RadioGroup.Root>
    </Example>
  </div>
</Section>
