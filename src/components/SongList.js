import Song from './Song';
import '../styles.scss';

import { Accordion } from 'react-bootstrap';

const SongList = (props) => {
    const components = props.list ? props.list.map((s, index) => {
        return <Song track={s.track} index={index + 1} audio={props.audioFeatures[index]} {...props}/>;
    }) : null;
    return (
        <div className="song-list">
            <Accordion defaultActiveKey="0" className="song-accordion">
                {components}
            </Accordion>
            
        </div>
    );
}


export default SongList;