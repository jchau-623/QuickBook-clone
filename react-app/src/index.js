import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store';
import './tailwind.css';
import './output.css';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
