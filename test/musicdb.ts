const sqlite3music = require('sqlite3').verbose();

// Utworzenie bazy danych
const dbmusic = new sqlite3music.Database('music.db');

// Utworzenie tabeli "tracks"
dbmusic.serialize(() => {
  dbmusic.run(`
    CREATE TABLE IF NOT EXISTS tracks (
      track_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      album TEXT NOT NULL,
      genre TEXT NOT NULL,
      time REAL NOT NULL
    )
  `);

  // Dodanie 25 losowych wierszy
  const stmt = dbmusic.prepare(`
    INSERT INTO tracks (title, artist, album, genre, time)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run('Ground Zero', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '3:01');
  stmt.finalize();

  // Wyświetlenie zawartości tabeli
  dbmusic.each('SELECT * FROM tracks', (err, row) => {
    console.log(row);
  });
});

// Zamknięcie połączenia z bazą danych
dbmusic.close();
