import {
  Grid,
  Box,
  List,
  ListItem,
  Typography,
  Card,
  Paper
} from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserPlaylists } from '../store/slices/playlistSlice';
import { RootState } from '../store/store';
import { PlaylistInfo, UserInfo } from '../../types';
import UserPlaylists from './userPlaylists';
export default function PlaylistAnalyzer() {
  const user: UserInfo = useSelector(
    (state: RootState) => state.userSlice.userInfo
  );
  const userPlaylists: PlaylistInfo[] = useSelector(
    (state: RootState) => state.playlistSlice.userPlaylists
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userPlaylists[0].name) {
      fetch(`/spotify/playlists/${user.id}`)
        .then((resp) => resp.json())
        .then((resp) => {
          dispatch(setUserPlaylists(resp));
        });
    }
  });
  return (
    <Grid container width={'100%'} height={'100%'} gap={'5px'}>
      <Grid item sm={3}>
        <Box>
          <UserPlaylists userPlaylists={userPlaylists} />
        </Box>
      </Grid>
      <Grid item sm={8}>
        <Paper>
          <Typography variant="h1">
            Placeholder for Analytics Section
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
