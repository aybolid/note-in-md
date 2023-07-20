import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import MarkdownTutorialPage from './pages/MarkdownTutorialPage';
import AuthPage from './pages/AuthPage';
import ErrorPage from './pages/ErrorPage';
import UserProfilePage from './pages/UserProfilePage';
import NoteEditorPage from './pages/NoteEditorPage';
import ProtectedRoute from './components/utils/ProtectedRoute';
import RootLayout from './components/RootLayout';
import local from './utils/localStorage';
import { useAppDispatch, useAppSelector } from './lib/redux/store';
import { loginWithToken } from './lib/redux/slices/auth/authThunk';
import { selectTheme } from './lib/redux/slices/theme/themeSlice';

const protect = (route: React.ReactNode) => {
  return <ProtectedRoute>{route}</ProtectedRoute>;
};

const layoutWrapper = (route: React.ReactNode) => {
  return <RootLayout>{route}</RootLayout>;
};

export default function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const HTMLRef = useRef(document.querySelector('html'));

  React.useEffect(() => {
    theme.mode === 'dark'
      ? HTMLRef.current?.classList.add('dark')
      : HTMLRef.current?.classList.remove('dark');
  }, [theme]);

  React.useEffect(() => {
    const token = local.get<string>('access-token');
    const login = async () => {
      await dispatch(loginWithToken(token));
    };
    login().catch((err) => console.log(err)); 
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={layoutWrapper(<MainPage />)} />
        <Route path="/new-note" element={layoutWrapper(<NoteEditorPage />)} />
        <Route path="/about" element={layoutWrapper(<AboutPage />)} />
        <Route
          path="/md-tutorial"
          element={layoutWrapper(<MarkdownTutorialPage />)}
        />
        <Route path="/auth/:action" element={<AuthPage />} />
        <Route
          path="/profile"
          element={protect(layoutWrapper(<UserProfilePage />))}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
