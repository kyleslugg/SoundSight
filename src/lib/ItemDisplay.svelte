<script lang="ts">
  import type { ItemInfo, SpotifyItem } from '../types';
  import Item from './items/Item.svelte';

  export let itemsData: ItemInfo[];
  export let itemType: SpotifyItem;
  export let title: string;
</script>

<div class="items-display">
  <h2>{title}</h2>

  <div class="items-holder">
    <div>
      {#each itemsData as item}
        <Item itemData={item} {itemType} />
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
