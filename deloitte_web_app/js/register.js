// registers user with backend server based on credentials
function register_user()
{
	var name = document.getElementById("name").value;
	var phone = document.getElementById("phone").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	$.ajax({
	    url: "http://localhost:3000/user/create",
	    dataType: "jsonp",
	    data: {"name": name, "phone": phone, "email": email, "password": password},
	    async: false,
	    success: function(result){
	    	console.log("success");
	    	location.replace("./done");
	  }});
}
