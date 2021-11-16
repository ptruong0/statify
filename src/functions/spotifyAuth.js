import { useState, useEffect } from 'react'
import axios from 'axios';

// Contains all backend calls related to the Spotifiy OAuth authentication process
const SpotifyAuth = (code) => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {

        axios.post('http://localhost:5000/login', { code })
            .then(res => {
                console.log(res.data.body)

                // store the tokens from backend in this Auth object
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)

                window.history.pushState({}, null, '/')
            })
            .catch(() => {
                window.location = '/'
            });


    }, [code]); // call useEffect when code changes

    // call refresh in server whenever both refreshToken and expiresIn changes
    useEffect(() => {
        if (!refreshToken || !expiresIn) {
            return;
        }

        // call /refresh endpoint one minute before expiring
        const interval = setInterval(() => {
            axios.post('http://localhost:5000/refresh', { refreshToken })
                .then(res => {
                    console.log(res.data)

                    // store the tokens from backend in this Auth object 
                    // same thing as above but without refresh token
                    setAccessToken(res.data.accessToken)
                    setExpiresIn(res.data.expiresIn)
                })
                .catch(() => {
                    window.location = '/'
                })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn])

    return accessToken;
}

export default SpotifyAuth;