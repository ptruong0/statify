import { toast } from 'react-toastify';


// converts a milliseconds value to seconds or minutes
export const formatDuration = (ms) => {
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


// converts a list of artists into a comma-separated string
export const formatArtistList = (list) => {
    if (list.length !== 0) {
        let artistList = "";
        for (let artist of list) {
            artistList += artist.name;
            artistList += ", ";
        }
        return artistList.slice(0, -2);
    } else {
        return "";
    }
}


// accumulates the total values of object keys from every object
// used on a list of objects (objects should all have the same keys)
// e.g. [{a: 1, b: 2}, {a: 3, b: 4}, {a: 5, b: 6}]  -> {a: 9, b: 12}
export const mergeObjects = (list) => {
    let bigObject = list.length != 0 ? list[0] : null;
    if (list.length > 1) {
        for (let i = 1; i < list.length; i++) {
            for (const [key, value] of Object.entries(list[i])) {
                if (key in bigObject) {
                    bigObject[key] += value;
                } else {
                    bigObject[key] = value;
                }
            }
        }
    }
    // console.log(bigObject);
    return bigObject;
}


// capitalize the first letter of a string
export const capitalize = (s) => {
    if (s.length > 0) {
        if (s.length > 1) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        } else {
            return s.charAt(0).toUpperCase();
        }
    }
    return s;
}


// displays toast error message in the top right corner
export const showError = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}


// returns React component versions of the lyrics
export const lyricsToComponents = (lyrics) => {
    // lyrics are in the form of an array of HTML elements
    const lyricComponents = [];
    if (lyrics && lyrics.lyricHTML) {
        const html = lyrics.lyricHTML;

        // no lyrics found
        if (lyrics.path === "ERROR") {
            // console.log(html);
            lyricComponents.push(<div dangerouslySetInnerHTML={{ __html: html[0] }} className="no-lyric-msg"></div>)

        } else if (lyrics.lyricHTML.length > 0) {
            // console.log(lyrics.lyricHTML);
            if (html.length > 1) {
                for (let i = 0; i < html.length; i++) {
                    lyricComponents.push(<div dangerouslySetInnerHTML={{ __html: html[i] }} className="lyric-text"></div>)
                    lyricComponents.push(<br/>)
                }
            } else {        // rare case with only one div of lyrics
                lyricComponents.push(<div dangerouslySetInnerHTML={{ __html: html[0] }} className="lyric-text"></div>)
            }
        }
    }

    return lyricComponents;
}


// converts artist data to graph format so that it can be rendered into graph
export const artistDataToGraph = (songs) => {
    let freq = {};
    for (let s of songs) {
        for (let a of s.track.artists) {
            if (a.name in freq) {
                freq[a.name]++;
            } else {
                freq[a.name] = 1;
            }
        }
    }
    // console.log(freq);

    let data = [];
    // chart needs name and value pairs 
    for (let [key, value] of Object.entries(freq)) {
        data.push({
            name: key,
            value: value
        })
    }

    data.sort(function (a, b) {
        return b.value - a.value;   // sort in decreasing order
    })
    // console.log(data);
    return data;
}


// converts genre data to graph format so that it can be rendered into graph
export const genreDataToGraph = (freq) => {
    let data = [];
    // chart needs name and value pairs 
    for (let [key, value] of Object.entries(freq)) {
        data.push({
            name: key,
            value: value
        })
    }
    
    data.sort(function (a, b) {
        return b.value - a.value;   // sort in decreasing order
    })
    // console.log(data);
    return data;
}