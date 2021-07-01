
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatArtistList } from './helperFunctions';

const lyricURL = "https://api.lyrics.ovh/v1/";


const LyricTab = (props) => {
    const geniusURL = 'https://genius.com';
    const lyricComponents = [];
    if (props.lyrics && props.lyrics.lyricHTML.length > 0) {
        const html = props.lyrics.lyricHTML;
        // console.log(props.lyrics.lyricHTML);
        if (html.length > 1) {
            for (let i = 1; i < html.length; i++) {
                lyricComponents.push(<div dangerouslySetInnerHTML={{ __html: html[i] }}></div>)
            }
        } else {
            lyricComponents.push(<div dangerouslySetInnerHTML={{ __html: html[0] }}></div>)
        }
    }

    return (
        <div>

            {props.song && props.lyrics ?
                <div>
                    <h5 className="lyric-title">Lyrics for {props.song.track.name} by {formatArtistList(props.song.track.artists)}</h5>
                    <br />
                    <div className="lyric-container">
                        {lyricComponents}
                    </div>
                    <br />
                    <a href={geniusURL + props.lyrics.path} target="_blank">Lyric Source: Genius</a>
                </div>
                : "Click on a song to display its lyrics"}
        </div>
    );
};

export default LyricTab;