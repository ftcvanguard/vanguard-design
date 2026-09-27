export const backdropClasses =
  'fixed inset-0 z-50 bg-backdrop backdrop-blur-[2px] data-[state=open]:animate-vd-fade-in data-[state=closed]:animate-vd-fade-out'

export const dialogClasses =
  'fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-border bg-surface text-fg shadow-dialog outline-none data-[state=open]:animate-vd-dialog-in data-[state=closed]:animate-vd-dialog-out'

export const dialogWidths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' } as const

/** Floating panels: menus, popovers. */
export const floatingClasses =
  'z-50 rounded-lg border border-border bg-surface text-fg shadow-overlay outline-none data-[state=open]:animate-vd-pop-in data-[state=closed]:animate-vd-pop-out'
