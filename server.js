const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8888;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/* 
GET /favorites - return that the user has previously favoritted.
*/
app.get('/favorites', (req, res) => {
    const favorites = [
        {
            id: "1",
            name: "The Shawshank Redemption",
            showTime: "1994",
            madeIn: "America",
            language: "English"
        },
        {
            id: "2",
            name: "The Godfather",
            showTime: "1972",
            madeIn: "America",
            language: "Korean"
        }];
    res.send(favorites);
});

/*
GET /movies?search={search} - return popular movies or what the user searched for
*/
app.get('/movies', (req, res) => {
    if (req.query.search) {
        const favorite = {
            search: req.query.search,
        };
        res.send(favorite);
    } else {
        const popularMovies = [
            {
                id: "3",
                name: "The Godfather: Part II",
                showTime: "1974",
                madeIn: "America",
                language: "Janpanese"
            },
            {
                id: "4",
                name: "The Dark Knight",
                showTime: "2008",
                madeIn: "America",
                language: "Chinese"
            }];
        res.send(popularMovies);
    }
});

/*
GET /movies/:id - return that specific movie in detail
*/
app.get('/movies/:id', (req, res) => {
    if (req.params.id) {
        const movie = {
            id: req.params.id,
            name: "Schindler's List",
            showTime: "1993",
            madeIn: "Germa",
            language: "German"
        };
        res.send(movie);
    } else {
        res.send('The id does not exist');
    }
});

/* 
POST /favorite/:id - add a favorite movie
*/
app.post('/favorite', (req, res) => {
    console.log(req.body);
    if (req.body) {
        const favorite = {
            id: req.body.id,
            name: req.body.name,
            showTime: req.body.showTime,
            madeIn: req.body.madeIn,
            language: req.body.language
        };
        res.send(favorite);
    } else {
        res.send('There is nothing to add');
    }
});


app.listen(port, () => {
    console.log(`Myapp listening at http://localhost:${port}`)
})