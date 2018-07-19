var Chart = require('chart.js');
let ctx = document.getElementById('chart2');

var lastMonth = new Chart(ctx,{
    type: 'doughnut',
    data: {
        labels: ['Active', 'Removed From Service', 'Out For Maintenance', 'Destroyed'],
        datasets: [{
            label: 'Asset Status',
            data: [75,18,7,16],
            backgroundColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ]

        }]
    },
    options:{
        title: {
            display: true,
            text: 'Asset Status'
        }
    }
    
})