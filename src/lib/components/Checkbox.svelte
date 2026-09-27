<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui'
  import Icon from '../icons/Icon.svelte'
  import { cn } from '../utils/cn.js'
  import { focusRing } from '../utils/styles.js'
  import Label from './Label.svelte'

  type Props = Omit<CheckboxPrimitive.RootProps, 'children' | 'child'> & {
    label?: string
    description?: string
  }

  let {
    checked = $bindable(false),
    indeterminate = $bindable(false),
    disabled = false,
    label,
    description,
    id,
    class: className,
    ref = $bindable(null),
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const controlId = $derived(id ?? `vd-checkbox-${uid}`)
</script>

{#snippet box()}
  <CheckboxPrimitive.Root
    bind:ref
    bind:checked
    bind:indeterminate
    {disabled}
    id={controlId}
    aria-describedby={description ? `${controlId}-description` : undefined}
    class={cn(
      'peer flex size-4 shrink-0 items-center justify-center rounded-sm border transition-colors duration-100',
      focusRing,
      disabled
        ? 'cursor-not-allowed border-border-emphasis bg-disabled text-fg-disabled data-[state=checked]:bg-control-active data-[state=indeterminate]:bg-control-active'
        : 'cursor-pointer border-border-strong bg-inset text-fg-on-emphasis hover:border-fg-muted active:scale-90 data-[state=checked]:border-accent-emphasis data-[state=checked]:bg-accent-emphasis data-[state=indeterminate]:border-accent-emphasis data-[state=indeterminate]:bg-accent-emphasis',
      !label && className,
    )}
    {...rest}
  >
    {#snippet children({ checked, indeterminate })}
      {#if indeterminate}
        <Icon name="minus" size={12} stroke-width={3} />
      {:else if checked}
        <Icon name="check" size={12} stroke-width={3} />
      {/if}
    {/snippet}
  </CheckboxPrimitive.Root>
{/snippet}

{#if label}
  <div class={cn('flex items-start gap-2', className)}>
    <span class="flex h-5 items-center">{@render box()}</span>
    <div class="flex flex-col">
      <Label for={controlId} disabled={!!disabled} class={cn('font-normal', !disabled && 'cursor-pointer')}>{label}</Label>
      {#if description}
        <p id="{controlId}-description" class="text-sm text-fg-muted">{description}</p>
      {/if}
    </div>
  </div>
{:else}
  {@render box()}
{/if}
