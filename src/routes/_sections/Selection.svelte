<script lang="ts">
  import { Field, SegmentedControl, Select, Slider, type SelectItem } from '$lib/index.js'
  import Example from '../_demo/Example.svelte'
  import Section from '../_demo/Section.svelte'
  import StateGrid from '../_demo/StateGrid.svelte'
  import { force } from '../_demo/states.js'

  const events: SelectItem[] = [
    { value: 'uscaffl', label: 'SoCal League Meet 3', description: 'Dec 14 · Fullerton' },
    { value: 'uscalaq', label: 'LA Qualifier', description: 'Jan 18 · Pasadena' },
    { value: 'uscasdc', label: 'San Diego Championship', description: 'Feb 22 · San Diego' },
    { value: 'usworld', label: 'World Championship', description: 'Registration closed', disabled: true },
  ]
  const simple: SelectItem[] = [
    { value: 'quals', label: 'Qualifications' },
    { value: 'playoffs', label: 'Playoffs' },
  ]

  let event = $state('uscaffl')
  let view = $state('list')
  let range = $state('all')
  let offset = $state(30)
  let volume = $state(60)
</script>

<Section
  id="select"
  title="Select"
  primitive="Select"
  description="Pick one option from a list too long to show at once. Typeahead works while the trigger is focused, even closed. Options can carry a description and be disabled."
>
  <Example title="States">
    <StateGrid rows={['Default', 'Hover', 'Focus', 'Invalid', 'Disabled'] as const} columns={['Placeholder', 'Selected'] as const} corner="state">
      {#snippet cell(state, value)}
        <div class="w-56">
          <Select
            items={simple}
            value={value === 'Selected' ? 'quals' : ''}
            placeholder="Match type"
            data-force-state={force(state)}
            invalid={state === 'Invalid'}
            disabled={state === 'Disabled'}
            aria-label="Match type"
          />
        </div>
      {/snippet}
    </StateGrid>
  </Example>
  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Try it" note="Open to see the list, descriptions and a disabled option.">
      <Field label="Event">
        {#snippet children(props)}
          <Select {...props} items={events} bind:value={event} />
        {/snippet}
      </Field>
    </Example>
    <Example title="Sizes" class="flex flex-col gap-3">
      <Select size="sm" items={simple} value="quals" aria-label="Small" />
      <Select size="md" items={simple} value="quals" aria-label="Medium" />
      <Select size="lg" items={simple} value="quals" aria-label="Large" />
    </Example>
  </div>
</Section>

<Section
  id="segmented-control"
  title="SegmentedControl"
  primitive="ToggleGroup"
  description="Switch between views of the same content. Always has exactly one selection; clicking the active segment does nothing. For separate content panels, use Tabs."
>
  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Text" note="Selected: {range}" class="flex flex-col items-start gap-4">
      <SegmentedControl
        aria-label="Time range"
        bind:value={range}
        items={[
          { value: 'all', label: 'All' },
          { value: 'quals', label: 'Quals' },
          { value: 'playoffs', label: 'Playoffs' },
        ]}
      />
      <SegmentedControl
        size="sm"
        aria-label="Time range, small"
        value="quals"
        items={[
          { value: 'all', label: 'All' },
          { value: 'quals', label: 'Quals' },
          { value: 'playoffs', label: 'Playoffs', disabled: true },
        ]}
      />
    </Example>
    <Example title="Icons" note="Selected: {view}" class="flex flex-col items-start gap-4">
      <SegmentedControl
        aria-label="Layout"
        bind:value={view}
        items={[
          { value: 'list', label: 'List', icon: 'list' },
          { value: 'grid', label: 'Grid', icon: 'layout-grid' },
          { value: 'chart', label: 'Chart', icon: 'bar-chart' },
        ]}
      />
      <SegmentedControl
        iconOnly
        aria-label="Layout, icons only"
        bind:value={view}
        items={[
          { value: 'list', label: 'List', icon: 'list' },
          { value: 'grid', label: 'Grid', icon: 'layout-grid' },
          { value: 'chart', label: 'Chart', icon: 'bar-chart' },
        ]}
      />
    </Example>
  </div>
  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Block">
      <SegmentedControl block aria-label="Alliance" value="red" items={[{ value: 'red', label: 'Red' }, { value: 'blue', label: 'Blue' }]} />
    </Example>
    <Example title="Disabled">
      <SegmentedControl disabled aria-label="Alliance, disabled" value="red" items={[{ value: 'red', label: 'Red' }, { value: 'blue', label: 'Blue' }]} />
    </Example>
  </div>
</Section>

<Section
  id="slider"
  title="Slider"
  primitive="Slider"
  description="Pick a value from a continuous range where the exact number matters less than the position. Pair with a visible value; arrow keys step, Page Up/Down jump."
>
  <Example title="States">
    <StateGrid rows={['Value 40'] as const} columns={['Default', 'Hover', 'Focus', 'Disabled'] as const} corner="">
      {#snippet cell(_, state)}
        <div class="w-40">
          <Slider value={40} data-force-state={force(state)} disabled={state === 'Disabled'} aria-label="Slider {state}" />
        </div>
      {/snippet}
    </StateGrid>
  </Example>
  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="With a value" class="flex flex-col gap-2">
      <div class="flex items-baseline justify-between text-sm">
        <span id="offset-label" class="font-medium text-fg">Schedule offset</span>
        <span class="text-fg-muted tabular-nums">{offset > 0 ? '+' : ''}{offset} sec</span>
      </div>
      <Slider bind:value={offset} min={-120} max={120} step={5} aria-labelledby="offset-label" />
    </Example>
    <Example title="Vertical" class="flex h-40 items-center gap-6">
      <Slider orientation="vertical" bind:value={volume} aria-label="Volume" />
      <span class="text-sm text-fg-muted tabular-nums">{volume}%</span>
    </Example>
  </div>
</Section>
