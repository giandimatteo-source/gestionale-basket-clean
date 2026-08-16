import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Add animation styles for update notification
const style = document.createElement('style');
style.innerHTML = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  .update-notification {
    animation: slideInRight 300ms ease-out;
  }

  .update-notification.closing {
    animation: slideOutRight 300ms ease-out forwards;
  }
`;
document.head.appendChild(style);

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
        updateMessage.className = 'update-notification';
        updateMessage.style.cssText = `
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: linear-gradient(135deg, rgba(26, 31, 58, 0.98), rgba(10, 14, 39, 0.98));
          border: 2px solid rgba(0, 217, 255, 0.6);
          border-radius: 12px;
          padding: 20px 24px;
          color: #fff;
          font-size: 15px;
          font-weight: 500;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 16px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 217, 255, 0.15), 0 0 0 1px rgba(0, 217, 255, 0.1);
          max-width: 380px;
          min-width: 300px;
        `;

        updateMessage.innerHTML = `
          <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
            <div style="font-weight: 600; color: #00D9FF;">Nuova versione disponibile</div>
            <div style="font-size: 13px; color: rgba(255, 255, 255, 0.7);">Scarica gli ultimi aggiornamenti</div>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button id="update-btn" style="
              background: linear-gradient(135deg, rgba(0, 217, 255, 0.3), rgba(0, 217, 255, 0.15));
              color: #00D9FF;
              border: 1.5px solid rgba(0, 217, 255, 0.6);
              padding: 8px 16px;
              border-radius: 6px;
              cursor: pointer;
              font-weight: 600;
              font-size: 13px;
              transition: all 200ms ease;
            " onmouseover="this.style.background='rgba(0, 217, 255, 0.4)'; this.style.boxShadow='0 0 12px rgba(0, 217, 255, 0.3)';" onmouseout="this.style.background='linear-gradient(135deg, rgba(0, 217, 255, 0.3), rgba(0, 217, 255, 0.15))'; this.style.boxShadow='none';">Aggiorna</button>
            <button id="close-btn" style="
              background: transparent;
              color: rgba(255, 255, 255, 0.6);
              border: none;
              padding: 4px 8px;
              cursor: pointer;
              font-size: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 200ms ease;
            " title="Chiudi" onmouseover="this.style.color='rgba(255, 255, 255, 0.9)';" onmouseout="this.style.color='rgba(255, 255, 255, 0.6)';">×</button>
          </div>
        `;

        document.body.appendChild(updateMessage);

        // Close button handler
        document.getElementById('close-btn').addEventListener('click', () => {
          updateMessage.classList.add('closing');
          setTimeout(() => {
            updateMessage.remove();
          }, 300);
        });

        // Update button handler
        document.getElementById('update-btn').addEventListener('click', () => {
          updateMessage.classList.add('closing');
          // Tell the Service Worker to skip waiting
          navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });

          // Reload after animation completes
          setTimeout(() => {
            window.location.reload();
          }, 300);
        });
      }
    });
  }).catch(error => {
    console.error('Service Worker registration failed:', error);
  });
}
