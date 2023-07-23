import React, { useRef } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import ProtectedRoute from './components/utils/ProtectedRoute';
import { loginWithToken } from './lib/redux/slices/auth/authThunk';
import { getUserNotes } from './lib/redux/slices/notes/notesThunk';
import { selectTheme } from './lib/redux/slices/theme/themeSlice';
import { useAppDispatch, useAppSelector } from './lib/redux/store';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/MainPage';
import MarkdownTutorialPage from './pages/MarkdownTutorialPage';
import NoteEditorPage from './pages/NoteEditorPage';
import UserProfilePage from './pages/UserProfilePage';

const protect = (route: React.ReactNode) => {
  return <ProtectedRoute>{route}</ProtectedRoute>;
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
    const login = async () => {
      await dispatch(loginWithToken());
    };
    const getNotes = async () => {
      await dispatch(getUserNotes());
    };
    login()
      .then(() => getNotes())
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/new-note" element={<NoteEditorPage />} />
          <Route path="/note/:id" element={protect(<NoteEditorPage />)} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/md-tutorial" element={<MarkdownTutorialPage />} />
          <Route path="/profile" element={protect(<UserProfilePage />)} />
        </Route>
        <Route path="/auth/:action" element={<AuthPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
