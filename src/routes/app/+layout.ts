import type { RequestEvent } from '../$types';

const getTopTracks = async (event: RequestEvent, type: 'tracks') => {
  const topTracks = await event
    .fetch('/spotify/top/' + type, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => res.json());

  return topTracks;
};

export async function load(event: RequestEvent) {
  //@ts-expect-error
  const { data } = event;
  const topTracks = await getTopTracks(event, 'tracks');
  return { loggedIn: data.loggedIn, topTracks: topTracks };
  //console.log(await getTopTracks(event, 'tracks'));
}
