import axios from 'axios';

const backendURL = "http://localhost:5000";

export const fetchProfileName = (token, setFunc) => {
    axios.get(backendURL + "/profilename", {
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                accessToken: token
            }
        })
        .then((res) => {
            setFunc(res.data.displayName);
        })
        .catch(err => console.log(err));
}

export const fetchAllPlaylists = (token, setFunc) => {
    axios.get(backendURL + "/playlists", {
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                accessToken: token
            }
        })
        .then((res) => {
            setFunc(res.data.playlists);
        })
        .catch(err => console.log(err));
}

const get100Songs = async(offset, token, url) => {
    let list = [];
    await axios.get(backendURL + "/getplaylist", {
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                accessToken: token,
                url: url,
                offset: offset
            }
        })
        .then((res) => {
            console.log(res.data.songs);
            // setFunc(res.data.songs);
            list = res.data.songs;
        })

    .catch(err => console.log(err));
    return list;
}

export const fetchAPlaylist = async(token, url) => {
    let fullList = [];
    let offset = 0;
    let isComplete = false;

    while (!isComplete) {
        await get100Songs(offset, token, url)
            .then(result => {
                console.log(result);
                if (result.length < 100) {
                    isComplete = true;
                }
                fullList.push(...result)
                offset += 100;
            })
    }

    console.log(fullList.length, "!!!!");
    console.log(fullList);
    return fullList;
}

const get100Audio = async(token, url) => {

    let list = [];

    await axios.get(backendURL + "/audiofeatures", {
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                accessToken: token,
                url: url,
                // selectedSongs: selectedSongs
            },
        })
        .then((res) => {
            list = res.data.audioFeatures;
        })
        .catch(err => console.log(err));
    return list;
}

export const fetchAudioFeatures = async(token, selectedSongs) => {
    let idList = selectedSongs.map((s) => {
        return s.track.id;
    })
    let url = "";
    let allAudio = [];

    while (idList.length > 0) {
        let ids = "";
        let count = 0;
        for (let s of idList) {
            ids += s + ","; // accumulate id's in a string 100 at a time
            count++;
            if (count == 100) {
                break;
            }
        }
        if (count >= idList.length) {
            idList = [];
        } else {
            idList = idList.slice(count);
        }

        ids = ids.slice(0, -1);
        url = "https://api.spotify.com/v1/audio-features?ids=";
        url += ids;

        await get100Audio(token, url)
            .then(result => {
                allAudio.push(...result);
            })
    }
    return allAudio;
}

export const fetchStats = (audio, selectedSongs, setFunc) => {
    axios.post(backendURL + "/audiostats", {
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                audioFeatures: audio,
                selectedSongs: selectedSongs
            }
        })
        .then(res => {
            setFunc(res.data.stats);
        })
        .catch(err => console.log(err));
}

export const fetchLyrics = (title, artist, setFunc) => {
    axios.get(backendURL + "/lyrics", {
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                title: title,
                artist: artist
            }
        })
        .then(res => {
            console.log(res.data);
            setFunc(res.data);
        })
        .catch(err => console.log(err));
}