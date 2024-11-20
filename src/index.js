import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'mobx-react';
import appStore from './store.js';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider appStore={appStore}>
        <App />
    </Provider>,
    document.getElementById('root')
);
