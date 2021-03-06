import { capitalize } from '../functions/helperFunctions';

const StatCard = (props) => {
    const maxValue = props.maxValue ? `(${props.maxValue})` : null;
    const minValue = props.minValue ? `(${props.minValue})` : null;

    return (
        <div className="stat-card">
            {props.label && props.list && props.list.length !== 0 ? 
            // for statistics with a list e.g. top 3
            <div>
            <p className="stat-label"><em>{props.label}{": "}</em></p>
            <div>{props.list.map((x, index) => {
                return <p>{index + 1}. {capitalize(x)}</p>
                })}
            </div>
            </div>
            :
            // for statistics with a most and least superlative
            <div>
            <p className="stat-label"><em>{props.maxLabel}{": "}</em></p><p>{props.maxSong.track.name} {maxValue}</p>
            <p className="stat-label"><em>{props.minLabel}{": "}</em></p><p>{props.minSong.track.name} {minValue}</p>
            <br />
            <p><span className="stat-label"><em>Average Value: </em></span>{props.avg}</p>
            </div>
            }           
        </div>
    );
}

export default StatCard;