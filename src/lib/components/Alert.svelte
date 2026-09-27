<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import Icon from '../icons/Icon.svelte'
  import type { IconName } from '../icons/paths.js'
  import { cn } from '../utils/cn.js'
  import IconButton from './IconButton.svelte'

  type Tone = 'accent' | 'success' | 'attention' | 'danger'

  type Props = HTMLAttributes<HTMLDivElement> & {
    tone?: Tone
    title?: string
    /** Override the tone's default icon. */
    icon?: IconName
    /** Shows a close button that calls `ondismiss`. */
    ondismiss?: () => void
    /** Buttons shown after the message. */
    actions?: Snippet
    children?: Snippet
  }

  let { tone = 'accent', title, icon, ondismiss, actions, class: className, children, ...rest }: Props = $props()

  const styles: Record<Tone, { box: string; icon: string; defaultIcon: IconName }> = {
    accent: { box: 'border-accent-border bg-accent-muted', icon: 'text-accent', defaultIcon: 'info' },
    success: { box: 'border-success-border bg-success-muted', icon: 'text-success', defaultIcon: 'circle-check' },
    attention: { box: 'border-attention-border bg-attention-muted', icon: 'text-attention', defaultIcon: 'triangle-alert' },
    danger: { box: 'border-danger-border bg-danger-muted', icon: 'text-danger', defaultIcon: 'circle-alert' },
  }
</script>

<div class={cn('flex items-start gap-3 rounded-lg border px-4 py-3 text-base', styles[tone].box, className)} {...rest}>
  <Icon name={icon ?? styles[tone].defaultIcon} size={16} class={cn('mt-0.5', styles[tone].icon)} />
  <div class="flex min-w-0 flex-1 flex-col gap-0.5">
    {#if title}<p class="font-semibold text-fg-strong">{title}</p>{/if}
    {#if children}<div class="text-fg">{@render children()}</div>{/if}
    {#if actions}<div class="mt-2 flex flex-wrap gap-2">{@render actions()}</div>{/if}
  </div>
  {#if ondismiss}
    <IconButton icon="x" label="Dismiss" variant="ghost" size="sm" tooltip={false} class="-my-1 -mr-2" onclick={ondismiss} />
  {/if}
</div>
