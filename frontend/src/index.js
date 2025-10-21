import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from './components/ui/toaster';

// Debug: catch global errors and promise rejections to surface issues
window.addEventListener('error', (e) => {
  console.error('Global error captured:', e.error || e.message, e);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found: #root');
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
        <Toaster />
      </React.StrictMode>
    );
    console.log('React mounted successfully');
  } catch (err) {
    console.error('React render error:', err);
  }
}