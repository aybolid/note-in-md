import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import { themePersistreducer } from './slices/theme/themeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themePersistreducer,
});



export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
