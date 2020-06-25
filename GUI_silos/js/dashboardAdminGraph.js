var selectDay = document.getElementById("selectDay");
var ctx = document.getElementById("myChart").getContext('2d');
var myChart;
//var result = [{ x: 0, y: 0 }, { x: "18:30", y: "10000" }, { x: "19:00", y: "20000" }, { x: "20:00", y: "15000" }, { x: "24:00", y: "17000" }, { x: "25:00", y: "15000" }];


// spazio che contiene il grafico


var ctx = document.getElementById("myChart").getContext('2d');
//variabile che contiene i dati da disegnare all'interno del grafico

// parse labels and data
var labels = [];
var data = [];
createChart(labels, data);
//labels = (result.map(e => moment(e.x, 'HH:mm')));
//data = (result.map(e => +e.y));

// funzione che al variare del giorno varia il grafico
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
}

function addData(label, data) {
    myChart.data.labels.push(label);
    myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    myChart.update();
}

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