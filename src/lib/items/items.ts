import Track__SvelteComponent_ from './Track.svelte';
import Album__SvelteComponent_ from './Album.svelte';
import Artist__SvelteComponent_ from './Artist.svelte';
import Playlist__SvelteComponent_ from './Playlist.svelte';
import type {
  ItemInfo,
  TrackInfo,
  AlbumInfo,
  ArtistInfo,
  PlaylistInfo
} from '../../types';

type ItemComponent =
  | typeof Track__SvelteComponent_
  | typeof Album__SvelteComponent_
  | typeof Artist__SvelteComponent_
  | typeof Playlist__SvelteComponent_
  | undefined;

export default function getItemElement(
  type: 'track' | 'artist' | 'playlist' | 'album',
  itemData: ItemInfo
): { ItemEl: ItemComponent; TypedData: ItemInfo } | undefined {
  switch (type) {
    case 'track':
      return {
        ItemEl: Track__SvelteComponent_,
        TypedData: itemData as TrackInfo
      };

    case 'album':
      return {
        ItemEl: Album__SvelteComponent_,
        TypedData: itemData as AlbumInfo
      };

    case 'artist':
      return {
        ItemEl: Artist__SvelteComponent_,
        TypedData: itemData as ArtistInfo
      };

    case 'playlist':
      return {
        ItemEl: Playlist__SvelteComponent_,
        TypedData: itemData as PlaylistInfo
      };

    default:
      break;
  }
}
