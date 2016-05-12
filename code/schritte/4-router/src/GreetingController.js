import React from 'react';
import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';

let currentId = 0;

// ES6 requirements
// let, const
// classes
// export
// property destructuring
// arrow methods
// Object.assign
// enhanced object literals []

const MODE_MASTER = 'MODE_MASTER';
const MODE_DETAIL = 'MODE_DETAIL';

export default class GreetingController extends React.Component {
    render() {
        const {mode, greetings, currentGreeting} = this.state;
        return (
            <div>
                {mode === MODE_MASTER ? 
                    <GreetingMaster greetings={greetings}
                        onAdd={() => this.enterAdd()}
                    /> :
                    <GreetingDetail greeting={currentGreeting}
                                    onAdd={(greeting) => this.addGreeting(greeting)}
                    />
                }
            </div>);
    }
    constructor(props) {
        super(props);
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
        this.state = {
            greetings: sampleGreetings,
            currentGreeting: sampleGreetings[0],
            mode: MODE_MASTER
        };
    }

    enterAdd() {
        this.setState({
            mode: MODE_DETAIL
        });
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

    changeGreeting(greetingWithChanges) {
        const {greetings} = this.state;
        const greetingToBeChanged = greetings.find((greeting) => greeting.id === greetingWithChanges.id);
        if (greetingToBeChanged) {
            Object.assign(greetingToBeChanged, greetingWithChanges);
            this.setState({greetings});
        }
    }

    deleteGreeting(greetingToBeDeleted) {
        const {greetings} = this.state;
        const indexToBeDeleted = greetings.findIndex((greeting) => greeting.id === greetingToBeDeleted.id);
        if (indexToBeDeleted !== -1) {
            greetings.splice(indexToBeDeleted, 1);
            this.setState({greetings});
        }
    }

}
