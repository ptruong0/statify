import './App.css';
import { ApiKey } from './ApiKey';
import axios from 'axios';
//import env from 'react-dotenv';
import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Login';
import Main from './Main';
import Token from './Token';
//const client_id = window.env.CLIENT_ID;


function App() {
  const [signedIn, setSignedIn] = useState(false)
  const [code, setCode] = useState(null);
  // const [token, setToken] = useState('');
  /*
    useEffect(() => {
      axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(credentials.clientId + ':' + credentials.clientSecret)      
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      })
      .then(tokenRes => {
        console.log(tokenRes);
        setToken(tokenRes.data.acess_token);
  
      });
    }, []);
    */
  useEffect(() => {
    const credentials = ApiKey();
    setCode(new URLSearchParams(window.location.search).get("code"));
  }, []);
  // const token = code ? Auth(code) : null;
  // console.log(token);
  // useState(() => {
  //   if (code)
  //   {
  //     setToken(Auth(code));
  //   }
  // }, [code])

  useEffect(() => {
    if (code) {
      setSignedIn(true);

    }
  }, [code]);

  const signOut = () => {
    // open up a Spotify logout window
    const url = 'https://www.spotify.com/logout/'
    const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=10,height=10,top=4000,left=4000')
    setTimeout(() => spotifyLogoutWindow.close(), 500);

    setSignedIn(false);
    setCode(null);
  }


  return (
    <div className="App">
      {code && signedIn ? <Token code={code} signOut={signOut} /> : <Login />}

    </div>
  );
}

export default App;
