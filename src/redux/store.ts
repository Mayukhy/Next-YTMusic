import { configureStore,combineReducers,getDefaultMiddleware } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import songReducer from './slices/songsSlice'
import { mtMusicAPI } from './api/api';

export const store = configureStore({
  reducer:
  { user: userReducer,
    song: songReducer,
    [mtMusicAPI.reducerPath]: mtMusicAPI.reducer
   },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(mtMusicAPI.middleware),
    
});

