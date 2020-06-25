var btnDeleteUser = document.getElementById("btn-delete-user");
var btnUpdateUser = document.getElementById("btn-update-user");
var selectDelete = document.getElementById("select-users");
var selectUpdate = document.getElementById("select-users-2");
var pNome = document.getElementById("p-nome");
var pCognome = document.getElementById("p-cognome");
var pEmail = document.getElementById("p-email");
var pPassword = document.getElementById("p-password");
var pPermesso = document.getElementById("p-permesso");
var txtNome = document.getElementById("txt-update-nome");
var txtCognome = document.getElementById("txt-update-cognome");
var txtEmail = document.getElementById("txt-update-email");
var txtPassword = document.getElementById("txt-update-password");
var txtPermesso = document.getElementById("select-permit");

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
    const url = "http://silevel.ddnsking.com:3000/getAll ";
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
            pPermesso.innerHTML = resultUpdateCall[index].ID_Ruolo;
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
    if (txtPermesso.value == "") {
        permesso = selectUserUpdate.ID_Ruolo;
    } else {
        permesso = txtPermesso.value;
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
    txtPermesso.value = "";
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

document.addEventListener('DOMContentLoaded', fillSelectDelete);
document.addEventListener('DOMContentLoaded', fillSelectUpdate);
selectUpdate.addEventListener("change", updateUser);
btnUpdateUser.addEventListener("click", callUpdateApi);
btnUpdateUser.addEventListener('click', clearSelectTxt);
selectUpdate.addEventListener('click', fillSelectUpdate);