<script lang="ts">
  import { Button as ButtonPrimitive } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'
  import Icon from '../icons/Icon.svelte'
  import type { IconName } from '../icons/paths.js'
  import { cn } from '../utils/cn.js'
  import { buttonClasses, buttonIconSize, type ButtonVariant } from '../utils/styles.js'
  import type { Size } from '../utils/types.js'
  import Spinner from './Spinner.svelte'

  type Props = Omit<HTMLButtonAttributes, 'type'> &
    Pick<HTMLAnchorAttributes, 'href' | 'target' | 'rel' | 'download'> & {
    type?: 'button' | 'submit' | 'reset'
    /** Renders an <a> instead of a <button>. */
    href?: string
    ref?: HTMLElement | null
    variant?: ButtonVariant
    size?: Size
    /** Stretch to the width of the container. */
    block?: boolean
    /** Shows a spinner and ignores clicks while keeping focus on the button. */
    loading?: boolean
    leadingIcon?: IconName
    trailingIcon?: IconName
    /** Custom leading visual; takes precedence over `leadingIcon`. */
    leading?: Snippet
    /** Custom trailing visual such as a counter; takes precedence over `trailingIcon`. */
    trailing?: Snippet
    children?: Snippet
  }

  let {
    variant = 'secondary',
    size = 'md',
    block = false,
    loading = false,
    disabled = false,
    type = 'button',
    leadingIcon,
    trailingIcon,
    leading,
    trailing,
    children,
    onclick,
    ref = $bindable(null),
    class: className,
    ...rest
  }: Props = $props()

  const iconSize = $derived(buttonIconSize[size])

  function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    if (loading) {
      event.preventDefault()
      return
    }
    onclick?.(event)
  }
</script>

<ButtonPrimitive.Root
  bind:ref
  {type}
  {disabled}
  aria-busy={loading || undefined}
  aria-disabled={loading || undefined}
  data-variant={variant}
  class={cn(buttonClasses({ variant, size, disabled: !!disabled, loading, block }), className)}
  onclick={handleClick}
  {...rest as Record<string, unknown>}
>
  {#if loading}
    <Spinner size={iconSize} label="" />
  {:else if leading}
    {@render leading()}
  {:else if leadingIcon}
    <Icon name={leadingIcon} size={iconSize} />
  {/if}
  {@render children?.()}
  {#if trailing}
    {@render trailing()}
  {:else if trailingIcon}
    <Icon name={trailingIcon} size={iconSize} class="-mr-0.5 opacity-70" />
  {/if}
</ButtonPrimitive.Root>
