import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    data: [],
    error: null,
    loading: false,
  };

// Async thunk action for fetching reviews
export const fetchDocReviews = createAsyncThunk(
    'reviews/fetchDocReviews',
    async (id) => {
      const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/reviews/getAll/${id}`)
      console.log('reviews from the slicer',response.data);
      return response.data;
    }
  );
  export const createReview = createAsyncThunk(
    'review/createReview',
    async(input)=>{
        const response=await axios.post(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/reviews/createRev`,input);
        return response.data;
    }
  )
  // Slice
  const docReviewsSlice = createSlice({
    name: 'Docreviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchDocReviews.fulfilled, (state, action) => {
          state.data = action.payload;
        })
        .addCase(createReview.fulfilled, (state, action) => {
          state.data.push(action.payload);
        });
    },
  });
  

  export default docReviewsSlice.reducer;