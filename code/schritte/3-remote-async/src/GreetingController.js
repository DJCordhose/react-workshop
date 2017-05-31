import React from 'react';

import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';

const BACKEND_URL = 'http://localhost:7000/greetings';
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
                    <GreetingDetail onSave={(greeting) => this.saveGreeting(greeting)}/>
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
        (async () => {
            try {
                const response = await fetch(BACKEND_URL);
                const json = await response.json();
                this.setState({greetings: json});
            } catch (err) {
                console.error('LOADING GREETINGS FAILED:', err);
            }
        })();
    }

    // should work, but cause error in browser

    // async loadGreetings() {
    //     try {
    //         const response = await fetch(BACKEND_URL);
    //         const json = await response.json();
    //         this.setState({greetings: json});
    //         return json;
    //     } catch (err) {
    //         console.error('LOADING GREETINGS FAILED:', err);
    //     }
    // }

    saveGreeting(greetingToBeAdded) {
        (async () => {
            try {
                const response = await fetch(BACKEND_URL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(greetingToBeAdded)
                });
                if (response.status !== 201) {
                    throw new Error('Invalid status code: ' + response.status);
                }
                const json = await response.json();
                // the server responded with the id of the new Greeting
                const newGreetingId = json.id;
                // create a new Greeting object that contains the received id
                // (create a new object for immutability)
                const newGreeting = {...greetingToBeAdded, id: newGreetingId};
                // add the new greetings to the list of all greetings
                // (create a new array for immutability)
                const newGreetings = [...this.state.greetings, newGreeting];

                // set the new list of greetings as our new state
                // also set 'MODE_MASTER' to make sure the master-View is
                // displayed now
                this.setState({
                    greetings: newGreetings,
                    mode: MODE_MASTER
                });
            } catch (err) {
                console.error('LOADING GREETINGS FAILED:', err);
            }
        })();
    }
}
