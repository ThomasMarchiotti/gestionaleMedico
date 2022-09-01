const express = require('express');
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./database.db');

let app = express();

let server = app.listen(3000);

app.use(express.urlencoded({
    extended: true
}))

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
app.post('/inserisciCliente', function(req, res) {

    var codice = req.body.codice;
    var nome = req.body.nome;
    var indirizzo = req.body.indirizzo;
    var cap = req.body.cap;
    var luogo = req.body.luogo;
    var sigla = req.body.sigla;

    var sql = 'INSERT INTO clienti (codice_cliente, nome, via, cap, luogo, sigla_luogo) VALUES (?, ?, ?, ?, ?, ?)';

    db.run(sql, [codice, nome, indirizzo, cap, luogo, sigla], (err) => {
        if(err) {
            res.send(sql);
        } else {
            res.send(sql);
        }
    });
});

//MODIFICA CLIENTE
app.post('/modificaCliente', function(req, res) {
    
    var id = req.body.id;
    var codice = req.body.codice;
    var nome = req.body.nome;
    var indirizzo = req.body.indirizzo;
    var cap = req.body.cap;
    var luogo = req.body.luogo;
    var sigla = req.body.siglaLuogo;

    var sql = 'UPDATE clienti SET codice_cliente="'+codice+'", nome="' + nome + '", via ="' + indirizzo + '", cap="' + cap + '", luogo="' + luogo + '", sigla_luogo="' + sigla + '" WHERE id="' + id + '"';

    db.run(sql, (err) => {
        if(err) {
            res.send("Errore nella modifica del cliente!");
        } else {
            res.send("Cliente modificato con successo!");
        }
    });

})

//ELIMINA CLIENTE
app.post('/eliminaCliente', function(req, res) {

    var id = req.body.id;

    db.run('DELETE FROM clienti WHERE id="' + id + '"', (err) => {
        if(err) {
            res.send("Errore nella cancellazione del cliente!");
        } else {
            res.send("Eliminazione avvenuta con successo!");
        }
    });
})