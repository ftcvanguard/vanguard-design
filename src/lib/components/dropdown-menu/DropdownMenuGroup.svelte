<script lang="ts">
  import { DropdownMenu } from 'bits-ui'
  import { cn } from '../../utils/cn.js'

  type Props = DropdownMenu.GroupProps & {
    /** Small heading above the group. */
    label?: string
  }

  let { label, class: className, children, ...rest }: Props = $props()
</script>

<DropdownMenu.Group class={cn(className)} {...rest}>
  {#if label}
    <DropdownMenu.GroupHeading class="px-2 pt-1.5 pb-1 text-xs font-semibold text-fg-subtle">{label}</DropdownMenu.GroupHeading>
  {/if}
  {@render children?.()}
</DropdownMenu.Group>
