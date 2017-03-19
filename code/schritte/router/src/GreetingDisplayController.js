import React from "react";
import {loadGreetingFromServer} from "./backend";

export default class GreetingDisplayController extends React.Component {
    componentDidMount() {
        this.loadGreeting();
    }

    loadGreeting() {
        const {params} = this.props;

        loadGreetingFromServer(params.greetingId,
            greeting => this.setState({greeting}),
            error => console.log('FAILED TO LOAD GREETING:', error)
        );
    }

    render() {
        if (!this.state) {
            return <h1>No Greeting loaded</h1>;
        }

        const {greeting} = this.state;

        // In a real-world, more complex example the rendering of the greeting would go to it's own dump component
        return <h1>{greeting.greeting}, {greeting.name}</h1>;
    }
}