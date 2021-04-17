const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// call this endpoint after getting oauth code via login
// pass code from client to server in order to obtain and send back the token
app.post('/login', (req, res) => {
    const code = req.body.code;
    console.log(code);

    // initialize object for later use using authentication 
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: "89f488fad6fc4e67a2607dba4d955997",
        clientSecret: "d398655723f34571afe68124176587f4"
    });

    spotifyApi.authorizationCodeGrant(code).then(data => {
        console.log(data);

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
            console.log(data.body);
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
            console.log('Some information about the authenticated user', data.body);
            res.json({
                user: data.body
            });
        }, (err) => {
            console.log('Something went wrong!', err);
        });
})

app.listen(5000, () => console.log("Listening on port 5000..."));

// to start server
// npm run start