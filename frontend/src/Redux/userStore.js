import UserRegdetails from "./User/UserRegdetails";
import { configureStore } from "@reduxjs/toolkit";
import authenticationSliceReducer from "./Authentication/AuthenticationSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    storage,
  }
  const rootReducer = combineReducers({ 
    User_registration:UserRegdetails,
    authentication_user:authenticationSliceReducer,
  })
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
  })

  export const persistor = persistStore(store)