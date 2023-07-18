import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { User } from '../../../../types/auth';
import { RootState } from '../../rootReducer';
import { login, loginWithToken, signup } from './authThunk';
import local from '../../../../utils/localStorage';

interface AuthState {
  logged: boolean;
  loading: boolean;
  authError: string;
  user: User | null;
}

const initialState: AuthState = {
  logged: false,
  loading: false,
  authError: '',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.logged = false;
      state.user = null;
      local.remove('access-token');
    },
  },
  extraReducers(builder: ActionReducerMapBuilder<AuthState>) {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.authError = '';
      })
      .addCase(signup.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.logged = true;
        state.user = user;
        state.loading = false;

        local.store('access-token', token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload || 'Unexpected error has occurred';
      });
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.authError = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.logged = true;
        state.user = user;
        state.loading = false;

        local.store('access-token', token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.payload || 'Unexpected error has occurred';
      });
    builder
      .addCase(loginWithToken.pending, (state) => {
        state.loading = true;
        state.authError = '';
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        const user = action.payload;
        state.logged = true;
        state.user = user;
        state.loading = false;
      })
      .addCase(loginWithToken.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      });
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
