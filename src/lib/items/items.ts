import Track__SvelteComponent_ from './Track.svelte';
import Album__SvelteComponent_ from './Album.svelte';
import Artist__SvelteComponent_ from './Artist.svelte';
import Playlist__SvelteComponent_ from './Playlist.svelte';

export default function Item(type: 'track' | 'artist' | 'playlist' | 'album') {
  switch (type) {
    case 'track':
      return Track__SvelteComponent_;

    case 'album':
      return Album__SvelteComponent_;

    case 'artist':
      return Artist__SvelteComponent_;

    case 'playlist':
      return Playlist__SvelteComponent_;

    default:
      break;
  }
}
