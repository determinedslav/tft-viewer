import React from 'react';
import { useSelector } from "react-redux";

const Details = props => {
    const stats = useSelector(state => state.stats[0]);
    const player = useSelector(state => state.player);

    return <div>
        <h1>{player.level}#{stats.division}</h1>
    </div>
}

export default Details;