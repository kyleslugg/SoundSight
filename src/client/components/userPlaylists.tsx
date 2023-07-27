import { Box, Typography, List } from '@mui/material';
import Playlist from './playlist';
import { PlaylistInfo } from '../../types';
import { getSessionUID } from '../../server/utilities/utils';

export default function UserPlaylists(props: {
  userPlaylists: PlaylistInfo[];
}) {
  const { userPlaylists } = props;

  return (
    <Box>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Playlists
      </Typography>
      <List>
        {userPlaylists.map((item) => (
          <div key={getSessionUID()}>
            <Playlist playlist={item}></Playlist>
            <hr />
          </div>
        ))}
      </List>
    </Box>
  );
}
