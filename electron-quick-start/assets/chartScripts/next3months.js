var Chart = require('chart.js');
let ctx = document.getElementById('chart3');

var nxt3months = new Chart(ctx,{
    type: 'line',
    data: {
        labels: ['Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Active',
            data: [50,52,68,75],
            borderColor: 'rgba(255, 206, 86, 1)',
            fill: false
            
        }, 
        {
            label: 'Removed From Service',
            data: [3,22,14,18],
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
        },
        {
            label: 'Out For Maintenance',
            data: [11,9,3,7],
            borderColor:'rgba(153, 102, 255, 1)',
            fill: false
        },
        {
            label: 'Decommissioned',
            data: [3,9,14,16],
            borderColor:'rgba(255, 159, 64, 1)',
            fill: false
        }
    ]
    },
    options:{
        title: {
            display: true,
            text: 'Status Timeline'
        }
    }

})