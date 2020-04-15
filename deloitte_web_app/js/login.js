function login()
{
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	$.ajax({
	    url: "http://localhost:3000/login",
	    dataType: "jsonp",
	    data: {"username": email, "password": password},
	    async: false,
	    success: function(result){
	    	if (typeof result.success === undefined)
	    	{
	    		alert("Username or password incorrect.")
	    	} else {
	    		localStorage['sessionID'] = result.success;
	    		location.replace("./");
	    	}
	  }});
}
