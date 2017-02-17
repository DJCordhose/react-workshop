import React from 'react';

import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';
import Chart from './Chart';
import { connect } from 'react-redux';
import { setFilter } from './actions';

import {aggregateGreetings, filterGreetings} from './selectors';

const MODE_MASTER = 'MODE_MASTER';
const MODE_DETAIL = 'MODE_DETAIL';

class GreetingController extends React.Component {
    render() {
        const {mode} = this.state;
        const {aggregatedGreetings, greetings} = this.props;

        return (
            <div className="Main">
                <div className="Left">
                    {mode === MODE_MASTER ?
                        <GreetingMaster greetings={greetings}
                                        onAdd={() => this.setState({mode: MODE_DETAIL})}
                        /> :
                        <GreetingDetail onAdd={(greeting) => this.saveGreeting(greeting)}/>
                    }
                </div>
                <div className="Right">
                    <Chart data={aggregatedGreetings} onSegmentSelected={filter => {
                        if (this.state.filter === filter) {
                            // reset filter when clicking again
                            this.setState({filter: null})
                        } else {
                            this.setState({filter})
                        }
                    }}/>
                </div>
            </div>);
    }

    constructor(props) {
        super(props);
        this.state = {
            mode: MODE_MASTER,
        };
    }

}

export default connect(
    state => ({
        aggregatedGreetings: aggregateGreetings(state.greetings),
        greetings: filterGreetings(state.greetings, state.filter)
    }),
    (dispatch) => ({
        onSetFilter: filter => dispatch(setFilter(filter))
    })
)(GreetingController);
