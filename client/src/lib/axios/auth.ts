import axios, { AxiosResponse } from 'axios'
import type { LoginResponse, SignupResponse, UserLoginCredentials, UserSignupCredentials } from '../../types/auth'
import type { ApiError } from '../../types/api'

const signupUser = async (userCredentials: UserSignupCredentials) => {
  try {
    const response: AxiosResponse<SignupResponse> = await axios.post('/api/users/signup', userCredentials, {
      headers: { 'Content-Type': 'application/json' },
    })
    return response.data
  } catch (err) {
    const data: ApiError = {
      error: { message: 'Unexpected error has occurred', status: 'Internal Server Error', statusCode: 500 },
    }
    if (axios.isAxiosError(err)) {
      return (err.response?.data as ApiError) || data
    }
    return data
  }
}

const loginUser = async (userCredentials: UserLoginCredentials) => {
  try {
    const response: AxiosResponse<LoginResponse | ApiError> = await axios.post('/api/users/login', userCredentials, {
      headers: { 'Content-Type': 'application/json' },
    })
    return response.data
  } catch (err) {
    const data: ApiError = {
      error: { message: 'Unexpected error has occurred', status: 'Internal Server Error', statusCode: 500 },
    }
    if (axios.isAxiosError(err)) {
      return (err.response?.data as ApiError) || data
    }
    return data
  }
}

const loginUserWithToken = async (token: string) => {
  try {
    const response: AxiosResponse<Omit<LoginResponse, 'token'> | ApiError> = await axios.get('/api/users/login/token', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (err) {
    const data: ApiError = {
      error: { message: 'Unexpected error has occurred', status: 'Internal Server Error', statusCode: 500 },
    }
    if (axios.isAxiosError(err)) {
      return (err.response?.data as ApiError) || data
    }
    return data
  }
}

const auth = { signupUser, loginUser, loginUserWithToken }

export default auth
