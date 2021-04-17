import Auth from './Auth';
import axios from 'axios';

const Main = (props) => {
    const accessToken = Auth(props.code);
    console.log(accessToken);

    const getPlaylists = () => {
        axios.get('https://api.spotify.com/v1/me/playlists', { 
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }
    

    return (
        <div>
        <p>Logged in with code {props.code}</p>
        <button onClick={getPlaylists}>Get playlists</button>
    </div>
    )
}

export default Main;