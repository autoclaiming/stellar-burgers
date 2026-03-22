import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

interface OrderState {
  order: TOrder | null;
  orderRequest: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  orderRequest: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return { ...response.order, ingredients: data };
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.orderRequest = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      });
  }
});

export const { resetOrder } = orderSlice.actions;

export const selectOrderRequest = (state: { order: OrderState }) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: { order: OrderState }) =>
  state.order.order;

export default orderSlice.reducer;
