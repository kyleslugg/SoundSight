<script lang="ts">
  import { SvelteUIProvider } from '@svelteuidev/core';

  import '../app.scss';
</script>

<SvelteUIProvider
  themeObserver="dark"
  withNormalizeCSS
  withGlobalStyles
  override={{ height: '100%' }}
>
  <slot height="100%" />
</SvelteUIProvider>
