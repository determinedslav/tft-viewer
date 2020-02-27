import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import PlayerCard from '../components/PlayerCard'
import {setLoading} from '../redux/actions/loading';
import {setMatch} from '../redux/actions/match';
import API from '../constants/API';
import Remote from '../remote';

const Match = props => {
    const stats = useSelector(state => state.stats[0]);
    const player = useSelector(state => state.player);
    const match = useSelector(state => state.history);
    const isLoading = useSelector(state => state.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(false));
        if (!isLoading) {
            dispatch(setLoading(true));
            getResponse();
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
                        //console.log(responseMatch.data.info.participants);
                        //console.log(dispatch(setMatch(responseMatch.data.info.participants)));
                    }
                });        
                dispatch(setLoading(false));               
            } 
        } catch (error) {
            console.log(error);
        } 
    };

    const click = () => {
        dispatch(setLoading(true));
        console.log("loading");
        setTimeout(() =>{           
            dispatch(setLoading(false));
            console.log("done loading");
            console.log(match);
        },2000);
    }

    return <div>
        <div className="row">
            <div className="col-md-3">
                {isLoading ? <div>Currently loading</div> :
                    <PlayerCard name={player.name} 
                    region={player.region} 
                    level={player.level} 
                    rank={stats.rank} 
                    division={stats.division}
                    onClick={() => click()}></PlayerCard>
                    }
            </div>
            <div className="col-md-9">
                <div className="bg-light border rounded-top">
                    <div className="text-muted p-2 mb-1">
                        Match history - showing 10 most recent games
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Match;