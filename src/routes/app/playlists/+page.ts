import type { RequestEvent } from '../../$types';
import type { PlaylistInfo, UserInfo } from '../../../types';

const getUserPlaylists = async (event: RequestEvent, user: UserInfo) => {
  const playlists: PlaylistInfo[] = await event
    .fetch(`/spotify/playlists/${user.id}`)
    .then((resp) => resp.json());

  return playlists;
};

export async function load(event: RequestEvent) {
  //@ts-expect-error
  const data = await event.parent();
  const playlists = await getUserPlaylists(event, data.userData);
  return { userPlaylists: playlists };
}
