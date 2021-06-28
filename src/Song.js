import './styles.scss';
import { Accordion, Card } from 'react-bootstrap';

const Song = (props) => {
    const formatDuration = (ms) => {
        let str = "";
        let totalSeconds = Math.round(ms / 1000);
        let secs = totalSeconds % 60;
        if (totalSeconds >= 60) {
            let mins = Math.floor(totalSeconds / 60);
            str += mins.toString() + " min ";
            str += secs.toString() + " sec";
        } else {
            str += secs.toString() + " secs";
        }
        return str;
    }

    let artistList = "";
    for (let artist of props.track.artists) {
        artistList += artist.name;
        artistList += ", ";
    }
    artistList = artistList.slice(0, -2);

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