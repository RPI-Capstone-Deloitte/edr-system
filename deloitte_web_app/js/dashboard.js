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
	if (localStorage['sessionID'] == null || localStorage['sessionID'] == " ")
	{
		location.replace("./done");
	}
}

// sets dashboard data based on parsed alert logs
function getDashboardData(alert_logs)
{
	var attack_id = alert_logs[0]["attckids"];
	document.getElementById("number_threats").innerHTML = alert_logs.length;
	document.getElementById("number_endpoints").innerHTML = 1;
	document.getElementById("average_cisa").innerHTML = "27";
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
