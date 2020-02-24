
import { combineReducers } from 'redux'

/*
const counter = function(count = 1, action) {
    switch(action.type) {
        case "INCREMENT_COUNT": {
            return action.payload + 1;
        }
        default:
            return count;
        
    }
}
*/
const name = function(name = "Player Name", action) {
    switch(action.type) {
        case "SET_NAME": {
            return action.payload;
        }
        default:
            return name;
        
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
    /*
    counterOne: counter,
    */
    player,
    name
  
})