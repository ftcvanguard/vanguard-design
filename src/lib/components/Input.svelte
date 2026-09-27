<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLInputAttributes } from 'svelte/elements'
  import Icon from '../icons/Icon.svelte'
  import type { IconName } from '../icons/paths.js'
  import { cn } from '../utils/cn.js'
  import type { Size } from '../utils/types.js'

  type Props = Omit<HTMLInputAttributes, 'size'> & {
    value?: string | number | null
    size?: Size
    invalid?: boolean
    leadingIcon?: IconName
    /** Content after the input, such as a unit or a clear button. */
    trailing?: Snippet
    /** Classes for the outer wrapper, which draws the border. `class` goes on the <input>. */
    wrapperClass?: string
    ref?: HTMLInputElement | null
    'data-force-state'?: string
  }

  let {
    value = $bindable(),
    size = 'md',
    invalid = false,
    disabled = false,
    readonly = false,
    leadingIcon,
    trailing,
    wrapperClass,
    class: className,
    ref = $bindable(null),
    'data-force-state': forceState,
    'aria-invalid': ariaInvalid,
    ...rest
  }: Props = $props()

  const isInvalid = $derived(invalid || ariaInvalid === true || ariaInvalid === 'true')

  const sizes: Record<Size, string> = {
    sm: 'h-7 gap-1.5 px-2 text-sm',
    md: 'h-8 gap-2 px-2.5 text-base',
    lg: 'h-10 gap-2 px-3 text-md',
  }
</script>

<div
  data-force-state={forceState}
  data-invalid={isInvalid || undefined}
  data-disabled={disabled || undefined}
  class={cn(
    'flex w-full items-center rounded-md border shadow-control transition-[border-color,box-shadow] duration-150',
    sizes[size],
    disabled
      ? 'cursor-not-allowed border-border-disabled bg-disabled text-fg-disabled'
      : isInvalid
        ? 'border-danger bg-inset text-fg focus-within:ring-3 focus-within:ring-danger-muted'
        : 'border-border-emphasis bg-inset text-fg hover:border-border-strong focus-within:border-accent-emphasis focus-within:ring-3 focus-within:ring-accent-muted',
    readonly && !disabled && 'bg-canvas',
    wrapperClass,
  )}
>
  {#if leadingIcon}
    <Icon name={leadingIcon} size={size === 'sm' ? 14 : 16} class="text-fg-subtle" />
  {/if}
  <input
    bind:this={ref}
    bind:value
    {disabled}
    {readonly}
    aria-invalid={isInvalid || undefined}
    class={cn(
      'h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-fg-subtle disabled:cursor-not-allowed disabled:placeholder:text-fg-disabled',
      className,
    )}
    {...rest}
  />
  {#if trailing}
    <span class="flex shrink-0 items-center text-fg-muted">{@render trailing()}</span>
  {/if}
</div>
