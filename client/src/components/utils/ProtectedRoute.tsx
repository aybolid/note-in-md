import { useAuth } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, redirectTo }: { children: React.ReactNode; redirectTo?: string }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to={redirectTo || '/auth/signup'} />
  }

  return children
}
