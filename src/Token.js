import Main from './Main';
import Auth from './Auth';

import { useState, useEffect } from 'react';
import axios from 'axios';

const Token = (props) => {
    const [token, setToken] = useState(null);

    async function getToken(code) {
        const accessToken = await Promise.resolve(Auth(code));
        return accessToken;
    }

    getToken(props.code).then((res) => {
        setToken(res);
    })

    return (
        <div>
            {token ? 
            <Main token={token}/>
            : <p><br />Server is not currently running at this time.</p>}
        </div>
    );
}

export default Token;