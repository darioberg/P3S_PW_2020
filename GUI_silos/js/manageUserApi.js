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
var txtCognomeInsert = document.getElementById("txt-insert-cognome");
var txtEmailInsert = document.getElementById("txt-insert-email");
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
            if (data.msg == "Record eliminato") {
                var msg = "Hai eliminato correttamente l'utente: " + optselect;
                createModal("Eliminazione utente", msg, true);
            } else {
                var msg = "Qualcosa è andato storto. Riprova!";
                createModal("Eliminazione utente", msg, false);
            }
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
var clearSelectDelete = function(e) {
    var length = selectDelete.options.length;
    for (let index = length - 1; index >= 1; index--) {
        if (selectDelete.length >= 0) {
            selectDelete.options[index] = null;
        }
    }
    fillSelectDelete();
}


var insertUser = function(e) {
    var user = {
        "Email": txtEmailInsert.value,
        "Password": txtPasswordInsert.value,
        "Nome": txtNomeInsert.value,
        "Cognome": txtCognomeInsert.value,
        "ID_Ruolo": selectInsert.value
    }
    const url = "http://silevel.ddnsking.com:3000/insertNewUser";
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

function createModal(title, txt, bool) {
    var modal = document.getElementById("modal");
    var divFade = document.createElement("div");
    var divDialog = document.createElement("div");
    var divContent = document.createElement("div");
    var divHeader = document.createElement("div");
    var iconTrue = document.createElement("i");
    var iconFalse = document.createElement("i");
    var title = document.createElement("h5");
    var buttonClose = document.createElement("button");
    var span = document.createElement("span");
    var divBody = document.createElement("div");
    var divFooter = document.createElement("div");
    var buttonRetry = document.createElement("button");
    var pText = document.createElement("p");


    divFade.classList.add("modal", "fade");
    divFade.id = "modalBox";
    divFade.setAttribute("data-backdrop", "static");
    divFade.setAttribute("data-keyboard", "false");
    divFade.setAttribute("tabindex", "-1");
    divFade.setAttribute("role", "dialog");
    divFade.setAttribute("aria-labelledby", "staticBackdropLabel");
    divFade.setAttribute("aria-hidden", "true");

    span.setAttribute("aria-hidden", "true")

    divDialog.classList.add("modal-dialog");

    divContent.classList.add("modal-content");

    divHeader.classList.add("modal-header");

    iconTrue.classList.add("fas", "fa-exclamation-circle", "fa-4x");
    iconFalse.classList.add("fas", "fa-check-circle", "fa-4x");

    title.classList.add("modal-title", "pt-3", "pl-3", "text-danger");
    title.id = "title-modal";

    buttonClose.classList.add("close");
    buttonClose.setAttribute("data-dismiss", "modal");
    buttonClose.setAttribute("aria-label", "Close");

    //span.classList.add("");
    divBody.classList.add("modal-body", "text-center");
    divFooter.classList.add("modal-footer");
    buttonRetry.classList.add("btn", "btn-secondary");

    title.innerHTML = title;
    pText.innerHTML = txt;

    buttonClose.appendChild(span);
    if (bool) {
        divHeader.appendChild(iconTrue);
    } else {
        divHeader.appendChild(iconFalse);
    }
    divHeader.appendChild(title);
    divHeader.appendChild(buttonClose);
    divBody.appendChild(pText);
    divFooter.appendChild(buttonRetry);
    divContent.appendChild(divHeader);
    divContent.appendChild(divBody);
    divContent.appendChild(divFooter);
    divDialog.appendChild(divContent);
    divFade.appendChild(divDialog);
    modal.appendChild(divFade);
}
document.addEventListener('DOMContentLoaded', fillSelectDelete);
document.addEventListener('DOMContentLoaded', fillSelectUpdate);
btnDeleteUser.addEventListener('click', deleteUser);
btnDeleteUser.addEventListener('click', clearSelectDelete);
selectUpdate.addEventListener("change", updateUser);
btnUpdateUser.addEventListener("click", callUpdateApi);
btnUpdateUser.addEventListener('click', clearSelectTxt);
btnInsertUser.addEventListener('click', insertUser);