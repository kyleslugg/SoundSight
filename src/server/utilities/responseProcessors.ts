import { PlaylistAddCheck } from '@mui/icons-material';
import { AlbumInfo, ArtistInfo, PlaylistInfo, TrackInfo } from '../../types';

export const extractAlbumInfo = (album: AlbumInfo): AlbumInfo => {
  return {
    title: album['name'],
    id: album['id'],
    uri: album['uri'],
    href: album['href'],
    release_date: album['release_date'],
    images: album['images']
  };
};

/**
 * Extracts relevant information from an ArtistInfo object and returns a new object with only the necessary properties.
 *
 * @param artist - An object of type ArtistInfo containing information about an artist, including their id, uri, href, name, genres, and images.
 * @returns A new object of type ArtistInfo with only the necessary properties.
 */
export const extractArtistInfo = (artist: ArtistInfo): ArtistInfo => {
  return {
    id: artist['id'],
    uri: artist['uri'],
    href: artist['href'],
    name: artist['name'],
    genres: artist['genres'],
    images: artist['images']
  };
};

/**
 * Processes the response received from an API call and extracts relevant information about either tracks or artists.
 * @param resp - The response object received from the API call.
 * @param type - A string indicating whether to extract information about tracks or artists.
 * @returns An array of TrackInfo or ArtistInfo objects.
 */
export const processTopResponse = async (
  resp: Response,
  type: 'tracks' | 'artists'
): Promise<Array<TrackInfo | ArtistInfo>> => {
  let content = await resp.json();
  content = content.items;

  console.log(content);
  if (type === 'tracks') {
    const trackDetails: TrackInfo[] = [];
    content.forEach((item: TrackInfo) => {
      trackDetails.push({
        title: item['name'],
        id: item['id'],
        uri: item['uri'],
        href: item['href'],
        album: extractAlbumInfo(item['album']),
        artists: item['artists'].map((artist) => extractArtistInfo(artist))
      });
    });
    return trackDetails;
  } else {
    return content.map((artist: ArtistInfo) => extractArtistInfo(artist));
  }
};

/**
 * Processes the response from a fetch request for a playlist and returns a modified version of the playlist information.
 *
 * @param resp - The response object from a fetch request.
 * @returns An array of modified playlist information objects.
 */
export const processPlaylistResponse = async (
  resp: Response,
  access_token: string
) => {
  const fetchAllSegments = async (href: string) => {
    let content = await fetch(href, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    }).then((resp) => resp.json());
    contentCache.push(...content.items);
    if (content.next) {
      await fetchAllSegments(content.next);
    }
  };

  const contentCache = [];
  let content = await resp.json();
  contentCache.push(...content.items);
  if (content.next) {
    await fetchAllSegments(content.next);
  }

  return contentCache.map((playlist: PlaylistInfo) => {
    return {
      name: playlist.name,
      description: playlist.description,
      id: playlist.id,
      href: playlist.href,
      tracks_href: playlist.tracks?.href,
      tracks_total: playlist.tracks?.total,
      uri: playlist.uri,
      snapshot_id: playlist.snapshot_id,
      collaborative: playlist.collaborative,
      owner: playlist.owner
    };
  });
};
