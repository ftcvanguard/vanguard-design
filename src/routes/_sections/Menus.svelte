<script lang="ts">
  import { DropdownMenu, IconButton, Kbd, cn } from '$lib/index.js'
  import { itemClasses } from '$lib/components/dropdown-menu/item-styles.js'
  import Icon from '$lib/icons/Icon.svelte'
  import Example from '../_demo/Example.svelte'
  import Section from '../_demo/Section.svelte'

  let showRanked = $state(true)
  let showNotes = $state(false)
  let lastAction = $state('Nothing yet')
</script>

<Section
  id="dropdown-menu"
  title="DropdownMenu"
  primitive="DropdownMenu"
  description="Actions on a thing, not navigation. Full keyboard support: arrows move, typing jumps, Escape closes. Group related items, put destructive ones last behind a separator."
>
  <div class="grid gap-6 lg:grid-cols-[1fr_auto]">
    <Example title="Try it" note="Last action: {lastAction}" class="flex flex-wrap items-center gap-3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>Match 12</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group label="Match">
            <DropdownMenu.Item icon="eye" shortcut="⏎" onSelect={() => (lastAction = 'Open details')}>Open details</DropdownMenu.Item>
            <DropdownMenu.Item icon="notebook-pen" shortcut="N" onSelect={() => (lastAction = 'Add note')}>Add note</DropdownMenu.Item>
            <DropdownMenu.Item icon="copy" onSelect={() => (lastAction = 'Copy link')}>Copy link</DropdownMenu.Item>
            <DropdownMenu.Item icon="bar-chart" disabled>Score breakdown</DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group label="Show">
            <DropdownMenu.CheckboxItem bind:checked={showRanked}>Ranked teams</DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem bind:checked={showNotes}>Scouting notes</DropdownMenu.CheckboxItem>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Item icon="trash" variant="danger" onSelect={() => (lastAction = 'Delete')}>Delete match</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <IconButton {...props} variant="ghost" icon="more-horizontal" label="More actions" />
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Item icon="refresh-cw" onSelect={() => (lastAction = 'Refresh')}>Refresh</DropdownMenu.Item>
          <DropdownMenu.Item icon="settings" onSelect={() => (lastAction = 'Settings')}>Settings</DropdownMenu.Item>
          <DropdownMenu.Item icon="log-out" onSelect={() => (lastAction = 'Sign out')}>Sign out</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger disabled>Disabled</DropdownMenu.Trigger>
      </DropdownMenu.Root>
    </Example>

    <Example title="Item states" note="Static render with the real item styles.">
      <div class="w-60 rounded-lg border border-border bg-surface p-1 shadow-overlay" role="presentation">
        <div class={itemClasses}><Icon name="eye" class="text-fg-muted" /><span class="flex-1">Default</span><Kbd>⏎</Kbd></div>
        <div class={itemClasses} data-highlighted><Icon name="notebook-pen" class="text-fg-muted" /><span class="flex-1">Highlighted</span></div>
        <div class={itemClasses} data-disabled><Icon name="bar-chart" /><span class="flex-1">Disabled</span></div>
        <div class={itemClasses}><span class="flex w-4 justify-center"><Icon name="check" size={14} class="text-accent" /></span><span class="flex-1">Checked</span></div>
        <div class="-mx-1 my-1 h-px bg-border"></div>
        <div class={cn(itemClasses, 'text-danger')}><Icon name="trash" /><span class="flex-1">Danger</span></div>
        <div class={cn(itemClasses, 'text-danger data-highlighted:bg-danger-muted')} data-highlighted><Icon name="trash" /><span class="flex-1">Danger highlighted</span></div>
      </div>
    </Example>
  </div>
</Section>
