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
