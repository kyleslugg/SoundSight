<script lang="ts">
  import { Center } from '@svelteuidev/core';
  import App from '../components/App.svelte';
  import Login from './Login.svelte';

  let data;
  let loggedIn = { data };
</script>

<Center override={{ height: '100%' }}>
  <Login />
</Center>
