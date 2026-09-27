<script lang="ts" module>
  /** Attributes to spread onto the control inside a Field. */
  export type FieldControlProps = {
    id: string
    'aria-describedby': string | undefined
    'aria-invalid': true | undefined
    required: boolean | undefined
    disabled: boolean | undefined
    invalid: boolean
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte'
  import Icon from '../icons/Icon.svelte'
  import { cn } from '../utils/cn.js'
  import Label from './Label.svelte'

  type Props = {
    label: string
    /** Help text shown under the label, linked to the control with aria-describedby. */
    description?: string
    /** Validation message. Its presence marks the control invalid. */
    error?: string
    required?: boolean
    disabled?: boolean
    id?: string
    class?: string
    /** Render the control and spread `props` onto it. */
    children: Snippet<[FieldControlProps]>
  }

  let { label, description, error, required, disabled, id, class: className, children }: Props = $props()

  const uid = $props.id()
  const controlId = $derived(id ?? `vd-field-${uid}`)
  const descriptionId = $derived(`${controlId}-description`)
  const errorId = $derived(`${controlId}-error`)

  const controlProps = $derived<FieldControlProps>({
    id: controlId,
    'aria-describedby': [error && errorId, description && descriptionId].filter(Boolean).join(' ') || undefined,
    'aria-invalid': error ? true : undefined,
    required: required || undefined,
    disabled: disabled || undefined,
    invalid: !!error,
  })
</script>

<div class={cn('flex flex-col gap-1.5', className)}>
  <Label for={controlId} {required} {disabled}>{label}</Label>
  {#if description}
    <p id={descriptionId} class="-mt-1 text-sm text-fg-muted">{description}</p>
  {/if}
  {@render children(controlProps)}
  {#if error}
    <p id={errorId} class="flex items-start gap-1.5 text-sm text-danger">
      <Icon name="circle-alert" size={14} class="mt-0.5" />
      {error}
    </p>
  {/if}
</div>
