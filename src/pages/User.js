import React from 'react';
import { connect }  from "react-redux";
import PlayerCard from '../components/PlayerCard'

class User extends React.Component {
    componentDidMount = () => {
        this.props.getMovies();
    }

    render() {
        return <>
            <div>
                <div>
                    <PlayerCard name = "BlackHeart10" region = "EUNE" tier = "GOLD" rank = "II"></PlayerCard>
                </div>
                <button onClick = {() => this.props.setTitle("EUNE")}>Press</button>
            </div>
        </>
    }
}

function getGlobalMovies() {
    return dispatch => {
        return fetch('https://eun1.api.riotgames.com/tft/summoner/v1/summoners/by-name/BlackHeart10?api_key=RGAPI-7446e2dc-e671-4002-8e13-a1aacae2a753')
            .then(response => response.json())
            .then(responseJson => {
                dispatch({
                    type: "FETCHED_PLAYER",
                    payload: responseJson
                });
            })
            .catch(error => {
                console.error(error);
            });
    };
  }


const mapStateToProps = state => {
    return { 
        player: state.player,
        region: state.region
    }
};
const mapStateToDispatch = dispatch => {
    return {
        getMovies: () => dispatch(getGlobalMovies()),
        setTitle: region => dispatch({
            type: "SET_REGION", 
            payload: region
        })
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(User);