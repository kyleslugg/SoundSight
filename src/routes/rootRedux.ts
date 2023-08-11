import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PlaylistInfo, UserInfo, ArtistInfo, TrackInfo } from '../types';

//Create user slice

const userSlice = createSlice({
  name: 'userSlice',
  initialState: { userInfo: { id: '' } },
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

//Create playlist slice

const playlistSlice = createSlice({
  name: 'playlistSlice',
  initialState: { userPlaylists: [{}] },
  reducers: {
    setUserPlaylists: (state, action: PayloadAction<PlaylistInfo[]>) => {
      state.userPlaylists = action.payload;
    }
  }
});

export const { setUserPlaylists } = playlistSlice.actions;

//Create track slice
const trackSlice = createSlice({
  name: 'trackSlice',
  initialState: { topTracks: [{}], topArtists: [{}] },
  reducers: {
    setTopTracks: (state, action: PayloadAction<TrackInfo[]>) => {
      state.topTracks = action.payload;
    },
    setTopArtists: (state, action: PayloadAction<ArtistInfo[]>) => {
      state.topArtists = action.payload;
    }
  }
});

export const { setTopTracks, setTopArtists } = trackSlice.actions;

//Compile reducers into store
export const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    trackSlice: trackSlice.reducer,
    playlistSlice: playlistSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
