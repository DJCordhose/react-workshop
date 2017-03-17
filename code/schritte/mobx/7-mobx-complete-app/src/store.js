import {observable, computed, action} from "mobx";

import {loadFromServer, saveToServer} from './backend';
import {aggregateGreetings, filterGreetings} from './selectors';

export const MODE_MASTER = 'MODE_MASTER';
export const MODE_DETAIL = 'MODE_DETAIL';

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
        loadFromServer(
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

        saveToServer(greetingToBeAdded, _addNewGreeting, _reportError);
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