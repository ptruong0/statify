import Auth from './Auth';
import Playlists from './Playlists';
import PlaylistCard from './PlaylistCard';
import SongList from './SongList';
import './styles.scss';


import { useState, useEffect } from 'react';
import { Row, Navbar } from 'react-bootstrap';
import axios from 'axios';

const Main = (props) => {
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [selected, setSelected] = useState(null);
    const [selectedSongs, setSelectedSongs] = useState(null);

    async function getToken(code) {
        const accessToken = await Promise.resolve(Auth(code));
        return accessToken;
    }

    getToken(props.code).then((accessToken) => {
        console.log(accessToken);
        if (!username) {
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
        if (!playlists) {
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

    const selectPlaylist = (p) => {
        setSelected(p);
        console.log("selecting " + p.name);

        axios.get(p.href, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                console.log(res);
                setSelectedSongs(res.data.tracks.items);
            })
            .catch(err => console.log(err));
    };


    return (
        <div>
            {/* <p>Logged in with code {props.code}</p> */}
            <Navbar bg="dark" expand="lg" className="my-navbar justify-content-between">
                <Navbar.Brand className="nav-text">
                    Statify
                </Navbar.Brand> 
                <Navbar.Text className="nav-text">
                    Signed in as: {username}
                </Navbar.Text>
            </Navbar>

            <Playlists list={playlists} select={selectPlaylist} selected={selected} />

            <Row className="stats-section">
                <div className="col-6">
                    <h4>{selected ? "Playlist: " + selected.name : null}</h4>
                    <SongList list={selectedSongs} />
                </div>
            </Row>
        </div>
    )
}

export default Main;