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
  database: 'Prj5',
  password: '',
};

const connection = mysql.createConnection(dbConfig);


/**
 * READ endpoints
 */

app.get("/employees", (req, res) => {
    connection.query('SELECT * FROM employee',
    (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error executing query');
        } else {
            res.json(results);
        }
    });
});

app.get("/dependents", (req, res) => {
    connection.query('SELECT * FROM dependent',
    (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error executing query');
        } else {
            res.json(results);
        }
    });
});

app.post("/employee", (req, res) => {
    const { ssn } = req.body;
    connection.query('SELECT * FROM employee WHERE ssn = ?', [ssn],
    (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error executing query');
        } else {
            res.json(results);
        }
    });
});

app.post("/dependent", (req, res) => {
    const { ssn } = req.body;
    connection.query('SELECT * FROM dependent WHERE ssn = ?', [ssn],
    (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error executing query');
        } else {
            res.json(results);
        }
    });
});


/**
 * CREATE endpoints
 */

app.post("/createEmployee", (req, res) => {
    const { ssn, Fname, Minit, Lname, dob, address } = req.body;
    connection.query(`      
        INSERT INTO employee VALUES (?, ?, ?, ?, ?, ?)`, [ssn, Fname, Minit, Lname, dob, address],
        (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error executing query');
        } else {
            const result = connection.query('SELECT * FROM employee WHERE ssn = ?', [ssn])
            res.json(result[0]);
        }
    });
});

app.post("/createDependent", (req, res) => {
    const { ssn, name, relationship } = req.body;
    connection.query(`      
        INSERT INTO dependent VALUES (?, ?, ?)`, [ssn, name, relationship],
        (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error executing query');
        } else {
            const result = connection.query('SELECT * FROM dependent WHERE ssn = ?', [ssn])
            res.json(result[0]);
        }
    });
});


/**
 * UPDATE endpoints
 */

app.post("/updateEmployee", (req, res) => {
    const { ssn, Fname, Minit, Lname, dob, address } = req.body;
    connection.query(`      
        UPDATE employee SET Fname = ?, Minit = ?, Lname = ?, dob = ?, address = ? WHERE ssn = ?`, [Fname, Minit, Lname, dob, address, ssn],
        (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error executing query');
        } else {
            res.status(200).send('Success');
        }
    });
});

app.post("/updateDependent", (req, res) => {
    const { ssn, name, relationship } = req.body;
    connection.query(`      
        UPDATE dependent SET name = ?, relationship = ? WHERE ssn = ?`, [name, relationship, ssn],
        (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error executing query');
        } else {
            res.status(200).send('Success');
        }
    });
});


/**
 * DELETE endpoints
 */

app.post("/deleteEmployee", (req, res) => {
    const { ssn } = req.body;
    connection.query('DELETE FROM employee WHERE ssn = ?', [ssn],
    (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error executing query');
        } else {
            res.status(200).send('Success');
        }
    });
});

app.post("/deleteDependent", (req, res) => {
    const { ssn } = req.body;
    connection.query('DELETE FROM dependent WHERE ssn = ?', [ssn],
    (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send('Error executing query');
        } else {
            res.status(200).send('Success');
        }
    });
});
