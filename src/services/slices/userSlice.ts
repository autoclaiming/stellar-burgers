import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  loginError: string | null;
  registerError: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  loginError: null,
  registerError: null
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const getUser = createAsyncThunk('user/get', async () => {
  const response = await getUserApi();
  return response.user;
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError = action.error.message || 'Ошибка регистрации';
      })
      .addCase(loginUser.pending, (state) => {
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.error.message || 'Неверный email или пароль';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthChecked = (state: { user: UserState }) =>
  state.user.isAuthChecked;
export const selectUserName = (state: { user: UserState }) =>
  state.user.user?.name || '';
export const selectLoginError = (state: { user: UserState }) =>
  state.user.loginError;
export const selectRegisterError = (state: { user: UserState }) =>
  state.user.registerError;

export default userSlice.reducer;
