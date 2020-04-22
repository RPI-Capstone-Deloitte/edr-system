function download_file(file_name, content) {
  var element = document.createElement('a');
  element.style.display = "none";
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', file_name);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function download_endpoints()
{
	$.ajax({
    url: "http://localhost:3000/behavior/abnormal",
    dataType: "jsonp",
    data: {"session_id": localStorage['sessionID']},
    success: function(result){
      var alert_logs = JSON.parse(result.success);
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
      var export_object = {};
      for (var x = 0; x < unique_endpoints.length; ++x)
      {
        export_object[x.toString()] =
        {
          "id": x,
          "email": unique_descriptions[x],
          "description": unique_endpoints[x],
          "current_datetime": unique_date_time[x],
          "status": "Online"
        };
      }
      download_file("ml_endpoints.json", JSON.stringify(export_object));
      window.close();
  }});
}

download_endpoints();
