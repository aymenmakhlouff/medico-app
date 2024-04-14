import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    data: [],
    error: null,
    loading: false,
  };


  export const fetchSpeciality = createAsyncThunk('category/fetchSpeciality', async () => {
    console.log('this is the inv' , process.env.EXPO_PUBLIC_SERVER_IP);
    const response = await axios.get(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/specialities/getAll`
    );
    return response.data;
  });




  const specialitySlicer = createSlice({
    name: "speciality",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchSpeciality.fulfilled, (state, action) => {
            state.data = action.payload;
          });
    },
})

export default specialitySlicer.reducer