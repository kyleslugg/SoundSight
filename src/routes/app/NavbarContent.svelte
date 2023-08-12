<script lang="ts">
  import { Anchor, Center } from '@svelteuidev/core';
  import type { UserInfo } from '../../types';
  export let userData: UserInfo;
</script>

<nav>
  <div>
    <h2>Welcome, {userData.id}</h2>
  </div>
  <a href="/">Home</a>
  <a href="/app/tracks">Top Tracks</a>
  <a href="/app/playlists">Playlists</a>
  <a href="/app/analysis">Analyze</a>
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
