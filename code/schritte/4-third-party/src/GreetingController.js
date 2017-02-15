import React from 'react';

import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';
import Chart from './Chart';
import {aggregateGreetings} from './util';

let currentId = 0;

const sampleGreetings = [{
    id: currentId++,
    name: 'Olli',
    greeting: 'Huhu'
},
    {
        id: currentId++,
        name: 'Oma',
        greeting: 'Hallo'
    }
];

const MODE_MASTER = 'MODE_MASTER';
const MODE_DETAIL = 'MODE_DETAIL';

export default class GreetingController extends React.Component {
    render() {
        const {mode, greetings, filter} = this.state;
        const aggregatedGreetings = aggregateGreetings(greetings);
        const filtered = filter ? greetings.filter(greeting => greeting.name === filter) : greetings;

        return (
            <div className="Main">
                <div className="Left">
                    {mode === MODE_MASTER ?
                        <GreetingMaster greetings={filtered}
                                        onAdd={() => this.setState({mode: MODE_DETAIL})}
                        /> :
                        <GreetingDetail onAdd={(greeting) => this.addGreeting(greeting)}/>
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
            greetings: sampleGreetings,
            mode: MODE_MASTER,
            filter: null
        };
    }

    addGreeting(greetingToBeAdded) {
        const {greetings} = this.state;
        greetingToBeAdded.id = currentId++;
        greetings.push(greetingToBeAdded);
        this.setState({
            greetings,
            mode: MODE_MASTER
        });
    }
}
