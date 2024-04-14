import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    data: [],
    error: null,
    loading: false,
  };

// Async thunk action for fetching reviews
export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async () => {
      const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/reviews/getAll`);
      return response.data;
    }
  );
  
  // Slice
  const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchReviews.fulfilled, (state, action) => {
          state.data = action.payload;
        })
    },
  });
  

  export default reviewsSlice.reducer;