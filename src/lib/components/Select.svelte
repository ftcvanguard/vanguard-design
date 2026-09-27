<script lang="ts" module>
  export type SelectItem = {
    value: string
    label: string
    /** Secondary text shown under the label in the list. */
    description?: string
    disabled?: boolean
  }
</script>

<script lang="ts">
  import { Select as SelectPrimitive } from 'bits-ui'
  import Icon from '../icons/Icon.svelte'
  import { cn } from '../utils/cn.js'
  import { focusRing } from '../utils/styles.js'
  import type { Size } from '../utils/types.js'

  type Props = {
    items: SelectItem[]
    value?: string
    open?: boolean
    onValueChange?: (value: string) => void
    placeholder?: string
    size?: Size
    invalid?: boolean
    disabled?: boolean
    required?: boolean
    /** Submits the value with a parent form. */
    name?: string
    id?: string
    'aria-label'?: string
    'aria-describedby'?: string
    'aria-invalid'?: boolean | 'true' | 'false'
    'data-force-state'?: string
    class?: string
    contentClass?: string
  }

  let {
    items,
    value = $bindable(''),
    open = $bindable(false),
    onValueChange,
    placeholder = 'Select…',
    size = 'md',
    invalid = false,
    disabled = false,
    required,
    name,
    id,
    class: className,
    contentClass,
    'aria-invalid': ariaInvalid,
    ...triggerRest
  }: Props = $props()

  const selected = $derived(items.find((item) => item.value === value))
  const isInvalid = $derived(invalid || ariaInvalid === true || ariaInvalid === 'true')

  const sizes: Record<Size, string> = {
    sm: 'h-7 gap-1.5 pl-2 pr-1.5 text-sm',
    md: 'h-8 gap-2 pl-2.5 pr-2 text-base',
    lg: 'h-10 gap-2 pl-3 pr-2.5 text-md',
  }
</script>

<SelectPrimitive.Root type="single" bind:value bind:open {onValueChange} {items} {disabled} {required} {name}>
  <SelectPrimitive.Trigger
    {id}
    aria-invalid={isInvalid || undefined}
    class={cn(
      'flex w-full items-center justify-between rounded-md border text-left shadow-control transition-[border-color,box-shadow,background-color] duration-150',
      focusRing,
      sizes[size],
      disabled
        ? 'cursor-not-allowed border-border-disabled bg-disabled text-fg-disabled'
        : isInvalid
          ? 'cursor-pointer border-danger bg-inset text-fg data-[state=open]:ring-3 data-[state=open]:ring-danger-muted'
          : 'cursor-pointer border-border-emphasis bg-inset text-fg hover:border-border-strong data-[state=open]:border-accent-emphasis data-[state=open]:ring-3 data-[state=open]:ring-accent-muted',
      className,
    )}
    {...triggerRest}
  >
    <span class={cn('truncate', !selected && (disabled ? 'text-fg-disabled' : 'text-fg-subtle'))}>
      {selected?.label ?? placeholder}
    </span>
    <Icon name="chevrons-up-down" size={14} class={disabled ? 'text-fg-disabled' : 'text-fg-muted'} />
  </SelectPrimitive.Trigger>
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      sideOffset={4}
      collisionPadding={8}
      class={cn(
        'z-50 max-h-[min(var(--bits-select-content-available-height),20rem)] min-w-(--bits-select-anchor-width) origin-(--bits-select-content-transform-origin) overflow-hidden rounded-lg border border-border bg-surface shadow-overlay outline-none',
        'data-[state=open]:animate-vd-pop-in data-[state=closed]:animate-vd-pop-out',
        contentClass,
      )}
    >
      <SelectPrimitive.ScrollUpButton class="flex h-6 items-center justify-center text-fg-muted">
        <Icon name="chevron-up" size={14} />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport class="p-1">
        {#each items as item (item.value)}
          <SelectPrimitive.Item
            value={item.value}
            label={item.label}
            disabled={item.disabled}
            class="flex min-h-8 cursor-pointer select-none items-start gap-2 rounded-md px-2 py-1.5 text-base text-fg outline-none data-highlighted:bg-hover data-disabled:cursor-not-allowed data-disabled:text-fg-disabled"
          >
            {#snippet children({ selected })}
              <span class="flex h-5 w-4 shrink-0 items-center">
                {#if selected}<Icon name="check" size={14} class="text-accent" />{/if}
              </span>
              <span class="flex min-w-0 flex-col">
                <span class="truncate">{item.label}</span>
                {#if item.description}
                  <span class="text-sm text-fg-muted">{item.description}</span>
                {/if}
              </span>
            {/snippet}
          </SelectPrimitive.Item>
        {/each}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton class="flex h-6 items-center justify-center text-fg-muted">
        <Icon name="chevron-down" size={14} />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
</SelectPrimitive.Root>
