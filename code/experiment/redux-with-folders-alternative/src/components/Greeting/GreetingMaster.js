import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import {filterGreetings} from '../../selectors';
import {MODE_DETAIL} from '../../actions';

function GreetingMaster(props) {
    const {greetings, onAdd} = props;
    const body = greetings.map(greeting => <tr key={greeting.id}><td>{greeting.name}</td><td>{greeting.greeting}</td></tr>);
    return (
        <div>
            <table>
                <thead>
                    <tr><th>Name</th><th>Greeting</th></tr>
                </thead>
                <tbody>
                {body}
                </tbody>
            </table>
            <button className="ActionButton"
                onClick={onAdd}>
                +
            </button>
        </div>
    );
}

export default connect(
    state => ({
        greetings: filterGreetings(state.greetings, state.filter),
        mode: state.mode
    }),
    dispatch => ({
        onAdd: () => dispatch(actions.setMode(MODE_DETAIL))
    })
)(GreetingMaster);
