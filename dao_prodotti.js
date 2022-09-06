
//IMPORTANTISSIMO PER FAR FUNZIONARE IL DATABASE
const path = require('path');
process.env.NODE_ENV = 'production';
const isBuild = process.env.NODE_ENV;
const pathToDbFile = path.join(
    isBuild ? __dirname : __static,
    '../src/database.db',
);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const express = require('express');

const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(pathToDbFile);
console.log(db);

let app = express();
let server = app.listen(4000);

app.use(express.urlencoded({
    extended: true
}))

console.log("Server in ascolto sulla porta 4000");

// PRODOTTI

//GET TUTTI I PRODOTTI
app.get('/listaprodotti', function(req, res) {

    db.all('SELECT * FROM prodotti', function(err, data) {
        if(err) {
            res.status(500).send("Qualcosa è andato storto!");
        } else {
            res.json(data);
        }
    });
});

//AGGIUNGI PRODOTTO
app.post('/inserisciProdotto', function(req, res) {

    let codice = req.body.codice;
    let descrizione = req.body.descrizione;
    let quantita = req.body.quantita;
    let scadenza = req.body.scadenza;

    var sql = 'INSERT INTO prodotti (codice_prodotto, descrizione, quantita, scadenza) VALUES (?, ?, ?, ?)';

    db.run(sql, [codice, descrizione, quantita, scadenza], (err) => {
        if(err) {
            res.send(sql);
        } else {
            res.send(sql);
        }
    });
});

//MODIFICA PRODOTTO
app.post('/modificaProdotto', function(req, res) {

    let id = req.body.id;
    let codice = req.body.codice;
    let descrizione = req.body.descrizione;
    let quantita = req.body.quantita;
    let scadenza = req.body.scadenza;

    let sql = 'UPDATE prodotti SET codice_prodotto="'+codice+'", descrizione="' + descrizione + '", quantita="' + quantita + '", scadenza="' + scadenza + '" WHERE id="' + id + '"';

    db.run(sql, (err) => {
        if(err) {
            res.send("Errore nella modifica del prodotto!");
        } else {
            res.send("Prodotto modificato con successo!");
        }
    })
});

//ELIMINA PRODOTTO
app.post('/eliminaProdotto', function(req, res) {

    let id = req.body.id;

    db.run('DELETE FROM prodotti WHERE id="' + id + '"', (err) => {
        if(err) {
            res.send("Errore nella cancellazione del prodotto!");
        } else {
            res.send("Eliminazione avvenuta con successo!");
        }
    });
});