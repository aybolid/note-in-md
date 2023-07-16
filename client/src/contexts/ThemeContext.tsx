import { FC, ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react'
import local from '../utils/localStorage'

export interface ThemeContextState {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

const ThemeContext = createContext<ThemeContextState | null>(null)

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useProviderTheme()

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

const useProviderTheme = (): ThemeContextState => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (local.get('theme') as 'light' | 'dark') ?? 'dark')

  const HTMLRef = useRef(document.querySelector('html'))

  useEffect(() => {
    local.store('theme', theme)
  }, [theme])

  if (theme === 'light') {
    HTMLRef.current?.classList.remove('dark')
  } else {
    HTMLRef.current?.classList.add('dark')
  }

  return { theme, setTheme }
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextState => {
  return useContext(ThemeContext) as ThemeContextState
}
