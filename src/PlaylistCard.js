import React from 'react';
import { List } from 'react-bootstrap';

const PlaylistCard = (props) => {
    return (
        <div>
            
            <h3>{props.playlist.name}</h3>
        </div>
    );
}

export default PlaylistCard;