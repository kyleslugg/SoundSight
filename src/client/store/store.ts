import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import trackSlice from './slices/trackSlice';
import playlistSlice from './slices/playlistSlice';

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    trackSlice: trackSlice,
    playlistSlice: playlistSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
