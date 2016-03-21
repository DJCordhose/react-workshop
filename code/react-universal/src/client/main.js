import React from 'react';
import ReactDOM from 'react-dom';

import HelloMessage from '../common/HelloMessage';

const greeting = window.__INITIAL_STATE__;
//const greeting = 'Huhu';
var mountNode = document.getElementById('mount');
ReactDOM.render(<HelloMessage greeting={greeting}/>, mountNode);
