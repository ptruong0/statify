const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { parse, stringify } = require('flatted');
const SpotifyWebApi = require('spotify-web-api-node');

const generateStats = require('./generateStats');
const fields = require('./fields');

const app = express();
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser({ limit: '50mb' }));

// call this endpoint after getting oauth code via login
// pass code from client to server in order to obtain and send back the token
app.post('/login', (req, res) => {
    const code = req.body.code;
    // console.log(code);

    // initialize object for later use using authentication 
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: "89f488fad6fc4e67a2607dba4d955997",
        clientSecret: "d398655723f34571afe68124176587f4"
    });

    spotifyApi.authorizationCodeGrant(code).then(data => {
        // console.log(data);

        // return tokens back to the client
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        });
    }).catch((err) => {
        res.sendStatus(400);
        console.log(err);
    })
})

// call this endpoint to refresh the token
app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: "89f488fad6fc4e67a2607dba4d955997",
        clientSecret: "d398655723f34571afe68124176587f4",
        refreshToken
    });

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
})

app.get('/user', (req, res) => {
    const accessToken = req.body.accessToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: "89f488fad6fc4e67a2607dba4d955997",
        clientSecret: "d398655723f34571afe68124176587f4",
        accessToken: accessToken
    });
    spotifyApi.getMe()
        .then((data) => {
            // console.log('Some information about the authenticated user', data.body);
            res.json({
                user: data.body
            });
        }, (err) => {
            console.log('Something went wrong!', err);
        });
})

app.get('/profilename', (req, res) => {
    const accessToken = req.query.accessToken;
    const baseURL = 'https://api.spotify.com/v1/me';
    axios.get(baseURL, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            // setUsername(res.data.display_name);
            res.json({
                displayName: response.data.display_name
            })
        })
        .catch(err => console.log(err));
})

app.get('/playlists', (req, res) => {
    const accessToken = req.query.accessToken;
    const baseURL = 'https://api.spotify.com/v1/me/playlists';
    axios.get(baseURL, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            res.json({
                playlists: response.data.items
            })

        })
        .catch(err => console.log(err));
})

app.get('/getplaylist', (req, res) => {
    const accessToken = req.query.accessToken;
    const url = req.query.url;
    axios.get(url, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            res.json({
                songs: response.data.tracks.items
            })
        })
        .catch(err => console.log(err));
})


app.post('/audiofeatures', (req, res) => {
    const accessToken = req.body.data.accessToken;
    const url = req.body.data.url;
    const selectedSongs = req.body.data.selectedSongs;

    // console.log(url, selectedSongs);
    axios.get(url, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            const stats = generateStats(response.data.audio_features, selectedSongs);
            let audioFeatures = [];
            for (let i = 0; i < response.data.audio_features.length; i++) {
                let obj = {};
                for (let f of fields) {
                    obj[f] = response.data.audio_features[i][f];
                }
                audioFeatures.push(obj);
            }

            res.json({
                stats: stats,
                audioFeatures: audioFeatures,
            })
        })
        .catch(err => console.log(err));
})


app.get('/lyrics', (req, res) => {
    const baseURL = "https://api.genius.com/";
    const token = "YLPGEOOSKyH--P-F3EHHWFujtGE4qdcIQL9LBQR5hl1vSjfm2EBqad4Qom_HrgXa";

    // console.log(req.query);
    const artist = req.query.artist;
    const title = req.query.title;
    // console.log("... " + title + " " + artist);

    const searchURL = `${baseURL}search?q=${artist} ${title}`;
    axios.get(searchURL, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
                "User-Agent": "CompuServe Classic/1.22",
                "Host": "api.genius.com"
            }
        })
        .then(result => {
            // console.log("=================================================")
            // console.log(result.data.response.hits[0]);
            //return result.data.response.hits[0].result.path;
            scrapeLyrics('https://genius.com' + result.data.response.hits[0].result.path)
                .then(value => {
                    // value = stringify(value);
                    console.log('.............................')
                        // console.log(value);
                    res.json({
                        path: result.data.response.hits[0].result.path,
                        lyricHTML: value,
                    });
                });


        })
        // .then(id => {
        //     console.log(id + "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        //     const lyricURL = `${baseURL}songs/${id}?text_format=plain`;

    //     axios.get(lyricURL, {
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Authorization": "Bearer " + token,
    //                 "User-Agent": "CompuServe Classic/1.22",
    //                 "Host": "api.genius.com"
    //             }
    //         })
    //         .then(obj => {
    //             console.log(obj.data.response.song);
    //         })
    //         .catch(err => console.log(err));
    // })
    // .catch(err => console.log(""));
    .catch(err => {
        console.log(err);
        res.json({
            path: "ERROR"
        })
    });

})

const scrapeLyrics = async(url) => {
    console.log(url);

    const res = await fetch(url);

    const html = await res.text();
    const $ = cheerio.load(html);
    const lyricDiv = $('div.Lyrics__Container-sc-1ynbvzw-7');
    console.log(lyricDiv);
    let htmlElements = [];
    // lyricDiv.each((i, elem) => {
    //     // console.log(lyricDiv[i]);
    //     htmlElements.push($.html(this));
    // });
    console.log(lyricDiv.toArray());
    htmlElements = lyricDiv.toArray().map(x => {
            return $.html(x);
        })
        // return $('div.Lyrics__Container-sc-1ynbvzw-7').text();
        // return $('div.Lyrics__Container-sc-1ynbvzw-7').html();
    return htmlElements;

}


app.listen(5000, () => console.log("Listening on port 5000..."));

// to start server,
// npm run start