import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useState, ChangeEvent } from 'react';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from '@slices/ingredientsSlice';
import constructorReducer from '@slices/constructorSlice';
import orderReducer from '@slices/orderSlice';
import feedReducer from '@slices/feedSlice';
import userReducer from '@slices/userSlice';
import userOrdersReducer from '@slices/userOrdersSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  user: userReducer,
  userOrders: userOrdersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useForm = <T extends Record<string, string>>(
  initialValues: T
) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, handleChange, setValues };
};

export { rootReducer };
export default store;
