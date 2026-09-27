<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '../utils/cn.js'

  type Stripe = 'accent' | 'success' | 'attention' | 'danger' | 'red' | 'blue'

  type Props = HTMLAttributes<HTMLElement> & {
    title?: string
    description?: string
    /** Controls on the right of the header. */
    actions?: Snippet
    footer?: Snippet
    /** Colored top edge, e.g. to mark a red or blue alliance card. */
    stripe?: Stripe
    /** Remove body padding for edge-to-edge content like tables and lists. */
    flush?: boolean
    children?: Snippet
  }

  let { title, description, actions, footer, stripe, flush = false, class: className, children, ...rest }: Props = $props()

  const stripes: Record<Stripe, string> = {
    accent: 'border-t-accent-emphasis',
    success: 'border-t-success',
    attention: 'border-t-attention',
    danger: 'border-t-danger',
    red: 'border-t-alliance-red',
    blue: 'border-t-alliance-blue',
  }
</script>

<section
  class={cn('overflow-hidden rounded-lg border border-border bg-surface', stripe && ['border-t-2', stripes[stripe]], className)}
  {...rest}
>
  {#if title || actions}
    <header class="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
      <div class="flex min-w-0 flex-col">
        {#if title}<h3 class="truncate text-md font-semibold text-fg-strong">{title}</h3>{/if}
        {#if description}<p class="text-sm text-fg-muted">{description}</p>{/if}
      </div>
      {#if actions}<div class="flex shrink-0 items-center gap-2">{@render actions()}</div>{/if}
    </header>
  {/if}
  {#if children}
    <div class={cn(!flush && 'p-4')}>{@render children()}</div>
  {/if}
  {#if footer}
    <footer class="flex items-center justify-end gap-2 border-t border-border px-4 py-3">{@render footer()}</footer>
  {/if}
</section>
