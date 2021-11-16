import { artistDataToGraph, genreDataToGraph } from '../functions/helperFunctions';

import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Bar, CartesianGrid } from 'recharts';

const ChartTab = (props) => {

    const artistData = props.selectedSongs ? artistDataToGraph(props.selectedSongs) : null;
    //console.log(artistData);
    const genreData = props.stats ? genreDataToGraph(props.stats.allGenres) : null;
    
    const containerHeight = artistData && genreData ? (artistData.length * 25 + genreData.length * 25) : null;

    return (
        <div>
            {artistData && genreData ?

                <div className="charts" style={{ height: containerHeight }}>

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
                                left: 50,
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
                                left: 50,
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
                : null }
        </div>
    );
}

export default ChartTab;