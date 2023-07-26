import { AlbumInfo, ArtistInfo, TrackInfo } from '../../types';

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
