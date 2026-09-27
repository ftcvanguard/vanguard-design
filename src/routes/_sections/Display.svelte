<script lang="ts">
  import { Avatar, Badge, Button, Card, IconButton, Kbd, Separator } from '$lib/index.js'
  import Example from '../_demo/Example.svelte'
  import Section from '../_demo/Section.svelte'

  const avatar =
    'data:image/svg+xml,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ff6b6b"/><stop offset="1" stop-color="#3572b0"/></linearGradient></defs><rect width="64" height="64" fill="url(#g)"/><circle cx="32" cy="26" r="11" fill="#fff" fill-opacity=".85"/><path d="M12 60c2-12 10-18 20-18s18 6 20 18z" fill="#fff" fill-opacity=".85"/></svg>`,
    )

  const teams = [
    { number: 6547, name: 'Cobalt Colts', rank: 1, record: '9-1-0' },
    { number: 16236, name: 'Torque Theory', rank: 2, record: '8-2-0' },
    { number: 11115, name: 'Null Pointers', rank: 3, record: '7-2-1' },
  ]
</script>

<Section
  id="card"
  title="Card"
  description="Groups related content on a surface. The optional stripe marks a category, such as the alliance a card belongs to, as in Vanguard's match details."
>
  <div class="grid gap-6 lg:grid-cols-2">
    <Card title="Red alliance" description="Qualification 12" stripe="red">
      {#snippet actions()}<Badge tone="success">Win</Badge>{/snippet}
      <div class="flex items-baseline justify-between">
        <span class="text-3xl font-semibold text-alliance-red tabular-nums">184</span>
        <span class="text-sm text-fg-muted">6547 · 16236</span>
      </div>
    </Card>
    <Card title="Blue alliance" description="Qualification 12" stripe="blue">
      {#snippet actions()}<Badge tone="danger">Loss</Badge>{/snippet}
      <div class="flex items-baseline justify-between">
        <span class="text-3xl font-semibold text-alliance-blue tabular-nums">97</span>
        <span class="text-sm text-fg-muted">11115 · 7236</span>
      </div>
    </Card>
  </div>
  <div class="grid gap-6 lg:grid-cols-2">
    <Card title="Rankings" description="SoCal League Meet 3" flush>
      {#snippet actions()}<IconButton icon="refresh-cw" label="Refresh rankings" variant="ghost" size="sm" />{/snippet}
      <ul class="divide-y divide-border-muted">
        {#each teams as team}
          <li class="flex items-center gap-3 px-4 py-2.5 hover:bg-hover">
            <span class="w-5 text-sm text-fg-subtle tabular-nums">{team.rank}</span>
            <Avatar size="sm" shape="square" fallback={team.name} alt="" />
            <span class="flex-1 truncate"><span class="text-fg-strong">{team.number}</span> <span class="text-fg-muted">{team.name}</span></span>
            <span class="text-sm text-fg-muted tabular-nums">{team.record}</span>
          </li>
        {/each}
      </ul>
    </Card>
    <Card title="Plain card">
      <p class="text-fg-muted">A title, a body and a footer. Use `flush` for edge-to-edge lists and tables.</p>
      {#snippet footer()}
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Save</Button>
      {/snippet}
    </Card>
  </div>
</Section>

<Section
  id="avatar"
  title="Avatar"
  primitive="Avatar"
  description="Circles for people, rounded squares for teams. Falls back to initials while the image loads or if it fails."
>
  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Sizes" note="20 · 24 · 32 · 40 · 64px" class="flex flex-wrap items-end gap-4">
      {#each ['xs', 'sm', 'md', 'lg', 'xl'] as const as size}
        <Avatar {size} src={avatar} alt="Scout" />
      {/each}
    </Example>
    <Example title="Fallbacks and shapes" class="flex flex-wrap items-end gap-4">
      <Avatar size="lg" fallback="Ada Park" alt="Ada Park" />
      <Avatar size="lg" src="data:image/png;base64,broken" fallback="JS" alt="Broken image falls back" />
      <Avatar size="lg" shape="square" fallback="CC" alt="Team Cobalt Colts" />
      <Avatar size="xl" shape="square" src={avatar} alt="Team logo" />
    </Example>
  </div>
</Section>

<Section id="separator" title="Separator" primitive="Separator" description="A 1px divider between groups. Decorative by default; set decorative={false} when it separates meaningful sections.">
  <Example title="Horizontal and vertical" class="flex flex-col gap-4">
    <p class="text-fg-muted">Above</p>
    <Separator />
    <div class="flex h-5 items-center gap-4 text-sm text-fg-muted">
      <span>Schedule</span>
      <Separator orientation="vertical" />
      <span>Rankings</span>
      <Separator orientation="vertical" />
      <span>Notes</span>
    </div>
  </Example>
</Section>

<Section id="kbd" title="Kbd" description="Keyboard keys in hints and menus.">
  <Example title="Examples" class="flex flex-wrap items-center gap-6 text-sm text-fg-muted">
    <span class="flex items-center gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd> Search</span>
    <span class="flex items-center gap-1"><Kbd>Esc</Kbd> Close</span>
    <span class="flex items-center gap-1"><Kbd>↑</Kbd><Kbd>↓</Kbd> Navigate</span>
  </Example>
</Section>
