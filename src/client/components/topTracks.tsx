import { List, Card, Typography, Box } from '@mui/material';
import { TrackInfo } from '../../types';
import Track from './track';
import { getSessionUID } from '../../server/utilities/utils';

export default function TopTracks(props: {
  displayLength: number;
  tracks: TrackInfo[];
}) {
  const { displayLength, tracks } = props;
  const displayTracks =
    tracks.length >= displayLength ? tracks.slice(0, displayLength) : tracks;

  return (
    <Box>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Top Tracks
      </Typography>
      <List>
        {displayTracks.map((item) => (
          <div key={getSessionUID()}>
            <Track track={item}></Track>
            <hr />
          </div>
        ))}
      </List>
    </Box>
  );
}
