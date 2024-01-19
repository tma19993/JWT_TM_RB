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


db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Zamknięto połączenie z bazą danych.');
});


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

app.post('/endpoint', function(req, res){
    res.send('Endpoint post req')
})


app.listen(port, ()=> {
    console.log(`App słucha http://loclhost:${port}`)
})

