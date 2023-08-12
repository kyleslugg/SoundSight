<script lang="ts">
  import ItemDisplay from '$lib/ItemDisplay.svelte';
  import type { TrackInfo } from '../../types.js';
  export let data;

  let topTracks: TrackInfo[] = data ? data.topTracks! : [];
</script>

<ItemDisplay itemsData={topTracks} itemType="track" title="Top Tracks" />
