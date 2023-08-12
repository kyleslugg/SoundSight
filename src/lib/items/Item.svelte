<script lang="ts">
  import type { ItemInfo, SpotifyItem, TrackInfo } from '../../types';
  import getItemElement from './items';

  export let itemData: ItemInfo;
  export let itemType: SpotifyItem;

  const { ItemEl, TypedData } = getItemElement(itemType, itemData)!;
</script>

<ItemEl itemData={TypedData} />
