// @flow

import React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

import type {State} from './store';

type Props = State & {
    // greeting: string;
    repeat?: boolean;
    resetGreeting: typeof actions.resetGreeting;
    updateGreeting: typeof actions.updateGreeting;
};

class HelloMessage extends React.Component<void, Props, void> {
    input: HTMLInputElement;
    render() {
        // ERROR: Type 'Readonly<{ children?: ReactNode; }> & Readonly<Props>' has no property 'updateGreting' and no string index signature.
        // const { greeting, repeat, updateGreting } = this.props;
        const { greeting, repeat, updateGreeting } = this.props;

        const output = <p>{greeting}, World</p>;

        return (
            <div>
                <input ref={input => this.input = input}
                       onChange={event => updateGreeting(event.currentTarget.value)}
                       value={greeting} />
                {output}
                {
                    repeat && output
                }
                <button
                    onClick={() => this.reset()}>
                    Clear
                </button>
            </div>);
    }
    reset() {
        const { resetGreeting } = this.props;
        this.input.focus();
        resetGreeting();
    }
}

export default connect(
    state => ({greeting: state.greeting}),
    actions
)(HelloMessage);
