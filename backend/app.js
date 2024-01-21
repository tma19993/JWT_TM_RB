const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
const sqlite3 = require('sqlite3').verbose();
let data; 
let users;
const port = 3000;


function findUser(login, password) {
    return users.find(user => user.login == login && user.haslo == password);
  }

function addUser(data){
    dbusers.run(`INSERT INTO users (imie, nazwisko, login, haslo, email, telefon, czyAdmin) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
[data.imie, data.nazwisko, data.login, data.haslo, data.email, data.telefon, data.czyAdmin], 
function(err) {
    if (err) {
        console.error(err.message);
    } else {
        console.log(`Użytkownik dodany z ID: ${this.lastID}`);
    }
});
}

function removeTrack(id){
    console.log(id);
    db.run(`DELETE FROM tracks WHERE id=${id}`,
    function(err) {
        if (err) {
            console.error(err.message);
        }})
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
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get('/data', function(req, res){ res.send(data)})


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
        const token = jwt.sign(user, config.SECRET, { expiresIn: '2h' });
        res.json({ token: token, isAdmin: Boolean(Number(foundUser.czyAdmin))}); 
    }
    else{
        res.status(401).json({ message: 'Logowanie nieudane' });
    }
});

app.post('/add-user', (req, res) => {
    const user = req.body;
    const foundUser = findUser(user.login, user.password);
   if(!foundUser){
    addUser(user);
    res.status(201).send({ message: 'Użytkownik został dodany' });
   }else{
    res.status(401).json({ message: 'Błąd, użytkownik nie został dodany' });
}
  
});

app.delete('/data/:id', function(req, res) {
    console.log(req);
    removeTrack(req.params.id);
    res.send({ message: 'Dane usunięte' });
});

app.listen(port, ()=> {
    console.log(`App słucha http://localhost:${port}`)
})

