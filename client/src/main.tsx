import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { Provider as ReduxProvider } from 'react-redux';
import store from './lib/redux/store.ts';

// eslint-disable-next-line react-refresh/only-export-components
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <ReduxProvider store={store}>
        {children}
        {/* <ThemeProvider>{children}</ThemeProvider> */}
      </ReduxProvider>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
