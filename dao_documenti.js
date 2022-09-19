//IMPORTANTISSIMO PER FAR FUNZIONARE IL DATABASE
// const path = require('path');
// process.env.NODE_ENV = 'production';
// const isBuild = process.env.NODE_ENV;
// const pathToDbFile = path.join(
//     isBuild ? __dirname : __static,
//     '../src/database.db',
// );
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const pathToDbFile = 'database.db';

const express = require('express');

const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(pathToDbFile);

let app = express();
let server = app.listen(5000);

app.use(express.urlencoded({
    extended: true
}))

console.log("Server in ascolto sulla porta 5000");

//DOCUMENTI

//GET TUTTI I DOCUMENTI
app.get('/listadocumenti', function(req, res) {

    db.all('SELECT * FROM documenti', function(err, data) {
        if(err) {
            res.status(500).send("Qualcosa è andato storto!");
        } else {
            res.json(data);
        }
    });
});

// AGGIUNGI DOCUMENTO
app.post('/inserisciDocumento', function(req, res) {

    let numero = req.body.numero;
    let data = req.body.data;
    let contenuto_documento = req.body.contenuto_documento;
    let cliente = req.body.cliente;

    var sql = 'INSERT INTO documenti (data, cliente, numero, contenuto_documento) VALUES (?, ?, ?, ?)';
});

// ELIMINA DOCUMENTO
app.post('/eliminaProdotto', function(req, res) {

    let id = req.body.id;

    db.run('DELETE FROM documento WHERE id="' + id + '"', (err) => {
        if(err) {
            res.send("Errore nella cancellazione del documento!");
        } else {
            res.send("Eliminazione avvenuta con successo!");
        }
    });
});