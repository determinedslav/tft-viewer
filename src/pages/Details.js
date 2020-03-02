import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import LoadingSplash from '../components/LoadingSplash'
import PlayerCard from '../components/PlayerCard'

const Details = props => {
    const matchIndex = useSelector(state => state.matchIndex);
    const stats = useSelector(state => state.stats[0]);
    const player = useSelector(state => state.player);
    const match = useSelector(state => state.match[matchIndex]);
    const isLoading = useSelector(state => state.loading);

    const dispatch = useDispatch();

    return <div>
        {isLoading ? <LoadingSplash></LoadingSplash>:
            <div className="row">
                <div className="col-lg-3">
                    <PlayerCard name={player.name} 
                    region={player.region} 
                    level={player.level} 
                    rank={stats.rank} 
                    division={stats.division}
                    lp={stats.lp}
                    played={stats.played}
                    wins={stats.wins}
                    ratio={(((stats.wins/stats.played) * 100).toFixed(2))}></PlayerCard>
                </div>
                <div className="col-lg-9">
                    <div className="bg-light border rounded-top">
                        <div className="text-muted p-2 mb-1">
                            Match Details
                        </div>
                        <div className="bg-white border-left border-right">
                            Specific game details
                        </div>
                    </div>
                </div>
            </div>
            }
    </div>
}

export default Details;