import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import PlayerCard from '../components/PlayerCard'
import {setLoading} from '../redux/actions/loading';

const Details = props => {
    const stats = useSelector(state => state.stats[0]);
    const player = useSelector(state => state.player);
    const isLoading = useSelector(state => state.loading);

    const dispatch = useDispatch();

    const click = () => {
        dispatch(setLoading(true));
        console.log("loading");
        setTimeout(() =>{           
            dispatch(setLoading(false));
            console.log("done loading");
        },2000);
    }

    return <div>
        {isLoading ? <div>Currently loading match details</div> :
            <PlayerCard name={player.name} 
            region={player.region} 
            level={player.level} 
            rank={stats.rank} 
            division={stats.division}
            onClick={() => click()}></PlayerCard>
            }
    </div>
}

export default Details;