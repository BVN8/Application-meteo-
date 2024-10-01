import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './page/App';

// Créer un conteneur racine pour rendre l'application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendre le composant App, qui inclut le Header
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);