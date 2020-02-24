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
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then(response => response.json())
            .then(responseJson => {
                dispatch({
                    type: "FETCHED_MOVIES",
                    payload: responseJson.movies
                });
                dispatch({
                    type: "SET_TITLE", 
                    payload: responseJson.title
                });
            })
            .catch(error => {
                console.error(error);
            });
    };
  }


const mapStateToProps = state => {
    return { 
        movies: state.movies,
        title: state.title
    }
};
const mapStateToDispatch = dispatch => {
    return {
        getMovies: () => dispatch(getGlobalMovies()),
        setTitle: () => dispatch(getGlobalMovies()),
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(User);