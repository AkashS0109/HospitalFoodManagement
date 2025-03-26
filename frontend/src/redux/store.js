import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist/es/constants';

// Your reducers
import { patientReducer } from './patientSlice';
import { dietReducer } from './dietSlice';
import { authSliceReducer } from './authSlice';
import membersSlice from './membersSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authSliceReducer,
  patient: patientReducer,
  diet: dietReducer,
  member: membersSlice,
});

// Persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };



// import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import { patientReducer } from './patientSlice';
// import { dietReducer } from './dietSlice';
// import { authSliceReducer } from './authSlice';
// import membersSlice from './membersSlice';

// // Combine reducers
// const rootReducer = combineReducers({
//   auth: authSliceReducer,
//   patients: patientReducer,
//   diet: dietReducer,
//   members: membersSlice,
// });

// // Configure store
// const store = configureStore({
//   reducer: rootReducer,
// });

// export { store };

