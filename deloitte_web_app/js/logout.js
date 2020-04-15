function logout()
{
	console.log("logging out!");
	var sessionID = localStorage['sessionID'];
	console.log(sessionID);
	localStorage['sessionID'] = " ";
	$.ajax({
	    url: "http://localhost:3000/logout",
	    dataType: "jsonp",
	    data: {"session_id": sessionID},
	    async: false,
	    success: function(result){
	    	console.log("logout successful.");
	    	location.replace("./done");
	  }});
}