<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { cn } from '../utils/cn.js'

  let { class: className, children, ...rest }: HTMLAttributes<HTMLElement> = $props()
</script>

<kbd
  class={cn(
    'inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-b-2 border-border-emphasis bg-control px-1 font-mono text-xs text-fg-muted',
    className,
  )}
  {...rest}
>
  {@render children?.()}
</kbd>
