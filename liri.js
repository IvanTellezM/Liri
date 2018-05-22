require("dotenv").config();

// Inititialize LIRI and console.log Instructions

// Requires

var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var inquire = require("inquirer");

// Initialize Variables

var input = process.argv;
var action = input[2];
var value = input[3];
var feed = new Twitter(keys.twitterKeys);
var userTwitter = "IvanFullStack1";
var spotify = new Spotify(keys.spotifyKeys);
for (var i = 3; i === input.length; i++) {
    value = value + " " + input[i];
}

// Comands that LIRI can take

switch (action) {
    case "twitter":
    case "get-tweets":
    case "getTweets":
    case "myTwitter":
    case "my-tweets":
        getTweets();
        break;

    case "getSong":
    case "getsong":
    case "spotify":
    case "song":
    case "spotifyThis":
    case "spotifyThisSong":
    case "spotify-this":
    case "spotify-this-song":
        getSong(value);
        break;

    case "omdbThis":
    case "movieThis":
    case "movie-this":
        getMovie(value);
        break;

    case "do-what-it-says":
        random();
        break;


    case "help":
        help();
        break;
    case "about":
        about();
        break;
} // end switch()

// Functions
function help() {
    console.log(
        `
Comands that LIRI can take
When you run the liri.js file using the console. You just have to type the following into the
terminal:
node liri.js <ACTION> <ARGUMENTS>
<ACTION> is what you need LIRI to do, and the <ARGUMENTS> are the parameters 
node liri.js prompt
node liri.js my-tweets
node liri.js spotify-this-song <ARGUMENTS>
node liri.js movie-this <ARGUMENTS>
node liri.js get-weather <ARGUMENTS>
node liri.js count-to <ARGUMENTS>
node liri.js do-what-it-says
Arguments with multiple words have to be surrounded with quotations. 
`); // end template string
} // end help()