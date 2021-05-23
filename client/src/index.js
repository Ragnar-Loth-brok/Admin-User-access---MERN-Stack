import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import InfoContextProvider from './context/InfoContext';

ReactDOM.render(
  <React.StrictMode>
    <InfoContextProvider>
      <App />
    </InfoContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


