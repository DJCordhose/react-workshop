import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';
import Counter from './Counter';
import Chart from './Chart';
import * as actions from './actions';

import {filterGreetings} from './selectors';
import {MODE_MASTER, MODE_DETAIL} from './actions';

class GreetingController extends React.Component {
    render() {
        const {greetings, mode, currentFilter} = this.props;
        const {setMode, saveGreeting, setFilter} = this.props;

        return (
            <div className="Main">
                <div className="Title">
                    <h1>Greeting App</h1>
                    <Counter />
                </div>
                <div className="Left">
                    {mode === MODE_MASTER ?
                        <GreetingMaster greetings={greetings}
                                        onAdd={() => setMode(MODE_DETAIL)}
                                        onRowClicked={greeting => setFilter(greeting.name)}
                                        currentFilter={currentFilter}
                                        setFilter={setFilter}
                        /> :
                        <GreetingDetail onAdd={greeting => saveGreeting(greeting)}/>
                    }
                </div>
                <div className="Right">
                    <Chart />
                </div>
            </div>);
    }
}

export default connect(
    state => ({
        greetings: filterGreetings(state.greetings, state.filter),
        currentFilter: state.filter,
        mode: state.mode
    }),
    dispatch => bindActionCreators(actions, dispatch)
)(GreetingController);
