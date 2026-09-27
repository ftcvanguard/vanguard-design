<script lang="ts">
  import { Slider as SliderPrimitive } from 'bits-ui'
  import { cn } from '../utils/cn.js'
  import { focusRing } from '../utils/styles.js'

  type Props = {
    value?: number
    onValueChange?: (value: number) => void
    /** Fires once when the user releases the thumb; use for expensive updates. */
    onValueCommit?: (value: number) => void
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    orientation?: 'horizontal' | 'vertical'
    name?: string
    'aria-label'?: string
    'aria-labelledby'?: string
    'data-force-state'?: string
    class?: string
  }

  let {
    value = $bindable(0),
    onValueChange,
    onValueCommit,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    orientation = 'horizontal',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'data-force-state': forceState,
    class: className,
    ...rest
  }: Props = $props()
</script>

<SliderPrimitive.Root
  type="single"
  bind:value
  {onValueChange}
  {onValueCommit}
  {min}
  {max}
  {step}
  {disabled}
  {orientation}
  class={cn(
    'relative flex touch-none select-none items-center',
    orientation === 'horizontal' ? 'h-5 w-full' : 'h-full min-h-32 w-5 flex-col',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    className,
  )}
  {...rest}
>
  <span
    class={cn(
      'relative grow overflow-hidden rounded-full',
      orientation === 'horizontal' ? 'h-1 w-full' : 'h-full w-1',
      disabled ? 'bg-disabled' : 'bg-control-active',
    )}
  >
    <SliderPrimitive.Range
      class={cn('absolute', orientation === 'horizontal' ? 'h-full' : 'w-full', disabled ? 'bg-border-strong' : 'bg-accent-emphasis')}
    />
  </span>
  <SliderPrimitive.Thumb
    index={0}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    data-force-state={forceState}
    class={cn(
      'block size-4 rounded-full border-2 transition-[scale,box-shadow] duration-150',
      focusRing,
      disabled
        ? 'border-border-strong bg-fg-disabled'
        : 'border-accent-emphasis bg-white shadow-control hover:scale-110 hover:ring-4 hover:ring-accent-muted active:scale-95',
    )}
  />
</SliderPrimitive.Root>
