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
	var unique_endpoints = [];
	var unique_descriptions = [];
	var unique_date_time = [];
	var unique_status = [];

	for (var x = 0; x < alert_logs.length; ++x)
	{
		var device_user = alert_logs[x]["current.user"].split("\\")[0];
		var time_stamp = alert_logs[x]["timestamp"];
		var device_name = alert_logs[x]["current.user"].split("\\")[1] + "@deloitte.com";
		if (unique_endpoints.includes(device_user) != true)
		{
			unique_endpoints.push(device_user);
			unique_descriptions.push(device_name);
			unique_date_time.push(time_stamp);
		}
	}

	for (var x = 0; x < unique_endpoints.length; ++x)
	{
		var endpoint_column = '<tr class="tr-shadow"><td>'+ x +'</td>' +
		'<td><span class="block-email">' + unique_descriptions[x] + '</span></td><td class="desc">' +
		unique_endpoints[x] + '</td><td>' + unique_date_time[x] + '</td><td>' +
		'<span class="status--process">Online</span></td></tr>';
		document.getElementById("endpoints").innerHTML = document.getElementById("endpoints").innerHTML + endpoint_column;
	}
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
