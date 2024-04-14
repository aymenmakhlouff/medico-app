import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    data: [],
    error: null,
    loading: false,
  };



  export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
    console.log('this is the inv' , process.env.EXPO_PUBLIC_SERVER_IP);
    const response = await axios.get(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/Categories/getAll`
    );
    return response.data;
  });





  const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.data = action.payload;
          });
    },
})

export default CategorySlice.reducer
