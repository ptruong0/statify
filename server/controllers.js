const axios = require('axios');
const SpotifyWebApi = require('spotify-web-api-node');

// local file imports
const generateStats = require('./generateStats');
const scrapeLyrics = require('./scrapeLyrics');
const fields = require('./fields');

// secret tokens stored in .env file
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const geniusToken = process.env.GENIUS_TOKEN;


// get client ID of currently-logged-in user
exports.getOAuth = (req, res) => {
    res.json({
        clientId: clientId
    });
};


// call this endpoint after getting OAuth code via login
// pass code from client to server in order to obtain and send back the token
exports.postLogin = (req, res) => {
    const code = req.body.code;
    // console.log(code);

    // initialize object for later use using authentication 
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: clientId,
        clientSecret: clientSecret
    });

    // generate tokens using external function
    spotifyApi.authorizationCodeGrant(code)
        .then(data => {
            // console.log(data);

            // return tokens back to the client
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            });
        })
        .catch((err) => {
            res.sendStatus(400);
            console.log(err);
        })
};


// refresh the token when it is about to expire 
exports.postRefresh = (req, res) => {
    // get refresh token from request body
    const refreshToken = req.body.refreshToken;

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken
    });

    // generate fresh tokens using external function
    spotifyApi.refreshAccessToken()
        .then((data) => {
            // console.log(data.body);
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in
            })

        }).catch((err) => {
            res.sendStatus(400);
            console.log(err);
        })
}


// get the user's profile name to display on the frontend
exports.getProfileName = (req, res) => {
    const accessToken = req.query.accessToken;
    const baseURL = 'https://api.spotify.com/v1/me'; // endpoint for profile info
    axios.get(baseURL, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            res.json({
                displayName: response.data.display_name // display_name attribute contains username
            })
        })
        .catch((err) => {
            res.sendStatus(400);
            console.log(err);
        })
};


// retrieve a list of the user's playlists
exports.getPlaylists = (req, res) => {
    const accessToken = req.query.accessToken;
    const baseURL = 'https://api.spotify.com/v1/me/playlists'; // endpoint for user playlists
    axios.get(baseURL, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            res.json({
                playlists: response.data.items // playlists stored in items array
            })
        })
        .catch((err) => {
            res.sendStatus(400);
            console.log(err);
        })
}


// get songs in a particular playlist
exports.getSongs = (req, res) => {
    const accessToken = req.query.accessToken;
    let url = req.query.url; // all song id's concatenated into the url
    const offset = req.query.offset; // only 100 songscan be retrieved at a time, offset is used to get all

    url += `/tracks?offset=${offset}`; // endpoint to retrieve tracks/songs

    // console.log("offset: " + offset);
    axios.get(url, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json",
                "offset": offset
            }
        })
        .then(response => {
            // console.log(response.data.items);
            res.json({
                songs: response.data.items // songs stored in items array
            })
        })
        .catch((err) => {
            res.sendStatus(400);
            console.log(err);
        })
}


// get audio features for certain songs 
exports.getAudioFeatures = (req, res) => {
    const accessToken = req.query.accessToken;
    const url = req.query.url; // all song id's concatenated into the url

    axios.get(url, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            // console.log(response.data.audio_features);

            // accumulate all audio features for a song into an object, then add to the list of song's audio features
            let songsAudioFeatures = [];
            for (let i = 0; i < response.data.audio_features.length; i++) {
                let obj = {};
                for (let f of fields) { // fields contain the categories data that the API will send back
                    // console.log(response.data.audio_features[i]);
                    if (response.data.audio_features[i]) {
                        obj[f] = response.data.audio_features[i][f];
                    }
                }
                songsAudioFeatures.push(obj);
            }

            res.json({
                audioFeatures: songsAudioFeatures, // send back list
            })
        })
        .catch((err) => {
            res.sendStatus(400);
            console.log(err);
        })
};

// get the genres of selected artists
exports.getGenres = (req, res) => {
    const accessToken = req.query.accessToken;
    const url = req.query.url; // all artist id's concatenated into the url

    axios.get(url, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            // store and keep count of every artists' genre(s) in an object
            let artistGenres = {};
            for (let i = 0; i < response.data.artists.length; i++) {
                for (let g of response.data.artists[i].genres) {
                    if (g in artistGenres) {
                        artistGenres[g]++;
                    } else {
                        artistGenres[g] = 1;
                    }
                }
            }

            res.json({
                genreStats: artistGenres, // send back object
            })
        })
        .catch((err) => {
            res.sendStatus(400);
            console.log(err);
        })
}

// generate stats using the previously-fetched data
exports.postStats = (req, res) => {
    const data = req.body.data;

    const stats = generateStats(data.audioFeatures, data.artistGenres, data.selectedSongs);

    res.json({
        stats: stats
    })
};

// get lyrics for a select song from Genius API 
exports.getLyrics = (req, res) => {
    const baseURL = "https://api.genius.com/";

    const artist = req.query.artist;
    const title = req.query.title;

    const searchURL = `${baseURL}search?q=${artist} ${title}`; // search for the artist + song title in Genius database
    // console.log(searchURL);   

    axios.get(searchURL, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + geniusToken,
                "User-Agent": "CompuServe Classic/1.22",
                "Host": "api.genius.com"
            }
        })
        .then(result => {
            // search should return the Genius URL for that song's lyric page
            // now, scrape that webpage to return just the lyrics in HTML form

            scrapeLyrics('https://genius.com' + result.data.response.hits[0].result.path)
                .then(value => {
                    // console.log(value);

                    // send back song lyrics in HTML form
                    res.json({
                        // path signals if there is an error (not found)
                        path: result.data.response.hits[0].result.path,
                        lyricHTML: value,
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.json({
                path: "ERROR" // let frontend know that lyrics are not found
            })
        });
};