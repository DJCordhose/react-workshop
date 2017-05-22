import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const greetingReducer = (state = 'Hello', action) => {
  switch (action.type) {
    case 'CLEAR':
      return '';
    case 'UPDATE':
      return action.greeting;
  }
  return state;
};

// http://redux.js.org/docs/api/createStore.html
const store = createStore(
  combineReducers({
    greeting: greetingReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

import HelloMessage from './HelloMessage';
const mountNode = document.getElementById('mount');
ReactDOM.render(
  <Provider store={store}>
    <HelloMessage />
  </Provider>,
  mountNode
);

