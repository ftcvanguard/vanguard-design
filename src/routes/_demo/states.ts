/** Maps a state column name to the attribute that renders it statically. */
export function force(state: string): string | undefined {
  switch (state) {
    case 'Hover':
      return 'hover'
    case 'Active':
      return 'active'
    case 'Focus':
      return 'focus'
    default:
      return undefined
  }
}
