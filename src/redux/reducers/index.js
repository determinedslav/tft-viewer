import * as loadingReducers from './loading';
import * as statsReducers from './stats';
import * as playerReducers from './player';
import * as matchReducers from './match';
import {combineReducers} from 'redux';

export default combineReducers(Object.assign(
    loadingReducers,
    statsReducers,
    playerReducers,
    matchReducers,
));