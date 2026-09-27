<script lang="ts">
  import type { Snippet } from 'svelte'
  import { Badge } from '$lib/index.js'

  type Props = {
    id: string
    title: string
    description: string
    /** Bits UI primitive the component is built on; omit for native elements. */
    primitive?: string
    /** Foundations document tokens, not components, so they get no primitive tag. */
    foundation?: boolean
    children: Snippet
  }

  let { id, title, description, primitive, foundation = false, children }: Props = $props()
</script>

<section {id} class="scroll-mt-20 border-b border-border py-12 first:pt-4 last:border-b-0" aria-labelledby="{id}-title">
  <header class="mb-6 flex flex-col gap-2">
    <div class="flex flex-wrap items-center gap-3">
      <h2 id="{id}-title" class="text-2xl font-semibold tracking-tight text-fg-strong">
        <a href="#{id}" class="hover:underline hover:decoration-fg-subtle hover:underline-offset-4">{title}</a>
      </h2>
      {#if primitive}
        <Badge tone="accent" size="sm">bits-ui · {primitive}</Badge>
      {:else if !foundation}
        <Badge size="sm">native</Badge>
      {/if}
    </div>
    <p class="max-w-2xl text-base text-fg-muted">{description}</p>
  </header>
  <div class="flex flex-col gap-6">
    {@render children()}
  </div>
</section>
