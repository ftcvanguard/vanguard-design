<script lang="ts">
  import { Tabs } from 'bits-ui'
  import { cn } from '../../utils/cn.js'

  let { class: className, children, ref = $bindable(null), ...rest }: Tabs.ListProps = $props()
</script>

<!-- The bottom border is an inset shadow so the active underline, drawn inside the scroll box, can cover it. -->
<Tabs.List bind:ref class={cn('flex items-center gap-1 overflow-x-auto shadow-[inset_0_-1px_0_var(--vd-border)]', className)} {...rest}>
  {@render children?.()}
</Tabs.List>
