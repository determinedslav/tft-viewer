import React from 'react';
import { useSelector, useDispatch } from "react-redux";
//import setActionCount from "../redux/actions/counter";

const Details = props => {
    const player = useSelector(state => state.player);
    //const dispatch = useDispatch();

    //const setCounter = count => dispatch(setActionCount(count))
    return <div>
        <h1>{player.summonerLevel}</h1>
        <button
            onClick={() => console.log('20')} 
            type="button" 
            className="btn btn-danger"
        >Change Global Counts</button>
    </div>
}

export default Details;