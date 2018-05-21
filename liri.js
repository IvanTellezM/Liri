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

*
`my-tweets`

*
`spotify-this-song`

*
`movie-this`

*
`do-what-it-says`