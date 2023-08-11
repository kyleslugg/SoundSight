<script lang="ts">
  import NavbarContent from './NavbarContent.svelte';
  import { SvelteUIProvider } from '@svelteuidev/core';
  import { fns, AppShell, Navbar, Header, Center } from '@svelteuidev/core';
  import '../app.css';
  let loggedIn = false;
  let isDark = true;
  let opened = true;

  function toggleTheme() {
    isDark = !isDark;
  }
  function toggleOpened() {
    opened = !opened;
  }
</script>

<SvelteUIProvider themeObserver="dark" withNormalizeCSS withGlobalStyles>
  {#if !loggedIn}
    <slot />
  {:else}
    <AppShell>
      <Navbar
        slot="navbar"
        hidden={!opened}
        height={'100%'}
        width={{ sm: 300, lg: 400 }}
      >
        <NavbarContent /></Navbar
      >
      <Header slot="header" height="auto">
        <p>This is the header.</p>
      </Header>
      <slot />
    </AppShell>
  {/if}
</SvelteUIProvider>
