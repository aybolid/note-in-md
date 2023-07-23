import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import { themePersistReducer } from './slices/theme/themeSlice';
import notesReducer from './slices/notes/notesSlice';
import noteEditorReducer from './slices/noteEditor/noteEditorSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themePersistReducer,
  notes: notesReducer,
  noteEditor: noteEditorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
