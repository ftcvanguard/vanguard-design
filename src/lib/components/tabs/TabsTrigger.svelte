<script lang="ts">
  import { Tabs } from 'bits-ui'
  import Icon from '../../icons/Icon.svelte'
  import type { IconName } from '../../icons/paths.js'
  import { cn } from '../../utils/cn.js'
  import { focusRing } from '../../utils/styles.js'

  type Props = Tabs.TriggerProps & {
    icon?: IconName
    /** Item count shown after the label, e.g. open issues. */
    count?: number
  }

  let { icon, count, disabled = false, class: className, children, ref = $bindable(null), ...rest }: Props = $props()
</script>

<!--
  The underline is drawn by ::after at the list's bottom edge (the trigger's 6px margin below it),
  so the hover background can stay a compact rounded pill like GitHub's UnderlineNav.
-->
<Tabs.Trigger
  bind:ref
  {disabled}
  class={cn(
    'relative my-1.5 inline-flex h-8 shrink-0 items-center gap-2 rounded-md px-3 text-base whitespace-nowrap transition-colors duration-150',
    focusRing,
    'after:pointer-events-none after:absolute after:inset-x-1.5 after:-bottom-1.5 after:h-0.5 after:rounded-full after:transition-colors',
    'data-[state=active]:font-semibold data-[state=active]:text-fg-strong data-[state=active]:after:bg-accent-emphasis',
    disabled ? 'cursor-not-allowed text-fg-disabled' : 'cursor-pointer text-fg-muted hover:bg-hover hover:text-fg',
    className,
  )}
  {...rest}
>
  {#if icon}<Icon name={icon} size={16} class="opacity-80" />{/if}
  {@render children?.()}
  {#if count !== undefined}
    <span class="min-w-5 rounded-full bg-control-active px-1.5 text-center text-xs font-medium text-fg-muted tabular-nums">
      {count}
    </span>
  {/if}
</Tabs.Trigger>
