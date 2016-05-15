import React from 'react';
import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';

// ES6 requirements
// let, const
// classes
// export, import
// (property destructuring)
// arrow functions
// (Object.assign)
// (enhanced object literals [])

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
        const {mode, greetings, currentGreeting} = this.state;
        return (
            <div>
                {mode === MODE_MASTER ? 
                    <GreetingMaster greetings={greetings}
                        onAdd={() => this.setState({mode: MODE_DETAIL})}
                    /> :
                    <GreetingDetail greeting={currentGreeting}
                                    onAdd={(greeting) => this.addGreeting(greeting)}
                    />
                }
            </div>);
    }
    constructor(props) {
        super(props);
        this.state = {
            greetings: sampleGreetings,
            currentGreeting: sampleGreetings[0],
            mode: MODE_MASTER
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
