<script lang="ts">
  import { onMount } from 'svelte'
  import { Badge, Button, DropdownMenu, IconButton, cn } from '$lib/index.js'
  import Logo from './_demo/Logo.svelte'
  import { nav } from './_demo/nav.js'
  import Buttons from './_sections/Buttons.svelte'
  import Choices from './_sections/Choices.svelte'
  import Colors from './_sections/Colors.svelte'
  import Disclosure from './_sections/Disclosure.svelte'
  import Display from './_sections/Display.svelte'
  import Feedback from './_sections/Feedback.svelte'
  import Menus from './_sections/Menus.svelte'
  import Overlays from './_sections/Overlays.svelte'
  import Selection from './_sections/Selection.svelte'
  import Shape from './_sections/Shape.svelte'
  import TextInputs from './_sections/TextInputs.svelte'
  import Typography from './_sections/Typography.svelte'

  const componentCount = nav.slice(1).reduce((n, g) => n + g.items.length, 0)
  const allItems = nav.flatMap((g) => g.items)
  let active = $state<string>('color')

  onMount(() => {
    // The section whose top crossed the upper fifth of the viewport is the one being read.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) active = entry.target.id
      },
      { rootMargin: '-20% 0px -75% 0px' },
    )
    for (const group of nav) for (const item of group.items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  })

  const principles = [
    { title: 'Roles, not hex', body: 'Components reach for accent, danger, surface. Retune a role once; everything follows.' },
    { title: 'Quiet by default', body: 'Secondary is the default button, badges are subtle, danger waits for hover. Emphasis is earned.' },
    { title: 'Keyboard first', body: 'Bits UI handles focus, roving tabindex and ARIA. Every state has a visible focus ring.' },
  ]
</script>

<svelte:head>
  <title>Vanguard Design</title>
  <meta name="description" content="Svelte components for Vanguard, built on Bits UI. Dark only." />
</svelte:head>

<a href="#main" class="sr-only z-50 rounded-md bg-accent-emphasis px-3 py-2 text-fg-on-emphasis focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
  Skip to content
</a>

<header class="sticky top-0 z-40 flex h-12 items-center gap-3 border-b border-border bg-chrome px-4">
  <div class="lg:hidden">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}<IconButton {...props} icon="list" label="Jump to section" variant="ghost" size="sm" tooltip={false} />{/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="max-h-[70dvh]">
        {#each nav as group}
          <DropdownMenu.Group label={group.group}>
            {#each group.items as item}
              <DropdownMenu.Item onSelect={() => (location.hash = item.id)}>{item.label}</DropdownMenu.Item>
            {/each}
          </DropdownMenu.Group>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <a href="#top" class="flex items-center gap-2.5 rounded-md">
    <Logo size={26} />
    <span class="text-md font-bold tracking-tight text-fg-strong">Vanguard</span>
    <span class="hidden text-sm text-fg-subtle sm:inline">/ design</span>
  </a>
  <Badge size="sm" class="hidden sm:inline-flex">v0.1.0</Badge>
  <div class="ml-auto flex items-center gap-1">
    <Button href="https://ftcvanguard.org" target="_blank" rel="noreferrer" variant="ghost" size="sm" trailingIcon="external-link">
      Vanguard 1.0
    </Button>
  </div>
</header>

<div id="top" class="flex pb-7">
  <aside class="sticky top-12 hidden h-[calc(100dvh-3rem-1.75rem)] w-56 shrink-0 overflow-y-auto border-r border-border bg-chrome py-4 lg:block">
    <nav aria-label="Components">
      {#each nav as group}
        <div class="mb-4">
          <h2 class="px-4 pb-1 text-xs font-semibold tracking-wide text-fg-subtle uppercase">{group.group}</h2>
          <ul>
            {#each group.items as item}
              <li>
                <a
                  href="#{item.id}"
                  aria-current={active === item.id ? 'location' : undefined}
                  class={cn(
                    'flex h-7 items-center border-l-2 px-3.5 text-sm transition-colors duration-100',
                    active === item.id
                      ? 'border-accent-emphasis bg-hover text-fg-strong'
                      : 'border-transparent text-fg-muted hover:bg-hover hover:text-fg',
                  )}
                >
                  {item.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </nav>
  </aside>

  <main id="main" class="min-w-0 flex-1 px-4 sm:px-8 lg:px-12">
    <div class="mx-auto max-w-5xl">
      <div class="border-b border-border pt-12 pb-10">
        <p class="mb-3 flex items-center gap-2 text-sm text-fg-subtle">
          <span class="size-1.5 rounded-full bg-success"></span> Svelte 5 · Bits UI 2 · Tailwind 4 · dark only
        </p>
        <h1 class="text-3xl font-semibold tracking-tight text-fg-strong">Vanguard Design</h1>
        <p class="mt-3 max-w-2xl text-md text-fg-muted">
          The components behind Vanguard: Vanguard 1.0's charcoal, blue and monospace, rebuilt with GitHub Primer's functional
          color roles and Bits UI's accessible primitives. Every state of every component is on this page.
        </p>
        <ul class="mt-8 grid gap-4 sm:grid-cols-3">
          {#each principles as p}
            <li class="rounded-lg border border-border bg-surface p-4">
              <p class="font-semibold text-fg-strong">{p.title}</p>
              <p class="mt-1 text-sm text-fg-muted">{p.body}</p>
            </li>
          {/each}
        </ul>
      </div>

      <Colors />
      <Typography />
      <Shape />
      <Buttons />
      <Menus />
      <TextInputs />
      <Choices />
      <Selection />
      <Disclosure />
      <Overlays />
      <Feedback />
      <Display />
    </div>
  </main>
</div>

<footer class="fixed inset-x-0 bottom-0 z-40 flex h-7 items-center gap-3 border-t border-border bg-chrome px-3 text-xs text-fg-muted">
  <span class="flex items-center gap-1.5"><span class="size-1.5 rounded-full bg-success"></span>Ready</span>
  <span class="text-fg-subtle">·</span>
  <span>{componentCount} components</span>
  <span class="ml-auto hidden truncate sm:inline">Viewing: {allItems.find((i) => i.id === active)?.label}</span>
</footer>
