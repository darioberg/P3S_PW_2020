//bottoni di conferma delle azione scelte
var btnDeleteUser = document.getElementById("btn-delete-user");
var btnUpdateUser = document.getElementById("btn-update-user");
var btnInsertUser = document.getElementById("btn-insert-user");
var btnGeneratePsw = document.getElementById("in_generate_psw");
var btnManualPsw = document.getElementById("in_insert_psw");


//select di scelta degli utenti
var selectDelete = document.getElementById("select-users");
var selectUpdate = document.getElementById("select-users-2");
var selectUpdatePermesso = document.getElementById("select-permit");
var selectInsert = document.getElementById("select-permit-insert");

//paragrafi che contengono i dati dell'utente che viene aggiornato
var pNome = document.getElementById("p-nome");
var pCognome = document.getElementById("p-cognome");
var pEmail = document.getElementById("p-email");
var pPassword = document.getElementById("p-password");
var pPermesso = document.getElementById("p-permesso");

//campi di testo che contengono i dati che verranno aggiornati all'interno del db
var txtNome = document.getElementById("txt-update-nome");
var txtCognome = document.getElementById("txt-update-cognome");
var txtEmail = document.getElementById("txt-update-email");
var txtPassword = document.getElementById("txt-update-password");

//campi di testo che contengono i dati per l'inserimento di un nuovo utente
var txtNomeInsert = document.getElementById("txt-insert-nome");
var txtCognomeInsert = document.getElementById("txt-insert-nome");
var txtEmailInsert = document.getElementById("txt-insert-nome");
var txtNomeInsert = document.getElementById("txt-insert-nome");
var txtPasswordInsert = document.getElementById("tx_passw");

var resultUpdateCall;
var selectUserUpdate;

//funzione che appena la pagina è stata caricata fa una richiesta al server è riempie tutti gli utenti che possono essere eliminati
var fillSelectDelete = function(e) {
        const url = "http://silevel.ddnsking.com:3000/getAll ";
        const options = {
            method: 'GET'
        }
        fetch(url, options).then(function(response) {
            return response.json();
        }).then(function(data) {
            const element = data;
            console.log(data);
            for (let index = 0; index < element.length; index++) {
                var opt = document.createElement("option");
                var user = element[index].Nome + " " + element[index].Cognome;
                opt.value = element[index].Email;
                opt.innerHTML = user;
                selectDelete.appendChild(opt);
            }
        });
    }
    //funzione che al click del pulsante delete user richiama l'api che elimina l'utente
var deleteUser = function(e) {
        var optselect = selectDelete.value;
        const url = "http://silevel.ddnsking.com:3000/deleteUser/" + optselect;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
        });
    }
    // funzione che riempie la select di scelta dell'utente nella fase di aggiornamento 
var fillSelectUpdate = function(e) {
    clearSelectTxt();
    const url = "http://silevel.ddnsking.com:3000/getAll";
    const options = {
        method: 'GET'
    }
    fetch(url, options).then(function(response) {
        return response.json();
    }).then(function(data) {
        const element = data;
        resultUpdateCall = data;
        console.log(data);
        for (let index = 0; index < element.length; index++) {
            var opt = document.createElement("option");
            var user = element[index].Nome + " " + element[index].Cognome;
            opt.value = element[index].Email;
            opt.innerHTML = user;
            selectUpdate.appendChild(opt);
        }
    });
}

var updateUser = function() {
    var optselect = selectUpdate.value;
    for (let index = 0; index < resultUpdateCall.length; index++) {
        if (resultUpdateCall[index].Email == optselect) {
            selectUserUpdate = resultUpdateCall[index];
            pNome.innerHTML = "";
            pCognome.innerHTML = "";
            pEmail.innerHTML = "";
            pPassword.innerHTML = "";
            pPermesso.innerHTML = "";

            pNome.innerHTML = resultUpdateCall[index].Nome;
            pCognome.innerHTML = resultUpdateCall[index].Cognome;
            pEmail.innerHTML = resultUpdateCall[index].Email;
            pPassword.innerHTML = resultUpdateCall[index].Password;
            if (resultUpdateCall[index].ID_Ruolo == 1) {
                pPermesso.innerHTML = "Amministratore";
            } else if (resultUpdateCall[index].ID_Ruolo == 2) {
                pPermesso.innerHTML = "Manutentore";
            } else if (resultUpdateCall[index].ID_Ruolo == 3) {
                pPermesso.innerHTML = "Utente";
            }
        }
    }
}
var callUpdateApi = function(e) {
    var email = selectUserUpdate.Email;
    var password;
    var nome;
    var cognome;
    var permesso;
    if (txtPassword.value == "") {
        password = selectUserUpdate.Password;
    } else {
        password = txtPassword.value;
    }
    if (txtCognome.value == "") {
        cognome = selectUserUpdate.Cognome;
    } else {
        cognome = txtCognome.value;
    }
    if (txtNome.value == "") {
        nome = selectUserUpdate.Nome;
    } else {

        nome = txtNome.value;
    }
    if (selectUpdatePermesso.value == "") {
        permesso = selectUserUpdate.ID_Ruolo;
    } else {
        permesso = selectUpdatePermesso.value;
    }

    var user = {
        "Email": email,
        "Password": password,
        "Nome": nome,
        "Cognome": cognome,
        "ID_Ruolo": permesso
    }
    const url = "http://silevel.ddnsking.com:3000/updateUser";
    const options = {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, options).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
    });
}

var clearSelectTxt = function(e) {
    txtNome.value = "";
    txtCognome.value = "";
    txtEmail.value = "";
    selectUpdatePermesso.value = "";
    txtPassword.value = "";
    pCognome.innerHTML = "Cognome";
    pNome.innerHTML = "Nome";
    pEmail.innerHTML = "Email";
    pPassword.innerHTML = "Password";
    pPermesso.innerHTML = "Permesso";

    var length = selectUpdate.options.length;
    for (let index = length - 1; index >= 1; index--) {
        if (selectUpdate.length >= 0) {
            selectUpdate.options[index] = null;
        }
    }
}


var insertUser = function(e) {
    var user = {
        "Email": txtEmailInsert.value,
        "Password": txtPasswordInsert.value,
        "Nome": txtNomeInsert.value,
        "Cognome": txtCognomeInsert.value,
        "ID_Ruolo": selectInsert.value
    }
    const url = "http://silevel.ddnsking.com:3000/insertUser";
    const options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, options).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
    });

}
document.addEventListener('DOMContentLoaded', fillSelectDelete);
document.addEventListener('DOMContentLoaded', fillSelectUpdate);
selectUpdate.addEventListener("change", updateUser);
btnUpdateUser.addEventListener("click", callUpdateApi);
btnUpdateUser.addEventListener('click', clearSelectTxt);
//selectUpdate.addEventListener('click', fillSelectUpdate);