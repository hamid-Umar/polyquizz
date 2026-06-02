import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext'; // Import du Provider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider> {/* On enveloppe l'app ici */}
      <App />
    </UserProvider>
  </React.StrictMode>
);
