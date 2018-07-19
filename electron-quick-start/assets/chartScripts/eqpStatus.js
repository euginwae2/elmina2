var Chart = require('chart.js');
let ctx = document.getElementById('chart1');

var eqpStatus = new Chart(ctx,{
    type: 'bar',
    data:  {
        labels: ['Jul', 'Aug', 'Sep'],
        datasets: [{
            label: 'Assets Due for Maintenance',
            data: [20, 35, 15],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
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
            text: 'Assets Due for Maintenance'
        }
    }
})