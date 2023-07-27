import { ListItem, Avatar, ListItemText } from '@mui/material';
import { PlaylistInfo } from '../../types';

export default function Playlist(props: { playlist: PlaylistInfo }) {
  const { playlist } = props;
  return (
    <ListItem>
      <Avatar
        src={playlist.images ? playlist.images[0].url : ''}
        sx={{ borderRadius: '3px', width: 56, height: 56, marginRight: '5px' }}
      ></Avatar>
      <ListItemText
        primary={playlist.name}
        secondary={`${playlist.tracks?.total} tracks`}
      ></ListItemText>
    </ListItem>
  );
}
