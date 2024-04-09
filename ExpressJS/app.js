const express = require('express')
const cors = require('cors')
const mysql = require('mysql');

var app = express()
app.use(cors());
app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Server failed')
  })
  
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

const dbConfig = {
  host: 'localhost',
  port: 6000,
  user: 'root',
  database: 'CSC_471_Prj 4',
  password: '',
};

const connection = mysql.createConnection(dbConfig);

app.get("/all", (req, res) => {
    connection.query('SELECT * FROM project', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error executing query');
        } else {
            res.json(results);
        }
    });
});