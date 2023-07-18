/* eslint-disable @typescript-eslint/no-misused-promises */ // ! зроби без цього бо у нас лінтеру це не подобається
import { Navigate, NavLink } from 'react-router-dom';
import AuthForm from '../components/AuthForm/AuthForm';
import { useAppSelector } from '../lib/redux/store';
import { selectAuth } from '../lib/redux/slices/auth/authSlice';

export default function AuthPage() {
  const { user, authError } = useAppSelector(selectAuth);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavLink to={'/'}>Go Back</NavLink>
      {/* //! не треба тут AuthForm, там мікро компонент суй його відразу сюди */}
      <AuthForm /> 
      {authError && <p>{authError}</p>}
    </>
  );
}
