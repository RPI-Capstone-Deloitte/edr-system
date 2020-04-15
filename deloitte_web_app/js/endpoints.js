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

function checkSessionID()
{
	if (localStorage['sessionID'] == null || localStorage['sessionID'] == " ")
	{
		location.replace("./done");
	}
}

function getEndpointData(alert_logs)
{
	var device_name = alert_logs[0]["current.user"].split("\\")[0];
	var time_stamp = alert_logs[0]["timestamp"];
	var device_user = alert_logs[0]["current.user"].split("\\")[1] + "@deloitte.com";

	var endpoint_column = '<tr class="tr-shadow"><td>1</td>' +
	'<td><span class="block-email">' + device_user + '</span></td><td class="desc">' +
	device_name + '</td><td>' + time_stamp + '</td><td>' +
	'<span class="status--process">Online</span></td></tr>';
	document.getElementById("endpoints").innerHTML = document.getElementById("endpoints").innerHTML + endpoint_column;
}

function getEndpoints()
{
  $.ajax({
    url: "http://localhost:3000/behavior/abnormal",
    dataType: "jsonp",
    data: {"session_id": localStorage['sessionID']},
    success: function(result){
      var alert_logs = JSON.parse(result.success);
      getEndpointData(alert_logs);
  }});
}

checkSessionID();
$( document ).ready(function() {
	getUsername();
	getEndpoints();
});
