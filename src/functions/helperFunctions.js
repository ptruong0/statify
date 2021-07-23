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
    console.log(bigObject)
    return bigObject;
}

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