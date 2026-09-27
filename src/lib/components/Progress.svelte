<script lang="ts">
  import { Progress as ProgressPrimitive } from 'bits-ui'
  import { cn } from '../utils/cn.js'

  type Tone = 'accent' | 'success' | 'attention' | 'danger'

  type Props = {
    /** Current value. `null` shows an indeterminate bar for work of unknown length. */
    value?: number | null
    max?: number
    tone?: Tone
    size?: 'sm' | 'md'
    /** Visible label above the bar; also its accessible name. */
    label?: string
    /** Show the percentage next to the label. */
    showValue?: boolean
    'aria-label'?: string
    class?: string
  }

  let {
    value = 0,
    max = 100,
    tone = 'accent',
    size = 'md',
    label,
    showValue = false,
    'aria-label': ariaLabel,
    class: className,
  }: Props = $props()

  const uid = $props.id()
  const indeterminate = $derived(value === null)
  const percent = $derived(value === null ? 0 : Math.min(100, Math.max(0, (value / max) * 100)))

  const tones: Record<Tone, string> = {
    accent: 'bg-accent-emphasis',
    success: 'bg-success',
    attention: 'bg-attention',
    danger: 'bg-danger',
  }
</script>

<div class={cn('flex w-full flex-col gap-1.5', className)}>
  {#if label || showValue}
    <div class="flex items-baseline justify-between gap-4 text-sm">
      {#if label}<span id="vd-progress-{uid}" class="text-fg">{label}</span>{/if}
      {#if showValue && !indeterminate}<span class="ml-auto text-fg-muted tabular-nums">{Math.round(percent)}%</span>{/if}
    </div>
  {/if}
  <ProgressPrimitive.Root
    {value}
    {max}
    aria-label={label ? undefined : ariaLabel}
    aria-labelledby={label ? `vd-progress-${uid}` : undefined}
    class={cn('relative w-full overflow-hidden rounded-full bg-control-active', size === 'sm' ? 'h-1' : 'h-2')}
  >
    <div
      class={cn(
        'h-full rounded-full',
        tones[tone],
        indeterminate ? 'w-2/5 animate-vd-indeterminate' : 'transition-[width] duration-300 ease-vd',
      )}
      style:width={indeterminate ? undefined : `${percent}%`}
    ></div>
  </ProgressPrimitive.Root>
</div>
