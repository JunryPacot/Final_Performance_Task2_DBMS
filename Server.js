const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "FPT1_Pacot"
});

db.connect(err => {
  if (err) throw err;
  console.log(" Database connected");
});


app.get("/patients", (req, res) => {
  db.query("SELECT * FROM patient_Pacot", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.get("/patients/search/:keyword", (req, res) => {
  const { keyword } = req.params;
  const searchQuery = `
    SELECT id, firstname, lastname, gender, age 
    FROM patient_Pacot 
    WHERE firstname LIKE ? OR lastname LIKE ?`;
  const value = [`%${keyword}%`, `%${keyword}%`];
  db.query(searchQuery, value, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(5000, () =>
  console.log(" Server running on http://localhost:5000")
);
