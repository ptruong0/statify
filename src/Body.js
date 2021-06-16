import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Playlists from './Playlists';


const Body = (props) => {

    useEffect(() => {
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                "Authorization": `Bearer ${props.accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }, []);

    const getPlaylists = () => {
        axios.get('https://api.spotify.com/v1/me/playlists', { 
            headers: {
                "Authorization": `Bearer ${props.accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <button onClick={getPlaylists}>Get playlists</button>
            <p></p>
            {playlists ? 
            <Playlists />
            : "oop"}
        </div>
    );
}

export default Body;