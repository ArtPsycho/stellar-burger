import {
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '../../utils/burger-api';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export const getFeeds = createAsyncThunk('order/getFeeds', getFeedsApi);

export const getOrders = createAsyncThunk('order/getOrders', getOrdersApi);

export const getBurger = createAsyncThunk('order/getBurger', orderBurgerApi);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);

type TOrderState = {
  feed: TOrdersData | null;
  orderData: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  feed: null,
  orderData: [],
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderReset: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderData = action.payload.orders;
        state.feed = action.payload;
        state.orderRequest = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderRequest = false;
        state.orderData = action.payload;
      })
      .addCase(getBurger.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(getBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
        state.orderRequest = false;
      })
      .addCase(getBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderModalData = action.payload.orders[0];
      });
  }
});

export const reducerOrder = orderSlice.reducer;
export const { orderReset } = orderSlice.actions;
