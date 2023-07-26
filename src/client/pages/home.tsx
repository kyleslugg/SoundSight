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
import { Menu as MenuIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { TrackInfo, UserInfo, ArtistInfo } from '../../types';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import TopTracks from '../components/topTracks';

const drawerWidth = 240;

export default function Home() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [topTracks, setTopTracks] = useState<TrackInfo[]>([]);
  const [topArtists, setTopArtists] = useState<ArtistInfo[]>([]);

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
      <Box sx={{ display: 'flex' }}>
        <CssBaseline>
          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${drawerWidth}px)`,
              ml: `${drawerWidth}px`
            }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <h1>Welcome{user ? `, ${user.id}` : '!'}</h1>
              </Typography>
              <Button onClick={handleLogout}>Log Out</Button>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box'
              }
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar />
            <Divider />
            <List>
              <ListItem key={'home'} disablePadding>
                <Link to="/">
                  <ListItemButton>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem key={'topTracks'} disablePadding>
                <Link to="/topTracks">
                  <ListItemButton>
                    <ListItemText primary="Top Tracks" />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </Drawer>

          <Routes>
            <Route
              path="/"
              element={<TopTracks displayLength={20} tracks={topTracks} />}
            />
            <Route
              path="topTracks"
              element={<TopTracks displayLength={20} tracks={topTracks} />}
            />
          </Routes>
        </CssBaseline>
      </Box>
    </BrowserRouter>
  );
}
