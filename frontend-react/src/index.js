import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { tx } from '@transifex/native';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import './i18n';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';

tx.init({
  token: '1/0295575608a243c1442a518c21751c8d6b1f2c53',
  sourceLocale: 'en',
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
