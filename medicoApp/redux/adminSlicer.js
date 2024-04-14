import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    data: [],
    error: null,
    loading: false,
  };

  export const AllDoctors = createAsyncThunk('doctors/AllDoctors', async () => {
    const response = await axios.get(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/doctor/getAll`
    ); 
    return response.data;
  });

  export const allPharmacys = createAsyncThunk(
    'pharmacies/allPharmacys',
    async () => {
      const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/pharmacy/getAll`);
      return response.data;
    }
  );
  export const allUsers = createAsyncThunk(
    'users/allUsers',
    async () => {
      const response = await axios.get(`http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/user/getAll`);
      return response.data;
    }
  );

  const AdminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {}
    ,
    extraReducers(builder) {
      builder.addCase(AllDoctors.fulfilled, (state, action) => {
        state.data = action.payload;
      });
      builder.addCase(allPharmacys.fulfilled, (state, action) => {
        state.data = action.payload;
    });
      builder.addCase(allUsers.fulfilled, (state, action) => {
        state.data = action.payload;
    });
    },
});


export const {save}= AdminSlice.actions;
export default AdminSlice.reducer;