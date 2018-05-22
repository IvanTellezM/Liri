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



function spotifySong(song) {
    if (!song) {
        userInput = "The Sign Ace of Base";
    } else {
        userInput = song
    }
    spotify.search({ type: 'track', query: userInput }, function(err, data) {
        if (!err) {
            // console.log("displaying artist",data.artists)
            // console.log("query:\n", JSON.stringify(data, null, 2));
            console.log("Artist(s): ", data.tracks.items[0].album.artists[0].name)
            console.log("Song's Name: ", data.tracks.items[0].name);
            console.log("The preview link: ", data.tracks.items[0].preview_url);
            console.log("Album name: ", data.tracks.items[0].album.name);

        } else {
            return console.log('Error occurred: ' + err);
        }
        //adds text to log.txt

        fs.appendFile('log.txt', "\nArtist(s): " + data.tracks.items[0].album.artists[0].name + "\n", function() {});
        fs.appendFile('log.txt', "Song's Name: " + data.tracks.items[0].name + "\n", function() {});
        fs.appendFile('log.txt', "The preview link: " + data.tracks.items[0].preview_url + "\n", function() {});
        fs.appendFile('log.txt', "Album name: " + data.tracks.items[0].album.name + "\n", function() {});
    });
}

//movie-this
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.




var askQuestion = function() {

    // runs inquirer and asks the user a series of questions whose replies are
    // stored within the variable answers inside of the .then statement
    inquirer.prompt([{
        name: "name",
        type: "username",
        message: "What is your name?"
    }, {
        name: "question",
        type: "list",
        message: "How can I help you today?",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
    }, ]).then(function(answers) {
        if (answers.question === "my-tweets") {
            console.log("\nHi " + answers.name)
            inquirer.prompt([{
                name: "screenName",
                type: "input",
                message: "Type the name of the person you want to check their tweets"
            }, ]).then(function(answers) {
                myTweets(answers.screenName);
            })
        } else if (answers.question === "spotify-this-song") {
            console.log("\nHi " + answers.name)
            inquirer.prompt([{
                name: "songName",
                type: "input",
                message: "What song do you want to spotify?"
            }, ]).then(function(answers) {
                spotifySong(answers.songName);
            })
        } else if (answers.question === "movie-this") {
            console.log("\nHi " + answers.name)
            inquirer.prompt([{
                name: "movieName",
                type: "input",
                message: "What movie are you looking for?"
            }, ]).then(function(answers) {
                movie(answers.movieName);
            })
        } else {
            console.log("\nHi " + answers.name)

            random();
        }

    });
}
askQuestion();