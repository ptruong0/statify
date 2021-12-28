import { formatDuration } from '../functions/helperFunctions';

const statTemplates = (stats) => {
    return [{
            label: "Favorite Artists",
            list: stats.favoriteArtists
        },
        {
            label: "Top Genres",
            list: stats.favoriteGenres
        },
        {
            maxLabel: "Most Danceable",
            minLabel: "Least Danceable",
            feature: "danceability"
        },
        {
            maxLabel: "Most Energetic",
            minLabel: "Least Energetic",
            feature: "energy"
        },
        {
            maxLabel: "Most Instrumental",
            minLabel: "Least Instrumental",
            feature: "instrumentalness"
        },
        {
            maxLabel: "Liveliest",
            minLabel: "Least Lively",
            feature: "liveness"
        },
        {
            maxLabel: "Longest in Duration",
            minLabel: "Shortest in Duration",
            feature: "duration_ms",
            presetMinValue: formatDuration(stats.min_duration_ms_value),
            presetMaxValue: formatDuration(stats.max_duration_ms_value),
            presetAvgValue: formatDuration(stats.avg_duration_ms.toFixed(2))
        },
        {
            maxLabel: "Loudest",
            minLabel: "Quietest",
            feature: "loudness",
            suffix: "db"
        },
        {
            maxLabel: "Most Speech",
            minLabel: "Least Speech",
            feature: "speechiness"
        },
        {
            maxLabel: "Fastest Tempo",
            minLabel: "Slowest Tempo",
            feature: "tempo",
            suffix: "bpm"
        },
        {
            maxLabel: "Most Positive",
            minLabel: "Most Negative",
            feature: "valence"
        },
        {
            maxLabel: "Most Acoustic",
            minLabel: "Least Acoustic",
            feature: "acousticness"
        }
    ];
};

export default statTemplates;