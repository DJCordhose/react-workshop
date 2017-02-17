import {combineReducers} from 'redux';

import {SET_GREETINGS, SET_FILTER} from './actions';

function greetings(state = [], action) {
    switch (action.type) {
        case SET_GREETINGS:
            return action.greetings;
        default:
            return state;
    }
}

function filter(state = null, action) {
    switch (action.type) {
        case SET_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    greetings,
    filter
});
