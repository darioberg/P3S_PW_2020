var data = {
    labels: labels,
    datasets: [{
        backgroundColor: "#009F84",
        borderColor: "#ffffff",
        label: 'LiquidSilo',
        data: data,
        borderWidth: 4
    }]
}
var options = {
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
var chart = new Chart(canvas, {
    type: "line",
    data: data,
    options: options
});