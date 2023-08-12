import type { RequestHandler } from 'express';

export type MiddlewareErrorCreator = {
  method: string;
  log: string;
  status: string | number;
  message?: string;
};

export type MiddlewareController = {
  [s: string]: RequestHandler;
};

export type OptionalInfoElement =
  | string
  | boolean
  | number
  | ArtistInfo
  | AlbumInfo
  | Array<unknown>
  | undefined
  | { [s: string]: OptionalInfoElement }
  | OptionalInfoElement[];

export type UserInfo = {
  id: string;
  [s: string]: string | number | OptionalInfoElement;
};

export type TrackInfo = {
  id: string;
  uri: string;
  album: AlbumInfo;
  artists: ArtistInfo[];
  title?: string;
  name?: string;
  [s: string]: OptionalInfoElement;
};

export type ArtistInfo = {
  id: string;
  uri: string;
  href: string;
  name: string;
  [s: string]: OptionalInfoElement;
};

export type AlbumInfo = {
  id: string;
  uri: string;
  href: string;
  [s: string]: OptionalInfoElement;
};

export type PlaylistInfo = {
  name: string;
  collaborative: boolean;
  description: string;
  href: string;
  id: string;
  owner: UserInfo;
  public: boolean;
  tracks?: { href: string; total: number };
  uri: string;
  [s: string]: OptionalInfoElement;
};

export type ItemInfo = TrackInfo | PlaylistInfo | ArtistInfo | AlbumInfo;

export type SpotifyItem = 'track' | 'artist' | 'playlist' | 'album';
