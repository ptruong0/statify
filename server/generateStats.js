const fields = require('./fields');

const generateStats = (audioFeatures, genreFreq, selectedSongs) => {
    // initialize the maximums and minimums
    let maximums = {};
    let minimums = {};
    let maxIndices = {};
    let minIndices = {};
    let total = {};
    for (let f of fields) {
        maximums[f] = audioFeatures[0][f];
        minimums[f] = audioFeatures[0][f];
        total[f] = 0;
        maxIndices[f] = 0;
        minIndices[f] = 0;
    }

    // info stores each song's audio features data
    let info = [];


    for (let i = 0; i < audioFeatures.length; i++) {
        const song = audioFeatures[i];
        info[i] = {};

        // determine the maximum and minimum for each field 
        for (let f of fields) {
            if (song[f] > maximums[f]) {
                maximums[f] = song[f];
                maxIndices[f] = i;
            } else if (song[f] < minimums[f]) {
                minimums[f] = song[f];
                minIndices[f] = i;
            }
            info[i][f] = song[f];
            total[f] += song[f];
        }

    }

    // store all maxs and mins into one cumulative object 
    const resultObject = {};
    for (let f of fields) {
        resultObject["max_" + f] = selectedSongs[maxIndices[f]];
        resultObject["min_" + f] = selectedSongs[minIndices[f]];
        resultObject["max_" + f + "_value"] = maximums[f];
        resultObject["min_" + f + "_value"] = minimums[f];
        resultObject["avg_" + f] = total[f] / audioFeatures.length;
    }
    console.log(resultObject);


    let artistFreq = {};
    // store the number of times an artist appears in the playlist in frequency dict
    for (let song of selectedSongs) {
        for (let artist of song.track.artists) {
            if (artist.name in artistFreq) {
                artistFreq[artist.name]++;

            } else {
                artistFreq[artist.name] = 1;
            }
        }
    }
    // sort the artist keys in descending order and get the top 3 
    let topArtists = Object.keys(artistFreq).sort((a, b) => artistFreq[a] < artistFreq[b] ? 1 : artistFreq[a] > artistFreq[b] ? -1 : 0).slice(0, 5);
    resultObject["favoriteArtists"] = topArtists; // store 

    // sort the genre keys in descending order and get the top 3 
    let topGenres = Object.keys(genreFreq).sort((a, b) => genreFreq[a] < genreFreq[b] ? 1 : genreFreq[a] > genreFreq[b] ? -1 : 0).slice(0, 5);
    resultObject["favoriteGenres"] = topGenres;
    resultObject["allGenres"] = genreFreq;

    resultObject["audioInfo"] = info;

    return resultObject;
}

module.exports = generateStats;