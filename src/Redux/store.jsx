import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux'; // Add this line

import singleUser from './Reducers/singleReducer'
import adminReducer from './Reducers/adminAuthReducer';


const persistConfig = {
    key: 'root',
    storage,
  };

 
  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
       user:singleUser,
       admin: adminReducer,


    })
  );
  
  const store = configureStore({
    reducer: persistedReducer,

  });
  const persistore = persistStore(store);
  

  
  export { store, persistore };
  