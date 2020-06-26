//variabile 
var resultRequestChart;
var selectSilos = document.getElementById("selectSilos");
var selectSilos2 = document.getElementById("selectSilos2");
var progressBar = document.getElementById("progressBar");
var calendar = document.getElementById("input-calendar");
var description = document.getElementById("descriptionLevel");
var btnConfirmChart = document.getElementById("btn-confirm-value");
var ctx = document.getElementById("myChart").getContext('2d');
var myChart;
var url = "http://silevel.ddnsking.com:3000";
// parse labels and data
var labels = [];
var data = [];
createChart(labels, data);


/* //funzione che al variare del giorno varia il grafico
function changeDayChart() {
    if (selectDay.value == 1) {
        console.log("dentro if 1");
        result = [{ x: 0, y: 0 }, { x: "18:30", y: "10000" }, { x: "19:00", y: "20000" }, { x: "20:00", y: "15000" }, { x: "24:00", y: "17000" }, { x: "25:00", y: "15000" }];
        labels = result.map(e => moment(e.x, 'HH:mm'));
        data = result.map(e => +e.y);
        myChart.destroy();
        createChart(data, labels);
    } else if (selectDay.value == 2) {
        console.log("dentro if 2");
        result = [{ x: 0, y: 0 }, { x: "14:30", y: "20000" }, { x: "15:00", y: "40000" }, { x: "17:00", y: "15000" }, { x: "24:00", y: "17000" }, { x: "25:00", y: "15000" }];
        labels = result.map(e => moment(e.x, 'HH:mm'));
        data = result.map(e => +e.y);
        myChart.destroy();
        createChart(data, labels);
    }
} */

function createChart(data, labels) {
    myChart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: labels,
            datasets: [{
                backgroundColor: "#009F84",
                borderColor: "#ffffff",
                label: 'LiquidSilo',
                data: data,
                borderWidth: 4
            }]
        },
        options: {
            elements: {
                line: {
                    tension: 0, // disables bezier curves
                }
            },
            title: {
                display: true,
                text: "Grapico che mostra l'andamento del liquido all'interno del silos",
                position: "top",
                fontSize: 15,
                fontColor: "white"
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: "#ffffff"
                    },
                    gridLines: {
                        zeroLineColor: '#000000'
                    },
                    type: 'time',
                    time: {
                        unit: 'hour',
                        displayFormats: {
                            hour: 'HH:mm'
                        }
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: "#ffffff"
                    },
                    gridLines: {
                        zeroLineColor: '#000000'
                    }
                }]
            }
        }
    });
}

function getAllSilos() {
    fetch(url + "/getAllSilos").then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var opt = document.createElement("option");
            opt.value = data[i].ID_Silos;
            opt.innerHTML = "Silos " + data[i].ID_Silos;
            selectSilos.appendChild(opt);
            var opt2 = document.createElement("option");
            opt2.value = data[i].ID_Silos;
            opt2.innerHTML = "Silos " + data[i].ID_Silos;
            selectSilos2.appendChild(opt2);
        }
    });
}

function getDataChart() {
    var data = calendar.value;
    var idSilos = selectSilos.value;
    fetch(url + '/getDataChart', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "dataOra": data,
            "idSilos": idSilos
        })
    }).then(function(result) {
        return result.json();
    }).then(function(data) {
        console.log(data);

        var result = [{ x: 0, y: 0 }];
        //result = [{ x: 0, y: 0 }, { x: "18:30", y: "10000" }, { x: "19:00", y: "20000" }, { x: "20:00", y: "15000" }, { x: "24:00", y: "17000" }, { x: "25:00", y: "15000" }];
        for (var i = 0; i < data.length; i++) {
            var time = data[i].Data_Ora;
            var liquid = data[i].LivelloLiquido;
            var onlyTime = splitDate(time);
            result.push({ "x": onlyTime, "y": liquid });
        }
        labels = result.map(e => moment(e.x, 'HH:mm'));
        data = result.map(e => +e.y);
        myChart.destroy();
        createChart(data, labels);
    });
}

function splitDate(data) {
    var split = data.split("T");
    var split2 = split[1].split(":");
    var time = split2[0] + ":" + split2[1];
    return time;
}

function getSilosById() {
    var idSilos = selectSilos2.value;
    fetch(url + "/getSilosById/" + idSilos).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        var liquid = data.LivelloLiquido;
        var percetual = parseInt((liquid * 100) / 160000);
        console.log(percetual);
        progressBar.setAttribute("aria-valuenow", percetual);
        progressBar.style.height = percetual + "%";
        description.innerHTML = "Livello attuale<br><br> " + "<strong>" + liquid + " L</strong>"
    });
}

function showButtonConfirm() {
    if (calendar.value != "") {
        btnConfirmChart.removeAttribute("disabled");
    }
}
//calendar.addEventListener('click', showButtonConfirm);
document.addEventListener('DOMContentLoaded', getAllSilos);
selectSilos2.addEventListener("click", getSilosById);