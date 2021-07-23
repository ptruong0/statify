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


export const fetchAPlaylist = async(token, url) => {
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
                // console.log(res.data.songs);
                list = res.data.songs;
            })
            .catch(err => console.log(err));
        return list;
    }


    let fullList = [];
    let offset = 0;
    let isComplete = false;

    while (!isComplete) {
        await get100Songs(offset, token, url)
            .then(result => {
                // console.log(result);
                if (result.length < 100) {
                    isComplete = true;
                }
                fullList.push(...result)
                offset += 100;
            })
    }
    return fullList;
}



export const fetchAudioFeatures = async(token, selectedSongs) => {
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


    // put song ids into a list to be passed into audio features query
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


export const fetchArtistFeatures = async(token, selectedSongs) => {
    const get50Artists = async(token, url) => {
        let list = {};
        await axios.get(backendURL + "/artistgenres", {
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    accessToken: token,
                    url: url,
                },
            })
            .then((res) => {
                list = res.data.genreStats;
            })
            .catch(err => console.log(err));
        return list;
    }


    // put artist ids into a list 
    let idList = selectedSongs.map((s) => {
        // console.log(s.track.artists[0].name);
        return s.track.artists[0].id;
    })
    let url = "";
    let allGenres = [];

    while (idList.length > 0) {
        let ids = "";
        let count = 0;
        for (let s of idList) {
            ids += s + ","; // accumulate id's in a string 100 at a time
            count++;
            if (count == 50) {
                break;
            }
        }
        if (count >= idList.length) {
            idList = [];
        } else {
            idList = idList.slice(count);
        }

        ids = ids.slice(0, -1);
        url = "https://api.spotify.com/v1/artists?ids=";
        url += ids;

        await get50Artists(token, url)
            .then(result => {
                allGenres.push(result);
            })
    }
    return allGenres;
}


export const fetchStats = (audio, genres, selectedSongs, setFunc) => {
    axios.post(backendURL + "/audiostats", {
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                audioFeatures: audio,
                artistGenres: genres,
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