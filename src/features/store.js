import { configureStore } from "@reduxjs/toolkit";
import movieReducer from '../features/Movies/movieSlice'
export const store = configureStore({
  reducer: {
    movie:movieReducer
  },
});
