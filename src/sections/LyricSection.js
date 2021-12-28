import { formatArtistList, lyricsToComponents } from '../functions/helperFunctions';

import { Spinner } from 'react-bootstrap';


const LyricSection = (props) => {
    const geniusURL = 'https://genius.com';
    const lyricComponents = lyricsToComponents(props.lyrics);

   console.log(props.youtube);
    // insert video ID into URL
    const youtubeUrl = props.youtube ? `https://www.youtube.com/embed/${props.youtube}` : null;
    console.log(youtubeUrl);

    return (
        <div>
            <div>
                <p onClick={props.hideFunc} className="hide-lyrics">Hide Tab</p>
            </div>

            <h5><b>Lyrics</b></h5>
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
                        <a href={geniusURL + props.lyrics.path} target="_blank" className="genius-link">Lyric Source: Genius</a>
                    : null }

                    <br />
                    <br />
                    <br />
                    {/* embedded youtube video*/}
                    {props.youtube ? 
                        <div>
                            <a href={youtubeUrl} target="_blank" className="youtube-link">Listen on Youtube</a>
                            <br />

                            <iframe width="420" height="315"
                            src={youtubeUrl} className="song-video">
                            </iframe>
                        </div>
                    : <p>No video</p> }
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