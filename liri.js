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
            // for loop
            for (var i=0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }
        }
    })
}

var grabSongs = function(title) {
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: title }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       for (var i=0; i < data.tracks.items.length; i++) {
        console.log(data.tracks.items[i].album.name); 
       };
      });
};

var grabMovies = function(title) {
    var url = "http://www.omdbapi.com/?t=" + title + "&apikey=trilogy";

    request(url, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body.Title); // Print the HTML for the Google homepage.
        var jsonData = JSON.parse(body);
        console.log(jsonData.Title);
    });
};

var grabText = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
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

decider(process.argv[2], process.argv[3]);