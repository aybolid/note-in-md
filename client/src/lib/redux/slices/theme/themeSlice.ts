import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import local from '../../../../utils/localStorage';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

interface ThemeState {
  mode: 'light' | 'dark';
}

const initialState: ThemeState = {
  mode: 'dark',
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state: ThemeState, action: PayloadAction<'light' | 'dark'>) {
      state.mode = action.payload;
      local.store('theme', JSON.stringify(state));
    },
  },
});

export const { setTheme } = ThemeSlice.actions;
export const themeReducer = ThemeSlice.reducer;

export const selectTheme = (state: { theme: ThemeState }) => state.theme;

const persistConfig = {
  key: 'theme',
  storage,
};

export const themePersistreducer = persistReducer(persistConfig, themeReducer);
