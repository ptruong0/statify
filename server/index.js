// Node package imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
    // const { parse, stringify } = require('flatted');
require('dotenv').config();

// controller function imports
const { getOAuth, postLogin, postRefresh, getProfileName, getPlaylists, getSongs, getAudioFeatures, getGenres, postStats, getLyrics } = require('./controllers');


// new Node express application
const app = express();

// middleware
app.use(cors());
app.use(bodyParser({ limit: '50mb' }));



// get client ID of currently-logged-in user
app.get('/oauth-credentials', getOAuth);


// call this endpoint after getting OAuth code via login
// pass code from client to server in order to obtain and send back the token
app.post('/login', postLogin);


// refresh the token when it is about to expire 
app.post('/refresh', postRefresh);


// get the user's profile name to display on the frontend
app.get('/profilename', getProfileName);

// retrieve a list of the user's playlists
app.get('/playlists', getPlaylists);


// get songs in a particular playlist
app.get('/getplaylist', getSongs);


// get audio features for certain songs 
app.get('/audiofeatures', getAudioFeatures);


// get the genres of selected artists
app.get('/artistgenres', getGenres);


// generate stats using the previously-fetched data
app.post('/audiostats', postStats);


// get lyrics for a select song from Genius API 
app.get('/lyrics', getLyrics);



app.listen(5000, () => console.log("Listening on port 5000..."));

// to start server, navigate to spot/server
// npm run start