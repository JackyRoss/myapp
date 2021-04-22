const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8888;

const path = require("path");
const fs = require('fs');
const sqlite3 = require("sqlite3").verbose();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const favoriteSql = `
Select 
    Movie.name,
    Movie.showTime
From 
    Movie
INNER JOIN 
    Favorite on Movie.id = Favorite.id
ORDER BY
    Movie.id
`;

const popularSql = `
Select 
    Movie.name,
    Movie.showTime
From 
    Movie
INNER JOIN 
    Popular on Movie.id = Popular.id
ORDER BY
    Movie.id
`;

const detailSql = `
Select 
    Movie.name,
    Movie.showTime,
    Movie.madeIn,
    Movie.language 
From 
    Movie
Where 
    Movie.id = ?`;

const inseartMovieSql = `
    INSERT INTO Movie
        (id, 
        name,
        showTime,
        madeIn,
        language
        )
    VALUES
        (?,?,?,?,?)`;

/* 
GET /favorites - return that the user has previously favoritted.
*/
app.get('/favorites', (req, res) => {
    // access database
    const db = getDatabase();
    db.all(favoriteSql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else if (rows.length) {
            favorites = rows;
            console.log("favorites:", rows);
        } else {
            console.log("There is no favorite");
        }
        db.close();
        res.send(rows);
    });
});

/*
GET /movies?search={search} - return popular movies or what the user searched for
*/
app.get('/movies', (req, res) => {
    // access database
    const db = getDatabase();
    const search = req.query.search;
    console.log("search:", search);
    if (search) {
        // return search result
        const sql = `${search}`;
        db.all(sql, [], function (err, rows) {
            if (err) {
                console.error(err.message);
            } else if (rows) {
                console.log("Search result:", rows);
            } else {
                console.log("There is no matched search result");
            }
            db.close();
            res.send(rows);
        });
    } else {
        // return popular movies
        db.all(popularSql, [], function (err, rows) {
            if (err) {
                console.error(err.message);
            } else if (rows) {
                console.log("Popular movies:", rows);
            } else {
                console.log("There is no popluar movie");
            }
            db.close();
            res.send(rows);
        });
    }
});

/*
GET /movies/:id - return that specific movie in detail
*/
app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    console.log("Movie id:", id);
    // access database
    const db = getDatabase();
    db.get(detailSql, id, function (err, row) {
        if (err) {
            console.error(err.message);
        } else if (row) {
            console.log("Movie detail:", row);
        } else {
            console.log("The movie does not exist");
        }
        db.close();
        res.send(row);
    });
});

/* 
POST /favorite/:id - add a favorite movie
*/
app.post('/favorite', (req, res) => {
    console.log("body:", req.body);
    // access database
    const db = getDatabase();
    const favorite = [req.body.id, req.body.name, req.body.showTime, req.body.madeIn, req.body.language];
    db.run(inseartMovieSql, favorite, function (err) {
        if (err) {
            console.error(err.message);
        }
        console.log(`Rows inserted ${this.changes}`);
        db.close();
        const registeredFavorite = {
            name: "Lady Bird",
            showTime: "2017"
        }
        res.send(registeredFavorite);
    });
});

// return database
const getDatabase = () => {
    const dbFile = path.join(__dirname, "/data/mydb.db");
    const db = new sqlite3.Database(dbFile, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
    });
    return db;
}

app.listen(port, () => {
    console.log(`Myapp listening at http://localhost:${port}`)
})