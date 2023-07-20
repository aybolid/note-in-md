import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import { themePersistReducer } from './slices/theme/themeSlice';
import notesReducer from './slices/notes/notesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themePersistReducer,
  notes: notesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
