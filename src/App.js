import React, { useState, useEffect } from 'react';
// import { Link, Switch, Route } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Login';
import Token from './Token';


function App() {
  const [signedIn, setSignedIn] = useState(false)
  const [code, setCode] = useState(null);   // TODO: move access token process entirely to backend
  // const [token, setToken] = useState('');
  
  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get("code"));
  }, []);


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
