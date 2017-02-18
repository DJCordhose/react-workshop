import React from 'react';
import { connect } from 'react-redux';

import GreetingMaster from './master/GreetingMaster';
import GreetingDetail from './detail/GreetingDetail';
import Counter from './counter/Counter';
import Chart from './chart/Chart';
import {MODE_MASTER} from './state/actions';

const Layout = ({mode}) => (
            <div className="Main">
                <div className="Title">
                    <h1>Greeting App</h1>
                    <Counter />
                </div>
                <div className="Left">
                    {mode === MODE_MASTER ?
                        <GreetingMaster />
                        :
                        <GreetingDetail />
                    }
                </div>
                <div className="Right">
                    <Chart />
                </div>
            </div>
);

export default connect(
    state => ({
        mode: state.mode
    })
)(Layout);
