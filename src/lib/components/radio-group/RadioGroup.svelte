<script lang="ts">
  import { RadioGroup as RadioGroupPrimitive } from 'bits-ui'
  import { cn } from '../../utils/cn.js'

  let {
    value = $bindable(''),
    orientation = 'vertical',
    class: className,
    ref = $bindable(null),
    children,
    ...rest
  }: RadioGroupPrimitive.RootProps = $props()
</script>

<RadioGroupPrimitive.Root
  bind:ref
  bind:value
  {orientation}
  class={cn(orientation === 'vertical' ? 'flex flex-col gap-3' : 'flex flex-wrap items-center gap-x-6 gap-y-3', className)}
  {...rest}
>
  {@render children?.()}
</RadioGroupPrimitive.Root>
