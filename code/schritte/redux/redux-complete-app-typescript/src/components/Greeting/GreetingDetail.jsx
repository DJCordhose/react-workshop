import * as React from 'react';
import * as PropTypes from 'prop-types';

import {saveGreeting} from "../../actions";
import {connect} from "react-redux";

class GreetingDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            greeting: ''
        };
    }

    render() {
        const {name, greeting} = this.state;
        const saveDisabled = !(name && greeting);

        return (
            <div>
                <input ref={input => this.input = input}
                       onChange={event => this.updateModel(event)}
                       name="name"
                       value={name}
                       placeholder="Name"/>
                <input onChange={event => this.updateModel(event)}
                       name="greeting"
                       value={greeting}
                       placeholder="Greeting"/>
                <button
                    onClick={() => this.reset()}>
                    Clear
                </button>
                <button
                    disabled={saveDisabled}
                    onClick={() => this.save()}>
                    Save
                </button>
            </div>);
    }

    reset() {
        this.setState({name: '', greeting: ''});
        if (this.input) {
            this.input.focus();
        }
    }

    save() {
        const {onSave} = this.props;
        const {name, greeting} = this.state;
        onSave({
            name,
            greeting
        });
    }

	updateModel(event) {

		this.setState({ ...this.state, [event.currentTarget.name]: event.currentTarget.value })
    }
}

export default connect(
    null,
    {
        onSave: saveGreeting
    }
)(GreetingDetail);
