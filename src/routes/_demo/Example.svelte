<script lang="ts">
  import type { Snippet } from 'svelte'
  import { cn } from '$lib/index.js'

  type Props = {
    title: string
    /** Short note on when to use what's shown. */
    note?: string
    class?: string
    children: Snippet
  }

  let { title, note, class: className, children }: Props = $props()
</script>

<div class="overflow-hidden rounded-lg border border-border">
  <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border bg-chrome px-4 py-2">
    <h3 class="text-sm font-semibold text-fg">{title}</h3>
    {#if note}<p class="text-sm text-fg-subtle">{note}</p>{/if}
  </div>
  <div class={cn('bg-canvas p-5', className)}>
    {@render children()}
  </div>
</div>
