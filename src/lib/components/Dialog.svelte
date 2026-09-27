<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '../utils/cn.js'
  import IconButton from './IconButton.svelte'
  import { backdropClasses, dialogClasses, dialogWidths } from './overlay-styles.js'

  type Props = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    title: string
    description?: string
    size?: keyof typeof dialogWidths
    /** The element that opens the dialog. Spread `props` onto it. */
    trigger?: Snippet<[{ props: Record<string, unknown> }]>
    children?: Snippet
    /** Actions, right-aligned. Primary action last. */
    footer?: Snippet
    /** Close on Escape, outside click and via the ✕ button. Turn off for flows that must be completed. */
    dismissible?: boolean
    class?: string
  }

  let {
    open = $bindable(false),
    onOpenChange,
    title,
    description,
    size = 'md',
    trigger,
    children,
    footer,
    dismissible = true,
    class: className,
  }: Props = $props()
</script>

<DialogPrimitive.Root bind:open {onOpenChange}>
  {#if trigger}
    <DialogPrimitive.Trigger>
      {#snippet child({ props })}{@render trigger({ props })}{/snippet}
    </DialogPrimitive.Trigger>
  {/if}
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay class={backdropClasses} />
    <DialogPrimitive.Content
      class={cn(dialogClasses, dialogWidths[size], className)}
      escapeKeydownBehavior={dismissible ? 'close' : 'ignore'}
      interactOutsideBehavior={dismissible ? 'close' : 'ignore'}
    >
      <header class={cn('flex items-start gap-3 px-5 pt-4 pb-3', dismissible && 'pr-12')}>
        <div class="flex min-w-0 flex-1 flex-col gap-1 pt-1">
          <DialogPrimitive.Title class="text-lg font-semibold text-fg-strong">{title}</DialogPrimitive.Title>
          {#if description}
            <DialogPrimitive.Description class="text-base text-fg-muted">{description}</DialogPrimitive.Description>
          {/if}
        </div>
      </header>
      {#if children}
        <div class="min-h-0 flex-1 overflow-y-auto px-5 pb-5">{@render children()}</div>
      {/if}
      {#if footer}
        <footer class="flex flex-wrap items-center justify-end gap-2 border-t border-border bg-canvas/40 px-5 py-3">
          {@render footer()}
        </footer>
      {/if}
      <!-- Last in the DOM so initial focus lands on the first field or action, not on ✕. -->
      {#if dismissible}
        <DialogPrimitive.Close>
          {#snippet child({ props })}
            <IconButton {...props} icon="x" label="Close" variant="ghost" size="sm" tooltip={false} class="absolute top-4 right-3.5" />
          {/snippet}
        </DialogPrimitive.Close>
      {/if}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
</DialogPrimitive.Root>
