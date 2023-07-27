import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline
} from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { setTopTracks, setTopArtists } from '../store/slices/trackSlice';
import { RootState } from '../store/store';
import { TrackInfo, UserInfo, ArtistInfo } from '../../types';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import TopTracks from '../components/topTracks';
import PlaylistAnalyzer from '../components/playlistAnalyzer';
import { ToggleableDrawer } from '../components/navigationDrawer';

const drawerWidth = 240;

/**
 * The Home function is the main component of the application, responsible for rendering the navigation bar, the toggleable drawer, and the content of the pages. It also fetches the user's top tracks and user information from the Spotify API and dispatches them to the Redux store.
 *
 * @returns {ReactElement} The rendered toggleable drawer, navigation bar, and content of the pages.
 */
export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currDrawerWidth, setCurrDrawerWidth] = useState(0);

  const user: UserInfo = useSelector(
    (state: RootState) => state.userSlice.userInfo
  );

  const topTracks: TrackInfo[] = useSelector(
    (state: RootState) => state.trackSlice.topTracks
  );

  const topArtists = useSelector(
    (state: RootState) => state.trackSlice.topArtists
  );

  const dispatch = useDispatch();

  const toggleDrawer = () => {
    const nextState = !drawerOpen;
    setDrawerOpen(nextState);
    setCurrDrawerWidth(nextState ? drawerWidth : 0);
  };

  const getTop = (type: 'tracks' | 'artists') => {
    fetch('/spotify/top/' + type, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        if (type === 'tracks') {
          dispatch(setTopTracks(resp));
        } else {
          dispatch(setTopArtists(resp));
        }
      });
  };

  const getUser = () => {
    fetch('/spotify/user/', {
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log('User Resp:', resp);
        dispatch(setUser(resp));
      })
      .catch((e) => {
        if (e.status === 401 || e.status === 403) {
          //@TODO: Fix this here to actually call refresh and refresh the token
          fetch('/auth/refresh');
        }
        throw e;
      });
  };

  const handleLogout = () => {
    fetch('/auth/logout').then((res) => {
      if (res.ok) {
        return;
      } else {
        return Error('Unable to log out.');
      }
    });
  };

  useEffect(() => {
    getTop('tracks');
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <CssBaseline>
        <ToggleableDrawer
          drawerWidth={drawerWidth}
          open={drawerOpen}
          anchor="left"
          onClose={(ev, reason) => {
            toggleDrawer();
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            width: `calc(100% - ${currDrawerWidth}px)`,
            ml: `${currDrawerWidth}px`
          }}
        >
          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${currDrawerWidth}px)`,
              ml: `${currDrawerWidth}px`,
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row'
            }}
          >
            <Button onClick={toggleDrawer}>
              {drawerOpen ? <ArrowBackIos /> : <ArrowForwardIos />}
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome{user ? `, ${user.id}` : '!'}
            </Typography>
            <Button onClick={handleLogout}>Log Out</Button>
          </AppBar>
          <Routes>
            <Route
              path="/"
              element={<TopTracks displayLength={20} tracks={topTracks} />}
            />
            <Route
              path="topTracks"
              element={<TopTracks displayLength={20} tracks={topTracks} />}
            />
            <Route path="playlistAnalyzer" element={<PlaylistAnalyzer />} />
          </Routes>
        </Box>
      </CssBaseline>
    </BrowserRouter>
  );
}
