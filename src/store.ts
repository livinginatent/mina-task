import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dataReducer from "./features/dataSlice"; 


const rootReducer = combineReducers({
  data: dataReducer,
  
});

export const store = configureStore({
  reducer: rootReducer, 
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
