import StatCard from '../components/StatCard';

import statTemplates from './statTemplates';


const ListTab = (props) => {
    

    const statComponents = props.stats ? 
        statTemplates(props.stats).map((s) => {
            let maxValue = s.presetMaxValue;
            let minValue = s.presetMinValue;
            let avgValue = s.presetAvgValue;
            if (!maxValue && !minValue) {
                maxValue = props.stats["max_" + s.feature + "_value"] + (s.suffix ? " " + s.suffix : "");
                minValue = props.stats["min_" + s.feature + "_value"] + (s.suffix ? " " +s.suffix : "");
                avgValue = parseFloat(props.stats["avg_" + s.feature]).toFixed(5).toString() + (s.suffix ? " " + s.suffix : "");
            }

            return <StatCard 
                label={s.label}
                list={s.list}
                maxLabel={s.maxLabel}
                minLabel={s.minLabel}
                feature={s.feature}
                maxSong={props.stats["max_" + s.feature]}
                minSong={props.stats["min_" + s.feature]}
                maxValue={maxValue}
                minValue={minValue}
                avg={avgValue}
            />;
        }) : null;
    


    return (
        <div className="stat-card-center">
        <div className="stat-card-container">
            {statComponents}
        </div>
        </div>
    );
}

export default ListTab;