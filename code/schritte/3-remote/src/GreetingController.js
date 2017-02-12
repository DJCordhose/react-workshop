import React from 'react';
import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';

const MODE_MASTER = 'MODE_MASTER';
const MODE_DETAIL = 'MODE_DETAIL';

const BACKEND_URL = 'http://localhost:7000/greetings';


function saveToServer(greetingToBeSaved) {
    // Three potential return "scenarios":
    // SCENARIO 1: Server responded, HTTP 201 => OK, as expected
    // SCENARIO 2: Server responded, HTTP != 201 => Server error (e.g. invalid data posted)
    // SCENARIO 3. Server does NOT respond at all (technical problems etc)

    const handleServerResponse = response => response.json()
        .then(json => response.status === 201 ?
            /* SCENARIO 1  */ {success: true, data: json}
            :
            /* SCENARIO 2 */ {success: false, error: json.error}
        );

    /* SCENARIO 3 */
    const handleServerError = err => ({success: false, error: err.message});

    return fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(greetingToBeSaved)
    }).then(handleServerResponse, handleServerError);
}


export default class GreetingController extends React.Component {
    render() {
        const {mode, greetings} = this.state;
        return (
            <div>
                {mode === MODE_MASTER ?
                    <GreetingMaster greetings={greetings}
                                    onAdd={() => this.setState({mode: MODE_DETAIL})}
                    /> :
                    <GreetingDetail onAdd={(greeting) => this.addGreeting(greeting)}/>
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
        this._loadFromServer();
    }

    _loadFromServer() {
        const url = `${BACKEND_URL}`;

        return fetch(url)
            .then(response => response.json())
            .then(greetings => {
                this.setState({
                    greetings
                });
            })
            .catch(ex => console.error('request failed', ex));
    }


    addGreeting(greetingToBeAdded) {
        const _addNewGreeting = (newGreetingId) => {
            const newGreeting = Object.assign({}, greetingToBeAdded, {id: newGreetingId});
            const newGreetings = this.state.greetings.concat(newGreeting);
            this.setState({
                greetings: newGreetings,
                mode: MODE_MASTER
            });

            return newGreeting;
        };

        return saveToServer(greetingToBeAdded)
            .then(result => result.success ? _addNewGreeting(result.id) : console.error('COULD NOT SAVE GREETING: ', result.error))
            .catch(err => console.error('An Error occurred:', err));
    }
}

