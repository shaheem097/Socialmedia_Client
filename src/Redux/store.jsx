import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux'; // Add this line

import singleUser from './Reducers/singleReducer'
import adminReducer from './Reducers/adminAuthReducer';
import themeReducer from './Reducers/themeSlice'

const persistConfig = {
    key: 'root',
    storage,
  };

 
  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
       user:singleUser,
       admin: adminReducer,
       theme:themeReducer,

    })
  );
  
  const store = configureStore({
    reducer: persistedReducer,

  });
  const persistore = persistStore(store);
  

  
  export { store, persistore };
  