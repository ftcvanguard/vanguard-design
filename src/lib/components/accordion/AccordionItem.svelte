<script lang="ts">
  import { Accordion } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import Icon from '../../icons/Icon.svelte'
  import { cn } from '../../utils/cn.js'
  import { focusRing } from '../../utils/styles.js'

  type Props = Omit<Accordion.ItemProps, 'children'> & {
    title: string
    /** Extra content on the right of the header, like a Badge. */
    meta?: Snippet
    children?: Snippet
  }

  let { title, meta, disabled = false, class: className, children, ...rest }: Props = $props()
</script>

<Accordion.Item {disabled} class={cn('border-b border-border last:border-b-0', className)} {...rest}>
  <Accordion.Header level={3}>
    <Accordion.Trigger
      class={cn(
        'flex w-full items-center gap-3 px-4 py-3 text-left text-base font-medium transition-colors duration-150',
        focusRing,
        'focus-visible:-outline-offset-2',
        '[&[data-state=open]>svg]:rotate-180',
        disabled ? 'cursor-not-allowed text-fg-disabled' : 'cursor-pointer text-fg hover:bg-hover',
      )}
    >
      <span class="flex-1">{title}</span>
      {@render meta?.()}
      <Icon name="chevron-down" size={16} class="text-fg-muted transition-transform duration-200 ease-vd" />
    </Accordion.Trigger>
  </Accordion.Header>
  <Accordion.Content
    class="overflow-hidden data-[state=closed]:animate-vd-accordion-up data-[state=open]:animate-vd-accordion-down"
  >
    <div class="px-4 pb-4 text-base text-fg-muted">{@render children?.()}</div>
  </Accordion.Content>
</Accordion.Item>
