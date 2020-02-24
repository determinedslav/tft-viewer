import React from 'react';
//import { useSelector, useDispatch} from "react-redux";
//import { connect }  from "react-redux";
import PlayerCard from '../components/PlayerCard'

const User = props => {

    return (
        <div>
            <div>
                <PlayerCard name = "BlackHeart10" region = "EUNE" tier = "GOLD" rank = "II"></PlayerCard>
            </div>
            <button onClick = {() => isPressed()}>Press</button>
        </div>
    );
}

const isPressed = () => {

        return fetch('https://eun1.api.riotgames.com/tft/summoner/v1/summoners/by-name/blackheart10?api_key=RGAPI-b3359980-1dd7-4109-a433-212cfbf31ade')
            .then(response => response.json())
            .then(data => console.log(data.name))
            .catch(error => {
                console.error(error);
            });
}
export default User;