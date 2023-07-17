import axios, { AxiosError, AxiosResponse } from 'axios'
import type { LoginResponse, SignupResponse, UserLoginCredentials, UserSignupCredentials } from '../../types/auth'
import type { ApiError } from '../../types/api'

const signupUser = async (userCredentials: UserSignupCredentials) => {
  let data: SignupResponse | undefined, error
  try {
    const response: AxiosResponse<SignupResponse> = await axios.post('/api/users/signup', userCredentials, {
      headers: { 'Content-Type': 'application/json' },
    })
    data = response.data
  } catch (err) {
    if (err instanceof AxiosError) {
      error = (err.response?.data as ApiError).error
    } else {
      error = {
        message: 'Unexpected error has occurred',
        statusCode: 500,
        status: 'Internal Server Error',
      }
    }
  }
  return { error, data }
}

const loginUser = async (userCredentials: UserLoginCredentials) => {
  let data: LoginResponse | undefined, error
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post('/api/users/login', userCredentials, {
      headers: { 'Content-Type': 'application/json' },
    })
    data = response.data
  } catch (err) {
    if (err instanceof AxiosError) {
      error = (err.response?.data as ApiError).error
    } else {
      error = {
        message: 'Unexpected error has occurred',
        statusCode: 500,
        status: 'Internal Server Error',
      }
    }
  }
  return { error, data }
}

const loginUserWithToken = async (token: string) => {
  let data: Omit<LoginResponse, 'token'> | undefined, error
  try {
    const response: AxiosResponse<Omit<LoginResponse, 'token'>> = await axios.get('/api/users/login/token', {
      headers: { Authorization: `Bearer ${token}` },
    })
    data = response.data
  } catch (err) {
    if (err instanceof AxiosError) {
      error = (err.response?.data as ApiError).error
    } else {
      error = {
        message: 'Unexpected error has occurred',
        statusCode: 500,
        status: 'Internal Server Error',
      }
    }
  }
  return { error, data }
}

const auth = { signupUser, loginUser, loginUserWithToken }

export default auth
