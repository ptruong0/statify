
const StatCard = (props) => {

    
    return (
        <div className="stat-card">
            {props.label && props.list && props.list.length !== 0 ? 
            <div>
            <p><em>{props.label}</em>{": "}</p>
            <p>{props.list.map((x, index) => {
                return <p>{index + 1}. {x}</p>
                })}
            </p>
            </div>
            :
            <div>
            <p><em>{props.maxLabel}</em>{": "}{props.maxSong.track.name}</p>
            <p><em>{props.minLabel}</em>{": "}{props.minSong.track.name}</p>
            </div>
            }           
        </div>
    );
}

export default StatCard;