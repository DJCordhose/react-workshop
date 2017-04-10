import React from 'react';
import ReactDOM from 'react-dom';

import HelloMessage from './HelloMessage';

const mountNode = document.getElementById('mount');
ReactDOM.render(<HelloMessage greeting="Hello"/>, mountNode);

// TODO
// - simpleHOC: Extracting state to HOC
// - withBreakpoint: for XING