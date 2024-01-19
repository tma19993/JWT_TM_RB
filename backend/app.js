const express = require('express');
const app = express();
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');

let data; 
const port = 3000;


const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../database/music.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Połączono z bazą danych.');
});

db.serialize(() => {
    db.each(`SELECT * FROM tracks`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        data = row;
    });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Zamknięto połączenie z bazą danych.');
});

app.get('/data', function(req, res){
    res.send(data)
    console.log('xxxx')
})

app.post('/endpoint', function(req, res){
    res.send('Endpoint post req')
})

app.get("/dudu", (req, res) => res.send("Hello world"));

app.listen(port, ()=> {
    console.log(`App słucha http://loclhost:${port}`)
})

