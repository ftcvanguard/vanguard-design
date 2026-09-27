<script lang="ts">
  import '../app.css'
  import { TooltipProvider } from '$lib/index.js'

  let { children } = $props()
</script>

<TooltipProvider>
  {@render children()}
</TooltipProvider>
