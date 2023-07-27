import {
  Grid,
  Box,
  List,
  ListItem,
  Typography,
  Card,
  Paper
} from '@mui/material';
export default function PlaylistAnalyzer() {
  return (
    <Grid container width={'100%'} height={'100%'} gap={'5px'}>
      <Grid item sm={3}>
        <Paper>
          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
            Playlists
          </Typography>
        </Paper>
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
