import Auth from './Auth';
import Playlists from './Playlists';
import SongList from './SongList';
import LyricTab from './LyricTab';
import StatTab from './StatTab';
import './styles.scss';

import { useState, useEffect } from 'react';
import { Row, Navbar } from 'react-bootstrap';
import { Split } from '@geoffcox/react-splitter';
import SplitPane, { Pane } from 'react-split-pane';
import axios from 'axios';
import { fetchAllPlaylists, fetchAPlaylist, fetchAudioFeatures, fetchLyrics, fetchProfileName } from './backendCalls';


const backendURL = "http://localhost:5000";

const Main = (props) => {
    const [username, setUsername] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [selected, setSelected] = useState(null);
    const [selectedSongs, setSelectedSongs] = useState(null);
    const [audioFeatures, setAudioFeatures] = useState(null);
    const [statsObject, setStatsObject] = useState(null);
    const [clickedSong, setClickedSong] = useState(null);
    const [lyrics, setLyrics] = useState(null);


    // called when page first loads
    const loadPage = async () => {
        if (!username) {
            fetchProfileName(props.token, setUsername);
        }
        if (!playlists) {
            fetchAllPlaylists(props.token, setPlaylists);
        }
    }


    const selectPlaylist = (p) => {
        setSelected(null);  // to clear previous playlist info
        setClickedSong(null);
        setSelectedSongs(null);
        setAudioFeatures(null);
        setStatsObject(null);
        setLyrics(null);
        setSelected(p);
        console.log("selecting " + p.name);

        fetchAPlaylist(props.token, p.href, setSelectedSongs);
    };


    const getAudioFeatures = () => {
        if (selectedSongs) {
            // put song ids into a list to be passed into audio features query
            let ids = "";
            for (let s of selectedSongs) {
                ids += s.track.id + ",";
            }

            if (ids.length > 0) {
                ids = ids.slice(0, -1);
                let url = "https://api.spotify.com/v1/audio-features?ids=";
                url += ids;

                fetchAudioFeatures(props.token, url, selectedSongs, setAudioFeatures, setStatsObject);
            }
        }
    }


    const getLyrics = () => {
        if (clickedSong != null) {

            const title = selectedSongs[clickedSong].track.name;
            const artist = selectedSongs[clickedSong].track.artists[0].name;
            console.log(title + " " + artist);

            fetchLyrics(title, artist, setLyrics);
        }
    }


    const selectSong = (songIndex) => {
        setClickedSong(songIndex);
    };


    const renderLyrics = () => {
        if (lyrics) {

            console.log(lyrics);
            let card = document.querySelector(`#song-info-${clickedSong}`);
            if (lyrics === "ERROR") {
                let msg = document.createElement('p');
                msg.classList.add("no-lyric-msg")
                msg.innerHTML = "Lyrics could not be found";
                card.appendChild(msg);
            }
        }
    }


    useEffect(loadPage, []);

    useEffect(getAudioFeatures, [selectedSongs]);

    useEffect(getLyrics, [clickedSong]);

    useEffect(renderLyrics, [lyrics]);


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

            <div className="body" >
                <div className="playlists-section">
                    <Playlists list={playlists} select={selectPlaylist} selected={selected} />
                </div>

                {selected && audioFeatures ?
                    <div className="stats-section scroll-container">
                        <Split initialPrimarySize="33%">
                            <div className="song-column">
                                <h4>Selected Playlist: <strong>{selected.name}</strong></h4>
                                <SongList list={selectedSongs} audioFeatures={audioFeatures} selectSong={selectSong} />
                            </div>
                            <Split initialPrimarySize="50%">
                                <div className="lyric-column">
                                    <LyricTab song={selectedSongs[clickedSong]} lyrics={lyrics} />
                                    {/* web scraping */}
                                </div>
                                <div className="stat-column">
                                    <StatTab stats={statsObject} />
                                </div>
                            </Split>
                        </Split>
                    </div>
                    : <h6>Select a playlist to get started!</h6>}
            </div>
        </div>
    )
}

export default Main;