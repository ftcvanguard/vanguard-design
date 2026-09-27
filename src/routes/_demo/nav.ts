export type NavGroup = { group: string; items: { id: string; label: string }[] }

export const nav: NavGroup[] = [
  {
    group: 'Foundations',
    items: [
      { id: 'color', label: 'Color' },
      { id: 'typography', label: 'Typography' },
      { id: 'shape', label: 'Shape & elevation' },
    ],
  },
  {
    group: 'Actions',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'icon-button', label: 'IconButton' },
      { id: 'dropdown-menu', label: 'DropdownMenu' },
    ],
  },
  {
    group: 'Forms',
    items: [
      { id: 'input', label: 'Input' },
      { id: 'field', label: 'Field' },
      { id: 'textarea', label: 'Textarea' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'switch', label: 'Switch' },
      { id: 'radio-group', label: 'RadioGroup' },
      { id: 'select', label: 'Select' },
      { id: 'segmented-control', label: 'SegmentedControl' },
      { id: 'slider', label: 'Slider' },
    ],
  },
  {
    group: 'Navigation',
    items: [
      { id: 'tabs', label: 'Tabs' },
      { id: 'accordion', label: 'Accordion' },
    ],
  },
  {
    group: 'Overlays',
    items: [
      { id: 'dialog', label: 'Dialog' },
      { id: 'alert-dialog', label: 'AlertDialog' },
      { id: 'popover', label: 'Popover' },
      { id: 'tooltip', label: 'Tooltip' },
    ],
  },
  {
    group: 'Feedback',
    items: [
      { id: 'badge', label: 'Badge' },
      { id: 'alert', label: 'Alert' },
      { id: 'progress', label: 'Progress' },
      { id: 'spinner', label: 'Spinner' },
    ],
  },
  {
    group: 'Display',
    items: [
      { id: 'card', label: 'Card' },
      { id: 'avatar', label: 'Avatar' },
      { id: 'separator', label: 'Separator' },
      { id: 'kbd', label: 'Kbd' },
    ],
  },
]
