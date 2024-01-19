var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');


const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../database/music.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Połączono z bazą danych.');
});

db.serialize(() => {
    db.each(`SELECT title FROM tracks`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row);
    });
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Zamknięto połączenie z bazą danych.');
});