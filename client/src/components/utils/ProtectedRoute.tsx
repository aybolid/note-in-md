import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../lib/redux/store';
import { selectAuth } from '../../lib/redux/slices/auth/authSlice';

export default function ProtectedRoute({
  children,
  redirectTo,
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const { user, loading } = useAppSelector(selectAuth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={redirectTo || '/auth/signup'} />;
  }

  return children;
}
