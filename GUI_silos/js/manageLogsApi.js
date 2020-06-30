var url = "http://ec2-3-248-92-190.eu-west-1.compute.amazonaws.com:3000";

function splitDateTable(data) {
    var split = data.split("T");
    var split2 = split[1].split(".");
    var time = split[0] + " " + split2[0];
    return time;
}
var callLogs = function(e) {
    const options = {
        method: 'GET'
    }
    fetch(url + "/getLog", options).then(function(response) {
        return response.json();
    }).then(function(data) {
        const element = data;
        console.log(data);
        var tbody = document.getElementById("tBody");
        for (let index = 0; index < element.length; index++) {
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");
            var datetime = splitDateTable(data[index].Data_Ora);

            th.classList.add("text-center");
            td1.classList.add("text-center");
            td2.classList.add("text-center");
            td3.classList.add("text-center");
            td4.classList.add("text-center");

            th.innerHTML = (datetime);
            td1.innerHTML = (data[index].ID_Silos);
            td2.innerHTML = (data[index].ID_Sensore);
            td3.innerHTML = (data[index].LivelloLiquido);
            td4.innerHTML = (data[index].Descrizione);

            tbody.appendChild(tr);
            tbody.appendChild(th);
            tbody.appendChild(td1);
            tbody.appendChild(td2);
            tbody.appendChild(td3);
            tbody.appendChild(td4);

        }
    });
}
var callErrors = function(e) {
    const options = {
        method: 'GET'
    }
    fetch(url + "/getMalfunctions", options).then(function(response) {
        return response.json();
    }).then(function(data) {
        const element = data;
        console.log(data);
        var tbody = document.getElementById("tBodyMalfunction");
        for (let index = 0; index < element.length; index++) {
            var tr = document.createElement("tr");
            var th = document.createElement("th");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var d = splitDateTable(data[index].Data_Ora);
            th.classList.add("text-center");
            td1.classList.add("text-center");
            td2.classList.add("text-center");
            td3.classList.add("text-center");
            th.innerHTML = (d);
            td1.innerHTML = (data[index].ID_Sensore);
            td2.innerHTML = (data[index].ID_Silos);
            td3.innerHTML = (data[index].Descrizione);

            tbody.appendChild(tr);
            tbody.appendChild(th);
            tbody.appendChild(td1);
            tbody.appendChild(td2);
            tbody.appendChild(td3);

        }
    });
}
document.addEventListener('DOMContentLoaded', callLogs);
document.addEventListener('DOMContentLoaded', callErrors);