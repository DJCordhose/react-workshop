import {observable, computed, action} from "mobx";

import {aggregateGreetings, filterGreetings} from './selectors';
import {BACKEND_URL} from './config';

export const MODE_MASTER = 'MODE_MASTER';
export const MODE_DETAIL = 'MODE_DETAIL';


function saveToServer(greetingToBeSaved, onSuccess, onFailure) {
    // Four potential return "scenarios":
    // SCENARIO 1: Server responded, HTTP 201 => OK, as expected
    // SCENARIO 2: Server responded, HTTP != 201 => Server error (e.g. invalid data posted)
    // SCENARIO 3. Server does NOT respond at all (technical problems etc)
    // SCENARIO 4: An error occurs during the response handling (=> catch-handler will be invoked)

    const handleServerResponse = response => response.json()
        .then(json => response.status === 201 ?
            /* SCENARIO 1 */ onSuccess(json)
            :
            /* SCENARIO 2 */ onFailure(json.error)
        );

    /* SCENARIO 3 */
    const handleServerError = err => onFailure(err.message);

    /* SCENARIO 4
     * (might be the same as Scenario 3 in real life, just
     * to make it more explicit here as own scenario)
     */
    const handleUnexpectedError = err => onFailure('Unexpected error: ' + err);

    // just to provoke exception
    const snafu = () => {
        throw new Error('SNAFU')
    };

    return fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(greetingToBeSaved)
    })
        .then(handleServerResponse, handleServerError)
        .catch(handleUnexpectedError)
        ;
}

function loadFromServer(onSuccess, onFailure) {
    const handleServerResponse = response => response.json()
        .then(json => response.status === 200 ? onSuccess(json) : onFailure(json.error));
    const handleServerError = err => onFailure(err.message);
    const handleUnexpectedError = err => onFailure('Unexpected error: ' + err);

    return fetch(BACKEND_URL)
        .then(handleServerResponse, handleServerError)
        .catch(handleUnexpectedError)
        ;
}


class Store {
    @observable greetings = [];
    @observable mode = MODE_MASTER;
    @observable filter = null;

    @computed get aggregatedGreetings() {
        return aggregateGreetings(this.greetings);
    }

    @computed get filteredGreetings() {
        return filterGreetings(this.greetings, this.filter);
    }

    @action.bound
    loadGreetings() {
        return loadFromServer(
            greetings => this.greetings = greetings,
            err => console.error('LOADING GREETINGS FAILED:', err)
        );
    }

    @action.bound
    saveGreeting(greetingToBeAdded) {
        const _addNewGreeting = serverResponse => {
            const newGreetingId = serverResponse.id;
            const newGreeting = {
                ...greetingToBeAdded,
                id: newGreetingId
            };
            this.greetings = [...this.greetings, newGreeting];
            this.mode = MODE_MASTER;
            return newGreeting;
        };

        const _reportError = err => console.error('COULD NOT SAVE GREETING: ', err);

        return saveToServer(greetingToBeAdded, _addNewGreeting, _reportError);
    }

    @action.bound
    setFilter(filter) {
        if (this.filter === filter) {
            // reset filter when clicking again
            this.filter = null;
        } else {
            this.filter = filter;
        }
    }

    @action.bound
    setMode(mode) {
        this.mode = mode;
    }
}

export default new Store();
