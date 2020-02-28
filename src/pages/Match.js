import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import PlayerCard from '../components/PlayerCard'
import {setLoading} from '../redux/actions/loading';
import {setMatch} from '../redux/actions/match';
import API from '../constants/API';
import Remote from '../remote';

const Match = props => {
    const stats = useSelector(state => state.stats[0]);
    const player = useSelector(state => state.player);
    const match = useSelector(state => state.match);
    const isLoading = useSelector(state => state.loading);

    const [matches] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (stats.hasStats) {
            getResponse();
            setTimeout(()=>{
            matches.sort(dynamicSort("dateTime"));
            dispatch(setMatch(matches));
            dispatch(setLoading(false));  
            },1500);       
        }
        // eslint-disable-next-line
      }, []);

    const getResponse = async () => {
        try{
            const requestHistoryLink = API.protocol + API.europe + API.apiLink + API.matchesByPuuid + player.puuid + API.matchesParams + API.keyValue;
            const responseHistory = await Remote.get(requestHistoryLink);
            if(responseHistory && responseHistory.hasOwnProperty('data')){
                responseHistory.data.map(async item=> {
                    const requestMatchLink = API.protocol + API.europe + API.apiLink + API.matchByMatchId + item + API.key + API.keyValue;
                    const responseMatch = await Remote.get(requestMatchLink);
                    if(responseMatch && responseMatch.hasOwnProperty('data')){
                        responseMatch.data.info.participants.map(item=> {
                            if (item.puuid === player.puuid){
                                const newMatch =  {
                                    dateTime: responseMatch.data.info.game_datetime,
                                    placement: item.placement,
                                }
                                matches.push(newMatch);
                            }
                        });
                    }
                });               
            }
        } catch (error) {
            console.log(error);
        } 
    };

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

    const calculateWinRate = () => {
        return (((stats.wins/stats.played) * 100).toFixed(2));
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
                        </div>
                    </div>
                </div>
            }  
    </div>
}

export default Match;