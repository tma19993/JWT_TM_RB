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

stmt.run('Abrakadabra', 'Gibbs', 'Czarno na biały', 'RAP', '3:02');
stmt.run('Kompas', 'Gibbs', 'Czarno na biały', 'RAP', '4:07');
stmt.run('Lepsza strona słońca', 'Gibbs', 'Czarno na biały', 'RAP', '4:24');
stmt.run('200%', 'Gibbs', 'Czarno na biały', 'RAP', '3:25');
stmt.run('Cień przypadku', 'Gibbs', 'Czarno na biały', 'RAP', '4:19');
stmt.run('Niewidzialny', 'Gibbs', 'Czarno na biały', 'RAP', '3:04');
stmt.run('Nigdy albo zawsze', 'Gibbs', 'Czarno na biały', 'RAP', '3:50');
stmt.run('Udawanko', 'Gibbs', 'Czarno na biały', 'RAP', '4:48');
stmt.run('(PO)ciąg daleszy nastąpi', 'Gibbs', 'Czarno na biały', 'RAP', '4:25');
stmt.run('Łzy ślepego szczęścia', 'Gibbs', 'Czarno na biały', 'RAP', '3:33');
stmt.run('Pieśń dziękczynna', 'Gibbs', 'Czarno na biały', 'RAP', '3:48');
stmt.run('Joan Miro', 'Gibbs', 'Czarno na biały', 'RAP', '4:04');

stmt.run('Styl Sportowy', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '02:52');
stmt.run('Macki Meduzy', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '03:04');
stmt.run('V8', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '02:49');
stmt.run('Międzynarodowa #1', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '00:37');
stmt.run('Lody Włoskie', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '03:06');
stmt.run('Gry Losowe', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '01:32');
stmt.run('Międzynarodowa #2', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '00:22');
stmt.run('Na Audiencji', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '03:33');
stmt.run('Fair Play', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '03:24');
stmt.run('Rewia', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '03:37');
stmt.run('Krajowa #1', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '00:24');
stmt.run('Garmażeria', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '01:54');
stmt.run('Flary', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '03:31');
stmt.run('Kluby i restauracje', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '01:09');
stmt.run('Puerto Rico', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '01:50');
stmt.run('Międzynarodowa #3', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '00:23');
stmt.run('Hazard', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '02:38');
stmt.run('Międzynarodowa #4', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '00:51');
stmt.run('Magnolie', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '03:05');
stmt.run('Międzynarodowa #5', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '00:23');
stmt.run('Golden', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '03:41');
stmt.run('Iskry', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '02:24');
stmt.run('Vanitas', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '03:28');
stmt.run('Krajowa #2', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '00:41');
stmt.run('Półsny', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '02:01');
stmt.run('Sick Boy', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '01:38');
stmt.run('Byłem tam', 'PRO8L3M', 'GROUND ZERO MIXTAPE', 'RAP', '02:58');

stmt.run('SAFE (prod. 4money)', 'Gibbs', 'SAFE', 'RAP', '02:52');
stmt.run('SAMOTNOŚĆ (prod. Jonatan)', 'Gibbs', 'SAFE', 'RAP', '03:04');
stmt.run('ZAWSZE CHCIAŁEM (prod. Jonatan)', 'Gibbs', 'SAFE', 'RAP', '02:49');
stmt.run('KOLOR ( feat. FRANK LEEN ) (prod. Jonatan)', 'Gibbs', 'SAFE', 'RAP', '00:37');
stmt.run('CZERWONE ŁZY ( feat. SZPAKU ) (prod. Jonatan, 4money, Gibbs)', 'Gibbs', 'SAFE', 'RAP', '03:06');
stmt.run('DRIVE ( feat. OPAŁ ) (prod. Jonatan, 4money)', 'Gibbs', 'SAFE', 'RAP', '01:32');
stmt.run('ZERO CUKRU (prod. Jonatan)', 'Gibbs', 'SAFE', 'RAP', '00:22');
stmt.run('ZŁOTY CHŁOPAK (prod. Jonatan)', 'Gibbs', 'SAFE', 'RAP', '03:33');
stmt.run('CZARNA RÓŻA ( feat. KIEŁAS ) (prod. Jonatan)', 'Gibbs', 'SAFE', 'RAP', '03:24');
stmt.run('OGIEŃ (prod. 4money)', 'Gibbs', 'SAFE', 'RAP', '03:37');
stmt.run('STAN (prod. Jonatan, 4money, Gibbs)', 'Gibbs', 'SAFE', 'RAP', '00:24');
stmt.run('OCZY (prod. Jonatan, Gibbs)', 'Gibbs', 'SAFE', 'RAP', '01:54');
stmt.run('CIOS (prod. Jonatan, Gibbs)', 'Gibbs', 'SAFE', 'RAP', '03:31');
  stmt.finalize();

  // Wyświetlenie zawartości tabeli
  dbmusic.each('SELECT * FROM tracks', (err, row) => {
    console.log(row);
  });
});

// Zamknięcie połączenia z bazą danych
dbmusic.close();
