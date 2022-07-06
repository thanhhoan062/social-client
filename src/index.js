import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './context/appContext';
import './index.css';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
