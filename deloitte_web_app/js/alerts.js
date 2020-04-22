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

// displays the alerts in the data dashboard based on analyzed log data
function displayAlerts(cisa_level, attack_id, process_name, device_name, time_stamp, device_user, threat_type)
{
	var alert_column = '<tr class="tr-shadow">' +
	'<td>' + process_name + '</td>' +
	'<td> <span class="block-email">' + device_user 
	+ '</span>' + '</td><td class="desc">' + device_name + 
	'</td>' + '<td>' + time_stamp + '</td><td>' +
	'<span class="status--process">' + cisa_level + 
	'</span> </td><td>' + threat_type + '</td></tr>';
	document.getElementById("device").innerHTML = device_name;
	document.getElementById("alerts").innerHTML = document.getElementById("alerts").innerHTML + alert_column;
}

// gets the cisa threat score (level) based on the MITRE ATT&CK id
function getThreatLevel(attack_id, process_name, device_name, time_stamp, device_user, threat_type)
{
	$.ajax({
	    url: "http://localhost:3000/behavior/level",
	    dataType: "jsonp",
	    data: {"session_id": localStorage['sessionID'], "attack_id": attack_id},
	    async: false,
	    success: function(result){
	    	displayAlerts(result.success, attack_id, process_name, device_name, time_stamp, device_user, threat_type);
	  }});
}

// parses the alert log data and gets the threat levels
function getAlertData(alert_logs)
{
	for (var x = 0; x < alert_logs.length; x++) {
		var process_name = alert_logs[x]["file.sig"].toLowerCase();
		var device_name = alert_logs[x]["current.user"].split("\\")[0];
		var time_stamp = alert_logs[x]["timestamp"];
		var device_user = alert_logs[x]["current.user"].split("\\")[1] + "@deloitte.com";
		var threat_type = alert_logs[x]["behaviortype"];
		var attack_id = alert_logs[x]["attckids"];
		getThreatLevel(attack_id, process_name, device_name, time_stamp, device_user, threat_type);
	}
}

// gets the alert logs data from the frontend server
function getAlerts()
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

// checks active session
checkSessionID();
$( document ).ready(function() {
	// gets username data
	getUsername();
	// gets alert data
	getAlerts();
});