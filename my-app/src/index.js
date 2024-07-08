import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { store } from './component/Reduxuse/store';
import {MyMessageProvider, MyProvider } from './component/contextapi/CreateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <MyProvider>
      <MyMessageProvider>
        <App />
      </MyMessageProvider>
    </MyProvider>
  </Provider>
);


