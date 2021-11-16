// web scraping imports 
const fetch = require('node-fetch');
const cheerio = require('cheerio');

// scrapes the lyrics container off of a Genius webpage and returns the lyrics HTML
const scrapeLyrics = async(url) => {
    // console.log(url);                // Genius URL 
    const res = await fetch(url); // fetch HTML from URL 

    const html = await res.text();
    const $ = cheerio.load(html); // used to parse the HTML 

    // target the div with this classname
    const lyricDiv = $('div.Lyrics__Container-sc-1ynbvzw-6'); // *this class name changes sometimes!!!

    // convert HTML block to an array of HTML elements
    let htmlElements = [];
    // console.log(lyricDiv.toArray());
    htmlElements = lyricDiv.toArray().map(x => {
        // console.log(x);
        return $.html(x);
    })

    return htmlElements;
}

module.exports = scrapeLyrics;