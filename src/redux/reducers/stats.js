import * as types from '../types';

const initialState = [];

export function stats(state = initialState, action) {
    switch (action.type) {
        case types.SET_STATS:
            return [...action.payload]
        default:
            return state;
    }
}
