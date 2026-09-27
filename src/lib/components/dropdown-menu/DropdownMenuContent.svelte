<script lang="ts">
  import { DropdownMenu } from 'bits-ui'
  import { cn } from '../../utils/cn.js'
  import { floatingClasses } from '../overlay-styles.js'

  let {
    sideOffset = 4,
    align = 'start',
    collisionPadding = 8,
    class: className,
    children,
    ...rest
  }: DropdownMenu.ContentProps = $props()
</script>

<DropdownMenu.Portal>
  <DropdownMenu.Content
    {sideOffset}
    {align}
    {collisionPadding}
    class={cn(
      floatingClasses,
      'max-h-(--bits-dropdown-menu-content-available-height) min-w-48 origin-(--bits-dropdown-menu-content-transform-origin) overflow-y-auto p-1',
      className,
    )}
    {...rest}
  >
    {@render children?.()}
  </DropdownMenu.Content>
</DropdownMenu.Portal>
