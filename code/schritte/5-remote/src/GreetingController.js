import React from 'react';
import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';

let currentId = 0;

const MODE_MASTER = 'MODE_MASTER';
const MODE_DETAIL = 'MODE_DETAIL';

const BACKEND_URL = 'https://gruss.firebaseio.com/rest/';
const path = 'greetings';

export default class GreetingController extends React.Component {
    render() {
        const {mode, greetings} = this.state;
        return (
            <div>
                {mode === MODE_MASTER ? 
                    <GreetingMaster greetings={greetings}
                        onAdd={() => this.enterAdd()}
                    /> :
                    <GreetingDetail onAdd={(greeting) => this.addGreeting(greeting)}
                    />
                }
            </div>);
    }
    constructor(props) {
        super(props);
        const sampleGreetings = [];
        this.state = {
            greetings: sampleGreetings,
            mode: MODE_MASTER
        };
    }

    componentDidMount() {
        this._loadFromServer();
    }

    // admin: https://gruss.firebaseio.com/
    //  curl 'https://gruss.firebaseio.com/rest/greetings.json'
    _loadFromServer() {
        const url = `${BACKEND_URL}${path}.json`;

        return fetch(url)
            .then(response => response.json())
            .then(greetings => {
                this.setState({
                    greetings
                });
                this._updateHighestId(greetings);
            })
            .catch(ex => console.error('request failed', ex));
    }

    _updateHighestId(greetings) {
        greetings.forEach(greeting => (greeting.id >=currentId) && (currentId = greeting.id + 1));
    }

    // curl -X PUT -d '[{ "id": 1, "name": "Oma", "greeting": "Hiho"}, {"id": 2, "name": "Opa"}]' 'https://gruss.firebaseio.com/rest/greetings.json'
    _saveToServer() {
        const url = `${BACKEND_URL}${path}.json`;

        return fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.greetings)
        })
        .then(() => this._loadFromServer())
        .catch(ex => console.error('request failed', ex));
    }

    enterAdd() {
        this.setState({
            mode: MODE_DETAIL
        });
    }

    addGreeting(greetingToBeAdded) {
        const {greetings} = this.state;
        greetingToBeAdded.id = currentId++;
        greetings.push(greetingToBeAdded);
        this.setState({
            greetings,
            mode: MODE_MASTER
        }, () => this._saveToServer());
    }
}
