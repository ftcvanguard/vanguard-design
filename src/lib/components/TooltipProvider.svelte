<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui'
  import { setContext } from 'svelte'
  import { TOOLTIP_PROVIDER } from './tooltip-context.js'

  /**
   * Wrap your app once so tooltips share timing: after one opens, moving to the next
   * shows it immediately instead of waiting out the delay again.
   */
  let { delayDuration = 400, skipDelayDuration = 300, children, ...rest }: TooltipPrimitive.ProviderProps = $props()

  setContext(TOOLTIP_PROVIDER, true)
</script>

<TooltipPrimitive.Provider {delayDuration} {skipDelayDuration} {...rest}>
  {@render children?.()}
</TooltipPrimitive.Provider>
