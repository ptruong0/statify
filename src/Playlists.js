import React from 'react';
import { ListGroup, Row } from 'react-bootstrap';

import PlaylistCard from './PlaylistCard';
import './styles.scss';

// const Playlists = (props) => {
//     const components = props.list ? props.list.map((p) => {
//         console.log(p.name);
//         return <PlaylistCard playlist={p}/>;
//     }) : null;

//     return (
//         <div>
//             {components}
//         </div>
//     );
// }

const Playlists = (props) => {
    const components = props.list ? props.list.map((p, index) => {
        // return <ListGroup.Item variant="success" action>{p.name}</ListGroup.Item>;
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
                
                <ListGroup className="playlists-list col-8">
                    {components}
                </ListGroup>
            </Row>
            
        </div>
    );
}

export default Playlists;