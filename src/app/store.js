import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import mapReducer from '../reducers/MapReducers';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    map: mapReducer,
  },
});
