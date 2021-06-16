import Auth from './Auth';
import Playlists from './Playlists';
import PlaylistCard from './PlaylistCard';

import { useState, useEffect } from 'react';
import axios from 'axios';

const Main = (props) => {
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);
    const [playlists, setPlaylists] = useState(null);

    async function getToken(code) {
        const accessToken = await Promise.resolve(Auth(code));
        return accessToken;
    }

    getToken(props.code).then((accessToken) => {
        console.log(accessToken);
        if (!username)
        {
            axios.get('https://api.spotify.com/v1/me', {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            })
            .then(res => {
                console.log(res);
                setUsername(res.data.display_name);
            })
            .catch(err => console.log(err));
        }
        
        setToken(accessToken);

        getPlaylists();
        
    })


    const getPlaylists = () => {
        if (!playlists)
        {
            axios.get('https://api.spotify.com/v1/me/playlists', { 
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            })
            .then(res => {
                console.log(res.data.items);
                setPlaylists(res.data.items);

            })
            .catch(err => console.log(err));
        }
    }


    return (
        <div>
            <p>Logged in with code {props.code}</p>
            <button onClick={getPlaylists}>Get playlists</button>
            <p>signed into {username}</p>

            <Playlists list={playlists}/>
    </div>
    )
}

export default Main;