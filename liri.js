require("dotenv").config();



// NPM - Packages && Required files
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
//var terminalLink = require('terminal-link');

var fs = require("fs");
var keys = require("./keys.js");// links to the keys file (9)
var data = fs.readFileSync("./random.txt", "utf8");

var command = process.argv[2];

//Keys for twitter and spotify
var spotify = new Spotify(keys.spotify); //create new constructor
var client = new Twitter(keys.twitter);

switch (command) {
    case 'movie':
        movie();
        break;

    case 'tweets':
        twitterFn();
        break;
    case 'spotify':
        spotifyFn();
        break;
    default:
        break;
}

// the variables are createda and now have to get the functionality
//=====================================================================
//Pseudo code

// 1. Needs to create   funciton that will get all the executable logic to communicate to tweeter.
// 2. Needs to create   funciton that will get all the executable logic to communicate to Spotify.
// 3. Needs to create   funciton that will get all the executable logic to communicate to OMDB.

function movie() {
    // search the omdb for user movies , if there is no movie selection have to rerturn Mr Nobody
    var quryURL = "http://www.omdbapi.com/?apikey=trilogy&y=&plot=short&t=";
    var search = process.argv[3] || 'Mr+Nobody';
    quryURL += search;

    console.log(quryURL);
    request(quryURL, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            var movieResponse = JSON.parse(body);
            console.log(`title, ${movieResponse.Title}`);
            console.log(`title, ${movieResponse.Plot}`);
            console.log(`title, ${movieResponse.Rating}`);
        }
    })
}

function twitterFn() {
    var search = process.argv[3] || 'Chicago';
    client.get("search/tweets", { q: search }, function (error, tweets, response) {
        for (var i = 0; i < 10; i++) {
            console.log(`${i + 1} ${tweets.statuses[i].created_at} => ${tweets.statuses[i].text}`)
        }
    })



}

function spotifyFn() {
    var search = process.argv[3] || 'Chicago';
    spotify.search({ type: 'track', query: search, limit: 5}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (var i=0;i < data.tracks.items.length; i++) { 
            console.log(data.tracks.items[i].name);
        }
    });
}



// 4. The functions have to requre the info from the websites
// 5. Have to create requre connection with the websites by using the require packages
// 6. Needs to create an API string that searches the OMDB by the URL
// 7. Have to console.log all the reguests after they are parsed from JSON.