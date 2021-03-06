const fastify = require("fastify");
const cors = require("fastify-cors");
const swagger = require("fastify-swagger");
const mysql = require("mysql");


//=============CONFIGURAZIONE CONNESSIONE=================

var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Vmware1!',
    database: 'silevel',
});

var app = fastify({ logger: true });
app.register(cors);

app.register(swagger, {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Documentazione api',
            description: 'Documentazione api server SiLevel',
            version: '1.0.0'
        },
        externalDocs: {
            url: 'https://github.com/darioberg/P3S_PW_2020',
            description: '[Codice sorgente progetto]'
        },
        host: 'silevel.ddnsking.com:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    },
    exposeRoute: true
});

//=======================================================================ACESSO AI DATI UTENTE====================================================


//===========INSERIMENTO NUOVO UTENTE=====================================

const bodyUserJsonSchema = {
    type: 'object',
    required: ['Email', 'Password', 'Nome', 'Cognome', 'ID_Ruolo'],
    properties: {
        Email: { type: 'string', minLength: 2 },
        Password: { type: 'string' },
        Nome: { type: 'string' },
        Cognome: { type: 'string' },
        ID_Ruolo: { type: 'number' }
    }
};

app.post("/insertNewUser", { schema: { body: bodyUserJsonSchema } }, (request, reply) => {
    let user = request.body;
    connection.query("insert into utente set ?", user, (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.status(200).send({ "msg": "Utente aggiunto" });
    });
});
//===========VISUALIZZAZIONE DI TUTTI==================
app.get("/getAll", (request, reply) => {
    connection.query("SELECT * FROM utente", (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});
//===========VISUALIZZAZIONE DI TUTTI GLI AMMINISTRATORI==================
app.get("/getAllAdministrator", (request, reply) => {
    connection.query("SELECT * FROM utente WHERE ID_Ruolo = 1", (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});

//==========VISUALIZZAZIONE DI TUTTI I MANUTENTORI===============
app.get("/getAllManutentori", (request, reply) => {
    connection.query("SELECT * from utente WHERE ID_Ruolo = 2", (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});

//============VISUALIZZAZIONE DI TUTTI GLI UTENTI================
app.get("/getAllUser", (request, reply) => {
    connection.query("SELECT * FROM utente WHERE ID_Ruolo = 3", (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});

//===========AGGIORAMENTO DELL'UTENTE=============
const updateUserJsonSchema = {
    type: 'object',
    required: ['Email'],
    properties: {
        Email: { type: 'string', minLength: 2 },
        Password: { type: 'string' },
        Nome: { type: 'string' },
        Cognome: { type: 'string' },
        ID_Ruolo: { type: 'number' }
    }
};

app.put("/updateUser", { schema: { body: updateUserJsonSchema } }, (request, reply) => {
    let user = request.body;

    console.log(user);
    connection.query("UPDATE utente SET ? WHERE Email = ?", [user, user.Email], (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.status(200).send({ "msg": "Utente aggiornato" });
    });
});

//==============ELIMINAZIONE DELL'UTENTE===============
app.delete("/deleteUser/:id", {
    schema: {
        params: {
            Email: { type: 'string', minLength: 3 }
        }
    }
}, (request, reply) => {
    let email = request.params.id;
    connection.query("DELETE FROM utente WHERE Email = ?", [email], (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.status(200).send({ "msg": "Record eliminato" });
    });
});

//=========CONTROLLO DELLE INFORMAZIONI DI LOGIN========
const checkUserJsonSchema = {
    type: 'object',
    required: ['Email', 'Password'],
    properties: {
        Email: { type: 'string', minLength: 2 },
        Password: { type: 'string' }
    }
};

app.post("/checkLogin", { schema: { body: checkUserJsonSchema } }, (request, reply) => {
    let credenziali = request.body;
    app.log.info("Dentro checkLogin");
    connection.query("SELECT * from utente WHERE Email = ? AND Password = ?", [credenziali.Email, credenziali.Password], (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        if (results.length == 0) {
            reply.send({ "msg": "Email o password errati!" });
        } else {
            reply.send(results);
        }
    });
});

//===================================================================ACESSO AI DATI SILOS============================================================

//===========INSERIMENTO NUOVO SILOS==============
const newSilosJsonSchema = {
    type: 'object',
    required: ['LivelloLiquido'],
    properties: {
        LivelloLiquido: { type: 'number' }
    }
};

app.post("/insertNewSilos", { schema: { body: newSilosJsonSchema } }, (request, reply) => {
    let silos = request.body;
    connection.query("insert into silos set ?", silos, (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.status(200).send({ "msg": "Silos aggiunto" });
    });
});

//===========VISUALIZZAZIONE DEI DATI DI UN SILOS==================
app.get("/getSilosById/:id", {
    schema: {
        params: {
            ID_Silos: { type: 'number' }
        }
    }
}, (request, reply) => {
    let silos = request.params.id;
    connection.query("SELECT * FROM silos WHERE ID_Silos = ?", silos, (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results[0]);
    });
});

//===========VISUALIZZAZIONE DEI DATI DI UN SILOS DATI DATA E IDSILOS==================

const getChartJsonSchema = {
    type: 'object',
    required: ['idSilos'],
    properties: {
        dataOra: { type: 'string', format: 'date' },
        idSilos: { type: 'number' }
    }
};

app.post("/getDataChart", { schema: { body: getChartJsonSchema } }, (request, reply) => {
    let data = request.body;
    var dataOra = data.dataOra + "%";

    app.log.info("DATA ORA INSERITI " + dataOra);

    connection.query("SELECT * FROM log WHERE ID_Silos = ? AND Data_Ora LIKE ?", [data.idSilos, dataOra], (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});

//===========VISUALIZZAZIONE DI TUTTI I SILOS==================
app.get("/getAllSilos", (request, reply) => {
    connection.query("SELECT * FROM silos", (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});

//=============AGGIORAMENTO DEL SILOS============
const updateSilosJsonSchema = {
    type: 'object',
    required: ['idSilos', 'livelloLiquido'],
    properties: {
        idSilos: { type: 'number' },
        livelloLiquido: { type: 'number' },
        sensori: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    bool: { type: 'boolean' }
                }
            },
            example:
            {
                id: 0,
                bool: false
            }
        }
    }
};

app.put("/updateSilos", { schema: { body: updateSilosJsonSchema } }, (request, reply) => {
    let silos = request.body;
    var idSilos = silos.idSilos;
    var livelloLiquido = silos.livelloLiquido;
    var sensori = silos.sensori;

    var oldSensors;

    getPreviousSensor(idSilos, (data) => {
        oldSensors = data;
        for (let i = 0; i < sensori.length; i++) {
            connection.query("UPDATE sensore SET statoSensore = ?, ID_Silos = ? WHERE ID_Sensore = ?", [sensori[i].bool, idSilos, sensori[i].id], (error, results, fields) => {
                app.log.info("Dentro la query!");
                if (error) {
                    reply.status(500).send({ error: error.message });
                    return;
                }
            });
        }
        connection.query("UPDATE silos SET LivelloLiquido = ? WHERE ID_Silos = ?", [livelloLiquido, idSilos], (error, results, fields) => {
            //app.log.info(results);
            if (error) {
                reply.status(500).send({ error: error.message });
                return;
            }
            updateLog(idSilos, livelloLiquido, sensori, oldSensors);
            reply.status(200).send({ "msg": "Silos aggiornato" });
        });
    }, (error) => {
        console.log("Error");
        reply.status(500).send(error);
    });
});

//==============ELIMINAZIONE DEL SILOS===============
app.delete("/deleteSilos/:id", {
    schema: {
        params: {
            ID_Silos: { type: 'number' }
        }
    }
}, (request, reply) => {
    let ID_Silos = request.params.ID_Silos;
    connection.query("DELETE FROM silos WHERE ID_Silos = ?", [ID_Silos], (error, results, fields) => {
        // app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.status(200).send({ "msg": "Record eliminato" });
    });
});

//===============================================================ACESSO AI DATI SENSORE==========================================================

//==============VISUALIZZAZIONE DEI SENSORI===============
app.get("/getAllSensorBySilos/:id", {
    schema: {
        params: {
            ID_Silos: { type: 'number' }
        }
    }
}, (request, reply) => {
    let idSilos = request.params.id;
    connection.query("SELECT * FROM sensore WHERE ID_Silos = ?", [idSilos], (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});

//==============ACCESSO AI DATI LOG===============
function updateLog(idSilos, livelloLiquido, sensori, oldSensors) {
    var stato;
    var sensoriCambiati = [];
    if (sensori.length != 0) {
        for (var i = 0; i < sensori.length; i++) {
            if (oldSensors[i].StatoSensore == 0) {
                stato = false;
            } else {
                stato = true;
            }
            if (sensori[i].bool != stato) {
                sensoriCambiati.push(sensori[i]);
                app.log.info("DENTRO IF");
            }
        }
        app.log.info("ARRAY: " + sensoriCambiati[0]);
        for (var x = 0; x < sensoriCambiati.length; x++) {
            var boolVec;
            if (sensoriCambiati[x].bool == true)
                boolVec = "ATTIVATO";
            else
                boolVec = "DISATTIVATO";
            var description = "IL SENSORE " + sensoriCambiati[x].id + " SI E' " + boolVec;
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dataOra = date + ' ' + time;
            app.log.info("DATA: " + dataOra + " DESCRIZIONE: " + description);
            connection.query("INSERT INTO log(ID_Sensore,Descrizione,LivelloLiquido,Data_Ora,ID_Silos) VALUES (?,?,?,?,?)", [sensoriCambiati[x].id, description, livelloLiquido, dataOra, idSilos], (error, results, fields) => {
                // app.log.info(results);
                if (error) {
                    //reply.status(500).send({ error: error.message });
                    console.log(error);
                    return;
                }
            });
        }
    }
}

app.get("/getLog", (request, reply) => {
    connection.query("SELECT * FROM log", (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});

//================================================================GESTIONE MALFUNZIONAMENTI=======================================================

app.get("/getMalfunctions", (request, reply) => {
    connection.query("SELECT * FROM malfunzionamenti", (error, results, fields) => {
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send(results);
    });
});

//========================INSERIMENTO MALFUNZIONAMENTO==========================

const newMalfunctionJsonSchema = {
    type: 'object',
    required: ['ID_Sensore', 'ID_Silos'],
    properties: {
        ID_Sensore: { type: 'number' },
        ID_Silos: { type: 'number' },
        Descrizione: { type: 'string' },
        Data_Ora: { type: 'string', format: 'date-time'}
    },
    example:
    {
        ID_Sensore: 1,
        ID_Silos: 1,
        Descrizione: "Il sensore 1 ha smesso di funzionare",
        Data_Ora: "2020-06-29 10:02:11"
    }
};

app.post("/insertMalfunction", { schema: { body: newMalfunctionJsonSchema } }, (request, reply) => {
    let malfunction = request.body;

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dataOra = date + ' ' + time;

    connection.query("INSERT INTO malfunzionamenti(ID_Sensore,ID_Silos,Descrizione,Data_Ora) VALUES (?,?,?,?)", [malfunction.ID_Sensore, malfunction.ID_Silos, malfunction.Descrizione, dataOra], (error, results, fields) => {
        //app.log.info(results);
        if (error) {
            reply.status(500).send({ error: error.message });
            return;
        }
        reply.send("Malfunzionamento inserito");
    });
});

//==================================================================GENERAZIONE PASSWORD==========================================================

app.get("/getRandomPsw", (request, reply) => {

    var psw = generateP();

    var obj = '{"RandomPsw":"' + psw + '"}';
    var json = JSON.parse(obj);


    reply.send(json);
});

//======================================================================FUNZIONI UTILI============================================================

function getPreviousSensor(idSilos, successCallback, errorCallback) {
    console.log("SONO DENTRO");
    connection.query("SELECT * FROM sensore WHERE ID_Silos = 1", (error, results, fields) => {
        // app.log.info(results);
        if (error) {
            errorCallback(error.message);
            return;
        }
        console.log(results);
        successCallback(results);
    });
}

function generateP() {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random()
            * str.length + 1);

        pass += str.charAt(char)
    }

    return pass;
}

//=======================================================================CONFIGURAZIONE============================================================

//======CONFIGURAZIONE DEL SERVER=====
app.listen(3000, '0.0.0.0', (err, address) => {
    if (err)
        throw err;
    app.log.info('server listening on' + address);
});

