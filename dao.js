const express = require('express');
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./database.db');

let app = express();

let server = app.listen(3000);

console.log("Server in ascolto sulla porta 3000");


//CLIENTI

//GET TUTTI I CLIENTI
app.get('/listaclienti', function(req, res) {

    db.all('SELECT * FROM clienti', function(err, data) {
        if (err) {
            res.status(500).send('Qualcosa è andato storto!');
        } else {
            res.json(data);
        }
    });
});

//AGGIUNGI CLIENTE


//MODIFICA CLIENTE


//ELIMINA CLIENTE