import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function ToggleableDrawer(props: {
  drawerWidth: number;
  open: boolean;
  anchor: 'top' | 'bottom' | 'left' | 'right';
  onClose: (ev: Event, reason: string) => void;
  window?: () => Window;
}) {
  const { drawerWidth, open, anchor, onClose } = props;

  const drawer = (
    <div>
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
        <ListItem key={'playlistAnalyzer'} disablePadding>
          <Link to="/playlistAnalyzer">
            <ListItemButton>
              <ListItemText primary="Playlist Analyzer" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={open}
        anchor={anchor}
        onClose={onClose}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
