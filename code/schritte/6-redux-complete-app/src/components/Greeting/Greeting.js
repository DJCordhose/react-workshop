import React from 'react';
import { connect } from 'react-redux';

import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';
import {MODE_MASTER} from '../../actions';

const Greeting = ({mode}) => mode === MODE_MASTER ? <GreetingMaster /> :<GreetingDetail />;

export default connect(
    state => ({
        mode: state.mode
    })
)(Greeting);
