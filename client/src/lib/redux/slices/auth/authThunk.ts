import { ApiError } from '@/types/api';
import {
  LoginResponse,
  SignupResponse,
  User,
  UserLoginCredentials,
  UserSignupCredentials,
} from '@/types/auth';
import local from '@/utils/localStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const login = createAsyncThunk<
  { user: User; token: string },
  UserLoginCredentials,
  { rejectValue: string }
>(
  'auth/login',
  async (userCredentials: UserLoginCredentials, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<LoginResponse> = await axios.post(
        '/api/users/login',
        userCredentials,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const { user, token } = response.data;
      return { user, token };
    } catch (err) {
      let error;
      if (err instanceof AxiosError) {
        error = (err.response?.data as ApiError).error;
      } else {
        error = {
          message: 'Unexpected error has occurred',
          statusCode: 500,
          status: 'Internal Server Error',
        };
      }
      return rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk<
  { user: User; token: string },
  UserSignupCredentials,
  { rejectValue: string }
>(
  'auth/signup',
  async (userCredentials: UserSignupCredentials, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<SignupResponse> = await axios.post(
        '/api/users/signup',
        userCredentials,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const { user, token } = response.data;
      return { user, token };
    } catch (err) {
      let error;
      if (err instanceof AxiosError) {
        error = (err.response?.data as ApiError).error;
      } else {
        error = {
          message: 'Unexpected error has occurred',
          statusCode: 500,
          status: 'Internal Server Error',
        };
      }
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithToken = createAsyncThunk<
  User,
  undefined,
  { rejectValue: string }
>('auth/loginWithToken', async (_, { rejectWithValue }) => {
  const token = local.get<string>('access-token');
  if (!token) return rejectWithValue('No access token');
  try {
    const response: AxiosResponse<Omit<LoginResponse, 'token'>> =
      await axios.get('/api/users/login/token', {
        headers: { Authorization: `Bearer ${token}` },
      });
    return response.data.user;
  } catch (err) {
    return rejectWithValue('Invalid token');
  }
});
