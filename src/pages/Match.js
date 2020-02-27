import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import PlayerCard from '../components/PlayerCard'
import {setLoading} from '../redux/actions/loading';

const Match = props => {
    const stats = useSelector(state => state.stats[0]);
    const player = useSelector(state => state.player);
    const isLoading = useSelector(state => state.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("loading");
        setTimeout(() =>{           
            dispatch(setLoading(false));
            console.log("done loading");
        },1500);
        // eslint-disable-next-line
      }, []);

    const click = () => {
        dispatch(setLoading(true));
        console.log("loading");
        setTimeout(() =>{           
            dispatch(setLoading(false));
            console.log("done loading");
        },2000);
    }

    return <div>
        {isLoading ? <div>Currently loading</div> :
            <PlayerCard name={player.name} 
            region={player.region} 
            level={player.level} 
            rank={stats.rank} 
            division={stats.division}
            onClick={() => click()}></PlayerCard>
            }

        <div className="mt-3">
            <div className="bg-light border rounded-top">
				<div className="text-muted p-2 mb-1">
                    Match history - showing 10 most recent games
				</div>
			</div>
        </div>
    </div>
}

export default Match;