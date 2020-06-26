var ruolo = localStorage.getItem("ruolo");
var flagDivSilos = false;
var url = "http://silevel.ddnsking.com:3000";

var tx_pass = document.getElementById("tx_passw");

//{DIV} Blocchi principali della pagina home,manage user, show data, show log
var UserManager = document.getElementById("UserManager");
var LogManager = document.getElementById("LogManager");
var DataManager = document.getElementById("DataManager");
var Home = document.getElementById("Home");
var chartData = document.getElementById("content-chart-data");
var levelSilosDiv = document.getElementById("content-level-silos");



//{HREF} Pulsanti principali della sidebar
var UserBtnManager = document.getElementById("UserBtnManager");
var LogBtnManager = document.getElementById("LogBtnManager");
var DataBtnManager = document.getElementById("DataBtnManager");
var HomeBtn = document.getElementById("HomeBtn");

//{LI} Pulsanti colonna sidebar
var liHome = document.getElementById("li_home");
var liUser = document.getElementById("li_user");
var liData = document.getElementById("li_data");
var liLog = document.getElementById("li_log");
changePrivilege(ruolo);

// Radio button silos
var radioButtonSilos = document.getElementsByName("choice");


//txt psw
var divPsw = document.getElementById("space-to-psw");
var divPsw2 = document.getElementById("space-to-psw");


//div container update box dentro al usermanager box
var divTextUpdate = document.getElementById("container-text-update");
var divLinesUpdate = document.getElementById("container-lines-update");
var divConfirmUpdate = document.getElementById("container-input-update");
var divInputUpdate = document.getElementById("container-confirm-update");


var rad = document.getElementsByName("choice");
var prev = null;
for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
        if (flagDivSilos) {
            chartData.classList.add("d-block");
            chartData.classList.remove("d-none");
            levelSilosDiv.classList.add("d-none");
            levelSilosDiv.classList.remove("d-block");
            flagDivSilos = false;
        } else {
            levelSilosDiv.classList.add("d-block");
            levelSilosDiv.classList.remove("d-none");
            chartData.classList.add("d-none");
            chartData.classList.remove("d-block");
            flagDivSilos = true;
        }
    });
}
// function changeDivSilos() {
//     if (flagDivSilos) {
//         chartData.classList.add("d-block");
//         levelSilosDiv.classList.add("d-none");
//         flagDivSilos = false;
//     } else {
//         levelSilosDiv.classList.add("d-block");
//         chartData.classList.add("d-none");
//         flagDivSilos = true;
//     }
// }
//funzione di logout
function logout() {
    (function(myCallbackGoesHereAsVariable) {
        Parse.User.logOut();
    });
    window.location.href = "../login.html";
}

//funzione di scambio pagine tra la sidebar
function changeDivContent(click) {
    var classActive = [4];
    switch (click) {
        case "HomeBtn":
            Home.style.display = "block";
            UserManager.style.display = "none";
            LogManager.style.display = "none";
            DataManager.style.display = "none";
            changeActiveClass(liHome.id, classActive);
            break;
        case "UserBtnManager":
            Home.style.display = "none";
            UserManager.style.display = "block";
            LogManager.style.display = "none";
            DataManager.style.display = "none";
            changeActiveClass(liUser.id, classActive);
            break;
        case "DataBtnManager":
            Home.style.display = "none";
            UserManager.style.display = "none";
            LogManager.style.display = "none";
            DataManager.style.display = "block";
            changeActiveClass(liData.id, classActive);
            break;
        case "LogBtnManager":
            Home.style.display = "none";
            UserManager.style.display = "none";
            LogManager.style.display = "block";
            DataManager.style.display = "none";
            changeActiveClass(liLog.id, classActive);
            break;
    }
}
//funzione che setta una classe di stile sui blocchi LI
function changeActiveClass(idLi, classActive) {
    for (let i = 0; i < classActive.length; i++) {
        classActive[i] = false;
        liHome.classList.remove("active");
        liUser.classList.remove("active");
        liData.classList.remove("active");
        liLog.classList.remove("active");
    }
    if (idLi == "li_home") {
        classActive[0] = true;
        liHome.classList.add("active");
    }
    if (idLi == "li_user") {
        classActive[1] = true;
        liUser.classList.add("active");

    }
    if (idLi == "li_data") {
        classActive[2] = true;
        liData.classList.add("active");

    }
    if (idLi == "li_log") {
        classActive[3] = true;
        liLog.classList.add("active");
    }
}

function showDivGenPsw() {
    fetch(url + "/getRandomPsw").then(function(response) {
        return response.json();
    }).then(function(data) {
        divPsw.style.display = "block";
        tx_pass.value = data.RandomPsw;
        tx_pass.readOnly = true;
        console.log(data);
    });
}

function showDivManPsw() {
    tx_pass.value = "";
    tx_pass.readOnly = false;
    divPsw.style.display = "block";
}

function showBoxUpdate() {

    if (divConfirmUpdate.classList.contains("d-none") &&
        divTextUpdate.classList.contains("d-none") &&
        divLinesUpdate.classList.contains("d-none") &&
        divInputUpdate.classList.contains("d-none")) {
        divConfirmUpdate.classList.remove("d-none");
        divTextUpdate.classList.remove("d-none");
        divLinesUpdate.classList.remove("d-none");
        divInputUpdate.classList.remove("d-none");
    } else {
        divConfirmUpdate.classList.add("d-none");
        divTextUpdate.classList.add("d-none");
        divLinesUpdate.classList.add("d-none");
        divInputUpdate.classList.add("d-none");
    }
}

function changePrivilege(ruolo) {
    var titDash = document.getElementById("titDash");
    switch (ruolo) {
        case "1":
            titDash.innerText = "Dashboard Admin";
            break;
        case "2":
            titDash.innerText = "Dashboard Manutentore";
            liUser.style.display = "none";
            break;
        case "3":
            titDash.innerText = "Dashboard Utente";
            liUser.style.display = "none";
            liLog.style.display = "none";
            break;
        default:
            window.location.href = "../login.html";
            alert("Si è verificato un errore. Riprova!");
            break;
    }
}