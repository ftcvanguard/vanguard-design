<script lang="ts">
  import { DropdownMenu } from 'bits-ui'
  import Icon from '../../icons/Icon.svelte'
  import type { IconName } from '../../icons/paths.js'
  import { cn } from '../../utils/cn.js'
  import { itemClasses } from './item-styles.js'

  type Props = DropdownMenu.ItemProps & {
    icon?: IconName
    /** Keyboard shortcut hint, e.g. "⌘K". Display only; wire the shortcut yourself. */
    shortcut?: string
    variant?: 'default' | 'danger'
  }

  let { icon, shortcut, variant = 'default', class: className, children, ...rest }: Props = $props()
</script>

<DropdownMenu.Item
  class={cn(
    itemClasses,
    variant === 'danger' && 'text-danger data-highlighted:bg-danger-muted',
    className,
  )}
  {...rest}
>
  {#if icon}
    <Icon name={icon} size={16} class={variant === 'danger' ? '' : 'text-fg-muted'} />
  {/if}
  <span class="flex-1 truncate">{@render children?.()}</span>
  {#if shortcut}
    <kbd class="ml-4 font-mono text-sm text-fg-subtle">{shortcut}</kbd>
  {/if}
</DropdownMenu.Item>
