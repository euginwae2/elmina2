var Chart = require('chart.js');

let ctx = document.getElementById('chart4');

var totalNumber = new Chart(ctx,{
    type: 'bar',
    data:  {
        labels: ['Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Maintenance Performed',
            data: [20, 35, 45],
            backgroundColor: [
                '#F90A0A',
                '#F9F90A',
                '#0AC1F9'
            ]
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'Maintenance Performed'
        }
    }
})