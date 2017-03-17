import {loadFromServer, saveToServer} from './backend';

export const SET_GREETINGS = 'SET_GREETINGS';
export const ADD_GREETING = 'ADD_GREETING';
export const SET_MODE = 'SET_MODE';
// TODO: there should be a filter action type here

export const MODE_MASTER = 'MODE_MASTER';
export const MODE_DETAIL = 'MODE_DETAIL';

export const loadGreetings = dispatch => {
    loadFromServer(
        greetings => dispatch({
            type: SET_GREETINGS,
            greetings
        }),
        err => console.error('LOADING GREETINGS FAILED:', err)
    );
};

export const saveGreeting = greetingToBeAdded => dispatch => {

    const _addNewGreeting = serverResponse => {
        const newGreetingId = serverResponse.id;
        const greeting = {
            ...greetingToBeAdded,
            id: newGreetingId
        };
        dispatch({
            type: ADD_GREETING,
            greeting
        });
        dispatch(setMode(MODE_MASTER));
        return greeting;
    };

    const _reportError = err => console.error('COULD NOT SAVE GREETING: ', err);

    saveToServer(greetingToBeAdded, _addNewGreeting, _reportError);
};

export const setMode = mode => ({
    type: SET_MODE,
    mode
});

// TODO: we need an action creator for filtering
