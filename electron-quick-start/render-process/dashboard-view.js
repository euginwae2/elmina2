var chart = require('../assets/classes/charts');
console.log('dashboard view render')

const dash = document.getElementById('dashboard-view');
var newChart = new chart();
newChart.attachTo(newChart.container('Due in next 3 months','chart1'),dash);
var newChart1 = new chart();
newChart1.attachTo(newChart.container('Equipment Status','chart2'),dash);
var newChart2 = new chart();
newChart2.attachTo(newChart.container('Due for maintenance in next 3 months','chart3'),dash);
var newChart3 = new chart();
newChart3.attachTo(newChart.container('Maintenance Performed last month','chart4'),dash);
/* var newChart4 = new chart();
newChart4.attachTo(newChart.container('Total Number of equipment','chart5'),dash); */



/**
 * import chart scripts
 */
require('../assets/chartScripts/eqpStatus');
require('../assets/chartScripts/lastMonth');
require('../assets/chartScripts/next3months');
require('../assets/chartScripts/totalNumber');