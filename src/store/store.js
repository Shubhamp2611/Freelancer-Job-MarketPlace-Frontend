import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import jobReducer from './slices/jobSlice';
import contractReducer from './slices/contractSlice';
import proposalReducer from './slices/proposalSlice';
import notificationReducer from './slices/notificationSlice';
import userReducer from './slices/userSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    contracts: contractReducer,
    proposals: proposalReducer,
    notifications: notificationReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});