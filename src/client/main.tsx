import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);
