const fields = require('./fields');

const generateStats = (audioFeatures, genreFreq, selectedSongs) => {
    let maximums = {};
    let minimums = {};
    let maxIndices = {};
    let minIndices = {};
    for (let f of fields) {
        maximums[f] = audioFeatures[0][f];
        minimums[f] = audioFeatures[0][f];
        maxIndices[f] = 0;
        minIndices[f] = 0;
    }

    let info = [];



    for (let i = 0; i < audioFeatures.length; i++) {
        const song = audioFeatures[i];
        info[i] = {};

        for (let f of fields) {
            if (song[f] > maximums[f]) {
                maximums[f] = song[f];
                maxIndices[f] = i;
            } else if (song[f] < minimums[f]) {
                minimums[f] = song[f];
                minIndices[f] = i;
            }
            info[i][f] = song[f];
        }

    }

    const resultObject = {};
    for (let f of fields) {
        resultObject["max_" + f] = selectedSongs[maxIndices[f]];
        resultObject["min_" + f] = selectedSongs[minIndices[f]];
    }
    // console.log(resultObject);


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
    let topArtists = Object.keys(artistFreq).sort((a, b) => artistFreq[a] < artistFreq[b] ? 1 : artistFreq[a] > artistFreq[b] ? -1 : 0).slice(0, 3);
    resultObject["favoriteArtists"] = topArtists;
    // console.log(resultObject["favoriteArtist"]);

    // sort the genre keys in descending order and get the top 3 
    let topGenres = Object.keys(genreFreq).sort((a, b) => genreFreq[a] < genreFreq[b] ? 1 : genreFreq[a] > genreFreq[b] ? -1 : 0).slice(0, 5);
    resultObject["favoriteGenres"] = topGenres;

    return resultObject;
}

module.exports = generateStats;