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
                <button onClick = {() => this.props.setTitle("Just work")}>Press</button>
            </div>
        </>
    }
}

function getGlobalMovies() {
    return dispatch => {
        return fetch('https://eun1.api.riotgames.com/tft/summoner/v1/summoners/by-name/blackheart10?api_key=RGAPI-b3359980-1dd7-4109-a433-212cfbf31ade')
            .then(response => response.json())
            .then(responseJson => {
                dispatch({
                    type: "FETCHED_PLAYER",
                    payload: responseJson
                });
                dispatch({
                    type: "SET_REGION", 
                    payload: responseJson.name
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
        setTitle: () => dispatch(getGlobalMovies()),
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(User);