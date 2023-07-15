import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import MainPage from './pages/MainPage'
import AboutPage from './pages/AboutPage'
import MarkdownTutorialPage from './pages/MarkdownTutorialPage'
import AuthPage from './pages/AuthPage'
import ErrorPage from './pages/ErrorPage'
import UserProfilePage from './pages/UserProfilePage'
import ProtectedRoute from './components/utils/ProtectedRoute'

const navLinks = {
  Home: '/',
  About: '/about',
  'Markdown Tutorial': '/md-tutorial',
  Auth: '/auth/signup',
  Profile: '/profile',
  Error: '/this-route-does-not-exist',
}

const protect = (route: React.ReactNode) => {
  return <ProtectedRoute>{route}</ProtectedRoute>
}

export default function App() {
  return (
    <Router>
      <div>
        {Object.entries(navLinks).map(([label, to]) => (
          <NavLink key={to} className="mx-4" to={to}>
            {label}
          </NavLink>
        ))}
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/md-tutorial" element={<MarkdownTutorialPage />} />
        <Route path="/auth/:action" element={<AuthPage />} />
        <Route path="/profile" element={protect(<UserProfilePage />)} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}
