
import { combineReducers } from 'redux'

const counter = function(count = 1, action) {
    switch(action.type) {
        case "INCREMENT_COUNT": {
            return action.payload + 1;
        }
        default:
            return count;
        
    }
}

const region = function(region = "Default Title", action) {
    switch(action.type) {
        case "SET_REGION": {
            return action.payload;
        }
        default:
            return region;
        
    }
}

const player = function(player = {}, action) {
    switch(action.type) {
        case "FETCHED_PLAYER": {
            return action.payload;
        }
        default:
            return player;
        
    }
}

export default combineReducers({
    counterOne: counter,
    player,
    region
})