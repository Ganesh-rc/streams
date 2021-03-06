import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

console.log("hello");

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
    );

ReactDOM.render(
    <Provider store={store}>
        <App  />
    </Provider>,
    document.querySelector('#root')
    );
