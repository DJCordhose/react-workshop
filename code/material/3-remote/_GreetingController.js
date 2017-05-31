import React from 'react';

// Importiere hier loadFromServer und saveToServer aus dem './backend'-Modul

import GreetingMaster from './GreetingMaster';
import GreetingDetail from './GreetingDetail';

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
                    /> :
                    <GreetingDetail onAdd={(greeting) => this.saveGreeting(greeting)}/>
                }
            </div>);
    }

    constructor(props) {
        super(props);
        this.state = {
            greetings: [],
            mode: MODE_MASTER
        };
    }


    loadGreetings() {
        // Implementiere hier die Methode loadGreetings()
        // In der Methode musst Du loadFromServer mit zwei Callback-Funktionen aufrufen
        // Die erste Callback-Funktion erhält als Parameter die geladenen Greetings, die Du mit this.setState setzen musst
        // (Optional: Die zweite Callback-Funktion wird im Fehlerfalle mit einer Fehlermeldung aufgerufen. Gib die
        // Fehlermeldung einfach auf der Konsole mit console.error aus)
    }


    saveGreeting(greetingToBeAdded) {
        const _addNewGreeting = serverResponse => {
            // the server responded with the id of the new Greeting
            const newGreetingId = serverResponse.id;
            // create a new Greeting object that contains the received id
            // (create a new object for immutability)
            const newGreeting = {...greetingToBeAdded, id: newGreetingId};
            // add the new greetings to the list of all greetings
            // (create a new array for immutability)
            const newGreetings = [...this.state.greetings, newGreeting];

            // set the new list of greetings as our new state
            // also set 'MODE_MASTER' to make sure the master-View is
            // displayed now
            this.setState({
                greetings: newGreetings,
                mode: MODE_MASTER
            });

            return newGreeting;
        };

        // Verwende hier saveToServer, um das Greeting zu speichern.
        // Parameter für saveToServer:
        // 1. das Greeting (greetingToBeAdded)
        // 2. Callback: Die oben stehende Hilfsfunktion _addNewGreeting
        // (optional 3. Callback: Ausgabe der Fehlermeldung)
    }


    // Füge hier die Methode componentDidMount() hinzu, in der Du this.loadGreetings() aufrufst
}

