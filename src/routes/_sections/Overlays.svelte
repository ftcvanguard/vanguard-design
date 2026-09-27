<script lang="ts">
  import { AlertDialog, Button, Dialog, Field, IconButton, Input, Popover, Select, Switch, Textarea, Tooltip } from '$lib/index.js'
  import Example from '../_demo/Example.svelte'
  import Section from '../_demo/Section.svelte'

  let editOpen = $state(false)
  let termsOpen = $state(false)
  let team = $state('6547')
  let lastConfirm = $state('—')

  function wait(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms))
  }
</script>

<Section
  id="dialog"
  title="Dialog"
  primitive="Dialog"
  description="Focused tasks that need the page to wait. Focus moves in and is trapped; Escape, the ✕ and clicking outside close it. Keep the primary action last in the footer."
>
  <Example title="Try it" class="flex flex-wrap gap-3">
    <Dialog title="Edit team" description="Changes apply to every event this season." bind:open={editOpen}>
      {#snippet trigger({ props })}<Button {...props} variant="primary" leadingIcon="pencil">Edit team</Button>{/snippet}
      <div class="flex flex-col gap-4">
        <Field label="Team number" required>
          {#snippet children(props)}<Input {...props} bind:value={team} />{/snippet}
        </Field>
        <Field label="Region">
          {#snippet children(props)}
            <Select {...props} value="socal" items={[{ value: 'socal', label: 'Southern California' }, { value: 'norcal', label: 'Northern California' }]} />
          {/snippet}
        </Field>
        <Switch label="Share notes with alliance partners" />
      </div>
      {#snippet footer()}
        <Button variant="ghost" onclick={() => (editOpen = false)}>Cancel</Button>
        <Button variant="primary" onclick={() => (editOpen = false)}>Save changes</Button>
      {/snippet}
    </Dialog>

    <Dialog title="Small dialog" size="sm" description="max-width 384px">
      {#snippet trigger({ props })}<Button {...props}>Small</Button>{/snippet}
      <p class="text-fg-muted">Short confirmations and single inputs.</p>
    </Dialog>

    <Dialog title="Large dialog" size="lg" description="max-width 672px; the body scrolls, header and footer stay put.">
      {#snippet trigger({ props })}<Button {...props}>Large, scrolling</Button>{/snippet}
      <div class="flex flex-col gap-3 text-fg-muted">
        {#each Array.from({ length: 24 }, (_, i) => i + 1) as n}
          <p>Match {n}: red 184 – blue {97 + n * 3}. Notes pending review.</p>
        {/each}
      </div>
      {#snippet footer()}<Button variant="primary">Done</Button>{/snippet}
    </Dialog>

    <Dialog title="Accept terms" description="You must accept to continue. Escape and outside clicks are ignored." dismissible={false} bind:open={termsOpen}>
      {#snippet trigger({ props })}<Button {...props} variant="ghost">Not dismissible</Button>{/snippet}
      <Textarea readonly value="By using Vanguard you agree to share match data with your team." rows={3} />
      {#snippet footer()}
        <Button variant="primary" onclick={() => (termsOpen = false)}>I accept</Button>
      {/snippet}
    </Dialog>
  </Example>
</Section>

<Section
  id="alert-dialog"
  title="AlertDialog"
  primitive="AlertDialog"
  description="Interrupts to confirm a consequential action. Name the button after the action (“Delete note”, not “OK”). The confirm can be async: it shows progress and the dialog waits."
>
  <Example title="Try it" note="Last result: {lastConfirm}" class="flex flex-wrap gap-3">
    <AlertDialog
      title="Delete scouting note?"
      description="The note for team 6547 will be removed for everyone on your team. This can't be undone."
      confirmLabel="Delete note"
      onConfirm={() => wait(1200).then(() => void (lastConfirm = 'Deleted'))}
    >
      {#snippet trigger({ props })}<Button {...props} variant="danger" leadingIcon="trash">Delete note</Button>{/snippet}
    </AlertDialog>
    <AlertDialog
      title="Publish rankings?"
      description="Alliance partners will see your picklist order."
      confirmLabel="Publish"
      variant="primary"
      onConfirm={() => void (lastConfirm = 'Published')}
    >
      {#snippet trigger({ props })}<Button {...props}>Publish</Button>{/snippet}
    </AlertDialog>
  </Example>
</Section>

<Section
  id="popover"
  title="Popover"
  primitive="Popover"
  description="Non-modal floating content anchored to a trigger: quick settings, previews, small forms. Closes on Escape or outside click, and focus returns to the trigger."
>
  <Example title="Try it" class="flex flex-wrap gap-3">
    <Popover>
      {#snippet trigger({ props })}<Button {...props} leadingIcon="clock">Offset</Button>{/snippet}
      <div class="flex flex-col gap-3">
        <div>
          <p class="font-semibold text-fg-strong">Schedule offset</p>
          <p class="text-sm text-fg-muted">Shift match times when the event runs behind.</p>
        </div>
        <Input type="number" value={30} aria-label="Offset in seconds">
          {#snippet trailing()}<span class="text-sm">sec</span>{/snippet}
        </Input>
        <div class="flex justify-end gap-2">
          <Button size="sm" variant="ghost">Reset</Button>
          <Button size="sm" variant="primary">Apply</Button>
        </div>
      </div>
    </Popover>
    <Popover side="right" align="center" class="w-56">
      {#snippet trigger({ props })}<IconButton {...props} icon="info" label="About OPR" tooltip={false} variant="ghost" />{/snippet}
      <p class="text-sm text-fg-muted"><span class="font-semibold text-fg">OPR</span> estimates how many points a team contributes to its alliance per match.</p>
    </Popover>
  </Example>
</Section>

<Section
  id="tooltip"
  title="Tooltip"
  primitive="Tooltip"
  description="A short text label for a control, shown on hover and keyboard focus. Never put essential information or interactive content in one. Once one tooltip opens, neighbors open instantly."
>
  <Example title="Try it" note="Hover or tab through." class="flex flex-wrap items-center gap-3">
    {#each ['top', 'right', 'bottom', 'left'] as const as side}
      <Tooltip text="Tooltip on {side}" {side}>
        {#snippet trigger({ props })}<Button {...props}>{side}</Button>{/snippet}
      </Tooltip>
    {/each}
    <span class="mx-2 h-6 w-px bg-border"></span>
    <Tooltip>
      {#snippet trigger({ props })}<Button {...props} variant="ghost">Rich content</Button>{/snippet}
      {#snippet content()}
        <span class="flex items-center gap-2">Open command palette <kbd class="rounded-sm bg-canvas px-1 text-xs text-fg-muted">⌘K</kbd></span>
      {/snippet}
    </Tooltip>
  </Example>
</Section>
