$(document).ready(function() {
    
    $('#searchingDropdown li a').click(function() {
        $("#dropdownBtn").text($(this).text());
    });
    
});

$('form.loginForm').on('submit', function(event){

	var form = $(this);
	var userid = form.attr('userid').value;
	var password = form.attr('password').value;

	var url = "/retrieval.php?Login="+ userid + "," + password;

	$.ajax({
		url: url,
	});
});
