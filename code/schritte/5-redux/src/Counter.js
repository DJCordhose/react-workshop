import React from 'react';
import {connect} from 'react-redux';

import {filterGreetings} from './selectors';

const Counter = ({greetings, filteredGreetings}) => (
    <div className="Counter">Showing {filteredGreetings.length} of {greetings.length} Greetings</div>
);

export default connect(
    state => ({
        greetings: state.greetings,
        filteredGreetings: filterGreetings(state.greetings, state.filter)
    })
)(Counter);