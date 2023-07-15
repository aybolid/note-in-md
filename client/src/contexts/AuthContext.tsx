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

const useProvideAuth = () => {
  const [user, setUser] = React.useState<User | null>(null)
  const [authError, setAuthError] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    const accessToken = local.get<string>('access-token')
    if (!accessToken) return setLoading(false)
    auth
      .loginUserWithToken(accessToken)
      .then(({ data, error }) => {
        if (error) {
          local.remove('access-token')
          setAuthError(error.message)
          return
        }
        const { user: fetchedUser } = data!
        setAuthError('')
        setUser(fetchedUser)
      })
      .catch((err) => {
        local.remove('access-token')
        console.error('An error occurred during login with token:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  const signup = async (userCredentials: UserSignupCredentials) => {
    setLoading(true)
    try {
      const { error } = await auth.signupUser(userCredentials)
      if (error) {
        setAuthError(error.message)
        return
      }
      setAuthError('')
      await login({ email: userCredentials.email, password: userCredentials.password })
    } catch (err) {
      setAuthError('Unexpected error occurred')
      console.error('An error occurred during signup:', err)
    } finally {
      setLoading(false)
    }
  }

  const login = async (userCredentials: UserLoginCredentials) => {
    setLoading(true)
    try {
      const { data, error } = await auth.loginUser(userCredentials)
      if (error) {
        setAuthError(error.message)
        return
      }
      const { token, user: fetchedUser } = data!

      local.store('access-token', token)
      setAuthError('')
      setUser(fetchedUser)
    } catch (err) {
      setAuthError('Unexpected error occurred')
      console.error('An error occurred during login:', err)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    local.remove('access-token')
    setUser(null)
  }

  return {
    user,
    authError,
    loading,
    signup,
    login,
    logout,
  }
}
