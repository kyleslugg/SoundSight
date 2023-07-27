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

export function ResponsiveDrawer(props: {
  drawerWidth: number;
  window?: () => Window;
}) {
  const { drawerWidth, window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
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
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
