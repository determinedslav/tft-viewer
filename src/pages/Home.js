import React from 'react';
import { connect }  from "react-redux";

import API from '../constants/API'

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
                            <input type="text" className="form-control mt-2" id="user" placeholder="Username" onChange={e => setInputName(e.target.value)} required/>
                        </div>
                        <div className="col-md-4">
                        <select id="selectRegion" defaultValue = "0" className="form-control mt-2" onChange={e => setInputRegion(e.target.value)} required>
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
                            <button className="btn btn-primary" onClick = {() => this.props.getPlayer()}><i className="fa fa-search mr-1"></i>Search</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </>
    }
}

var inputName = " ";
var inputRegion = " ";

const setInputName = input => {
    inputName = input;
    console.log(inputName);
}

const setInputRegion = input => {
    inputRegion = input
    console.log(inputRegion);
}

const getPlayerAPI = () => {
    return dispatch => {
        return fetch(API.protocol 
            + inputRegion 
            + API.apiLink 
            + API.nameApi 
            + inputName 
            + API.key 
            + API.keyValue)
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
        getPlayer: () => dispatch(getPlayerAPI()),
        setRegion: region => dispatch({
            type: "SET_REGION", 
            payload: region
        })
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(Home);