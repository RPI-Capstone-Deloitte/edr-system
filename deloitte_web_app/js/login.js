// logs user into backend server based on credentials
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

function checkSessionID()
{
	if (localStorage['sessionID'] == null || localStorage['sessionID'] == "null")
	{
		localStorage['sessionID'] = " ";
	}

	if (localStorage['sessionID'] != " ")
	{
		if (confirm("Please logout before logging in to another account.")) {
			location.replace("./");
		} else {
			location.replace("./");
		}
	}
}

checkSessionID();
