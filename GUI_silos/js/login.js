var url = "http://silevel.ddnsking.com:3000";

function checkLogin() {
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
                    break;
                case 2:
                    console.log("Sono un manutentore");
                    localStorage.setItem("ruolo", 2);
                    break;
                case 3:
                    console.log("Sono un utente");
                    localStorage.setItem("ruolo", 3);
                    break;
                default:
                    break;
            }
            window.location.href = "../pages/dashboardAdmin.html";
        } else {
            console.log("FALSE");
        }
    });
}