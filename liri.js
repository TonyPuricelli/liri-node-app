require("dotenv").config();

let keys = require("./keys");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


// FUNCTIONS

let grabTweets = function() {
    var client = new Twitter(keys.twitter);

    let params = { screen_name: 'tonypuricelli'}
    
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log("Tweets from user @" + params.screen_name + ":\n");

            for (var i=0; i < tweets.length; i++) {
                console.log("TWEET: " + tweets[i].text + "\nDATE/TIME: " + tweets[i].created_at.slice(0, 16) + "\n---");
            }
        } else console.log('Error occurred: ' + error);
    })
}

var grabSongs = function(title) {
    var spotify = new Spotify(keys.spotify);
    
    if (!title) {
        title = "The Sign";
    };

    spotify.search({ type: 'track', query: title }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        // log "The Sign" if no data entered
        if (title == "The Sign") {
            console.log("\nYou didn't enter a song title. Waiting for a \"SIGN\"?!?!");
            return console.log("---------\nDATA FOR: \"" + data.tracks.items[5].name + "\"\n\nARTIST: " + data.tracks.items[5].artists[0].name + "\nALBUM: " + data.tracks.items[5].album.name + "\nPREVIEW: " + data.tracks.items[5].preview_url + "\n---------");
        }

        console.log("---------\nDATA FOR: \"" + data.tracks.items[0].name + "\"\n\nARTIST: " + data.tracks.items[0].artists[0].name + "\nALBUM: " + data.tracks.items[0].album.name);
        // not all tracks have preview url so adding special case for those
        if (data.tracks.items[0].preview_url) {
            console.log("PREVIEW: " + data.tracks.items[0].preview_url + "\n---------");
        } else console.log("OPEN: " + data.tracks.items[0].external_urls.spotify + "\n---------");
    });
};

var grabMovies = function(title) {
    if (!title) {
        title = "Mr. Nobody";
    };

    var url = "http://www.omdbapi.com/?t=" + title + "&apikey=trilogy";

    request(url, function (error, response, body) {
        if (error) {
            console.log('Error occurred: ', error); // Print the error if one occurred
        };
        // console.log('statusCode:', response && response.statusCode); 
        // Print the response status code if a response was received
        // console.log('body:', body.Title); 
        // Print the HTML for the Google homepage.

        var jsonData = JSON.parse(body);

        console.log("---------\nDATA FOR: " + jsonData.Title + "\n\nRELEASED: " + jsonData.Year + "\nIMDB: " + jsonData.Ratings[0].Value + "\nROTTEN TOMATOES: " + jsonData.Ratings[1].Value + "\nFILMED IN: " + jsonData.Country + "\nLANGUAGE: " + jsonData.Language + "\nPLOT: " + jsonData.Plot + "\nSTARRING: " + jsonData.Actors + "\n---------");
    });
};

var grabText = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log("Error occurred: " + error);
        }
        var dataArray = data.split(',');
        decider(dataArray[0], dataArray[1]);
    });
};


var decider = function(command, title) {
    switch(command) {
        case `my-tweets`:
            grabTweets();
            break;
        case `spotify-this-song`:
            grabSongs(title);
            break;
        case `movie-this`:
            grabMovies(title);
            break;
        case `do-what-it-says`:
            grabText();
            break;
        default:
            console.log("Cannot read command. Please try again.");
    }
}

if (process.argv.length > 4) {
    return console.log("Please put title in quotation marks");
} else decider(process.argv[2], process.argv[3]);