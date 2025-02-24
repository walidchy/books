import React from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import reducer  from './reducer';
import ReactDOM from 'react-dom/client'
import App  from './App';
import "./a.css";
import { legacy_createStore  } from 'redux';
 const store = legacy_createStore(reducer);
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);