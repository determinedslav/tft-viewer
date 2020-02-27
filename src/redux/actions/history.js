import * as types from '../types';

export function setHistory(history) {
    return {
        type: types.SET_HISTORY,
        payload: history
    }
}
