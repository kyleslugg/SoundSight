import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlaylistInfo } from '../../../types';

export type PlaylistsState = { userPlaylists: Array<PlaylistInfo | undefined> };

const initialState = { userPlaylists: [{}] };

export const playlistSlice = createSlice({
  name: 'playlistSlice',
  initialState,
  reducers: {
    setUserPlaylists: (state, action: PayloadAction<PlaylistInfo[]>) => {
      state.userPlaylists = action.payload;
    }
  }
});

export const { setUserPlaylists } = playlistSlice.actions;

export default playlistSlice.reducer;
