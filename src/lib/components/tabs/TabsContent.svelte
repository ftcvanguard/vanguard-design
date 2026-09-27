<script lang="ts">
  import { Tabs } from 'bits-ui'
  import { cn } from '../../utils/cn.js'
  import { focusRing } from '../../utils/styles.js'

  let { class: className, children, ref = $bindable(null), ...rest }: Tabs.ContentProps = $props()
</script>

<Tabs.Content bind:ref class={cn('pt-4', focusRing, 'focus-visible:outline-offset-4', className)} {...rest}>
  {@render children?.()}
</Tabs.Content>
