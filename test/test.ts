const sqlite3 = require('sqlite3').verbose();

// Tworzenie połączenia z bazą danych
const db = new sqlite3.Database('users.db');

// Tworzenie tabeli "users"
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      imie TEXT NOT NULL,
      nazwisko TEXT NOT NULL,
      login TEXT UNIQUE NOT NULL,
      haslo TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      telefon TEXT NOT NULL,
      czyAdmin INTEGER DEFAULT 0
    )
  `);

  // Dodanie przykładowego użytkownika
  const stmt = db.prepare(`
    INSERT INTO users (imie, nazwisko, login, haslo, email, telefon, czyAdmin)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run('John', 'Doe', 'john_doe', 'securePassword', 'john.doe@example.com', '123456789', 0);
  stmt.finalize();

  // Wyświetlenie zawartości tabeli
  db.each('SELECT * FROM users', (err, row) => {
    console.log(row);
  });
});

// Zamknięcie połączenia z bazą danych
db.close();
