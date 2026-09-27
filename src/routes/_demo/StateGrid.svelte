<script lang="ts" generics="R extends string, C extends string">
  import type { Snippet } from 'svelte'

  type Props = {
    rows: readonly R[]
    columns: readonly C[]
    cell: Snippet<[R, C]>
    /** Label for the row header column. */
    corner?: string
  }

  let { rows, columns, cell, corner = '' }: Props = $props()
</script>

<!-- Horizontally scrollable on small screens; the page itself never scrolls sideways. -->
<div class="-mx-5 overflow-x-auto px-5">
  <table class="w-full border-separate border-spacing-0 text-left">
    <thead>
      <tr>
        <th class="pr-4 pb-3 text-xs font-medium text-fg-subtle">{corner}</th>
        {#each columns as column}
          <th class="px-2 pb-3 text-xs font-medium whitespace-nowrap text-fg-subtle">{column}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row}
        <tr>
          <th scope="row" class="py-2 pr-4 text-sm font-normal whitespace-nowrap text-fg-muted">{row}</th>
          {#each columns as column}
            <td class="px-2 py-2 align-middle">{@render cell(row, column)}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
