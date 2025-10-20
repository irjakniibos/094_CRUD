const express = require('express');
let mysql = require('mysql2');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

// Konfigurasi koneksi database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1523', // sesuaikan dengan password MySQL Anda
    database: 'mahasiswa',
    port: 3307 // sesuaikan dengan port MySQL Anda
})

// Menghubungkan ke database MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the MySQL:' + err.stack);
        return;
    }
    console.log('Connection Successfully!');
});

//Buat method GET dan POST
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});

