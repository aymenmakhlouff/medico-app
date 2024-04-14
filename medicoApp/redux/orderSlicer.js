import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  userOrders: [],
  error: null,
  loading: false,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const response = await axios.get(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/orders/getAll`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchOrdersByUserId = createAsyncThunk(
  "orders/fetchOrdersByUserId",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/orders/getById/${userId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { dispatch }) => {
  
    const { email, ...rest } = orderData
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/orders/createOrder`,
        { email, ...rest }
      );
      dispatch(fetchOrdersByUserId(email));
      console.log("this is the response",response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createPaymentIntent = createAsyncThunk(
  "orders/createPaymentIntent",
  async (orderData, { dispatch }) => {

    
    const { email, orderId,...rest } = orderData
    console.log({ email, orderId,...rest }); // Add this line
    try {
      const response = await axios.post(
        `http://${process.env.EXPO_PUBLIC_SERVER_IP}:1128/api/payment/intents`,
        { email, orderId,...rest }
      );
      dispatch(fetchOrdersByUserId(email));
      console.log("this is the response",response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        // handle the fulfilled state as per your requirements
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
