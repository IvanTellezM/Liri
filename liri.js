require("dotenv").config();

//import from keys.js
var keys = require("./keys.js")
var inquirer = require('inquirer');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);




// check the last 20 tweets
function myTweets(name) {

    if (!name) {
        userInput = "realDonaldTrump";
    } else {
        userInput = name
    }
    var params = { screen_name: userInput };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(userInput, "lastest tweets: ");
            for (var i = 0; i < 20; i++) {
                console.log((i + 1), tweets[i].text);
            }
        } else {
            return console.log('Error occurred: ' + err);
        }
    });
}