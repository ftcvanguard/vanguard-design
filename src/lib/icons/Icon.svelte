<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements'
  import { cn } from '../utils/cn.js'
  import { icons, type IconName } from './paths.js'

  type Props = Omit<SVGAttributes<SVGSVGElement>, 'name'> & {
    name: IconName
    /** Rendered width and height in pixels. */
    size?: number
    /** Accessible name. Without one the icon is decorative and hidden from assistive tech. */
    label?: string
  }

  let { name, size = 16, label, class: className, ...rest }: Props = $props()
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={cn('shrink-0', className)}
  role={label ? 'img' : undefined}
  aria-label={label}
  aria-hidden={label ? undefined : 'true'}
  {...rest}
>
  {@html icons[name].join('')}
</svg>
