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