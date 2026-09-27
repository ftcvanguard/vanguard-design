<script lang="ts">
  import { Avatar as AvatarPrimitive } from 'bits-ui'
  import { cn } from '../utils/cn.js'

  type Props = {
    src?: string
    /** Describes the person or team. Leave empty only if a visible name sits next to the avatar. */
    alt?: string
    /** Shown while loading or when the image fails. A name like "Cobalt Colts" becomes "CC". */
    fallback?: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    /** Circles for people, rounded squares for teams and organizations. */
    shape?: 'circle' | 'square'
    class?: string
  }

  let { src, alt = '', fallback = '', size = 'md', shape = 'circle', class: className }: Props = $props()

  const initials = $derived(
    fallback.trim().includes(' ')
      ? fallback
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((word) => word[0])
          .join('')
      : fallback.slice(0, 2),
  )

  const sizes = {
    xs: 'size-5 text-2xs',
    sm: 'size-6 text-xs',
    md: 'size-8 text-sm',
    lg: 'size-10 text-base',
    xl: 'size-16 text-xl',
  }
</script>

<AvatarPrimitive.Root
  class={cn(
    'relative inline-flex shrink-0 overflow-hidden border border-border bg-control-active select-none',
    sizes[size],
    shape === 'circle' ? 'rounded-full' : size === 'xl' ? 'rounded-lg' : 'rounded-md',
    className,
  )}
>
  {#if src}
    <AvatarPrimitive.Image {src} {alt} class="size-full object-cover" />
  {/if}
  <AvatarPrimitive.Fallback
    class="flex size-full items-center justify-center font-semibold text-fg-muted uppercase"
    aria-label={alt || undefined}
  >
    {initials}
  </AvatarPrimitive.Fallback>
</AvatarPrimitive.Root>
