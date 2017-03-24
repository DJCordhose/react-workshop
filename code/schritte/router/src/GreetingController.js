import React from "react";
import {HashRouter as Router, Route} from "react-router-dom";

import {loadFromServer, saveToServer} from "./backend";

import GreetingMaster from "./GreetingMaster";
import GreetingDetail from "./GreetingDetail";
import Chart from "./Chart";
import {aggregateGreetings} from "./util";

export default class GreetingController extends React.Component {
    render() {
        const {greetings, filter} = this.state;
        const aggregatedGreetings = aggregateGreetings(greetings);
        const filtered = filter ? greetings.filter(greeting => greeting.name === filter) : greetings;

        return (
            <Router>
                <div className="Main">
                    <div className="Left">
                        <Route exact path="/" render={() => (
                            <GreetingMaster greetings={filtered}
                                            onAdd={() => this.redirectTo('/add')}
                            />)
                        }/>
                        <Route path="/add" render={() => (
                            <GreetingDetail onAdd={(greeting) => this.saveGreeting(greeting)}/>
                        )}/>
                    </div>
                    <div className="Right">
                        <Chart data={aggregatedGreetings} onSegmentSelected={filter => {
                            if (this.state.filter === filter) {
                                // reset filter when clicking again
                                this.setState({filter: null})
                            } else {
                                this.setState({filter})
                            }
                        }}/>
                    </div>
                </div>
            </Router>);
    }

    constructor(props) {
        super(props);
        this.state = {
            greetings: [],
            mode: MODE_MASTER,
            filter: null
        };
    }

    componentDidMount() {
        this.loadGreetings();
    }

    loadGreetings() {
        loadFromServer(
            greetings => this.setState({greetings}),
            err => console.error('LOADING GREETINGS FAILED:', err)
        );
    }


    saveGreeting(greetingToBeAdded) {
        const _addNewGreeting = serverResponse => {
            // the server responded with the id of the new Greeting
            const newGreetingId = serverResponse.id;
            // create a new Greeting object that contains the received id
            // (create a new object for immutability)
            const newGreeting = {...greetingToBeAdded, id: newGreetingId};
            // add the new greetings to the list of all greetings
            // (create a new array for immutability)
            const newGreetings = [...this.state.greetings, newGreeting];

            // set the new list of greetings as our new state
            this.setState({
                greetings: newGreetings,
            });

            // redirect to master view
            this.redirectTo('/');

            return newGreeting;
        };

        const _reportError = err => console.error('COULD NOT SAVE GREETING: ', err);

        saveToServer(greetingToBeAdded, _addNewGreeting, _reportError);
    }

    redirectTo(path) {
        const {history} = this.props;
        history.push(path);
    }
}

