<script lang="ts">
  import { Button as ButtonPrimitive, mergeProps } from 'bits-ui'
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import Icon from '../icons/Icon.svelte'
  import type { IconName } from '../icons/paths.js'
  import { cn } from '../utils/cn.js'
  import { buttonClasses, buttonIconSize, type ButtonVariant } from '../utils/styles.js'
  import type { Size } from '../utils/types.js'
  import Spinner from './Spinner.svelte'
  import Tooltip from './Tooltip.svelte'

  type Props = Omit<HTMLButtonAttributes, 'type' | 'children'> & {
    type?: 'button' | 'submit' | 'reset'
    ref?: HTMLElement | null
    icon: IconName
    /** Accessible name, also shown as the tooltip. Required: an icon alone isn't a label. */
    label: string
    variant?: ButtonVariant
    size?: Size
    loading?: boolean
    /** Show `label` in a tooltip on hover and keyboard focus. */
    tooltip?: boolean
    tooltipSide?: 'top' | 'right' | 'bottom' | 'left'
  }

  let {
    icon,
    label,
    variant = 'secondary',
    size = 'md',
    loading = false,
    disabled = false,
    tooltip = true,
    tooltipSide = 'top',
    type = 'button',
    onclick,
    ref = $bindable(null),
    class: className,
    ...rest
  }: Props = $props()

  function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    if (loading) {
      event.preventDefault()
      return
    }
    onclick?.(event)
  }
</script>

{#snippet button(triggerProps: Record<string, unknown>)}
  {@const { 'aria-describedby': _describedBy, ...props } = mergeProps(rest, { onclick: handleClick }, triggerProps) as Record<string, unknown>}
  <ButtonPrimitive.Root
    bind:ref
    {type}
    {disabled}
    aria-label={label}
    aria-busy={loading || undefined}
    aria-disabled={loading || undefined}
    data-variant={variant}
    class={cn(buttonClasses({ variant, size, disabled: !!disabled, loading, iconOnly: true }), className)}
    {...props}
  >
    {#if loading}
      <Spinner size={buttonIconSize[size]} label="" />
    {:else}
      <Icon name={icon} size={buttonIconSize[size]} />
    {/if}
  </ButtonPrimitive.Root>
{/snippet}

{#if tooltip && !disabled}
  <Tooltip text={label} side={tooltipSide}>
    {#snippet trigger({ props })}
      {@render button(props)}
    {/snippet}
  </Tooltip>
{:else}
  {@render button({})}
{/if}
