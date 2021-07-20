import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Bar, CartesianGrid } from 'recharts';

import StatCard from '../components/StatCard';



const StatTab = (props) => {

    const convertToGraphData = (songs) => {
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
        for (let artist of Object.keys(freq)) {
            data.push({
                name: artist,
                value: freq[artist]
            })
        }
        data.sort(function (a, b) {
            return b.value - a.value;   // sort in decreasing order
        })
        console.log(data);
        return data;
    }

    const chartData = props.selectedSongs ? convertToGraphData(props.selectedSongs) : null;

    const statComponents = props.stats ? [
        <StatCard
            label="Favorite (Most Frequent) Artist"
            list={props.stats.favoriteArtist}
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
                    
                    {chartData ?
                        <div style={{ height: chartData.length * 25, width: "100%", color: "#81ca9a" }}>
                            <p className="chart-title">Artist Frequency in Playlist</p>
                            <ResponsiveContainer width="100%" height="100%">
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
                                
                                <BarChart
                                    width={600}
                                    height={500}
                                    data={chartData}
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
                                    <XAxis type="number"/>
                                    <YAxis dataKey="name" type="category" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#8884d8" name="Frequency"/>
                                    
                                </BarChart>
                                {/* <BarChart width={600} height={300} data={chartData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Bar dataKey="value" fill="#8884d8"
                                    />
                                </BarChart> */}
                            </ResponsiveContainer> 
                    </div>
                    : null}
                </Tab>

            </Tabs>
        </div>
    );
}

export default StatTab;