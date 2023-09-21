import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKEY } from "../../common/apis/movieApiKey";
import axios from "axios";
// import axios from "axios";
// const MOVIE_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=55944848";
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    try {
      const response = await movieApi.get(
        `&apiKey=${APIKEY}&s=${term}&type=movie`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const fetchAsyncShow = createAsyncThunk(
  "shows/fetchAsyncShow",
  async (term) => {
    try {
      const response = await movieApi.get(
        `&apiKey=${APIKEY}&s=${term}&type=series`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apiKey=${APIKEY}&i=${id}&plot=full`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMoiveorShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncMovies.pending, () => {
        console.log("Pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        console.log("fulfuilled");
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log("Rejected");
      })
      .addCase(fetchAsyncShow.fulfilled, (state, action) => {
        state.shows = action.payload;
        console.log("fulfuilled");
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, action) => {
        state.selectedMovieOrShow = action.payload;
        console.log("fulfuilled");
      });
  },
});

export const { removeSelectedMoiveorShow } = moviesSlice.actions;
export const getAllMovies = (state) => state.movie.movies;
export const getAllShows = (state) => state.movie.shows;
export const getDetail = (state) => state.movie.selectedMovieOrShow;
export default moviesSlice.reducer;
