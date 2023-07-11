import React from 'react'
import type { User, UserLoginCredentials, UserSignupCredentials } from '../types/auth'
import auth from '../lib/axios/auth'

interface AuthContextState {
  user: User | null
  authError: string
  signup: (user: UserSignupCredentials) => Promise<void>
  login: (user: UserLoginCredentials) => Promise<void>
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

const useProvideAuth = () => {
  const [user, setUser] = React.useState<User | null>(null)
  const [authError, setAuthError] = React.useState<string>('')

  const signup = async (userCredentials: UserSignupCredentials) => {
    try {
      const data = await auth.signupUser(userCredentials)
      console.log('data: ', data)
      if ('error' in data) {
        const error = data.error.message
        setAuthError(error)
        return
      }
      setAuthError('')
      await login({ email: userCredentials.email, password: userCredentials.password })
    } catch (err) {
      console.error('An error occurred during signup:', err)
    }
  }

  const login = async (userCredentials: UserLoginCredentials) => {
    try {
      const data = await auth.loginUser(userCredentials)
      if ('error' in data) {
        const error = data.error.message
        setAuthError(error)
        return
      }

      const { user: fetchedUser } = data
      setAuthError('')
      setUser(fetchedUser)
    } catch (err) {
      console.error('An error occurred during login:', err)
    }
  }

  return {
    user,
    authError,
    signup,
    login,
  }
}
