$(document).ready(function() {
    
    $('#searchingDropdown li a').click(function() {
        $("#dropdownBtn").text($(this).text());
    });

    $('#subjectDropdown li a').click(function() {
        $("#subjectBtn").text($(this).text());
    });
    
});

$('form.loginForm').on('submit', function(event){

	var username = document.getElementById("userid").value;
	var password = document.getElementById('password').value;

	$.ajax({
		method: "POST",
		url: "retrieval.php",
		data: {
			"key" : "123kidtribute",
			"functionName" : "Login",
			"parameters" : {"username":+ username, "password":+ password},
		}
	});
});

