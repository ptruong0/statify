
import { useEffect, useState } from 'react';
import axios from 'axios';

const lyricURL = "https://api.lyrics.ovh/v1/";


const LyricTab = (props) => {
    const geniusURL = 'https://genius.com';
    // const [lyrics, setLyrics] = useState(null);

    // const getLyrics = () => {
    //     if (props.song) {
    //         // const url = lyricURL + props.song.name + "/" + props.song.artists[0].name;
    //         const url = "http://localhost:5000/lyrics";
    //         const title = props.song.name;
    //         const artist = props.song.artists[0].name;
    //         axios.get(url, {
    //             headers: {
    //             "Content-Type": "application/json"
    //         },
    //             title, 
    //             artist
    //         })
    //         .then(res => {
    //             // blocked by CORS, use backend
    //             console.log(res);
    //             setLyrics(res);
    //         })
    //         .catch(err => console.log(err));
    //     }
    // }

    // useEffect(() => {
    //     console.log("getting lyrics");
    //     getLyrics();
    // }, [lyrics]);

    return (
        <div>
            {props.lyrics ? 
            <a href={geniusURL + props.lyrics} target="_blank">Get lyrics here</a>
            : null }
        </div>
    );
};

export default LyricTab;