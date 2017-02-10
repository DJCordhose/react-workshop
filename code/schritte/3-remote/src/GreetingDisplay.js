import React from 'react';

const BACKEND_URL = 'https://gruss.firebaseio.com/rest/';
const path = 'greetings';

export default class GreetingDisplay extends React.Component {
    render() {
        const {name, greeting} = this.state;
        if (greeting && name) {
            return <h1>{greeting}, {name}</h1>;
        } else {
            return null;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            greeting: ''
        };
    }

    componentWillReceiveProps(props) {
        const id = props.params.id;
        if (id) {
            this._loadFromServer(id);
        }
    }


    componentDidMount() {
        const id = this.props.params.id;
        if (id) {
            this._loadFromServer(id);
        }
    }

    // response is object with at most one key for greeting
    _setGreeting(response) {
        const keys = Object.keys(response);
        let greeting = {
            name: '',
            greeting: ''
        };
        if (keys.length === 1) {
            greeting = response[keys[0]];
        }
        this.setState(greeting);
    }

    // curl 'https://gruss.firebaseio.com/rest/greetings/1.json'
    // curl 'https://gruss.firebaseio.com/rest/greetings.json?orderBy="id"&equalTo=3'
    // added to rules:
    //     "rest": {
    //       "greetings": {
    //         ".indexOn": ["id"]
    //       }
    //     }
    _loadFromServer(id) {
        const url = `${BACKEND_URL}${path}.json?orderBy="id"&equalTo=${id}`;

        return fetch(url)
            .then(response => response.json())
            .then(response => this._setGreeting(response))
            .catch(ex => console.error('request failed', ex));
    }

}
