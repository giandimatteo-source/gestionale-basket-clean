import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(registration => {
    console.log('Service Worker registered:', registration);

    // Listen for update messages from Service Worker
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data && event.data.type === 'SW_UPDATE_AVAILABLE') {
        // Show update notification
        const updateMessage = document.createElement('div');
        updateMessage.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: rgba(26, 31, 58, 0.95);
          border: 2px solid rgba(0, 217, 255, 0.5);
          border-radius: 8px;
          padding: 16px 20px;
          color: #fff;
          font-size: 14px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 12px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        `;

        updateMessage.innerHTML = `
          <span style="flex: 1;">Nuova versione disponibile</span>
          <button id="update-btn" style="
            background: rgba(0, 217, 255, 0.2);
            color: #00D9FF;
            border: 1px solid rgba(0, 217, 255, 0.5);
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: all 200ms ease;
          ">Aggiorna</button>
        `;

        document.body.appendChild(updateMessage);

        document.getElementById('update-btn').addEventListener('click', () => {
          // Tell the Service Worker to skip waiting
          navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });

          // Reload after a short delay to ensure the new SW takes over
          setTimeout(() => {
            window.location.reload();
          }, 500);
        });
      }
    });
  }).catch(error => {
    console.error('Service Worker registration failed:', error);
  });
}
