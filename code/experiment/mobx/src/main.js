import React from 'react';
import ReactDOM from 'react-dom';

import GreetingController from './GreetingController';
import store from './store';

const mountNode = document.getElementById('mount');
ReactDOM.render(<GreetingController store={store}/>, mountNode);
