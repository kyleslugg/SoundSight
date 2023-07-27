import { ListItem, Avatar, ListItemText } from '@mui/material';
import { TrackInfo } from '../../types';

export default function Track(props: { track: TrackInfo }) {
  const { title, artists, album, href } = props.track;

  return (
    <ListItem dense="true">
      <Avatar
        src={album.images ? album.images[0].url : ''}
        sx={{ borderRadius: '3px', width: 56, height: 56, marginRight: '5px' }}
      ></Avatar>
      <ListItemText
        primary={title}
        secondary={artists.map((el) => el['name']).join(', ')}
      ></ListItemText>
    </ListItem>
  );
}
