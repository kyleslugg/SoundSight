<script lang="ts">
  import { Image, Title, Text } from '@svelteuidev/core';
  import type { TrackInfo } from '../../types';
  export let itemData: TrackInfo;

  let { title, album, artists, name, uri } = itemData;
  //@ts-expect-error
  let albumImage = album.images ? album.images[0].url! : '';
  let artistDisplay = artists
    .map((artist) => {
      return artist.name;
    })
    .join(', ');
</script>

<div class="track-item">
  <Image
    src={albumImage}
    override={{
      borderRadius: '3px',
      width: 50,
      height: 50,
      marginRight: '5px'
    }}
  />
  <div class="track-details">
    <Title order={4}>{title}</Title>
    <Text size="sm"
      >{album.title}: {artistDisplay.slice(
        0,
        Math.min(100, artistDisplay.length)
      )}</Text
    >
  </div>
</div>

<style lang="scss">
  .track-item {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    padding: 5px;
    width: fit-content;
  }

  .track-details {
    margin-top: auto;
    margin-bottom: auto;
  }
</style>
