import type {
  AlbumInfo,
  ArtistInfo,
  PlaylistInfo,
  TrackInfo
} from '../../types';
import { getTrackAudioFeatures } from './trackAudioDetailGetters.js';

/**
 * Fetches data from a paginated API response and returns all the data as a single array.
 *
 * @param resp - A Response object from a paginated API endpoint.
 * @param access_token - A string representing the access token required to authenticate the API request.
 * @returns An array containing all the items from the paginated API response.
 */
const fetchMultipageData = async (resp: Response, access_token: string) => {
  const contentCache = [];

  /**
   * Recursively fetches all segments of paginated data.
   *
   * @param href - The URL of the next segment of data.
   */
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

  let content = await resp.json();
  contentCache.push(...content.items);
  if (content.next) {
    await fetchAllSegments(content.next);
  }

  return contentCache;
};

export const extractAlbumInfo = ({
  name,
  id,
  uri,
  href,
  release_date,
  images
}: AlbumInfo): AlbumInfo => {
  return {
    title: name,
    id,
    uri,
    href,
    release_date,
    images
  };
};

/**
 * Extracts relevant information from an ArtistInfo object and returns a new object with only the necessary properties.
 *
 * @param artist - An object of type ArtistInfo containing information about an artist, including their id, uri, href, name, genres, and images.
 * @returns A new object of type ArtistInfo with only the necessary properties.
 */
export const extractArtistInfo = ({
  id,
  uri,
  href,
  name,
  genres,
  images
}: ArtistInfo): ArtistInfo => {
  return {
    id,
    uri,
    href,
    name,
    genres,
    images
  };
};

/**
 * Extracts relevant information about a track.
 * @param item - The TrackInfo object containing information about the track.
 * @param includeAudioFeatures - A boolean indicating whether to include the track's audio features. Default is false.
 * @param access_token - The access token required to access the Spotify API. Optional.
 * @returns A TrackInfo object containing information about the track, including its title, ID, URI, href, album, artists, and optionally its audio features.
 */
export const extractTrackInfo = async (
  item: TrackInfo,
  includeAudioFeatures: boolean = false,
  access_token?: string
) => {
  const trackDetails: TrackInfo = {
    ind: item['ind'],
    title: item['name'],
    id: item['id'],
    uri: item['uri'],
    href: item['href'],
    album: extractAlbumInfo(item['album']),
    artists: item['artists'].map((artist) => extractArtistInfo(artist))
  };

  if (includeAudioFeatures) {
    trackDetails['trackFeatures'] = await getTrackAudioFeatures(
      item.id,
      access_token!
    );
    return trackDetails;
  }

  return trackDetails;
};

/**
 * Processes the response obtained from a Spotify API call for tracks and extracts relevant information such as track details and audio features.
 *
 * @param resp - The response object obtained from the Spotify API call for tracks.
 * @param access_token - The access token required for authentication with the Spotify API.
 * @returns An array of TrackInfo objects and ArtistInfo objects.
 */
export const processTracksResponse = async (
  resp: Response,
  access_token: string
): Promise<Array<TrackInfo>> => {
  let content = await resp.json();
  content = content.items.map((item: TrackInfo, ind: number) => {
    return { ...item, ind };
  });

  const trackDetails: TrackInfo[] = [];

  await Promise.all(
    content.map(async (item: TrackInfo) => {
      const trackInfo = await extractTrackInfo(item, true, access_token);
      trackDetails.push(trackInfo);
    })
  );

  //@ts-expect-error
  trackDetails.sort((a, b) => a.ind - b.ind);
  console.log(trackDetails);
  return trackDetails;
};

/**
 * Processes the response received from an API call that returns a list of artists and extracts relevant information about each artist.
 *
 * @param resp The response object received from the API call.
 * @returns An array of artist objects with extracted information.
 */
export const processArtistsResponse = async (resp: Response) => {
  let content = await resp.json();
  content = content.items;
  return content.map((artist: ArtistInfo) => extractArtistInfo(artist));
};

/**
 * Processes the response from a fetch request for a playlist and returns a modified version of the playlist information.
 *
 * @param resp - The response object from a fetch request.
 * @returns An array of modified playlist information objects.
 */
export const processPlaylistsResponse = async (
  resp: Response,
  access_token: string
) => {
  const contentCache = await fetchMultipageData(resp, access_token);

  return contentCache.map((playlist: PlaylistInfo) => {
    return {
      name: playlist.name,
      description: playlist.description,
      id: playlist.id,
      href: playlist.href,
      tracks: playlist.tracks,
      uri: playlist.uri,
      snapshot_id: playlist.snapshot_id,
      collaborative: playlist.collaborative,
      owner: playlist.owner
    };
  });
};

/**
 * Processes the response received from the Spotify API for a playlist detail request and extracts the track information.
 *
 * @param resp - The response received from the Spotify API for a playlist detail request.
 * @param access_token - The access token required to make requests to the Spotify API.
 * @returns An array of track details extracted from the playlist detail response.
 */
export const processPlaylistDetailResponse = async (
  resp: Response,
  access_token: string
) => {
  const contentCache = await fetchMultipageData(resp, access_token);
  const trackDetails: TrackInfo[] = [];

  await Promise.all(
    contentCache.map(async (item) => {
      if (!item.track) return;
      const trackInfo = await extractTrackInfo(item.track, true, access_token);
      trackDetails.push(trackInfo);
    })
  );

  return trackDetails;
};
