import StatCard from '../components/StatCard';


const ListTab = (props) => {

    const statComponents = props.stats ? [
        <StatCard
            label="Favorite Artists"
            list={props.stats.favoriteArtists}
        />,
        <StatCard
            label="Top Genres"
            list={props.stats.favoriteGenres}
        />,
        <StatCard
            maxLabel="Most Danceable"
            minLabel="Least Danceable"
            maxSong={props.stats.max_danceability}
            minSong={props.stats.min_danceability}
        />,
        <StatCard
            maxLabel="Most Energetic"
            minLabel="Least Energetic"
            maxSong={props.stats.max_energy}
            minSong={props.stats.min_energy}
        />,
        <StatCard
            maxLabel="Most Instrumental"
            minLabel="Least Instrumental"
            maxSong={props.stats.max_instrumentalness}
            minSong={props.stats.min_instrumentalness}
        />,
        <StatCard
            maxLabel="Liveliest"
            minLabel="Least Lively"
            maxSong={props.stats.max_liveness}
            minSong={props.stats.min_liveness}
        />,
        <StatCard
            maxLabel="Loudest"
            minLabel="Quietest"
            maxSong={props.stats.max_loudness}
            minSong={props.stats.min_loudness}
        />,
        <StatCard
            maxLabel="Most Speech/Vocals"
            minLabel="Least Speech/Vocals"
            maxSong={props.stats.max_speechiness}
            minSong={props.stats.min_speechiness}
        />,
        <StatCard
            maxLabel="Fastest Tempo"
            minLabel="Slowest Tempo"
            maxSong={props.stats.max_tempo}
            minSong={props.stats.min_tempo}
        />,
    ] : null;


    return (
        <div className="stat-card-container">
            {statComponents}
            <ListTab />
        </div>
    );
}

export default ListTab;