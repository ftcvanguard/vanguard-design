<script lang="ts">
  import { DropdownMenu } from 'bits-ui'
  import type { Snippet } from 'svelte'
  import Button from '../Button.svelte'
  import type { ButtonVariant } from '../../utils/styles.js'
  import type { Size } from '../../utils/types.js'

  type Props = {
    /** Render your own trigger (e.g. an IconButton). Spread `props` onto it. */
    child?: Snippet<[{ props: Record<string, unknown> }]>
    /** Label for the default button trigger. */
    children?: Snippet
    variant?: ButtonVariant
    size?: Size
    disabled?: boolean
    class?: string
  }

  let { child: customChild, children, variant = 'secondary', size = 'md', disabled = false, class: className }: Props = $props()
</script>

<DropdownMenu.Trigger {disabled}>
  {#snippet child({ props })}
    {#if customChild}
      {@render customChild({ props })}
    {:else}
      <Button {...props} {variant} {size} {disabled} trailingIcon="chevron-down" class={className}>
        {@render children?.()}
      </Button>
    {/if}
  {/snippet}
</DropdownMenu.Trigger>
