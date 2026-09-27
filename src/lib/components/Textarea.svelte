<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements'
  import { cn } from '../utils/cn.js'

  type Props = HTMLTextareaAttributes & {
    value?: string | null
    invalid?: boolean
    /** Grow with the content instead of scrolling. */
    autosize?: boolean
    ref?: HTMLTextAreaElement | null
  }

  let {
    value = $bindable(),
    invalid = false,
    autosize = false,
    disabled = false,
    rows = 3,
    class: className,
    ref = $bindable(null),
    'aria-invalid': ariaInvalid,
    ...rest
  }: Props = $props()

  const isInvalid = $derived(invalid || ariaInvalid === true || ariaInvalid === 'true')
</script>

<textarea
  bind:this={ref}
  bind:value
  {disabled}
  {rows}
  aria-invalid={isInvalid || undefined}
  class={cn(
    'block w-full resize-y rounded-md border px-2.5 py-1.5 text-base shadow-control transition-[border-color,box-shadow] duration-150 outline-none placeholder:text-fg-subtle',
    autosize && 'field-sizing-content min-h-16 resize-none',
    disabled
      ? 'cursor-not-allowed resize-none border-border-disabled bg-disabled text-fg-disabled placeholder:text-fg-disabled'
      : isInvalid
        ? 'border-danger bg-inset text-fg focus:ring-3 focus:ring-danger-muted'
        : 'border-border-emphasis bg-inset text-fg hover:border-border-strong focus:border-accent-emphasis focus:ring-3 focus:ring-accent-muted',
    className,
  )}
  {...rest}
></textarea>
