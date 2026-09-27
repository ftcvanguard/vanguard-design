<script lang="ts">
  import { Separator as SeparatorPrimitive } from 'bits-ui'
  import { cn } from '../utils/cn.js'

  let { orientation = 'horizontal', decorative = true, class: className, ...rest }: SeparatorPrimitive.RootProps = $props()
</script>

<SeparatorPrimitive.Root
  {orientation}
  {decorative}
  class={cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch', className)}
  {...rest}
/>
