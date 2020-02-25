import React from 'react';
import { connect }  from "react-redux";

class Home extends React.Component {
    render() {
        return <>
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
                            <input type="text" className="form-control mt-2" id="user" placeholder="Username" onChange={e => this.props.setRegion(e.target.value)} required/>
                        </div>
                        <div className="col-md-4">
                        <select id="selectRegion" defaultValue = "0" className="form-control mt-2" onChange={e => this.props.setRegion(e.target.value)} required>
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
                                &nbsp; I am error
                            </div>
                        </div>           
                        <div className="col-md-3 text-right">
                            <button className="btn btn-primary"><i className="fa fa-search mr-1" onClick = {() => this.props.getPlayer()}></i>Search</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </>
    }
}

function getGlobalMovies() {
    return dispatch => {
        return fetch('https://eun1.api.riotgames.com/tft/summoner/v1/summoners/by-name/blackheart10?api_key=RGAPI-7446e2dc-e671-4002-8e13-a1aacae2a753')
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
        getPlayer: () => dispatch(getGlobalMovies()),
        setRegion: region => dispatch({
            type: "SET_REGION", 
            payload: region
        })
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(Home);