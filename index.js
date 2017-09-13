var express = require("express");
var request = require("request");

var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res) {
    var search = req.query.search;
    var url = "http://theapache64.xyz:8080/movie_db/search?keyword=" + search;

    request(url, function(err, response, body) {
        if (err) {
            res.render('results', { movie: null, error: 'Error, please try again' });
        } else {
            var movie = JSON.parse(body);
            if (movie.data == undefined) {
                res.render('results', { movie: null, error: 'Error, please try again' });
            } else {
                var movieText = `The movie is titled, ${movie.data.name}. ${movie.data.plot} It has a ${movie.data.rating} rating!`;
                res.render('results', { movie: movieText, error: null });
            }

        }

    });
});




app.listen(3000, function() {
    console.log("server has started on port 3000");
});