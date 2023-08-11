<script lang="ts">
  import { Center } from '@svelteuidev/core';
  import App from '../components/App.svelte';
  import Login from './Login.svelte';

  let loggedIn: Boolean;
</script>

<Center override={{ height: '100%' }}>
  {#if loggedIn}
    <h1>Welcome to SvelteKit</h1>
    <p>
      Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
    </p>
    <App />
  {:else}
    <Login />
  {/if}
</Center>
