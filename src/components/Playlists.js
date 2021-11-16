import React from 'react';
import { Row, Button } from 'react-bootstrap';

import PlaylistCard from './PlaylistCard';
import '../styles.scss';

const Playlists = (props) => {
    // convert list of playlist objects into list of playlist card components
    const playlistComponents = props.list ? props.list.map((p, index) => {
        return <PlaylistCard 
            playlist={p} 
            select={props.select} 
            selected={props.selected ? props.selected.id === p.id : false}
            index={index + 1}
            />;
    }) : null;

    return (
        <div>
            <Row className="playlists-row row justify-content-around">
                <div className="text-container">
                    <h2>Your Public<br/>Playlists</h2>
                </div>
                
                <div className="playlists-list col-6" >
                    {playlistComponents}
                </div>

                {props.visible ?
                    // when changing playlists, user has the option to hide the playlists portion
                    <Button onClick={props.hide} size="md" variant="outline-info" className="show-playlists-btn">
                        Hide 
                    </Button>
                : null }
            </Row>
            
        </div>
    );
}

export default Playlists;