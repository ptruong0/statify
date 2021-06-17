import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './styles.scss';


const PlaylistCard = (props) => {
    // return (
    //     <div>
            
    //         <h3>{props.playlist.name}</h3>
    //     </div>
    // );
    
    return (
        <ListGroup.Item variant="success" action className="playlist-card"
            onClick={() => {console.log(props.playlist); props.select(props.playlist);}}>
                <span style={{paddingRight: "20px"}}>{props.index}.</span>
                {props.selected ? 
                 <strong>{props.playlist.name}</strong>
                 :
                props.playlist.name}
        </ListGroup.Item>
    );
}

export default PlaylistCard;