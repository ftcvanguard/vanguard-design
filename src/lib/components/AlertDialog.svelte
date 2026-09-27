<script lang="ts">
  import { AlertDialog as AlertDialogPrimitive } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import { cn } from '../utils/cn.js'
  import Button from './Button.svelte'
  import { backdropClasses, dialogClasses, dialogWidths } from './overlay-styles.js'

  type Props = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    title: string
    description?: string
    /** Name the action, not "OK": "Delete note", "Discard changes". */
    confirmLabel?: string
    cancelLabel?: string
    variant?: 'primary' | 'danger'
    /** May return a promise; the dialog shows a loading state and stays open until it settles. */
    onConfirm?: () => void | Promise<void>
    trigger?: Snippet<[{ props: Record<string, unknown> }]>
    /** Extra content between the description and the actions. */
    children?: Snippet
    class?: string
  }

  let {
    open = $bindable(false),
    onOpenChange,
    title,
    description,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'danger',
    onConfirm,
    trigger,
    children,
    class: className,
  }: Props = $props()

  let pending = $state(false)

  async function confirm() {
    pending = true
    try {
      await onConfirm?.()
      open = false
      onOpenChange?.(false)
    } finally {
      pending = false
    }
  }
</script>

<AlertDialogPrimitive.Root bind:open {onOpenChange}>
  {#if trigger}
    <AlertDialogPrimitive.Trigger>
      {#snippet child({ props })}{@render trigger({ props })}{/snippet}
    </AlertDialogPrimitive.Trigger>
  {/if}
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Overlay class={backdropClasses} />
    <AlertDialogPrimitive.Content
      class={cn(dialogClasses, dialogWidths.sm, className)}
      escapeKeydownBehavior={pending ? 'ignore' : 'close'}
    >
      <div class="flex flex-col gap-2 px-5 pt-5 pb-4">
        <AlertDialogPrimitive.Title class="text-lg font-semibold text-fg-strong">{title}</AlertDialogPrimitive.Title>
        {#if description}
          <AlertDialogPrimitive.Description class="text-base text-fg-muted">{description}</AlertDialogPrimitive.Description>
        {/if}
        {@render children?.()}
      </div>
      <footer class="flex flex-wrap items-center justify-end gap-2 border-t border-border bg-canvas/40 px-5 py-3">
        <AlertDialogPrimitive.Cancel disabled={pending}>
          {#snippet child({ props })}<Button {...props}>{cancelLabel}</Button>{/snippet}
        </AlertDialogPrimitive.Cancel>
        <AlertDialogPrimitive.Action onclick={confirm}>
          {#snippet child({ props })}
            <Button {...props} variant={variant === 'danger' ? 'danger' : 'primary'} loading={pending} class={variant === 'danger'
                ? cn('border-danger-emphasis bg-danger-emphasis text-fg-on-emphasis', !pending && 'hover:border-danger-emphasis-hover hover:bg-danger-emphasis-hover hover:text-fg-on-emphasis')
                : undefined}>
              {confirmLabel}
            </Button>
          {/snippet}
        </AlertDialogPrimitive.Action>
      </footer>
    </AlertDialogPrimitive.Content>
  </AlertDialogPrimitive.Portal>
</AlertDialogPrimitive.Root>
