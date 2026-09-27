<script lang="ts">
  import { Popover as PopoverPrimitive } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '../utils/cn.js'
  import { floatingClasses } from './overlay-styles.js'

  type Props = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    /** The element that toggles the popover. Spread `props` onto it. */
    trigger: Snippet<[{ props: Record<string, unknown> }]>
    children: Snippet
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
    class?: string
  }

  let {
    open = $bindable(false),
    onOpenChange,
    trigger,
    children,
    side = 'bottom',
    align = 'start',
    class: className,
  }: Props = $props()
</script>

<PopoverPrimitive.Root bind:open {onOpenChange}>
  <PopoverPrimitive.Trigger>
    {#snippet child({ props })}{@render trigger({ props })}{/snippet}
  </PopoverPrimitive.Trigger>
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      {side}
      {align}
      sideOffset={6}
      collisionPadding={8}
      class={cn(floatingClasses, 'w-72 origin-(--bits-popover-content-transform-origin) p-4', className)}
    >
      {@render children()}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
</PopoverPrimitive.Root>
