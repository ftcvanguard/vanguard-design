<script lang="ts">
  import { RadioGroup as RadioGroupPrimitive } from 'bits-ui'
  import { cn } from '../../utils/cn.js'
  import { focusRing } from '../../utils/styles.js'
  import Label from '../Label.svelte'

  type Props = Omit<RadioGroupPrimitive.ItemProps, 'children' | 'child'> & {
    /** Visible label. Without one, pass `aria-label`. */
    label?: string
    description?: string
  }

  let { label, description, disabled = false, id, class: className, ref = $bindable(null), ...rest }: Props = $props()

  const uid = $props.id()
  const controlId = $derived(id ?? `vd-radio-${uid}`)
</script>

<div class={cn('flex items-start gap-2', className)}>
  <span class="flex h-5 items-center">
    <RadioGroupPrimitive.Item
      bind:ref
      {disabled}
      id={controlId}
      aria-describedby={description ? `${controlId}-description` : undefined}
      class={cn(
        'flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-100',
        focusRing,
        disabled
          ? 'cursor-not-allowed border-border-emphasis bg-disabled data-[state=checked]:bg-control-active'
          : 'cursor-pointer border-border-strong bg-inset hover:border-fg-muted active:scale-90 data-[state=checked]:border-accent-emphasis data-[state=checked]:bg-accent-emphasis',
      )}
      {...rest}
    >
      {#snippet children({ checked })}
        {#if checked}
          <span class={cn('size-1.5 rounded-full', disabled ? 'bg-fg-disabled' : 'bg-white')}></span>
        {/if}
      {/snippet}
    </RadioGroupPrimitive.Item>
  </span>
  {#if label}
    <div class="flex flex-col">
      <Label for={controlId} disabled={!!disabled} class={cn('font-normal', !disabled && 'cursor-pointer')}>{label}</Label>
      {#if description}
        <p id="{controlId}-description" class="text-sm text-fg-muted">{description}</p>
      {/if}
    </div>
  {/if}
</div>
