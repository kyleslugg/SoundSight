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
import { TrackInfo, UserInfo, ArtistInfo } from '../../types';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import TopTracks from '../components/topTracks';
import PlaylistAnalyzer from '../components/playlistAnalyzer';
import { ToggleableDrawer } from '../components/navigationDrawer';

const drawerWidth = 240;

export default function Home() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currDrawerWidth, setCurrDrawerWidth] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [topTracks, setTopTracks] = useState<TrackInfo[]>([]);
  const [topArtists, setTopArtists] = useState<ArtistInfo[]>([]);

  const toggleDrawer = (event: React.MouseEvent) => {
    const nextState = !drawerOpen;
    setDrawerOpen(nextState);
    setCurrDrawerWidth(nextState ? drawerWidth : 0);
  };

  /** 
   * const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  */

  const getTop = (type: 'tracks' | 'artists') => {
    fetch('/spotify/top/' + type, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        if (type === 'tracks') {
          setTopTracks(resp);
        } else {
          setTopArtists(resp);
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
        setUser(resp);
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
