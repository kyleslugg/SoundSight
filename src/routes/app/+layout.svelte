<script lang="ts">
  import { fns, AppShell, Navbar, Header, Container } from '@svelteuidev/core';
  import NavbarContent from './NavbarContent.svelte';
  let data: { [k: string]: unknown } | undefined;
  let loggedIn = data ? data.loggedIn! : false;
</script>

<Container
  override={{
    width: '100%',
    height: '100%',
    'margin-bottom': '0px',
    display: 'flex',
    'box-shadow': '0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(0,0,0,0.23)',
    'background-color': '$dark600'
  }}
>
  <NavbarContent />
  <main style="flex-grow: 1;">
    <slot height="100%" />
  </main>
</Container>
