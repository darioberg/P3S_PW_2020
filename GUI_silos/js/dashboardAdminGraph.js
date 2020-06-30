var url = "http://ec2-3-248-92-190.eu-west-1.compute.amazonaws.com:3000";
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

// parse labels and data
var labels = [];
var data = [];
createChart(labels, data);


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
        var liquid = data.LivelloLiquido;
        var percetual = parseInt((liquid * 100) / 160000);
        progressBar.setAttribute("aria-valuenow", percetual);
        progressBar.style.height = percetual + "%";
        progressBar.innerHTML = percetual + "%";
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