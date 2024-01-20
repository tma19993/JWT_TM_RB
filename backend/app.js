const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var createError = require('http-errors');
var path = require('path');
const jwt = require('jsonwebtoken');
const config = require('./config');
var cookieParser = require('cookie-parser');
const sqlite3 = require('sqlite3').verbose();
let data; 
let users;
const port = 3000;


function findUser(login, password) {
    return users.find(user => user.login == login && user.haslo == password);
  }

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
let dbusers = new sqlite3.Database('../database/users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Połączono z bazą danych.');
});

dbusers.all(`SELECT * FROM users`,[],(err, rows) => {
    if (err) {
        console.error(err.message);
    }
    users = rows;
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
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get('/data', function(req, res){ res.send(data)})

app.post('/addUser', (req, res) => {
    const userData = req.body;
    console.log("object");
    const canAddUser = users.find(userData);
    console.log(canAddUser);
  console.log(userData); 

  res.status(201).send({ message: 'Użytkownik został dodany' });
});


app.post('/addTrack', function(req, res){
    res.send('Endpoint post req')
    const data = req.body;
    const sql = 'INSERT INTO tracks (title, artist, album, genre, time) VALUES (?, ?, ?, ?, ?)';
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



app.post('/login', (req, res) => {
    const user = req.body;
    const foundUser = findUser(user.login, user.password);
    if(foundUser){
        const token = jwt.sign(user, config.SECRET, { expiresIn: '2h' }); // Generowanie tokenu
        res.json({ token: token, isAdmin: Boolean(Number(foundUser.czyAdmin))}); // Wysyłanie tokenu do klienta
    }
    else{
        res.status(401).json({ message: 'Logowanie nieudane' });
    }
});

app.listen(port, ()=> {
    console.log(`App słucha http://localhost:${port}`)
})

