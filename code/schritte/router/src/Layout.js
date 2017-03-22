import React from "react";

import GreetingController from "./GreetingController";
import GreetingDisplayController from "./GreetingDisplayController";
import {HashRouter as Router, Route} from "react-router-dom";

const Layout = props => (
    <Router>
        <div>
            <h1>Greetings</h1>
            <Route exact path="/" component={GreetingController}/>
            <Route path="/greet/:greetingId" component={GreetingDisplayController}/>
            {props.children}
        </div>
    </Router>
);

export default Layout;