# liri-node-app

LIRI is a command line node app that takes in parameters and gives you back data.

Much like iPhone's SIRI (Speech Interpretation and Recognition Interface), LIRI is a _Language_ Interpretation and Recognition Interface. 

TO USE:

LIRI can take in the following commands:
    * my-tweets
        -- displays most recent tweets from program's creator

    * spotify-this-song {"song title"}
        -- displays information about song of user's choosing (defaults to "The Sign" by Ace of Base if no song title entered)

    * movie-this {"movie title"}
        -- displays information about film of user's choosing (defaults to "Mr. Nobody" if no film title entered)

    * do-what-it-says
        -- program follows random command from an associated text file -- "random.txt"

This program utilizes the following npm packages: Twitter, Spotify, Request, Dotenv, and FS