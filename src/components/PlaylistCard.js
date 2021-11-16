import React from 'react';

import '../styles.scss';


const PlaylistCard = (props) => {
    
    return (
        <div className="playlist-card cursor-hover"
            onClick={() => {console.log(props.playlist); props.select(props.playlist);}}>
                <span style={{paddingRight: "20px"}}>{props.index}.</span>
                {props.selected ? 
                 <strong>{props.playlist.name}</strong>
                 :
                props.playlist.name}
        </div>
    );
}

export default PlaylistCard;