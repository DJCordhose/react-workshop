import React, {PropTypes} from 'react';

export default class GreetingDetail extends React.Component {
    render() {
        const {name, greeting} = this.state;

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
                    onClick={() => this.save()}>
                    Save
                </button>
            </div>);
    }

    constructor(props) {
        super(props);
        const {name, greeting} = this.props.greeting || {name: '', greeting: ''};
        this.state = {
            name,
            greeting
        };
    }

    reset() {
        this.setState({name: '', greeting: ''});
        if (this.input) {
            this.input.focus();
        }
    }

    save() {
        const {onAdd} = this.props;
        const {name, greeting} = this.state;
        onAdd({
            name,
            greeting
        });
    }

    updateModel(event) {
        this.setState({[event.target.name]: event.target.value});
    }
}
GreetingDetail.propTypes = {
    greeting: PropTypes.shape({
        name: PropTypes.string.isRequired,
        greeting: PropTypes.string.isRequired
    }),
    onAdd: PropTypes.func.isRequired
};
