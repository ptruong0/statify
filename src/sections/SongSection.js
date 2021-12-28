import SongList from "../components/SongList";

import { Button } from 'react-bootstrap';

const SongSection = (props) => {
    return (
        <div>
            <div className="playlist-title-row">
                <div className="playlist-title">
                    <h6>Selected Playlist: </h6><h4><strong>{props.playlist}</strong></h4>
                </div>

                {!props.showPlaylists ?
                    <Button onClick={props.hideFunc} size="sm" variant="outline-success" className="show-playlists-btn">
                        Choose a different playlist
                    </Button>
                    : null}
            </div>
            
            

            <SongList list={props.selectedSongs} audioFeatures={props.audioFeatures} selectSong={props.selectSongFunc} />
        </div>
    );
}

export default SongSection;