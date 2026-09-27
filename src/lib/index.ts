// Actions
export { default as Button } from './components/Button.svelte'
export { default as IconButton } from './components/IconButton.svelte'
export * as DropdownMenu from './components/dropdown-menu/index.js'

// Forms
export { default as Checkbox } from './components/Checkbox.svelte'
export { default as Field, type FieldControlProps } from './components/Field.svelte'
export { default as Input } from './components/Input.svelte'
export { default as Label } from './components/Label.svelte'
export * as RadioGroup from './components/radio-group/index.js'
export { default as SegmentedControl, type SegmentedControlItem } from './components/SegmentedControl.svelte'
export { default as Select, type SelectItem } from './components/Select.svelte'
export { default as Slider } from './components/Slider.svelte'
export { default as Switch } from './components/Switch.svelte'
export { default as Textarea } from './components/Textarea.svelte'

// Navigation & disclosure
export * as Accordion from './components/accordion/index.js'
export * as Tabs from './components/tabs/index.js'

// Overlays
export { default as AlertDialog } from './components/AlertDialog.svelte'
export { default as Dialog } from './components/Dialog.svelte'
export { default as Popover } from './components/Popover.svelte'
export { default as Tooltip } from './components/Tooltip.svelte'
export { default as TooltipProvider } from './components/TooltipProvider.svelte'

// Display & feedback
export { default as Alert } from './components/Alert.svelte'
export { default as Avatar } from './components/Avatar.svelte'
export { default as Badge, type BadgeTone } from './components/Badge.svelte'
export { default as Card } from './components/Card.svelte'
export { default as Kbd } from './components/Kbd.svelte'
export { default as Progress } from './components/Progress.svelte'
export { default as Separator } from './components/Separator.svelte'
export { default as Spinner } from './components/Spinner.svelte'

// Foundations
export { default as Icon } from './icons/Icon.svelte'
export { icons, type IconName } from './icons/paths.js'
export { cn } from './utils/cn.js'
export { buttonClasses, focusRing, type ButtonVariant } from './utils/styles.js'
export type { Size, Tone } from './utils/types.js'
