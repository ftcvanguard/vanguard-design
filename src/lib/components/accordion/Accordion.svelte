<script lang="ts">
  import { Accordion } from 'bits-ui'
  import { cn } from '../../utils/cn.js'

  let {
    value = $bindable(),
    class: className,
    children,
    ...rest
  }: Accordion.RootProps = $props()
</script>

<Accordion.Root
  bind:value={value as never}
  class={cn('overflow-hidden rounded-lg border border-border bg-surface', className)}
  {...rest as Accordion.RootProps}
>
  {@render children?.()}
</Accordion.Root>
