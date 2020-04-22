// gets username data based on session ID
function getUsername()
{
	$.ajax({
	    url: "http://localhost:3000/user",
	    dataType: "jsonp",
	    data: {"session_id": localStorage['sessionID']},
	    async: false,
	    success: function(result){
	    	document.getElementById("user").innerHTML = result.success;
	  }});
}

// checks if sessionID exists and redirects user to login if needed
function checkSessionID()
{
	if (localStorage['sessionID'] == " " || localStorage['sessionID'] == "null")
	{
		location.replace("./done");
	}
}

function getNumberOfEndpoints(alert_logs)
{
	var unique_endpoints = [];

	// gathers unique endpoints and identifiers from logs
	for (var x = 0; x < alert_logs.length; ++x)
	{
		var device_user = alert_logs[x]["current.user"].split("\\")[0];
		if (unique_endpoints.includes(device_user) != true)
		{
			unique_endpoints.push(device_user);
		}
	}
	document.getElementById("number_endpoints").innerHTML = unique_endpoints.length;
}

function getThreatLevel(attack_id)
{
	$.ajax({
	    url: "http://localhost:3000/behavior/level",
	    dataType: "jsonp",
	    data: {"session_id": localStorage['sessionID'], "attack_id": attack_id},
	    async: false,
	    success: function(result){
	    	console.log("[sucess] populated cisa level.");
	  }});
}

function getAverageCISA(alert_logs)
{
	for (var x = 0; x < alert_logs.length; x++)
	{
		var attack_id = alert_logs[x]["attckids"];
		getThreatLevel(attack_id);
	}
	$.ajax({
	    url: "http://localhost:3000/behavior/level/average",
	    dataType: "jsonp",
	    data: {"session_id": localStorage['sessionID']},
	    async: false,
	    success: function(result){
	    	document.getElementById("average_cisa").innerHTML = result.success;
	  }});
}

// sets dashboard data based on parsed alert logs
function getDashboardData(alert_logs)
{
	document.getElementById("number_threats").innerHTML = alert_logs.length;
	getAverageCISA(alert_logs);
	getNumberOfEndpoints(alert_logs);
}

// gets number of registrybehavior logs
function getRegistryData(number_logs)
{
	$.ajax({
	url: "http://localhost:3000/behavior/registry",
	dataType: "jsonp",
	data: {"session_id": localStorage['sessionID']},
	success: function(result){
	  var alert_logs = JSON.parse(result.success);
	  var total_logs = alert_logs.length + number_logs;
	  document.getElementById("number_logs").innerHTML = total_logs;
  	}});
}

// gets number of filebehavior logs
function getFileData(number_logs)
{
	$.ajax({
	url: "http://localhost:3000/behavior/file",
	dataType: "jsonp",
	data: {"session_id": localStorage['sessionID']},
	success: function(result){
	  var alert_logs = JSON.parse(result.success);
	  var total_logs = alert_logs.length + number_logs;
	  getRegistryData(total_logs);
  	}});
}

// gets number of networkbehavior logs
function getNetworkData(number_logs)
{
	$.ajax({
	url: "http://localhost:3000/behavior/network",
	dataType: "jsonp",
	data: {"session_id": localStorage['sessionID']},
	success: function(result){
	  var alert_logs = JSON.parse(result.success);
	  var total_logs = alert_logs.length + number_logs;
	  getFileData(total_logs);
  	}});
}

// gets number of processbehavior logs
function getProcessData()
{
	$.ajax({
    url: "http://localhost:3000/behavior/process",
    dataType: "jsonp",
    data: {"session_id": localStorage['sessionID']},
    success: function(result){
      var alert_logs = JSON.parse(result.success);
      getNetworkData(alert_logs.length);
  }});
}

// gets alert logs and launches dashboard process
function getDashboard()
{
  $.ajax({
    url: "http://localhost:3000/behavior/abnormal",
    dataType: "jsonp",
    data: {"session_id": localStorage['sessionID']},
    success: function(result){
      var alert_logs = JSON.parse(result.success);
      getDashboardData(alert_logs);
  }});
}

// checks active session
checkSessionID();
$( document ).ready(function() {
	// gets username data
	getUsername();
	// gets dashboard data
	getDashboard();
	// gets logs data
	getProcessData();
});
