import Main from './Main';
import SpotifyAuth from './functions/spotifyAuth';

import { useState } from 'react';

const Token = (props) => {
    const [token, setToken] = useState(null);

    async function getToken(code) {
        const accessToken = await Promise.resolve(SpotifyAuth(code));
        return accessToken;
    }

    getToken(props.code).then((res) => {
        setToken(res);
    })

    return (
        <div>
            {token ? 
            <Main token={token} {...props}/>
            : <p><br />Server is not currently running at this time.</p>}
        </div>
    );
}

export default Token;