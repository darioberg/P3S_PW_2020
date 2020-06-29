var divContentModal = document.getElementById("container-modal");
var btnLogin = document.getElementById("btn-login");

var url = "http://ec2-3-249-41-153.eu-west-1.compute.amazonaws.com:3000";
//funzione che controlla se i dati inseriti sono corretti
var checkLogin = function(e) {
    var username = document.getElementById("Username").value;
    var password = document.getElementById("Password").value;
    console.log("Username: " + username + " Pssword: " + password);
    fetch(url + '/checkLogin', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Email": username,
            "Password": password
        })
    }).then(function(result) {
        return result.json();
    }).then(function(data) {
        console.log(data);
        if (data[0]) {
            switch (data[0].ID_Ruolo) {
                case 1:
                    console.log("Sono un amministratore");
                    localStorage.setItem("ruolo", 1);

                    btnLogin.removeAttribute("data-toggle", "modal");
                    btnLogin.removeAttribute("data-target", "#staticBackdrop");
                    break;
                case 2:
                    console.log("Sono un manutentore");
                    localStorage.setItem("ruolo", 2);

                    btnLogin.removeAttribute("data-toggle", "modal");
                    btnLogin.removeAttribute("data-target", "#staticBackdrop");
                    break;
                case 3:
                    console.log("Sono un utente");
                    localStorage.setItem("ruolo", 3);

                    btnLogin.removeAttribute("data-toggle", "modal");
                    btnLogin.removeAttribute("data-target", "#staticBackdrop");
                    break;
                default:
                    break;
            }
            window.location.href = "../pages/dashboardAdmin.html";
        } else {
            console.log("FALSE");
            btnLogin.setAttribute("data-toggle", "modal");
            btnLogin.setAttribute("data-target", "#staticBackdrop");
        }
    });
}
var createModal = function(e) {

}
var forgotPassword = function(e) {

}