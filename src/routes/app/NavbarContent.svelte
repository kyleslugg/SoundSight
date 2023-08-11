<script lang="ts">
  import { Anchor, Center } from '@svelteuidev/core';
</script>

<nav>
  <a href="/">Home</a>
  <a href="/tracks">Top Tracks</a>
  <a href="/playlists">Playlists</a>
  <a href="/analysis">Analyze</a>
</nav>

<style>
  nav {
    width: 175px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    border-right: 0.5pt solid rgb(15, 14, 14);
    justify-content: center;
  }
  a {
    padding-bottom: 15px;
    color: var(--svelteui-colors-dark50);
  }
</style>
