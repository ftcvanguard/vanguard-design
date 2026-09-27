<script lang="ts">
  import { Label as LabelPrimitive } from 'bits-ui'
  import { cn } from '../utils/cn.js'

  type Props = LabelPrimitive.RootProps & {
    /** Appends a required marker. The control itself still needs `required`. */
    required?: boolean
    disabled?: boolean
  }

  let { required = false, disabled = false, class: className, children, ref = $bindable(null), ...rest }: Props = $props()
</script>

<LabelPrimitive.Root
  bind:ref
  class={cn('text-base font-medium', disabled ? 'cursor-not-allowed text-fg-disabled' : 'text-fg', className)}
  {...rest}
>
  {@render children?.()}
  {#if required}<span class="ml-0.5 text-danger" aria-hidden="true">*</span>{/if}
</LabelPrimitive.Root>
