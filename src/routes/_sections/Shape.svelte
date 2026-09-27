<script lang="ts">
  import Example from '../_demo/Example.svelte'
  import Section from '../_demo/Section.svelte'
</script>

<Section
  foundation
  id="shape"
  title="Shape & elevation"
  description="Four radii and three shadows. Controls are 6px, floating panels 8px. Shadows only appear on things that float; resting surfaces separate by border and tone."
>
  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Radius" class="flex flex-wrap gap-4">
      {#each [['rounded-sm', '4px', 'Checkbox, kbd'], ['rounded-md', '6px', 'Controls'], ['rounded-lg', '8px', 'Cards, menus, dialogs'], ['rounded-xl', '12px', 'Hero panels']] as [cls, px, use]}
        <div class="flex flex-col items-center gap-2 text-center">
          <div class="size-16 border border-border-strong bg-surface {cls}"></div>
          <span class="text-sm text-fg">{cls.replace('rounded-', '')} · {px}</span>
          <span class="max-w-24 text-xs text-fg-subtle">{use}</span>
        </div>
      {/each}
    </Example>
    <Example title="Elevation" class="flex flex-wrap gap-6">
      {#each [['shadow-control', 'Buttons, inputs'], ['shadow-overlay', 'Menus, popovers'], ['shadow-dialog', 'Dialogs']] as [cls, use]}
        <div class="flex flex-col items-center gap-2 text-center">
          <div class="size-16 rounded-lg border border-border bg-surface {cls}"></div>
          <span class="text-sm text-fg">{cls.replace('shadow-', '')}</span>
          <span class="text-xs text-fg-subtle">{use}</span>
        </div>
      {/each}
    </Example>
  </div>
</Section>
