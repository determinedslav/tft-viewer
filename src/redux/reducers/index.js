import * as loadingReducers from './loading';
import * as statsReducers from './stats';
import * as playerReducers from './player';
import * as historyReducers from './history';
import {combineReducers} from 'redux';

export default combineReducers(Object.assign(
    loadingReducers,
    statsReducers,
    playerReducers,
    historyReducers,
));