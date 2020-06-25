var callLogs = function(e) {
    const url = "http://silevel.ddnsking.com:3000/getLog";
    const options = {
        method: 'GET'
    }
    fetch(url, options).then(function(response) {
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

            th.classList.add("text-center");
            td1.classList.add("text-center");
            td2.classList.add("text-center");
            td3.classList.add("text-center");
            td4.classList.add("text-center");
            th.innerHTML = (data[index].ID_Silos);
            td1.innerHTML = (data[index].ID_Sensore);
            td2.innerHTML = (data[index].LivelloLiquido);
            td3.innerHTML = (data[index].Data_Ora);
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
document.addEventListener('DOMContentLoaded', callLogs);