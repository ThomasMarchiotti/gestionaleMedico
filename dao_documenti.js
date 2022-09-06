const express = require('express');
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./database.db');

let app = express();
let server = app.listen(5000);

app.use(express.urlencoded({
    extended: true
}))

console.log("Server in ascolto sulla porta 5000");