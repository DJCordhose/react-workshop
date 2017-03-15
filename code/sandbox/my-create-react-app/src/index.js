import React from 'react';
import ReactDOM from 'react-dom';
import GreetingController from './GreetingController';

import './normalize.css';
import './styles.css';
import './lib/nv.d3.css';
import './google-fonts.css';

ReactDOM.render(
  <GreetingController />,
  document.getElementById('root')
);
