import React from 'react';

const Home = props => {
    return ( 
        <div>
            <form id="searchUser">
                <div className="bg-light border rounded-top">
                    <div className="text-muted p-2">
                        Search a player
                    </div>
                </div>
                <div className="bg-white border-left border-right">
                    <div className="row p-2">
                        <div className="col-md-8">
                            <input type="text" className="form-control mt-2" id="user" placeholder="Username" required/>
                        </div>
                        <div className="col-md-4">
                        <select id="selectRegion" defaultValue = "0" className="form-control mt-2" required>
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
                            <button className="btn btn-primary"><i className="fa fa-search mr-1"></i>Search</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Home;