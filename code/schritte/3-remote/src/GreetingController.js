import React from 'react';

import {loadFromServer, saveToServer} from './backend';

import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';

const MODE_MASTER = 'MODE_MASTER';
const MODE_DETAIL = 'MODE_DETAIL';

export default class GreetingController extends React.Component {
    render() {
        const {mode, greetings} = this.state;
        return (
            <div>
                {mode === MODE_MASTER ?
                    <GreetingMaster greetings={greetings}
                                    onAdd={() => this.setState({mode: MODE_DETAIL})}
                    /> :
                    <GreetingDetail onAdd={(greeting) => this.saveGreeting(greeting)}/>
                }
            </div>);
    }

    constructor(props) {
        super(props);
        this.state = {
            greetings: [],
            mode: MODE_MASTER
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
            const newGreeting = Object.assign({}, greetingToBeAdded, {id: newGreetingId});
            // add the new greetings to the list of all greetings
            // (create a new array for immutability)
            const newGreetings = this.state.greetings.concat(newGreeting);

            // set the new list of greetings as our new state
            // also set 'MODE_MASTER' to make sure the master-View is
            // displayed now
            this.setState({
                greetings: newGreetings,
                mode: MODE_MASTER
            });

            return newGreeting;
        };

        const _reportError = err => console.error('COULD NOT SAVE GREETING: ', err);

        saveToServer(greetingToBeAdded, _addNewGreeting, _reportError);
    }
}

