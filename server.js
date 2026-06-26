const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "contact_db"
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }
});
/*
app.post("/contact", (req, res) => {

    const { name, email, subject, message } = req.body;

    const sql =
    "INSERT INTO messages(name,email,subject,message) VALUES(?,?,?,?)";

    db.query(
        sql,
        [name, email, subject, message],
        (err) => {
            if (err) {
                res.send("Error");
            } else {
                res.send("Message Saved Successfully");
            }
        }
    );
});*/

app.post("/contact", (req, res) => {

    console.log(req.body);

    const { name, email, subject, message } = req.body;

    const sql =
    "INSERT INTO messages(name,email,subject,message) VALUES(?,?,?,?)";

    db.query(
        sql,
        [name, email, subject, message],
        (err) => {
            if (err) {
                console.log(err);
                return res.send(err.message);
            }

            res.send("Message Saved Successfully");
        }
    );
});

app.listen(3000, () => {
    console.log("Server Running On Port 3000");
});