import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../lib/redux/store';
import { selectAuth } from '../lib/redux/slices/auth/authSlice';
import LogInForm from '../components/AuthForm/LogInForm';
import SignUpForm from '../components/AuthForm/SignUpForm';

export default function AuthPage() {
  const { user, authError } = useAppSelector(selectAuth);
  const { action } = useParams();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen flex justify-center px-3">
      {action === 'login' ? <LogInForm /> : <SignUpForm />}
      {authError && <p>{authError}</p>}
    </div>
  );
}
