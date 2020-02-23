import React from 'react';

const Home = props => {
    return ( 
        <div>
            <form id="searchUser">
                <div class="bg-light border rounded-top">
                    <div class="text-muted p-2">
                        Search a player
                    </div>
                </div>
                <div class="bg-white border-left border-right">
                    <div class="row p-2">
                        <div class="col-md-8">
                            <input type="text" class="form-control mt-2" id="user" placeholder="Username" required/>
                        </div>
                        <div class="col-md-4">
                        <select id="selectRegion" class="form-control mt-2" required>
                            <option value="0" selected disabled>Select region</option>
                            <option value="eun1">EU Nordic and East</option>
                            <option value="euw1">EU West</option>
                        </select>
                        </div>
                    </div>
                </div>
                <div class="bg-light border rounded-bottom p-2">  
                    <div class="row p-2">
                        <div class="col-md-9">
                            <div class="p-1 m-1 text-danger small" id="errMessage">
                                &nbsp; I am error
                            </div>
                        </div>           
                        <div class="col-md-3 text-right">
                            <button type ="submit" class="btn btn-primary"><i class="fa fa-search mr-1"></i>Search</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Home;