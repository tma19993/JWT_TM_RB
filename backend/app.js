const express = require('express');
const app = express();
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
const sqlite3 = require('sqlite3').verbose();
let data; 
const port = 3000;


let db = new sqlite3.Database('../database/music.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Połączono z bazą danych.');
});
db.all(`SELECT * FROM tracks`,[],(err, rows) => {
    if (err) {
        console.error(err.message);
    }
    data = rows;
})

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
  });


app.get('/data', function(req, res){ res.send(data)})

app.post('/addTrack', function(req, res){
    res.send('Endpoint post req')
    const data = req.body;
    const sql = 'INSTER INTO tracks (title, artist, album, genre, time) VALUES (?, ?, ?, ?, ?)';
    const params = [data.title, data.artist, data.album, data.genre, data.time];

    db.run(sql, params, function(err){
        if (err){
            res.status(400).json({error: err.message });
            return;
        }
        res.json({
            message: 'Dane dodane do music.db',
            id: this.lastID,
        });
    });
});

app.post('/login', function(req, res){
    res.send('Endpoint post req')
    console.log(req.body);
    // const data = req.body;
    // const sql = 'INSTER INTO tracks (title, artist, album, genre, time) VALUES (?, ?, ?, ?, ?)';
    // const params = [data.title, data.artist, data.album, data.genre, data.time];

    // db.run(sql, params, function(err){
    //     if (err){
    //         res.status(400).json({error: err.message });
    //         return;
    //     }
    //     res.json({
    //         message: 'Dane dodane do music.db',
    //         id: this.lastID,
    //     });
    // });
});
app.listen(port, ()=> {
    console.log(`App słucha http://loclhost:${port}`)
})

