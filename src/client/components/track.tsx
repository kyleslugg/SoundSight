import { ListItem, Avatar, ListItemText } from '@mui/material';
import { TrackInfo } from '../../types';

export default function Track(props: { track: TrackInfo }) {
  const { title, artists, album, href } = props.track;

  return (
    <ListItem>
      <Avatar
        src={album.images ? album.images[0].url : ''}
        sx={{ borderRadius: '0px', width: 56, height: 56 }}
      ></Avatar>
      <ListItemText>
        <p>{title}</p>
        <p>{artists.map((el) => el['name']).join(', ')}</p>
        <p>{album['title']}</p>
      </ListItemText>
    </ListItem>
  );
}
