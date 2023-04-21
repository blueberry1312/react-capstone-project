import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data;
  },
);

export const selectCountry = createSlice({
  name: 'selectedCountry',
  initialState: null,
  reducers: {
    selectCountry: (state, action) => action.payload,
  },
});

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    countries: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllCountries = (state) => state.home.countries;
export const selectSelectedCountry = (state) => state.selectedCountry;
export default homeSlice.reducer;
