import * as loadingReducers from './loading';
import * as statsReducers from './stats';
import {combineReducers} from 'redux';

export default combineReducers(Object.assign(
    loadingReducers,
    statsReducers
));