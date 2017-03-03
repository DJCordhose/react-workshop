import React from 'react';

export default class GreetingDetail extends React.Component {
    render() {
        const {name, greeting} = this.state;

        return (
            <div>
                <input ref={input => this.input = input}
                       onChange={event => this.updateModel('name', event.target.value)}
                       value={name}
                       placeholder="Name" />
                <input onChange={event => this.updateModel('greeting', event.target.value)}
                       value={greeting}
                       placeholder="Greeting" />
                <button
                    onClick={() => this.reset()}>
                    Clear
                </button>
            </div>);
    }
    constructor(props) {
        super(props);
        const {name, greeting} = this.props.greeting || {};
        this.state = {
            name,
            greeting
        };
    }
    reset() {
        this.setState({name: '', greeting: ''});
        this.input.focus();
    }
    updateModel(name, value) {
        this.setState({[name]: value});
    }
}
