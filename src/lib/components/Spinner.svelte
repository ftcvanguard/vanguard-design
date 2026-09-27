<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements'
  import { cn } from '../utils/cn.js'

  type Props = SVGAttributes<SVGSVGElement> & {
    /** Diameter in pixels. */
    size?: number
    /** Announced to assistive tech. Pass an empty string when the spinner sits inside something already labelled. */
    label?: string
  }

  let { size = 16, label = 'Loading', class: className, ...rest }: Props = $props()
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 16 16"
  fill="none"
  class={cn('shrink-0 animate-spin', className)}
  role={label ? 'status' : undefined}
  aria-label={label || undefined}
  aria-hidden={label ? undefined : 'true'}
  {...rest}
>
  <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" />
  <path d="M14.5 8A6.5 6.5 0 0 0 8 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
