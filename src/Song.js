import './styles.scss';
import { Accordion, Card } from 'react-bootstrap';
import { formatDuration, formatArtistList }from './helperFunctions';

const Song = (props) => {
    
    let artistList = formatArtistList(props.track.artists);

    const audioStats = props.audio ? Object.keys(props.audio).map((key) => {
        return <p>{key}: {props.audio[key]}</p>
    }) : null;

    return (
        <div className="song-entry">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.index} className="song-clickable" onClick={() => {props.selectSong(props.index - 1)}}>
                    <span>
                        {props.index} {". "}
                        <strong>{props.track.name}</strong> {" "}
                        {artistList}
                    </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.index}>
                    <Card.Body className="song-info" id={`song-info-${props.index - 1}`}>
                        <p>Album: {props.track.album.name} (released on {props.track.album.release_date})</p>
                        <p>Duration: {formatDuration(props.track.duration_ms)}</p> <br />
                        <p><u>Audio Data (provided by Spotify)</u></p>
                        {audioStats}
                        <br />
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </div>
    );
}

export default Song;