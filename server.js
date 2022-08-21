var sqlite3 = require('sqlite3').verbose()

var db = new sqlite3.Database('./database.db');

function getClienti() {
    var result;
    db.all('SELECT * FROM clienti', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            result = data;
            var table = document.getElementById('body-tabella');
            tr = "";
            result.forEach(x=> {
                tr += "<tr><td>"+x.codice_cliente+"</td>"+
                "<td>"+x.nome+"</td>"+
                "<td>"+x.via+"</td>"+
                "<td>"+x.cap+"</td>"+
                "<td>"+x.luogo+"</td>"+
                "<td>"+x.sigla_luogo+"</td></tr>";
            })
            table.innerHTML+=tr;
        }
    });
}

getClienti();


var buttonInserisci = document.getElementById("submitInserisci");
function inserisciClienteDatabase(nome, indirizzo, cap, luogo, sigla) {
    db.all('INSERT INTO clienti (codice_cliente , nome, via, cap, luogo, sigla_luogo) VALUES ("1111" , '+nome+', '+indirizzo+', '+cap+', '+luogo+', '+sigla+')');
}

buttonInserisci.onclick = inserisciClienteDatabase;