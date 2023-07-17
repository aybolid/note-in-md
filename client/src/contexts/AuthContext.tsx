import React from 'react'
import type { User, UserLoginCredentials, UserSignupCredentials } from '../types/auth'
import auth from '../lib/axios/auth'
import local from '../utils/localStorage'

interface AuthContextState {
  user: User | null
  authError: string
  loading: boolean
  signup: (user: UserSignupCredentials) => Promise<void>
  login: (user: UserLoginCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = React.createContext<AuthContextState | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return React.useContext(AuthContext) as AuthContextState
}

enum ActionType {
  SET_USER = 'SET_USER',
  SET_AUTH_ERROR = 'SET_AUTH_ERROR',
  SET_LOADING = 'SET_LOADING',
}
type Action =
  | { type: ActionType.SET_USER; payload: User | null }
  | { type: ActionType.SET_AUTH_ERROR; payload: string }
  | { type: ActionType.SET_LOADING; payload: boolean }
type State = {
  user: User | null
  authError: string
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: '',
  loading: true,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_USER:
      return { ...state, user: action.payload }
    case ActionType.SET_AUTH_ERROR:
      return { ...state, authError: action.payload }
    case ActionType.SET_LOADING:
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

const useProvideAuth = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    const accessToken = local.get<string>('access-token')
    if (!accessToken) return dispatch({ type: ActionType.SET_LOADING, payload: false })
    auth
      .loginUserWithToken(accessToken)
      .then(({ data, error }) => {
        if (error) {
          local.remove('access-token')
          dispatch({ type: ActionType.SET_AUTH_ERROR, payload: error.message })
          return
        }
        const { user: fetchedUser } = data!
        dispatch({ type: ActionType.SET_AUTH_ERROR, payload: '' })
        dispatch({ type: ActionType.SET_USER, payload: fetchedUser })
      })
      .catch(() => {
        local.remove('access-token')
      })
      .finally(() => dispatch({ type: ActionType.SET_LOADING, payload: false }))
  }, [])

  const signup = async (userCredentials: UserSignupCredentials) => {
    dispatch({ type: ActionType.SET_LOADING, payload: true })
    const { error } = await auth.signupUser(userCredentials)
    if (error) {
      dispatch({ type: ActionType.SET_AUTH_ERROR, payload: error.message })
      return
    }

    dispatch({ type: ActionType.SET_AUTH_ERROR, payload: '' })
    await login({ email: userCredentials.email, password: userCredentials.password })
    dispatch({ type: ActionType.SET_LOADING, payload: false })
  }

  const login = async (userCredentials: UserLoginCredentials) => {
    dispatch({ type: ActionType.SET_LOADING, payload: true })
    const { data, error } = await auth.loginUser(userCredentials)
    if (error) {
      dispatch({ type: ActionType.SET_AUTH_ERROR, payload: error.message })
      return
    }
    const { token, user: fetchedUser } = data!

    local.store('access-token', token)
    dispatch({ type: ActionType.SET_AUTH_ERROR, payload: '' })
    dispatch({ type: ActionType.SET_USER, payload: fetchedUser })
    dispatch({ type: ActionType.SET_LOADING, payload: false })
  }

  const logout = () => {
    local.remove('access-token')
    dispatch({ type: ActionType.SET_USER, payload: null })
  }

  return {
    user: state.user,
    authError: state.authError,
    loading: state.loading,
    signup,
    login,
    logout,
  }
}
