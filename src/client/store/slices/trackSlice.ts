import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArtistInfo, TrackInfo } from '../../../types';

export type TracksState = {
  topTracks: Array<TrackInfo | undefined>;
  topArtists: Array<ArtistInfo | undefined>;
};

const initialState = { topTracks: [{}], topArtists: [{}] };

export const trackSlice = createSlice({
  name: 'trackSlice',
  initialState,
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

export default trackSlice.reducer;
