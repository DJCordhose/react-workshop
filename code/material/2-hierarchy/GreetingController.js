import React from 'react';
import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';

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
        const {mode, greetings} = this.state;
        return (
            <div>
                {mode === MODE_MASTER ?
                    <GreetingMaster greetings={greetings}
                        onAdd={() => this.setState({mode: MODE_DETAIL})}
                    /> : null
                    /*
                        Instead of null, display your GreetingDetail. Add callback for saving the new greeting.
                        In GreetingDetail add a button to save the new greeting that calls the passed callback.

                        Hier statt null dein GreetingDetail einbinden und den Callback für das Hinzufügen
                        eines Grußes übergeben.
                        In GreetingDetail einen Knopf zum Hinzufügen einbauen und mit dem neuen
                        Gruß den Callback aufrufen
                     */
                }
            </div>);
    }
    constructor(props) {
        super(props);
        this.state = {
            greetings: sampleGreetings,
            mode: MODE_MASTER
        };
    }

    addGreeting(greetingToBeAdded) {
        const {greetings} = this.state;
        greetingToBeAdded.id = currentId++;
        const newGreetings = [...greetings, greetingToBeAdded];
        this.setState({
            greetings: newGreetings,
            mode: MODE_MASTER
        });
    }
}
