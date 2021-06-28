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
  const credentials = ApiKey();
  // const [code, setCode] = useState('');
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

  const code = new URLSearchParams(window.location.search).get("code");
  // const token = code ? Auth(code) : null;
  // console.log(token);
  // useState(() => {
  //   if (code)
  //   {
  //     setToken(Auth(code));
  //   }
  // }, [code])
  

  return (
    <div className="App">
      {code ? <Token code={code} /> : <Login />}
    </div>
  );
}

export default App;
