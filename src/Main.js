import Header from './components/Header';
import Playlists from './components/Playlists';
import SongSection from './sections/SongSection';
import LyricSection from './sections/LyricSection';
import StatSection from './sections/StatSection';
import Spinners from './components/Spinners';
import { fetchAllPlaylists, fetchAPlaylist, fetchAudioFeatures, fetchStats, fetchLyrics, fetchProfileName, fetchArtistFeatures, fetchYoutube } from './functions/backendCalls';
import { mergeObjects, showError } from './functions/helperFunctions';
import './styles.scss';

import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-bootstrap';
import { Split } from '@geoffcox/react-splitter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// TO DO:
// server -> separate endpoints and their functions in separate files
// put guiding comments in each file
// refactor into smaller components 
    // ChartTab
    // Login
// more kinds of charts and statistics
    // pie chart
    // histogram of audio features
    // look into chart.js
// rename project from spot to statify
// update dependencies with npm i
// move token process to backend 
// router


const Main = (props) => {
    // stored state on page
    const [username, setUsername] = useState(null);
    const [playlists, setPlaylists] = useState(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [selectedSongs, setSelectedSongs] = useState(null);
    const [audioFeatures, setAudioFeatures] = useState(null);
    const [artistGenres, setArtistGenres] = useState(null);
    const [statsObject, setStatsObject] = useState(null);
    const [clickedSong, setClickedSong] = useState(null);
    const [lyrics, setLyrics] = useState(null);
    const [youtube, setYoutube] = useState(null);

    const [showPlaylists, setShowPlaylists] = useState(false);
    const [showLyrics, setShowLyrics] = useState(true);


    // called when page first loads
    const loadPage = async () => {
        if (!username) {
            fetchProfileName(props.token, setUsername, showError);
        }
        if (!playlists) {
            fetchAllPlaylists(props.token, setPlaylists, showError);
        }
    }


    // called when a user clicks a playlist     
    // displays the playlist songs and triggers retrieval of song/artist data   
    const selectPlaylist = (p) => {
        if (p !== selectedPlaylist) {
            setSelectedPlaylist(null);  // to clear previous playlist info
            setClickedSong(null);
            setSelectedSongs(null);
            setAudioFeatures(null);
            setStatsObject(null);
            setLyrics(null);
            setYoutube(null);
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

    // called to get song data after selecting a new playlist
    const getAudioFeatures = () => {
        if (selectedSongs) {
            fetchAudioFeatures(props.token, selectedSongs)
                .then(result => {
                    setAudioFeatures(result);
                });
        }
    }

    // called along with getAudioFeatures to get artist data
    const getArtistFeatures = () => {
        if (selectedSongs) {
            fetchArtistFeatures(props.token, selectedSongs)
                .then(result => {
                    setArtistGenres(mergeObjects(result));
                });
        }
    }

    // gets statistics generated from the backend after retrieving data
    const getStats = () => {
        if (audioFeatures && artistGenres && selectedSongs) {
            fetchStats(audioFeatures, artistGenres, selectedSongs, setStatsObject);
        }
    }

    // gets lyrics when a song is clicked
    const getLyrics = () => {
        setLyrics(null);
        setYoutube(null);
        if (clickedSong != null) {

            const title = selectedSongs[clickedSong].track.name;
            const artist = selectedSongs[clickedSong].track.artists[0].name;
            console.log(title + " " + artist);

            fetchLyrics(title, artist, setLyrics, showError);
            fetchYoutube(title, artist, setYoutube, showError);
        }
    }


    const selectSong = (songIndex) => {
        setClickedSong(songIndex);
    };


    const renderLyricsError = () => {
        if (lyrics) {
            if (lyrics.path === "ERROR" && !lyrics.lyricHTML) {
                setLyrics({
                    path: "ERROR",
                    lyricHTML: ["<p className=\"no-lyric-msg\">Lyrics could not be found<p>"]
                });
            }
        }
    }

    const toggleShowPlaylist = () => {
        setShowPlaylists(!showPlaylists);
    }

    const toggleShowLyrics = () => {
        setShowLyrics(!showLyrics);
    }


    // triggered when the page first loads 
    useEffect(loadPage, []);

    // changing the selected playlist will call data for the new songs from backend
    useEffect(async() => {
        getAudioFeatures();
        getArtistFeatures();
    }, [selectedSongs]);

    // generate stats after data is retrieved and updated
    useEffect(getStats, [audioFeatures, artistGenres]);

    // triggered when a user clicks a song
    useEffect(getLyrics, [clickedSong]);

    // display lyric components once the lyrics are retrieved
    useEffect(renderLyricsError, [lyrics]);

    const renderTooltip = props => (
        <Tooltip {...props}>Note: This will briefly open a new window. You will need to log back in to view this page.</Tooltip>
    );

    return (
        <div>
            {/* logo, title, username, and sign-out button */}
            <Header username={username} signOut={props.signOut} renderTooltip={renderTooltip}/>

            <div className="body" >
                {/* Playlists */}
                {!selectedPlaylist || showPlaylists ?
                    // user's playlists shown here 
                    // don't show if a playlist is currently selected  
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

                {/* Three Main Sections: Songs, Statistics, and Lyrics */}
                {selectedPlaylist && audioFeatures ?
                    <div className="stats-section scroll-container">
                        <Split initialPrimarySize="33%" minPrimarySize="25%" minSecondarySize="50%">
                            <div className="song-column">
                                <SongSection playlist={selectedPlaylist.name} showPlaylists={showPlaylists} hideFunc={toggleShowPlaylist} selectedSongs={selectedSongs} audioFeatures={audioFeatures} selectSongFunc={selectSong} />
                            </div>

                            {
                                showLyrics ? 
                            
                            <Split initialPrimarySize="60%" minPrimarySize="30%" minSecondarySize="30%">
                                <div className="stat-column">
                                    <StatSection stats={statsObject} selectedSongs={selectedSongs}/>
                                </div>
                                <div className="lyric-column">
                                    <LyricSection song={selectedSongs[clickedSong]} lyrics={lyrics} youtube={youtube} songClicked={clickedSong !== null} hideFunc={toggleShowLyrics}/>
                                </div>
                            </Split>

                            : 
                            <div className="stat-column">
                                <StatSection stats={statsObject} selectedSongs={selectedSongs} showLyricsFunc={!showLyrics ? toggleShowLyrics : null}/>
                            </div>
                            }
                        </Split>
                    </div>

                    // loading indicator
                    : selectedPlaylist ? <Spinners /> : <h6>Select a playlist to get started!</h6>}
            </div>

            {/* used for error messages */}
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />

        </div>
    )
}

export default Main;