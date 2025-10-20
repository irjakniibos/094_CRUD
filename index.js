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

app.post('/api/users', (req, res) => {
    const { nama, nim, kelas } = req.body;

    if(!nama || !nim || !kelas) {
        return  res.status(400).json({'message': 'nama, nim, dan kelas harus diisi'});
    }

    db.query(
        'INSERT INTO mahasiswa (nama, nim, kelas) VALUES (?, ?, ?)',
        [nama, nim, kelas],
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.status(201).json({ message: 'User added successfully' });
        }
    );
});


