//! charts.js : functions used for making the dashboard charts dynamic (reference: CoolAdmin

// graph alert data global arrays
var colors = [];
var cisa_levels = [];
var cisa_labels = [];
var transparent = [];
var number_threats = 0;
var number_unique_endpoints = 0;

// displays the first widget on the dashboard
function displayWidgetOne()
{
  try {
    var ctx = document.getElementById("widgetChart1");
    if (ctx) {
      ctx.height = 130;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["Number Endpoints", "Number Endpoints"],
          type: 'line',
          datasets: [{
            data: [0, number_unique_endpoints],
            label: 'Endpoints Online',
            backgroundColor: 'rgba(255,255,255,.1)',
            borderColor: 'rgba(255,255,255,.55)',
          },]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          responsive: true,
          scales: {
            xAxes: [{
              gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontSize: 2,
                fontColor: 'transparent'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                display: false,
              }
            }]
          },
          title: {
            display: false,
          },
          elements: {
            line: {
              borderWidth: 0
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4
            }
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// displays the second widget on the dashboard
function displayWidgetTwo(number_scanned)
{
  try {
    var ctx = document.getElementById("widgetChart2");
    if (ctx) {
      ctx.height = 130;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["Logs Scanned", "Logs Scanned"],
          type: 'line',
          datasets: [{
            data: [0, number_scanned, number_scanned + (number_scanned/4)],
            label: 'Logs Scanned',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
          },]
        },
        options: {

          maintainAspectRatio: false,
          legend: {
            display: false
          },
          responsive: true,
          tooltips: {
            mode: 'index',
            titleFontSize: 12,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            backgroundColor: '#fff',
            titleFontFamily: 'Montserrat',
            bodyFontFamily: 'Montserrat',
            cornerRadius: 3,
            intersect: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontSize: 2,
                fontColor: 'transparent'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                display: false,
              }
            }]
          },
          title: {
            display: false,
          },
          elements: {
            line: {
              tension: 0.00001,
              borderWidth: 1
            },
            point: {
              radius: 4,
              hitRadius: 10,
              hoverRadius: 4
            }
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// displays the third widget on the dashboard
function displayWidgetThree()
{
  try {
    var ctx = document.getElementById("widgetChart3");
    if (ctx) {
      ctx.height = 130;
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["Number Of Threats", "Number Of Threats"],
          type: 'line',
          datasets: [{
            data: [0, number_threats, number_threats+1],
            label: 'Current Threats',
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
          },]
        },
        options: {

          maintainAspectRatio: false,
          legend: {
            display: false
          },
          responsive: true,
          tooltips: {
            mode: 'index',
            titleFontSize: 12,
            titleFontColor: '#000',
            bodyFontColor: '#000',
            backgroundColor: '#fff',
            titleFontFamily: 'Montserrat',
            bodyFontFamily: 'Montserrat',
            cornerRadius: 3,
            intersect: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontSize: 2,
                fontColor: 'transparent'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                display: false,
              }
            }]
          },
          title: {
            display: false,
          },
          elements: {
            line: {
              borderWidth: 1
            },
            point: {
              radius: 4,
              hitRadius: 10,
              hoverRadius: 4
            }
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// displays the fourth widget on the dashboard
function displayWidgetFour()
{
  try
  {
    var threat_label = [];
    for (var x = 0; x < cisa_levels.length; ++x)
    {
      threat_label.push("Average Threat Level");
    }

    var ctx = document.getElementById("widgetChart4");
    if (ctx) {
      ctx.height = 115;
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: threat_label,
          datasets: [
            {
              label: "Threat Level",
              data: cisa_levels,
              borderColor: "transparent",
              borderWidth: "0",
              backgroundColor: "rgba(255,255,255,.3)"
            }
          ]
        },
        options: {
          maintainAspectRatio: true,
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false,
              categoryPercentage: 1,
              barPercentage: 0.65
            }],
            yAxes: [{
              display: false,
              ticks: {
                    beginAtZero: true
                }
            }]
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// displays the doughnut graph based on alert data
function displayDoughnutGraph()
{
  try
  {
    var ctx = document.getElementById("percent-chart");
    if (ctx) {
      ctx.height = 280;
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              label: "Threats Category",
              data: cisa_levels,
              backgroundColor: colors,
              hoverBackgroundColor: colors,
              borderWidth: [
                0, 0
              ],
              hoverBorderColor: transparent
            }
          ],
          labels: cisa_labels
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          cutoutPercentage: 55,
          animation: {
            animateScale: true,
            animateRotate: true
          },
          legend: {
            display: false
          },
          tooltips: {
            titleFontFamily: "Poppins",
            xPadding: 15,
            yPadding: 10,
            caretPadding: 0,
            bodyFontSize: 16
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// displays polar graph based on alert data
function displayPolarGraph()
{
  try {
    var ctx = document.getElementById("polarChart");
    if (ctx) {
      ctx.height = 200;
      var myChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          datasets: [{
            data: cisa_levels,
            backgroundColor: colors

          }],
          labels: cisa_labels
        },
        options: {
          legend: {
            display: false
          },
          responsive: true
        }
      });
    }

  } catch (error) {
    console.log(error);
  }
}

// gets number of registrybehavior logs
function _getRegistryData(number_logs)
{
  $.ajax({
  url: "http://localhost:3000/behavior/registry",
  dataType: "jsonp",
  data: {"session_id": localStorage['sessionID']},
  success: function(result){
    var alert_logs = JSON.parse(result.success);
    var total_logs = alert_logs.length + number_logs;
    displayWidgetTwo(total_logs);
    }});
}

// gets number of filebehavior logs
function _getFileData(number_logs)
{
  $.ajax({
  url: "http://localhost:3000/behavior/file",
  dataType: "jsonp",
  data: {"session_id": localStorage['sessionID']},
  success: function(result){
    var alert_logs = JSON.parse(result.success);
    var total_logs = alert_logs.length + number_logs;
    _getRegistryData(total_logs);
    }});
}

// gets number of networkbehavior logs
function _getNetworkData(number_logs)
{
  $.ajax({
  url: "http://localhost:3000/behavior/network",
  dataType: "jsonp",
  data: {"session_id": localStorage['sessionID']},
  success: function(result){
    var alert_logs = JSON.parse(result.success);
    var total_logs = alert_logs.length + number_logs;
    _getFileData(total_logs);
    }});
}

// gets number of processbehavior logs
function _getProcessData()
{
  $.ajax({
    url: "http://localhost:3000/behavior/process",
    dataType: "jsonp",
    data: {"session_id": localStorage['sessionID']},
    success: function(result){
      var alert_logs = JSON.parse(result.success);
      _getNetworkData(alert_logs.length);
  }});
}

// populates global arrays with alert data
function populateGraphData()
{
  for (var x = 0; x < cisa_levels.length; ++x)
  {
    transparent.push("transparent");
    if (cisa_levels[x] >= 0 && cisa_levels[x] <= 25)
    {
      colors.push("#00b5e9");
      cisa_labels.push("Minor Threat");
    }

    if (cisa_levels[x] > 25 && cisa_levels[x] <= 50)
    {
      colors.push("#00ad5f");
      cisa_labels.push("Low Threat");
    }

    if (cisa_levels[x] > 50 && cisa_levels[x] <= 65)
    {
      colors.push("#ffff00");
      cisa_labels.push("Medium Threat");
    }

    if (cisa_levels[x] > 65 && cisa_levels[x] <= 75)
    {
      colors.push("#FFA500");
      cisa_labels.push("High Threat");
    }

    if (cisa_levels[x] > 75 && cisa_levels[x] <= 90)
    {
      colors.push("#fa4251");
      cisa_labels.push("Severe Threat");
    }

    if (cisa_levels[x] > 90 && cisa_levels[x] <= 100)
    {
      colors.push("#000000");
      cisa_labels.push("Emergency Threat");
    }
  }
  displayDoughnutGraph();
  displayPolarGraph();
  displayWidgetOne();
  displayWidgetThree();
  displayWidgetFour();
  _getProcessData();
}

// gets number of endpoints from alert_logs
function _getNumberOfEndpoints(alert_logs)
{
  var _unique_endpoints = [];

  // gathers unique endpoints and identifiers from logs
  for (var x = 0; x < alert_logs.length; ++x)
  {
    var device_user = alert_logs[x]["current.user"].split("\\")[0];
    if (_unique_endpoints.includes(device_user) != true)
    {
      _unique_endpoints.push(device_user);
    }
  }
  number_unique_endpoints = _unique_endpoints.length;
}

// gets threat level for a specific attack id
function getThreatLevel(attack_id)
{
  $.ajax({
      url: "http://localhost:3000/behavior/level",
      dataType: "jsonp",
      data: {"session_id": localStorage['sessionID'], "attack_id": attack_id},
      async: false,
      success: function(result){
        cisa_levels.push(result.success);
    }});
}

// parses the alert log data and gets the threat levels
function getAlertData(alert_logs)
{
  number_threats = alert_logs.length;
  for (var x = 0; x < alert_logs.length; x++) {
    var attack_id = alert_logs[x]["attckids"];
    getThreatLevel(attack_id);
  }
  _getNumberOfEndpoints(alert_logs);
  populateGraphData();
}

// gets the alert logs data from the frontend server
function getGraphs()
{
  $.ajax({
    url: "http://localhost:3000/behavior/abnormal",
    dataType: "jsonp",
    data: {"session_id": localStorage['sessionID']},
    success: function(result){
      var alert_logs = JSON.parse(result.success);
      getAlertData(alert_logs);
  }});
}

// runs the chart thread
getGraphs();
