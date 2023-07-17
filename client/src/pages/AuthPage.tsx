/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAuth } from '../contexts/AuthContext';
import { Navigate, NavLink } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';

export default function AuthPage() {
  const { user, authError } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavLink to={'/'}>Go Back</NavLink>
      <AuthForm />
      {authError && <p>{authError}</p>}
    </>
  );
}
