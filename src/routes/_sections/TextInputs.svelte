<script lang="ts">
  import { Button, Field, IconButton, Input, Textarea } from '$lib/index.js'
  import Example from '../_demo/Example.svelte'
  import Section from '../_demo/Section.svelte'
  import StateGrid from '../_demo/StateGrid.svelte'
  import { force } from '../_demo/states.js'

  const states = ['Default', 'Hover', 'Focus', 'Invalid', 'Disabled', 'Read-only'] as const
  const contents = ['Empty', 'Filled'] as const

  let team = $state('')
  const teamError = $derived(team && !/^\d{1,5}$/.test(team) ? 'Team numbers are 1–5 digits.' : undefined)
  let search = $state('')
  let notes = $state('Strong endgame, consistent specimen cycles.')
</script>

<Section
  id="input"
  title="Input"
  description="Single-line text. Inputs sit in an inset well so they read as fillable on any surface. Focus adds a blue edge and halo; errors swap both to red and never rely on color alone (see Field)."
>
  <Example title="States">
    <StateGrid rows={states} columns={contents} corner="state">
      {#snippet cell(state, content)}
        <div class="w-56">
          <Input
            placeholder="Team number"
            value={content === 'Filled' ? '6547' : ''}
            data-force-state={force(state)}
            invalid={state === 'Invalid'}
            disabled={state === 'Disabled'}
            readonly={state === 'Read-only'}
            aria-label="Team number"
          />
        </div>
      {/snippet}
    </StateGrid>
  </Example>

  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Sizes" class="flex flex-col gap-3">
      <Input size="sm" placeholder="Small · 28px" aria-label="Small" />
      <Input size="md" placeholder="Medium · 32px" aria-label="Medium" />
      <Input size="lg" placeholder="Large · 40px" aria-label="Large" />
    </Example>
    <Example title="Adornments" class="flex flex-col gap-3">
      <Input leadingIcon="search" placeholder="Search teams" bind:value={search} aria-label="Search teams">
        {#snippet trailing()}
          {#if search}
            <IconButton icon="x" label="Clear search" variant="ghost" size="sm" tooltip={false} class="-mr-1.5 size-6" onclick={() => (search = '')} />
          {/if}
        {/snippet}
      </Input>
      <Input type="number" value={30} aria-label="Match offset">
        {#snippet trailing()}<span class="text-sm">sec</span>{/snippet}
      </Input>
    </Example>
  </div>
</Section>

<Section
  id="field"
  title="Field"
  primitive="Label"
  description="Wraps a control with its label, help text and error, and wires up id, aria-describedby and aria-invalid for you. Errors pair color with an icon and a message that says how to fix it."
>
  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Live validation" note="Type letters to see the error." class="flex flex-col gap-5">
      <Field label="Team number" description="Your FTC team, e.g. 6547." required error={teamError}>
        {#snippet children(props)}
          <Input {...props} bind:value={team} inputmode="numeric" placeholder="6547" />
        {/snippet}
      </Field>
      <Field label="Event code" error="No event found with code USCAFFL. Check the code on ftc-events.">
        {#snippet children(props)}
          <Input {...props} value="USCAFFL" />
        {/snippet}
      </Field>
      <Field label="Password" disabled>
        {#snippet children(props)}
          <Input {...props} type="password" value="hunter22" />
        {/snippet}
      </Field>
    </Example>
    <Example title="In a form" class="flex flex-col gap-4">
      <Field label="Scouting notes" description="Visible to your whole team.">
        {#snippet children(props)}
          <Textarea {...props} bind:value={notes} autosize />
        {/snippet}
      </Field>
      <div class="flex justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Save</Button>
      </div>
    </Example>
  </div>
</Section>

<Section id="textarea" title="Textarea" description="Multi-line text. Resizes vertically by default; `autosize` grows with the content instead.">
  <Example title="States">
    <StateGrid rows={['Default', 'Hover', 'Focus', 'Invalid', 'Disabled'] as const} columns={['Filled'] as const} corner="state">
      {#snippet cell(state)}
        <div class="w-72">
          <Textarea
            rows={2}
            value="Fast intake, weak climb."
            data-force-state={force(state)}
            invalid={state === 'Invalid'}
            disabled={state === 'Disabled'}
            aria-label="Notes"
          />
        </div>
      {/snippet}
    </StateGrid>
  </Example>
</Section>
