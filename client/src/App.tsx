// import Button from './stories/Button/Button'

import ThemeToggler from './components/ThemeToggler/ThemeToggler'
import { useTheme } from './contexts/ThemeContext'

export default function App() {
  return (
    <div className="text-black dark:text-white">
      App
      <ThemeToggler />
    </div>
  )
}
