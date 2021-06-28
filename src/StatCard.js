
const StatCard = (props) => {
    return (
        <div>
            <p>{props.maxLabel + ": "}{props.maxSong.track.name}</p>
            <p>{props.minLabel + ": "}{props.minSong.track.name}</p>
            <br />
        </div>
    );
}

export default StatCard;