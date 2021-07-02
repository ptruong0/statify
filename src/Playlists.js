import React from 'react';
import { ListGroup, Row, Button } from 'react-bootstrap';

import PlaylistCard from './PlaylistCard';
import './styles.scss';

const Playlists = (props) => {
    const components = props.list ? props.list.map((p, index) => {
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
                    <h2>Your<br/>Playlists</h2>
                </div>
                
                <div className="playlists-list col-6" >
                    {components}
                </div>
                {props.visible ?
                <Button onClick={props.hide} size="md" variant="outline-info" className="show-playlists-btn">
                    Hide 
                </Button>
                : null }
            </Row>
            
        </div>
    );
}

export default Playlists;