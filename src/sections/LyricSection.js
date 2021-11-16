import { formatArtistList, lyricsToComponents } from '../functions/helperFunctions';

import { Spinner } from 'react-bootstrap';


const LyricSection = (props) => {
    const geniusURL = 'https://genius.com';
    const lyricComponents = lyricsToComponents(props.lyrics);

    return (
        <div>
            <h5>Lyrics</h5>
            {props.song && props.lyrics ?
                // song has selected and loaded

                <div>
                    {/* display song title and artist(s) */}
                    <h6 className="lyric-title">
                        <strong>{props.song.track.name}</strong>
                        <span className="white-by"> by </span>
                        <strong>{formatArtistList(props.song.track.artists)}</strong>
                    </h6>
                    <br />
                    
                    {/* lyrics HTML */}
                    <div className="lyric-container">
                        {lyricComponents}
                    </div>
                    <br />

                    {/* lyrics source credit */}
                    {props.lyrics.path !== "ERROR" ? 
                        <a href={geniusURL + props.lyrics.path} target="_blank">Lyric Source: Genius</a>
                    : null }
                </div>

                :
             
                props.songClicked ?
                    // song hasn't loaded yet -> loading graphic
                    <div className="triple-spinners">
                        <Spinner animation="grow" variant="success" size="sm" className="spinner" />
                        <Spinner animation="grow" variant="success" size="sm" className="spinner" />
                        <Spinner animation="grow" variant="success" size="sm" className="spinner" />
                    </div>
                    : 
                    // song hasn't been selected yet
                    <p>Click on a song to display its lyrics</p>
            }
        </div>
    );
};

export default LyricSection;