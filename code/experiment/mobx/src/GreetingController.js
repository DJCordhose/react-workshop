import React from 'react';

import {observer} from 'mobx-react';

import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';
import Chart from './Chart';

import {MODE_MASTER, MODE_DETAIL} from './store';

@observer
export default class GreetingController extends React.Component {
    render() {
        const {store} = this.props;
        const {mode, aggregatedGreetings, filteredGreetings} = store;
        const {loadGreeting, saveGreeting, setFilter} = store;

        return (
            <div className="Main">
                <div className="Left">
                    {mode === MODE_MASTER ?
                        <GreetingMaster greetings={filteredGreetings}
                                        onAdd={() => store.mode = MODE_DETAIL}
                        /> :
                        <GreetingDetail onAdd={(greeting) => saveGreeting(greeting)}/>
                    }
                </div>
                <div className="Right">
                    <Chart data={aggregatedGreetings} onSegmentSelected={filter => setFilter(filter)}/>
                </div>
            </div>);
    }

    componentDidMount() {
        const {loadGreetings} = this.props.store;
        loadGreetings();
    }

}

