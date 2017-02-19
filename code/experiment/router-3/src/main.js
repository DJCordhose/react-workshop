import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import GreetingController from './GreetingController';
import GreetingDisplay from './GreetingDisplay';
import Layout from './Layout';

const mountNode = document.getElementById('mount');
const router = <Router history={hashHistory }>
    <Route path="/" component={Layout}>
        <IndexRoute component={GreetingController} />
        <Route path="greet" component={GreetingDisplay} />
    </Route>
</Router>;

ReactDOM.render(router, mountNode);
