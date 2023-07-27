import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../../../types';

export type UserState = { userInfo: UserInfo };

const initialState = { userInfo: { id: '' } };

export const userSlice = createSlice({
  name: 'mapSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
