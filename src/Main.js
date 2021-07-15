import Auth from './functions/Auth';
import Playlists from './components/Playlists';
import SongTab from './sections/SongTab';
import LyricTab from './sections/LyricTab';
import StatTab from './sections/StatTab';
import { fetchAllPlaylists, fetchAPlaylist, fetchAudioFeatures, fetchStats, fetchLyrics, fetchProfileName } from './functions/backendCalls';
import './styles.scss';

import React, { useState, useEffect } from 'react';
import { Row, Navbar, Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Split } from '@geoffcox/react-splitter';




const Main = (props) => {
    const [username, setUsername] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [showPlaylists, setShowPlaylists] = useState(false);
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
        if (p !== selectedPlaylist) {
            setSelectedPlaylist(null);  // to clear previous playlist info
            setClickedSong(null);
            setSelectedSongs(null);
            setAudioFeatures(null);
            setStatsObject(null);
            setLyrics(null);
            setSelectedPlaylist(p);
            setShowPlaylists(false);
            console.log("selecting " + p.name);

            fetchAPlaylist(props.token, p.href)
                .then(result => {
                    console.log(result);
                    setSelectedSongs(result);
                });

        }

    };


    const getAudioFeatures = () => {
        console.log(selectedSongs);
        if (selectedSongs) {
            // put song ids into a list to be passed into audio features query

            fetchAudioFeatures(props.token, selectedSongs, setAudioFeatures)
            .then(result => {
                console.log(result);
                setAudioFeatures(result);
            });
        }

    }

    const getStats = () => {
        if (audioFeatures && selectedSongs) {
            fetchStats(audioFeatures, selectedSongs, setStatsObject)
        }
    }


    const getLyrics = () => {
        setLyrics(null);
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
            if (lyrics.path === "ERROR" && !lyrics.lyricHTML) {
                setLyrics({
                    path: "ERROR",
                    lyricHTML: ["<p className=\"no-lyric-msg\">Lyrics could not be found<p>"]
                });
                // let msg = document.createElement('p');
                // msg.classList.add("no-lyric-msg")
                // msg.innerHTML = "Lyrics could not be found";
                // card.appendChild(msg);
            }
        }
    }

    const toggleShowPlaylist = () => {
        setShowPlaylists(!showPlaylists);
    }


    useEffect(loadPage, []);

    useEffect(getAudioFeatures, [selectedSongs]);

    useEffect(getStats, [audioFeatures]);

    useEffect(getLyrics, [clickedSong]);

    useEffect(renderLyrics, [lyrics]);

    const loadingSpinner =
        <div className="triple-spinners">
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />
            <Spinner animation="grow" variant="success" size="sm" className="spinner" />

        </div>

    const renderTooltip = props => (
        <Tooltip {...props}>Note: This will briefly open a new window. You will need to log back in to view this page.</Tooltip>
    );

    return (
        <div>

            <Navbar expand="lg" className="my-navbar justify-content-between">
                <Navbar.Brand className="nav-text nav-title">
                    Statify
                </Navbar.Brand>
                <div className="nav-right">
                    <Navbar.Text className="nav-text">
                        Signed in as: {username}
                    </Navbar.Text>
                    <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                        <Button onClick={props.signOut} variant="outline-info" size="sm" data-rh="tooltip 1">Sign Out</Button>
                    </OverlayTrigger>
                </div>
            </Navbar>

            <div className="body" >
                {!selectedPlaylist || showPlaylists ?
                    <div className="playlists-section">
                        <Playlists
                            list={playlists}
                            select={selectPlaylist}
                            selected={selectedPlaylist}
                            hide={toggleShowPlaylist}
                            visible={showPlaylists}
                        />
                    </div>
                    : null}


                {selectedPlaylist && audioFeatures ?
                    <div className="stats-section scroll-container">
                        <Split initialPrimarySize="33%" minPrimarySize="25%" minSecondarySize="50%">
                            <div className="song-column">
                                <SongTab playlist={selectedPlaylist.name} showPlaylists={showPlaylists} hideFunc={toggleShowPlaylist} selectedSongs={selectedSongs} audioFeatures={audioFeatures} selectSongFunc={selectSong} />
                            </div>
                            <Split initialPrimarySize="50%" minPrimarySize="30%" minSecondarySize="30%">
                                <div className="stat-column">
                                    <StatTab stats={statsObject} />
                                </div>
                                <div className="lyric-column">
                                    <LyricTab song={selectedSongs[clickedSong]} lyrics={lyrics} songClicked={clickedSong !== null} />
                                </div>

                            </Split>
                        </Split>
                    </div>
                    : selectedPlaylist ? loadingSpinner : <h6>Select a playlist to get started!</h6>}
            </div>
        </div>
    )
}

export default Main;