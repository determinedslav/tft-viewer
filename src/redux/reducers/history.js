import * as types from '../types';

export function history(state = [], action) {
    switch (action.type) {
        case types.SET_HISTORY:
            return action.payload
        default:
            return state;
    }
}
