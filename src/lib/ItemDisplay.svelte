<script lang="ts">
  import type {
    AlbumInfo,
    ArtistInfo,
    PlaylistInfo,
    TrackInfo
  } from '../types';

  import Item from './items/items';

  export let itemsData: TrackInfo[];
  export let itemType: 'track' | 'artist' | 'playlist' | 'album';
  export let title: string;

  const ItemEl = Item(itemType);
</script>

<div class="items-display">
  <h2>{title}</h2>

  <div class="items-holder">
    <div>
      {#each itemsData as item}
        <ItemEl itemData={item} />
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .items-display {
    display: block;
    max-height: 100%;
    height: 90%;
    margin: auto;
    width: fit-content;
  }
  .items-holder {
    overflow-y: scroll;
    overflow-x: hidden;
    width: fit-content;
    height: 100%;
  }
</style>
