import type { Size } from './types.js'

/** Keyboard focus ring shared by every interactive element. */
export const focusRing =
  'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus focus-visible:outline-solid'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

const buttonBase =
  'relative inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-md border font-medium transition-[background-color,border-color,color,scale] duration-150 ease-vd'

const buttonVariants: Record<ButtonVariant, { rest: string; interactive: string }> = {
  primary: {
    rest: 'border-transparent bg-accent-emphasis text-fg-on-emphasis shadow-control',
    interactive: 'hover:bg-accent-emphasis-hover active:bg-accent-emphasis-active',
  },
  secondary: {
    rest: 'border-border-emphasis bg-control text-fg shadow-control',
    interactive: 'hover:border-border-strong hover:bg-control-hover active:bg-control-active',
  },
  ghost: {
    rest: 'border-transparent bg-transparent text-fg-muted',
    interactive: 'hover:bg-hover hover:text-fg active:bg-selected',
  },
  // Quiet until hovered, so a destructive action never carries the most visual weight.
  danger: {
    rest: 'border-border-emphasis bg-control text-danger shadow-control',
    interactive:
      'hover:border-danger-emphasis hover:bg-danger-emphasis hover:text-fg-on-emphasis active:border-danger-emphasis-hover active:bg-danger-emphasis-hover active:text-fg-on-emphasis',
  },
}

const buttonSizes: Record<Size, { text: string; icon: string }> = {
  sm: { text: 'h-7 gap-1.5 px-2.5 text-sm', icon: 'size-7' },
  md: { text: 'h-8 gap-2 px-3 text-base', icon: 'size-8' },
  lg: { text: 'h-10 gap-2 px-4 text-md', icon: 'size-10' },
}

export const buttonIconSize: Record<Size, number> = { sm: 14, md: 16, lg: 16 }

export type ButtonClassOptions = {
  variant?: ButtonVariant
  size?: Size
  disabled?: boolean
  loading?: boolean
  iconOnly?: boolean
  block?: boolean
}

/**
 * Classes for anything that should look like a button. Disabled and loading states
 * drop the hover and press styles entirely rather than trying to out-specify them.
 */
export function buttonClasses({
  variant = 'secondary',
  size = 'md',
  disabled = false,
  loading = false,
  iconOnly = false,
  block = false,
}: ButtonClassOptions = {}) {
  const v = buttonVariants[variant]
  const s = buttonSizes[size]
  const state = disabled
    ? variant === 'ghost'
      ? 'cursor-not-allowed border-transparent bg-transparent text-fg-disabled'
      : 'cursor-not-allowed border-border-disabled bg-disabled text-fg-disabled'
    : loading
      ? `${v.rest} cursor-progress`
      : `${v.rest} ${v.interactive} cursor-pointer active:scale-[0.98]`
  return [buttonBase, focusRing, iconOnly ? s.icon : s.text, state, block && 'w-full'].filter(Boolean).join(' ')
}
