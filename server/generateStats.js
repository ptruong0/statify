const fields = require('./fields');

const generateStats = (audioFeatures, selectedSongs) => {
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
    console.log(resultObject);

    return resultObject;
}

module.exports = generateStats;