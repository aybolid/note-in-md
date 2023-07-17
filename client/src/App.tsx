import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import MarkdownTutorialPage from './pages/MarkdownTutorialPage';
import AuthPage from './pages/AuthPage';
import ErrorPage from './pages/ErrorPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './components/utils/ProtectedRoute';
import RootLayout from './components/RootLayout';

const protect = (route: React.ReactNode) => {
  return <ProtectedRoute>{route}</ProtectedRoute>;
};

const layoutWrapper = (route: React.ReactNode) => {
  return <RootLayout>{route}</RootLayout>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={layoutWrapper(<MainPage />)} />
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
