import axios from 'axios';

const backendURL = "http://localhost:5000";

// contains all the functions that call the backend
// does not include the Spotfy OAuth login process

export const fetchOauthClientId = (onError = (e) => {}) => {
    const REDIRECT_URI = 'http://localhost:3000';

    axios.get('http://localhost:5000/oauth-credentials')
        .then(res => {
            const CLIENT_ID = res.data.clientId;
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
        })
        .catch(err => {
            console.log(err);
            onError(err.message);
        });

}


export const fetchProfileName = (token, setFunc, onError = (e) => {}) => {
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
        .catch(err => {
            console.log(err);
            onError(err.message);
        });
}


export const fetchAllPlaylists = (token, setFunc, onError = (e) => {}) => {
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
        .catch(err => {
            console.log(err);
            onError(err.message);
        });
}


export const fetchAPlaylist = async(token, url, onError = (e) => {}) => {
    const get100Songs = async(offset, token, url, onError) => {
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
            .catch(err => {
                console.log(err);
                onError(err.message);
            });
        return list;
    }


    let fullList = [];
    let offset = 0;
    let isComplete = false;

    while (!isComplete) {
        await get100Songs(offset, token, url, onError)
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



export const fetchAudioFeatures = async(token, selectedSongs, onError = (e) => {}) => {
    const get100Audio = async(token, url, onError) => {
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
            .catch(err => {
                console.log(err);
                onError(err.message);
            });
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
            if (count === 100) {
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

        await get100Audio(token, url, onError)
            .then(result => {
                allAudio.push(...result);
            })
    }
    return allAudio;
}


export const fetchArtistFeatures = async(token, selectedSongs, onError = (e) => {}) => {
    const get50Artists = async(token, url, onError) => {
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
            .catch(err => {
                console.log(err);
                onError(err.message);
            });
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
            if (count === 50) {
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

        await get50Artists(token, url, onError)
            .then(result => {
                allGenres.push(result);
            })
    }
    return allGenres;
}


export const fetchStats = (audio, genres, selectedSongs, setFunc, onError = (e) => {}) => {
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
        .catch(err => {
            console.log(err);
            onError(err.message);
        });
}


export const fetchLyrics = (title, artist, setFunc, onError = (e) => {}) => {
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
        .catch(err => {
            console.log(err);
            onError(err.message);
        });
}