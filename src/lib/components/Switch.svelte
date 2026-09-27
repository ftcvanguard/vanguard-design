<script lang="ts">
  import { Switch as SwitchPrimitive } from 'bits-ui'
  import { cn } from '../utils/cn.js'
  import { focusRing } from '../utils/styles.js'
  import Label from './Label.svelte'

  type Props = Omit<SwitchPrimitive.RootProps, 'children' | 'child'> & {
    label?: string
    description?: string
    size?: 'sm' | 'md'
    /** Put the label before the switch, as in a settings list. */
    labelPosition?: 'start' | 'end'
  }

  let {
    checked = $bindable(false),
    disabled = false,
    label,
    description,
    size = 'md',
    labelPosition = 'end',
    id,
    class: className,
    ref = $bindable(null),
    ...rest
  }: Props = $props()

  const uid = $props.id()
  const controlId = $derived(id ?? `vd-switch-${uid}`)
</script>

{#snippet control()}
  <SwitchPrimitive.Root
    bind:ref
    bind:checked
    {disabled}
    id={controlId}
    aria-describedby={description ? `${controlId}-description` : undefined}
    class={cn(
      'inline-flex shrink-0 items-center rounded-full border p-px transition-colors duration-150',
      focusRing,
      size === 'sm' ? 'h-4 w-7' : 'h-5 w-9',
      disabled
        ? 'cursor-not-allowed border-border-disabled bg-disabled data-[state=checked]:bg-control-active'
        : 'cursor-pointer border-border-strong bg-control hover:bg-control-hover data-[state=checked]:border-accent-emphasis data-[state=checked]:bg-accent-emphasis data-[state=checked]:hover:bg-accent-emphasis-hover',
      !label && className,
    )}
    {...rest}
  >
    <SwitchPrimitive.Thumb
      class={cn(
        'pointer-events-none block rounded-full shadow-control transition-[translate,background-color] duration-150 ease-vd',
        size === 'sm' ? 'size-3 data-[state=checked]:translate-x-3' : 'size-4 data-[state=checked]:translate-x-4',
        disabled ? 'bg-fg-disabled' : 'bg-fg-muted data-[state=checked]:bg-white',
      )}
    />
  </SwitchPrimitive.Root>
{/snippet}

{#if label}
  <div class={cn('flex items-start gap-3', labelPosition === 'start' && 'flex-row-reverse justify-between', className)}>
    <span class="flex h-5 items-center">{@render control()}</span>
    <div class="flex flex-col">
      <Label for={controlId} disabled={!!disabled} class={cn('font-normal', !disabled && 'cursor-pointer')}>{label}</Label>
      {#if description}
        <p id="{controlId}-description" class="text-sm text-fg-muted">{description}</p>
      {/if}
    </div>
  </div>
{:else}
  {@render control()}
{/if}
