<script lang="ts">
  import { store } from './rootRedux';
  import { SvelteUIProvider } from '@svelteuidev/core';

  import { onMount, afterUpdate } from 'svelte';
  import '../app.scss';
  let data;
  let loggedIn: boolean;
  let opened = true;
  let unsubscribe;

  // onMount(() => {
  //   unsubscribe = store.subscribe(() => {
  //     loggedIn = store.getState().userSlice.
  //   })
  // })

  function toggleOpened() {
    opened = !opened;
  }
</script>

<SvelteUIProvider
  themeObserver="dark"
  withNormalizeCSS
  withGlobalStyles
  override={{ height: '100%' }}
>
  <slot height="100%" />
</SvelteUIProvider>
