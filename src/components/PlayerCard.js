import React from 'react';

const PlayerCard = props=> {
    return (
        <div class="d-sm-inline-flex align-items-center bg-light border rounded-bottom p-2">
            <span>{props.name}</span>
            <span class="text-muted">#{props.region}</span>&nbsp;
            <span class="font-weight-bold ml-3">{props.tier}&nbsp;{props.rank}</span>
            <span class="ml-4"><button type ="submit" class="btn btn-primary">Change</button></span>
        </div>
    );
}

export default PlayerCard;