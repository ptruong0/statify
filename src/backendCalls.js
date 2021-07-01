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

export const fetchAPlaylist = (token, url, setFunc) => {
    axios.get(backendURL + "/getplaylist", {
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                accessToken: token,
                url: url
            }
        })
        .then((res) => {
            setFunc(res.data.songs);
        })
        .catch(err => console.log(err));
}

export const fetchAudioFeatures = (token, url, selectedSongs, setFunc, setStats) => {
    axios.post(backendURL + "/audiofeatures", {
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                accessToken: token,
                url: url,
                selectedSongs: selectedSongs
            },
        })
        .then((res) => {
            setStats(res.data.stats);
            setFunc(res.data.audioFeatures);
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