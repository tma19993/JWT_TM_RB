const express = require('express');
const app = express();
const bodyParser = require('body-parser');
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
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get('/data', function(req, res){ res.send(data)})


app.post("/GetRatio", (req, res) => {
console.log(req);
})
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
    // Tutaj do napisania strzał na bazę i sprawdzenia danych czy pobranych czy zgadzają się z danymi z bazy
    // Weryfikuj dane logowania użytkownika, np. za pomocą bazy danych
    // Jeśli dane są poprawne:
    const user = { id: userFromDb.id, name: userFromDb.name }; // Przykładowy użytkownik
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' }); // Generowanie tokenu

    res.json({ token: token }); // Wysyłanie tokenu do klienta
});

app.listen(port, ()=> {
    console.log(`App słucha http://localhost:${port}`)
})

