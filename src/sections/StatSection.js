import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Bar, CartesianGrid } from 'recharts';

import StatCard from '../components/StatCard';


const StatSection= (props) => {

    const artistDataToGraph = (songs) => {
        let freq = {};
        for (let s of songs) {
            for (let a of s.track.artists) {
                if (a.name in freq) {
                    freq[a.name]++;
                } else {
                    freq[a.name] = 1;
                }
            }
        }
        console.log(freq);
        let data = [];
        for (let [key, value] of Object.entries(freq)) {
            data.push({
                name: key,
                value: value
            })
        }
        data.sort(function (a, b) {
            return b.value - a.value;   // sort in decreasing order
        })
        // console.log(data);
        return data;
    }

    const genreDataToGraph = (freq) => {
        let data = [];
        for (let [key, value] of Object.entries(freq)) {
            data.push({
                name: key,
                value: value
            })
        }
        data.sort(function (a, b) {
            return b.value - a.value;   // sort in decreasing order
        })
        // console.log(data);
        return data;
    }

    const artistData = props.selectedSongs ? artistDataToGraph(props.selectedSongs) : null;
    const genreData = props.stats ? genreDataToGraph(props.stats.allGenres) : null;

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
        <div className="stat-tab">
            <h5>Playlist Stats</h5>
            <Tabs defaultActiveKey="stat" id="tabs" >
                <Tab eventKey="stat" title="Superlatives">
                    <div className="stat-card-container">
                        {statComponents}

                    </div>
                </Tab>
                <Tab eventKey="chart" title="Charts">
                    
                    {artistData && genreData ?
                        <div style={{ height: artistData.length * 25, width: "100%", color: "#81ca9a" }}>
                            <p className="chart-title">Artist Frequencies</p>
                    <ResponsiveContainer width="100%" height="50%">
                        <BarChart
                            width={600}
                            height={500}
                            data={artistData}
                            layout="vertical"
                            barSize={20}
                            margin={{
                                top: 5,
                                right: 20,
                                left: 40,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" name="Frequency" />
                        </BarChart>
                        {/* <PieChart width={400} height={400} className="piechart">
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        startAngle={90}
                        endAngle={450}
                    />
                    <Tooltip />
                </PieChart> */}
                    </ResponsiveContainer>

                    <p className="chart-title">Genre Frequencies</p>
                    <ResponsiveContainer width="100%" height="50%">
                        <BarChart
                            width={600}
                            height={500}
                            data={genreData}
                            layout="vertical"
                            barSize={20}
                            margin={{
                                top: 5,
                                right: 20,
                                left: 40,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" name="Frequency" />

                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                    : null}
                </Tab>

            </Tabs>
        </div>
    );
}

export default StatSection;


// import React from 'react';
// import { Tabs, Tab } from 'react-bootstrap';

// import ListTab from '../components/ListTab';
// import ChartTab from '../components/ChartTab';


// const StatSection = (props) => {

//     return (
//         <div className="stat-tab">
//             <h5>Playlist Stats</h5>
//             <Tabs defaultActiveKey="stat" id="tabs" className="tabs">
//                 <Tab eventKey="stat" title="Superlatives">
//                     <ListTab stats={props.stats}/>
//                 </Tab>
                
//                 <Tab eventKey="chart" title="Charts">
//                     <ChartTab {...props} />    
//                 </Tab>

//             </Tabs>
//         </div>
//     );
// }

// export default StatSection;