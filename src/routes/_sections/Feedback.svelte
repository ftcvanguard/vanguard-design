<script lang="ts">
  import { Alert, Badge, Button, Progress, Spinner, type BadgeTone } from '$lib/index.js'
  import Example from '../_demo/Example.svelte'
  import Section from '../_demo/Section.svelte'
  import StateGrid from '../_demo/StateGrid.svelte'

  const tones = ['neutral', 'accent', 'success', 'attention', 'danger', 'red', 'blue'] as const satisfies readonly BadgeTone[]
  const label: Record<BadgeTone, string> = {
    neutral: 'Draft',
    accent: 'Live',
    success: 'Win',
    attention: 'Tie',
    danger: 'Loss',
    red: 'Red',
    blue: 'Blue',
  }

  let dismissed = $state(false)
  let progress = $state(35)
</script>

<Section
  id="badge"
  title="Badge"
  description="Compact status and metadata, from Vanguard's W/L/T match pills. Subtle is the default; solid is for the one thing on screen that must pop. Red and blue are alliance colors, not status."
>
  <Example title="Tones × variants">
    <StateGrid rows={['subtle', 'solid'] as const} columns={tones} corner="variant">
      {#snippet cell(variant, tone)}
        <Badge {tone} {variant}>{label[tone]}</Badge>
      {/snippet}
    </StateGrid>
  </Example>
  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Sizes" class="flex flex-wrap items-center gap-3">
      <Badge size="sm" tone="success">Small</Badge>
      <Badge size="md" tone="success">Medium</Badge>
      <Badge size="lg" tone="success">Large</Badge>
    </Example>
    <Example title="Dots and icons" class="flex flex-wrap items-center gap-3">
      <Badge tone="success" dot pulse>Queueing</Badge>
      <Badge tone="accent" dot>On field</Badge>
      <Badge dot>Idle</Badge>
      <Badge tone="attention" icon="clock">Delayed 4m</Badge>
      <Badge tone="danger" icon="x">DQ</Badge>
    </Example>
  </div>
</Section>

<Section
  id="alert"
  title="Alert"
  description="An inline message about the page or a section. Icon, color and text carry the tone together. Say what happened and what to do next."
>
  <Example title="Tones" class="flex flex-col gap-3">
    <Alert tone="accent" title="Live scoring is on">Scores update as referees submit them.</Alert>
    <Alert tone="success" title="Notes saved">Your changes are visible to your team.</Alert>
    <Alert tone="attention" title="Schedule is running late">
      Matches are about 12 minutes behind. Times below include the offset.
    </Alert>
    <Alert tone="danger" title="Couldn't reach FTC Events">
      Showing data from 4 minutes ago.
      {#snippet actions()}<Button size="sm" leadingIcon="refresh-cw">Try again</Button>{/snippet}
    </Alert>
  </Example>
  <Example title="Without title, dismissible">
    {#if dismissed}
      <Button size="sm" variant="ghost" onclick={() => (dismissed = false)}>Show again</Button>
    {:else}
      <Alert tone="accent" ondismiss={() => (dismissed = true)}>New season data is available. Rankings reset at midnight.</Alert>
    {/if}
  </Example>
</Section>

<Section
  id="progress"
  title="Progress"
  primitive="Progress"
  description="Progress of a known amount of work, or an indeterminate bar when the length is unknown, like Vanguard's status bar loader. Label it, or give it an aria-label."
>
  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Values" class="flex flex-col gap-5">
      <Progress value={0} label="Not started" showValue />
      <Progress value={progress} label="Syncing matches" showValue />
      <Progress value={100} tone="success" label="Complete" showValue />
      <div class="flex gap-2">
        <Button size="sm" onclick={() => (progress = Math.max(0, progress - 15))}>−15</Button>
        <Button size="sm" onclick={() => (progress = Math.min(100, progress + 15))}>+15</Button>
      </div>
    </Example>
    <Example title="Tones, sizes, indeterminate" class="flex flex-col gap-5">
      <Progress value={62} tone="attention" aria-label="Attention" />
      <Progress value={88} tone="danger" aria-label="Danger" />
      <Progress value={45} size="sm" aria-label="Small" />
      <Progress value={null} label="Loading rankings" />
      <Progress value={null} size="sm" aria-label="Loading" />
    </Example>
  </div>
</Section>

<Section id="spinner" title="Spinner" description="For short waits in a small space. Prefer a Progress bar or a skeleton for anything that fills a region.">
  <Example title="Sizes and color" class="flex flex-wrap items-center gap-6">
    <Spinner size={12} />
    <Spinner size={16} />
    <Spinner size={24} />
    <Spinner size={32} class="text-accent" />
    <span class="flex items-center gap-2 text-sm text-fg-muted"><Spinner size={14} label="" /> Fetching scores…</span>
  </Example>
</Section>
