import type { RequestEvent } from '../$types';
import type { UserInfo, TrackInfo } from '../../types';

const getTopTracks = async (event: RequestEvent, type: 'tracks') => {
  const topTracks: TrackInfo[] = await event
    .fetch('/spotify/top/' + type, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => res.json());

  return topTracks;
};

const getUser = async (event: RequestEvent) => {
  const userData: UserInfo = await event
    .fetch('/spotify/user/', {
      headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => res.json())
    .catch((e) => {
      if (e.status === 401 || e.status === 403) {
        //@TODO: Fix this here to actually call refresh and refresh the token
        fetch('/auth/refresh');
      }
      throw e;
    });

  return userData;
};

export async function load(event: RequestEvent) {
  //@ts-expect-error
  const { data } = event;
  const topTracks = await getTopTracks(event, 'tracks');
  const userData = await getUser(event);
  return { loggedIn: data.loggedIn, topTracks: topTracks, userData: userData };
  //console.log(await getTopTracks(event, 'tracks'));
}
