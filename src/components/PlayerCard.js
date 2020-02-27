import React from 'react';

const PlayerCard = props=> {
    return (
        /*
        <div className="align-items-center bg-light border rounded p-2">
            <div>
                <span>{props.name}</span>
                <span className="text-muted">#{props.region}</span>
            </div>
            <div>
                <span className="font-weight-bold">Level:{props.level}</span>
            </div>
            <div>
                <span className="font-weight-bold">{props.rank}&nbsp;{props.division}</span>
            </div>
        </div>
        */
        //////

        <div className="p-2 bg-light text-center border rounded">
            <div>
                <span className="font-weight-bold">{props.name}</span>
                <span className="text-muted">#{props.region}</span>								
            </div>
            <div>
                <span className="font-weight-bold">lvl {props.level}</span>
            </div>
            <div>
                <img className="img-fluid float-center w-50 m-3" src= {"images/emblems/" + props.rank + ".PNG"} alt="Ranked Emblem"/>
            </div>
            <div>
                <span className="font-weight-bold">{props.rank}&nbsp;{props.division}</span>
            </div>
        </div>
    );
}

export default PlayerCard;