<script lang="ts">
  import { DropdownMenu } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import Icon from '../../icons/Icon.svelte'
  import { cn } from '../../utils/cn.js'
  import { itemClasses } from './item-styles.js'

  type Props = Omit<DropdownMenu.CheckboxItemProps, 'children'> & { children?: Snippet }

  let { checked = $bindable(false), class: className, children: label, ...rest }: Props = $props()
</script>

<DropdownMenu.CheckboxItem bind:checked closeOnSelect={false} class={cn(itemClasses, className)} {...rest}>
  {#snippet children({ checked })}
    <span class="flex w-4 justify-center">
      {#if checked}<Icon name="check" size={14} class="text-accent" />{/if}
    </span>
    <span class="flex-1 truncate">{@render label?.()}</span>
  {/snippet}
</DropdownMenu.CheckboxItem>
