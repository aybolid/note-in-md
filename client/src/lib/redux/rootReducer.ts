import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/auth/authSlice';
import { themeReducer } from './slices/theme/themeSlice';

const rootReducer = combineReducers({ auth: authReducer, theme: themeReducer });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
