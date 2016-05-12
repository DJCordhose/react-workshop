import React from 'react';
import ReactDOM from 'react-dom';

import GreetingController from './GreetingController';

// http://localhost:63342/react-workshop/code/schritte/2-hierarchy/public/index.html#greet?name=Nils&greeting=Huhu
const mountNode = document.getElementById('mount');
const router = <Router history={browserHistory}>
    <Route path="/" component={Layout}>
        <Route path="admin" component={GreetingController} />
        <Route path="greet" component={GreetingDisplay} />
        <Route path="*" component={NoMatch} />
    </Route>
</Router>;


ReactDOM.render(<GreetingController />, mountNode);
