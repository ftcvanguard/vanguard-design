<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui'
  import { hasContext, type Snippet } from 'svelte'
  import { cn } from '../utils/cn.js'
  import { TOOLTIP_PROVIDER } from './tooltip-context.js'

  type Props = {
    /** Plain-text tooltip. Use `content` for richer markup. */
    text?: string
    content?: Snippet
    /** The element the tooltip describes. Spread `props` onto it. */
    trigger: Snippet<[{ props: Record<string, unknown> }]>
    open?: boolean
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    delayDuration?: number
    disabled?: boolean
    class?: string
  }

  let {
    text,
    content,
    trigger,
    open = $bindable(false),
    side = 'top',
    align = 'center',
    delayDuration,
    disabled = false,
    class: className,
  }: Props = $props()

  const hasProvider = hasContext(TOOLTIP_PROVIDER)
</script>

{#snippet tooltip()}
  <TooltipPrimitive.Root bind:open {delayDuration} {disabled}>
    <TooltipPrimitive.Trigger>
      {#snippet child({ props })}
        {@render trigger({ props })}
      {/snippet}
    </TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        {side}
        {align}
        sideOffset={6}
        collisionPadding={8}
        class={cn(
          'z-50 max-w-64 origin-(--bits-tooltip-content-transform-origin) rounded-md border border-border-strong/40 bg-control-active px-2 py-1 text-sm text-fg-strong shadow-overlay',
          'data-[state=closed]:animate-vd-fade-out data-[state=delayed-open]:animate-vd-pop-in data-[state=instant-open]:animate-vd-fade-in',
          className,
        )}
      >
        {#if content}{@render content()}{:else}{text}{/if}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
{/snippet}

{#if hasProvider}
  {@render tooltip()}
{:else}
  <TooltipPrimitive.Provider>{@render tooltip()}</TooltipPrimitive.Provider>
{/if}
