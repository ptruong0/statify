import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Bar, CartesianGrid } from 'recharts';

const ChartTab = (props) => {
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
    console.log(artistData);
    const genreData = props.stats ? genreDataToGraph(props.stats.allGenres) : null;

    return (
        <div>
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
                : null }
        </div>
    );
}

export default ChartTab;