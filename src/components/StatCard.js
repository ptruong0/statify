
const StatCard = (props) => {

    
    return (
        <div className="stat-card">
            {props.label && props.list && props.list.length !== 0 ? 
            // for statistics with a list e.g. top 3
            <div>
            <p className="stat-label"><em>{props.label}{": "}</em></p>
            <p>{props.list.map((x, index) => {
                return <p>{index + 1}. {x}</p>
                })}
            </p>
            </div>
            :
            // for statistics with a most and least superlative
            <div>
            <p className="stat-label"><em>{props.maxLabel}{": "}</em></p><p>{props.maxSong.track.name}</p>
            <p className="stat-label"><em>{props.minLabel}{": "}</em></p><p>{props.minSong.track.name}</p>
            </div>
            }           
        </div>
    );
}

export default StatCard;