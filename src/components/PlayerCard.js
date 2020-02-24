import React from 'react';

const PlayerCard = props=> {
    return (
        <div className="d-sm-inline-flex align-items-center bg-light border rounded-bottom p-2">
            <span>{props.name}</span>
            <span className="text-muted">#{props.region}</span>&nbsp;
            <span className="font-weight-bold ml-3">{props.tier}&nbsp;{props.rank}</span>
            <span className="ml-4"><button className="btn btn-primary">Change</button></span>
        </div>
    );
}

export default PlayerCard;