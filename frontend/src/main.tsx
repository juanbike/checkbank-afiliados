import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'
import { logFrontendError } from './utils/logger'

// Captura de errores globales del navegador
window.onerror = (message, source, lineno, colno, error) => {
  logFrontendError(error || message, `Global window.onerror at ${source}:${lineno}:${colno}`);
};

window.onunhandledrejection = (event) => {
  logFrontendError(event.reason, 'Unhandled Promise Rejection');
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
