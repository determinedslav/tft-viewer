import React,{ useState, useEffect } from 'react';
//import { useSelector, useDispatch} from "react-redux";
//import { connect }  from "react-redux";
import PlayerCard from '../components/PlayerCard'

const User = () => {

    const [playerName, setPlayerName] = useState("name");

    useEffect(()=>{
        callApi();
    })
    
    const callApi = () => {
        return fetch('https://eun1.api.riotgames.com/tft/summoner/v1/summoners/by-name/blackheart10?api_key=RGAPI-b3359980-1dd7-4109-a433-212cfbf31ade')
            .then(response => response.json())
            .then(data => {
                console.log(data.name);
                setPlayerName(data.name);
            })
            .catch(error => {
                console.error(error);
            });
    }
    return (
        <div>
            <div>
                <PlayerCard name = {playerName} region = "EUNE" tier = "GOLD" rank = "II"></PlayerCard>
            </div>
            <button onClick = {() => callApi()}>Press</button>
        </div>
    );
}
export default User;