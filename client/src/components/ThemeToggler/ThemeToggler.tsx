import { useTheme } from '../../contexts/ThemeContext'
import Button from '../../stories/Button/Button'
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md'

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme()
  console.log('theme: ', theme)

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <div className="m-2">
      <Button as="btn"  type="button" variant="secondary" size="small" onClick={toggleTheme}>
        {theme === 'dark' ? <MdDarkMode size={'1.5rem'} /> : <MdOutlineDarkMode size={'1.5rem'} />}
      </Button>
    </div>
  )
}

export default ThemeToggler
