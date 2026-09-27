<script lang="ts">
  /** The Vanguard mark: a red-to-blue alliance ring around a V. */
  let { size = 28 }: { size?: number } = $props()
  const uid = $props.id()
</script>

<svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
  <defs>
    <linearGradient id="vd-ring-{uid}" x1="0.1" y1="0.9" x2="0.9" y2="0.1">
      <stop offset="0" stop-color="#ff6b6b" />
      <stop offset="1" stop-color="#3572b0" />
    </linearGradient>
  </defs>
  <circle cx="32" cy="32" r="32" fill="#1e1e1e" />
  <circle cx="32" cy="32" r="25" fill="none" stroke="url(#vd-ring-{uid})" stroke-width="7" />
  <path d="M23 20.5h5.2L32 36.5l3.8-16H41L34.7 43.5h-5.4z" fill="#fff" />
</svg>
