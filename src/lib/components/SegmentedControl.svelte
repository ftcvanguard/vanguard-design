<script lang="ts" module>
  import type { IconName } from '../icons/paths.js'

  export type SegmentedControlItem = {
    value: string
    /** Visible text. For icon-only segments, still set it: it becomes the accessible name. */
    label: string
    icon?: IconName
    disabled?: boolean
  }
</script>

<script lang="ts">
  import { ToggleGroup } from 'bits-ui'
  import Icon from '../icons/Icon.svelte'
  import { cn } from '../utils/cn.js'
  import { focusRing } from '../utils/styles.js'

  type Props = {
    items: SegmentedControlItem[]
    value?: string
    onValueChange?: (value: string) => void
    size?: 'sm' | 'md'
    /** Hide labels and show icons only. Every item needs an `icon`. */
    iconOnly?: boolean
    /** Stretch segments to fill the container. */
    block?: boolean
    disabled?: boolean
    'aria-label'?: string
    class?: string
  }

  let {
    items,
    value = $bindable(items[0]?.value ?? ''),
    onValueChange,
    size = 'md',
    iconOnly = false,
    block = false,
    disabled = false,
    class: className,
    ...rest
  }: Props = $props()
</script>

<!-- A segmented control always has a selection, so clicking the active segment is ignored. -->
<ToggleGroup.Root
  type="single"
  bind:value={
    () => value,
    (next) => {
      if (!next || next === value) return
      value = next
      onValueChange?.(next)
    }
  }
  {disabled}
  class={cn('inline-flex gap-0.5 rounded-md border border-border-emphasis bg-inset p-0.5', block && 'flex w-full', className)}
  {...rest}
>
  {#each items as item (item.value)}
    <ToggleGroup.Item
      value={item.value}
      disabled={item.disabled}
      aria-label={iconOnly ? item.label : undefined}
      title={iconOnly ? item.label : undefined}
      class={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-[5px] font-medium whitespace-nowrap transition-colors duration-150',
        focusRing,
        'focus-visible:outline-offset-0',
        size === 'sm' ? 'h-6 px-2 text-sm' : 'h-7 px-3 text-base',
        iconOnly && (size === 'sm' ? 'w-6 px-0' : 'w-7 px-0'),
        block && 'flex-1',
        'data-[state=on]:bg-control-active data-[state=on]:shadow-control',
        'data-disabled:cursor-not-allowed data-disabled:text-fg-disabled data-disabled:data-[state=on]:bg-control',
        'not-data-disabled:cursor-pointer not-data-disabled:data-[state=on]:text-fg-strong not-data-disabled:data-[state=off]:text-fg-muted not-data-disabled:data-[state=off]:hover:bg-hover not-data-disabled:data-[state=off]:hover:text-fg',
      )}
    >
      {#if item.icon}<Icon name={item.icon} size={14} />{/if}
      {#if !iconOnly}{item.label}{/if}
    </ToggleGroup.Item>
  {/each}
</ToggleGroup.Root>
