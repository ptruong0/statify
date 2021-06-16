import React from 'react';
import { ListGroup } from 'react-bootstrap';

import PlaylistCard from './PlaylistCard';

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
    const components = props.list ? props.list.map((p) => {
        console.log(p.name);
        return <ListGroup.Item variant="success">{p.name}</ListGroup.Item>;
    }) : null;

    return (
        <div>
            <ListGroup>
                {components}
            </ListGroup>
        </div>
    );
}

export default Playlists;