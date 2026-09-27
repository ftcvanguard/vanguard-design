<script lang="ts">
  import Example from '../_demo/Example.svelte'
  import Section from '../_demo/Section.svelte'

  const scale = [
    { cls: 'text-3xl', px: '32/40', use: 'Page title', weight: 'font-semibold' },
    { cls: 'text-2xl', px: '24/32', use: 'Section title', weight: 'font-semibold' },
    { cls: 'text-xl', px: '20/28', use: 'Large stat', weight: 'font-semibold' },
    { cls: 'text-lg', px: '16/24', use: 'Dialog, card title', weight: 'font-semibold' },
    { cls: 'text-md', px: '14/20', use: 'Emphasized body, large controls', weight: 'font-normal' },
    { cls: 'text-base', px: '13/20', use: 'Body and default controls', weight: 'font-normal' },
    { cls: 'text-sm', px: '12/18', use: 'Secondary text, small controls', weight: 'font-normal' },
    { cls: 'text-xs', px: '11/16', use: 'Badges, table meta', weight: 'font-normal' },
    { cls: 'text-2xs', px: '10/14', use: 'Dense badges only', weight: 'font-normal' },
  ]
</script>

<Section
  foundation
  id="typography"
  title="Typography"
  description="JetBrains Mono everywhere, as in Vanguard 1.0: team numbers, scores and timestamps align in columns without extra work. The scale is anchored at 13px for dense, data-heavy screens."
>
  <Example title="Scale">
    <ul class="flex flex-col divide-y divide-border-muted">
      {#each scale as step}
        <li class="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-2.5">
          <span class="w-20 shrink-0 text-xs text-fg-subtle">{step.cls.replace('text-', '')} · {step.px}</span>
          <span class="{step.cls} {step.weight} min-w-0 flex-1 truncate text-fg-strong">Qualification 12 · 184–97</span>
          <span class="text-xs text-fg-muted">{step.use}</span>
        </li>
      {/each}
    </ul>
  </Example>
  <Example title="Weights and emphasis" class="flex flex-wrap gap-x-10 gap-y-3 text-md">
    <span class="font-normal">Regular 400</span>
    <span class="font-medium">Medium 500</span>
    <span class="font-semibold">Semibold 600</span>
    <span class="font-bold">Bold 700</span>
    <a href="#typography" class="text-accent hover:underline">Link text</a>
    <code class="rounded-sm bg-inset px-1.5 text-fg">inline code</code>
  </Example>
</Section>
