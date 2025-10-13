import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from 'react-oauth2-code-pkce';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { authConfig } from './auth.config.ts';
import { store } from './redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthProvider authConfig={authConfig}>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthProvider>
  </Provider>
);
