import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setStats} from '../redux/actions/stats';
import {setPlayer} from '../redux/actions/player';
import {setLoading} from '../redux/actions/loading';
import {setMatch} from '../redux/actions/match';
import API from '../constants/API';
import Remote from '../remote';

const Home = () => {    

    const [region, setRegion] = useState(' ');
    const [regionFull, setRegionFull] = useState(' ');
    const [name, setName] = useState(' ');
    const [errorMessage, setErrorMessage] = useState(' ');

    const [matches] = useState([]);

    const dispatch = useDispatch();

    const setRegionState = (value) => {
        setRegion(value);
        switch(value) {
            case 'eun1':
                setRegionFull('EUNE');
                break;
            case 'euw1':
                setRegionFull('EUW');
                break;
            default:
              return 'Error';
          }
    };
    
    const validate = () => {
        if (name === ' ' || region === ' ') {
            return;
        } else if (name.length < 4 || name.length > 16) {
            setErrorMessage("Summoner names are between 4 and 16 symbols long");
        } else {
            getResponse();
            setTimeout(()=>{
                matches.sort(dynamicSort("dateTime"));
                console.log(matches);
                dispatch(setMatch(matches));
                dispatch(setLoading(false));
            },1500);  
        }
    }

    const getResponse = async () => {
        setErrorMessage(" ");
        dispatch(setLoading(true));
        try{
            const requestNameLink = API.protocol + region + API.apiLink + API.nameByName + name + API.key + API.keyValue;
            const responseName = await Remote.get(requestNameLink);
            if(responseName && responseName.hasOwnProperty('data')){
                const newPlayer =  {
                        region: regionFull,
                        name: responseName.data.name,
                        level: responseName.data.summonerLevel,
                        id: responseName.data.id,
                        puuid: responseName.data.puuid,
                    }
                console.log(newPlayer);
                dispatch(setPlayer(newPlayer));    
                const requestStatsLink = API.protocol + region + API.apiLink + API.statsBySummonerId + responseName.data.id + API.key + API.keyValue;
                const responseStats = await Remote.get(requestStatsLink);
                    if(responseStats && responseStats.hasOwnProperty('data')){
                        const newStats = responseStats.data.map(item=>{
                            return {
                                hasStats : true,
                                rank: item.tier,
                                division: item.rank,
                                wins: item.wins,
                                loses: item.losses,
                                played: item.wins + item.losses,
                                lp: item.leaguePoints,
                            }
                        });
                        if (responseStats.data.length === 0) {
                            setErrorMessage("No TFT information available for this player");
                        }
                        console.log(newStats);
                        dispatch(setStats(newStats));             
                    }
                    const requestHistoryLink = API.protocol + API.europe + API.apiLink + API.matchesByPuuid + responseName.data.puuid + API.matchesParams + API.keyValue;
                    const responseHistory = await Remote.get(requestHistoryLink);
                    if(responseHistory && responseHistory.hasOwnProperty('data')){
                        responseHistory.data.map(async item=> {
                            const requestMatchLink = API.protocol + API.europe + API.apiLink + API.matchByMatchId + item + API.key + API.keyValue;
                            const responseMatch = await Remote.get(requestMatchLink);
                            if(responseMatch && responseMatch.hasOwnProperty('data')){
                                // eslint-disable-next-line
                                responseMatch.data.info.participants.map(item=> {
                                    if (item.puuid === responseName.data.puuid){
                                        const newMatch =  {
                                            dateTime: responseMatch.data.info.game_datetime,
                                            queueId: responseMatch.data.info.queue_id,
                                            placement: item.placement,
                                            level: item.level,
                                            lastRound: item.last_round,
                                            playersEliminated: item.players_eliminated,
                                            totalDamageToPlayers: item.total_damage_to_players,
                                            traits: item.traits,
                                            units: item.units,
                                        }
                                        matches.push(newMatch);
                                    }
                                });
                            }
                        });               
                    } 
                } 
        } catch (error) {
            console.log(error);
            setErrorMessage("Failed to get stats");
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

    return ( 
        <div>
            <form id="searchUser" onSubmit={(e) => e.preventDefault()}>
                <div className="bg-light border rounded-top">
                    <div className="text-muted p-2">
                        Search a player
                    </div>
                </div>
                <div className="bg-white border-left border-right">
                    <div className="row p-2">
                        <div className="col-md-8">
                            <input type="text" className="form-control mt-2" id="user" placeholder="Username" onChange={e => setName(e.target.value)} required/>
                        </div>
                        <div className="col-md-4">
                        <select id="selectRegion" defaultValue = "0" className="form-control mt-2" onChange={e => setRegionState(e.target.value)} required>
                            <option value="0" disabled>Select region</option>
                            <option value="eun1">EU Nordic and East</option>
                            <option value="euw1">EU West</option>
                        </select>
                        </div>
                    </div>
                </div>
                <div className="bg-light border rounded-bottom p-2">  
                    <div className="row p-2">
                        <div className="col-md-9">
                            <div className="p-1 m-1 text-danger small" id="errMessage">
                                {errorMessage}
                            </div>
                        </div>           
                        <div className="col-md-3 text-right">
                            <button className="btn btn-primary" onClick = {() => validate()}><i className="fa fa-search mr-1"></i>Search</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Home;