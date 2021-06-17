import './styles.scss';
import { Accordion, Card } from 'react-bootstrap';

const Song = (props) => {
    let artistList = "";
    for (let artist of props.track.artists) {
        artistList += artist.name;
        artistList += ", ";
    }
    artistList = artistList.slice(0, -2);
    return (
        <div>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.index}>
                        {props.index} {". "}
                        <strong>{props.track.name}</strong> {" "}
                        {artistList}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.index}>
                    <Card.Body></Card.Body>
                </Accordion.Collapse>
            </Card>
        </div>
    );
}

export default Song;