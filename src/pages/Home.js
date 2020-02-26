import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setStats} from '../redux/actions/stats';
import {setPlayer} from '../redux/actions/player';
import API from '../constants/API'
import Remote from '../remote';

const Home = () => {    

    const [region, setRegion] = useState(' ');
    const [regionFull, setRegionFull] = useState(' ');
    const [name, setName] = useState(' ');
    const [errorMessage, setErrorMessage] = useState(' ');

    const dispatch = useDispatch();

    const setRegionState = (value) => {
        setRegion(value);
        switch(value) {
            case 'eun1':
                setRegionFull('EU Nordic and East');
                break;
            case 'euw1':
                setRegionFull('EU West');
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
        }
    }

    const getResponse = async () => {
        setErrorMessage(" ");
        try{
            const responseName = await Remote.get(API.protocol + region + API.apiLink + API.nameApi + name + API.key + API.keyValue);
            if(responseName && responseName.hasOwnProperty('data')){
                const newPlayer =  {
                        region: regionFull,
                        name: responseName.data.name,
                        level: responseName.data.summonerLevel,
                    }
                console.log(newPlayer);
                dispatch(setPlayer(newPlayer));    
                setTimeout(() =>{},1000);
                const responseStats = await Remote.get(API.protocol + region + API.apiLink + API.statsApi + responseName.data.id + API.key + API.keyValue);
                    if(responseStats && responseStats.hasOwnProperty('data')){
                        const newStats = responseStats.data.map(item=>{
                            return {
                                region: regionFull,
                                name: item.summonerName,
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
                } 
        } catch (error) {
            console.log(error);
            setErrorMessage("Failed to get stats");
        } 
    };

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