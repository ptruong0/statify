
import { formatArtistList } from './helperFunctions';

import { Spinner } from 'react-bootstrap';

const lyricURL = "https://api.lyrics.ovh/v1/";


const LyricTab = (props) => {
    const geniusURL = 'https://genius.com';
    const lyricComponents = [];
    if (props.lyrics && props.lyrics.lyricHTML) {
        const html = props.lyrics.lyricHTML;

        if (props.lyrics.path === "ERROR") {
            console.log(html);
            lyricComponents.push(<div dangerouslySetInnerHTML={{ __html: html[0] }} className="no-lyric-msg"></div>)

        } else if (props.lyrics.lyricHTML.length > 0) {
            // console.log(props.lyrics.lyricHTML);
            if (html.length > 1) {
                for (let i = 0; i < html.length; i++) {
                    lyricComponents.push(<div dangerouslySetInnerHTML={{ __html: html[i] }}></div>)
                    lyricComponents.push(<br/>)
                }
            } else {
                lyricComponents.push(<div dangerouslySetInnerHTML={{ __html: html[0] }}></div>)
            }
        }
    }


    return (
        <div>
            <h5>Lyrics</h5>
            {props.song && props.lyrics ?
                <div>
                    <h6 className="lyric-title">
                        <strong>{props.song.track.name}</strong> by <strong>{formatArtistList(props.song.track.artists)}</strong>
                    </h6>
                    <br />
                    <div className="lyric-container">
                        {lyricComponents}
                    </div>
                    <br />
                    {props.lyrics.path !== "ERROR" ? 
                    <a href={geniusURL + props.lyrics.path} target="_blank">Lyric Source: Genius</a>
                    : null }
                </div>
                :
                props.songClicked ?
                    <div className="triple-spinners">
                        <Spinner animation="grow" variant="success" size="sm" className="spinner" />
                        <Spinner animation="grow" variant="success" size="sm" className="spinner" />
                        <Spinner animation="grow" variant="success" size="sm" className="spinner" />
                    </div>
                    : <p>Click on a song to display its lyrics</p>
            }
        </div>
    );
};

export default LyricTab;