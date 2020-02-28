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

        <div className="p-2 bg-white border rounded">
            <div className="text-center">
                <div>
                    <span className="font-weight-bold">{props.name}</span>
                    <span className="text-muted">#{props.region}</span>								
                </div>
                <div className="font-weight-bold">
                    lvl&nbsp;{props.level}
                </div>
                <div>
                    <img className="img-fluid float-center w-50 m-3" src= {"images/emblems/" + props.rank + ".PNG"} alt="Ranked Emblem"/>
                </div>
                <div className="font-weight-bold">
                    {props.rank}&nbsp;{props.division}&nbsp;{props.lp}LP
                </div>
            </div>
            <div className="mt-3 p-2">
                <div className="border-bottom mb-2">
                    <span className="font-weight-bolder">Games played&nbsp;</span><span className="float-right">{props.played}</span>
                </div>
                <div className="border-bottom mb-2">
                    <span className="font-weight-bolder">Games won&nbsp;</span><span className="float-right">{props.wins}</span>
                </div>
                <div className="border-bottom mb-2">
                    <span className="font-weight-bolder">Win rate&nbsp;</span><span className="float-right">{props.ratio}%</span>
                </div>
            </div>
        </div>
    );
}

export default PlayerCard;