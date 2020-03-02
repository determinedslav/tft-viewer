import React, {useEffect, /* useState */} from 'react';
import {useSelector, /* useDispatch */} from "react-redux";
import PlayerCard from '../components/PlayerCard'

const Match = props => {
    const stats = useSelector(state => state.stats[0]);
    const player = useSelector(state => state.player);
    const match = useSelector(state => state.match);
    const isLoading = useSelector(state => state.loading);

    useEffect(() => {
        if (!isLoading) {
            setTimeout(()=>{
            console.log("not loading");
            },1500);       
        }
        // eslint-disable-next-line
      }, []);

    const calculateWinRate = () => {
        return (((stats.wins/stats.played) * 100).toFixed(2));
    }

    const dynamicSort = property => {
        var sortOrder = -1;
        if(property[0] === "-") {
            sortOrder = 1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    return <div>
            {isLoading ? <div>Currently loading</div> :
                <div className="row">
                    <div className="col-md-3">
                        <PlayerCard name={player.name} 
                        region={player.region} 
                        level={player.level} 
                        rank={stats.rank} 
                        division={stats.division}
                        lp={stats.lp}
                        played={stats.played}
                        wins={stats.wins}
                        ratio={calculateWinRate()}></PlayerCard>
                    </div>
                    <div className="col-md-9">
                        <div className="bg-light border rounded-top">
                            <div className="text-muted p-2 mb-1">
                                Match history - showing 10 most recent games
                            </div>
                            <ul className="list-group">
                                {match.map(match => {
                                    match.units.sort(dynamicSort("tier"));
                                    match.traits.sort(dynamicSort("style"));
                                    return <li key={match.dateTime} className="list-group-item rounded-0">
                                        <div className="row">
                                            <div className="col-1">
                                                {match.placement}
                                            </div>
                                            <div className="col-9">
                                                <div className="row">
                                                    {match.units.map((units, i) => {
                                                        return <div key={i} className="col-1">
                                                        <img className="border border-dark rounded" height="40" width="40" src= {"images/champions/" + units.character_id.substring(5, units.character_id.length) + ".JPG"} alt={units.character_id}/>
                                                        </div>
                                                    })}
                                                </div>
                                                <div className="row">
                                                    {match.units.map((units, i) => {
                                                        return <div key={i} className="col-1 text-center">
                                                            <span className="text-small text-center">{units.tier}</span>*
                                                        </div>
                                                    })}
                                                </div>
                                                <div className="row">
                                                    {// eslint-disable-next-line
                                                    match.traits.map((traits, i) => {
                                                        if (traits.style > 0) {
                                                            return <span key={i} className="ml-2">
                                                                <img className="border border-light rounded bg-dark" height="20" width="20" src= {"images/traits/" + traits.name + ".PNG"} alt={traits.name}/>{traits.num_units}
                                                            </span>
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                            <div className="col-2">
                                            <button className="btn btn-primary" onClick = {() => console.log("click")}>Details</button>
                                            </div>
                                        </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            }  
    </div>
}

export default Match;