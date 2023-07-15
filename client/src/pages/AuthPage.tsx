import TestAuth from '../components/test/TestAuth'
import { useAuth } from '../contexts/AuthContext'
import { Navigate, useParams, NavLink } from 'react-router-dom'

export default function AuthPage() {
  const { user } = useAuth()
  const { action } = useParams()

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div>AuthPage</div>
      <p>Action: {action}</p>
      <TestAuth />
      <div>
        <NavLink to={`/auth/${action === 'login' ? 'signup' : 'login'}`}>
          {action === 'login' ? 'signup link' : 'login link'}
        </NavLink>
      </div>
    </>
  )
}
