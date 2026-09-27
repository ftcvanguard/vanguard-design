<script lang="ts" module>
  export type BadgeTone = 'neutral' | 'accent' | 'success' | 'attention' | 'danger' | 'red' | 'blue'
</script>

<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'
  import Icon from '../icons/Icon.svelte'
  import type { IconName } from '../icons/paths.js'
  import { cn } from '../utils/cn.js'

  type Props = HTMLAttributes<HTMLSpanElement> & {
    /** `red` and `blue` are FTC alliance colors, not status. */
    tone?: BadgeTone
    /** `solid` is for counts and states that need to stand out; use sparingly. */
    variant?: 'subtle' | 'solid'
    size?: 'sm' | 'md' | 'lg'
    icon?: IconName
    /** Leading status dot. */
    dot?: boolean
    /** Pulse the dot for live states, like a team being queued. */
    pulse?: boolean
    children?: Snippet
  }

  let {
    tone = 'neutral',
    variant = 'subtle',
    size = 'md',
    icon,
    dot = false,
    pulse = false,
    class: className,
    children,
    ...rest
  }: Props = $props()

  const subtle: Record<BadgeTone, string> = {
    neutral: 'border-border-emphasis bg-control text-fg-muted',
    accent: 'border-accent-border bg-accent-muted text-accent',
    success: 'border-success-border bg-success-muted text-success',
    attention: 'border-attention-border bg-attention-muted text-attention',
    danger: 'border-danger-border bg-danger-muted text-danger',
    red: 'border-alliance-red/40 bg-alliance-red-muted text-alliance-red',
    blue: 'border-alliance-blue/40 bg-alliance-blue-muted text-alliance-blue',
  }
  const solid: Record<BadgeTone, string> = {
    neutral: 'border-transparent bg-control-active text-fg-strong',
    accent: 'border-transparent bg-accent-emphasis text-fg-on-emphasis',
    success: 'border-transparent bg-success-emphasis text-fg-on-emphasis',
    attention: 'border-transparent bg-attention-emphasis text-fg-on-emphasis',
    danger: 'border-transparent bg-danger-emphasis text-fg-on-emphasis',
    red: 'border-transparent bg-danger-emphasis text-fg-on-emphasis',
    blue: 'border-transparent bg-accent-emphasis text-fg-on-emphasis',
  }
  const sizes = {
    sm: 'h-[18px] gap-1 px-1.5 text-2xs',
    md: 'h-5 gap-1 px-2 text-xs',
    lg: 'h-6 gap-1.5 px-2.5 text-sm',
  }
</script>

<span
  class={cn(
    'inline-flex shrink-0 items-center rounded-full border font-medium whitespace-nowrap',
    sizes[size],
    (variant === 'solid' ? solid : subtle)[tone],
    className,
  )}
  {...rest}
>
  {#if dot}
    <span class={cn('size-1.5 rounded-full bg-current', pulse && 'animate-vd-pulse')} aria-hidden="true"></span>
  {:else if icon}
    <Icon name={icon} size={size === 'lg' ? 12 : 10} stroke-width={2.5} />
  {/if}
  {@render children?.()}
</span>
