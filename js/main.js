$(document).ready(function() {
    
    addDefaultHeader();
    
    $('#targetLoginForm').submit(function( event ) {
        alert("login");
        var username = $("#usernameInput").val();
        var password = $("#passwordInput").val();

        // http://odin.socs.uoguelph.ca:83/kirkstestingarea/retrieval.php
        var request = $.ajax({
            method: "POST",
            url: "retrieval.php",
            data: {
                "key" : "123kidtribute",
                "functionName" : "Login",
                "parameters" : {"username":+ username, "password":+ password},
            }
        });
        request.done(function (response, textStatus, jqXHR){
        // log a message to the console
            alert("Hooray, it worked!");
        });
        request.fail(function (jqXHR, textStatus, errorThrown){
            // log the error to the console
            alert(
                "The following error occured: "+
                textStatus, errorThrown
            );
        });
        request.always(function () {
            alert("hi");
        });
    });
});


function addDefaultHeader()
{
    $("#pageHeader").append("<div class=\"wrap\" id=\"pageHeader\">	    <div class=\"navbarnavbar-static-top\" id=\"header\" role=\"navigation\">	        <div class=\"container\">	          <div class=\"navbar-header\" id=\"header\"><div style=\"float:right; padding-right:10px\" >	                    <button style=\"float:right; padding:5px margin-left: 5px\" class=\"btn btn-default\"  href=\"#signIn\" data-toggle=\"modal\">Sign in</button><button style=\"float:right; padding:5px margin-left: 5px\" class=\"btn btn-default\" onclick=\"location.href='createAccount.html';\">Create Account</button><p style=\"float:right; padding:10px\" id=\"fonts\">Want to get involved? Create an account!</p></div><h1 style=\"float:left;padding-left:10px\"><a onclick=\"location.href='index.html';\" id=\"fonts\">KidTribute</a><h1><h4 style=\"float:left;padding-left:10px\" id=\"fonts\">Helps schools help kids.<h4></div><br><br><br><div style=\"padding-left:10px\"><div class=\"input-prepend input-append\"><div class=\"btn-group\"><button id=\"dropdownBtn\" class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" >Subject<span class=\"caret\"></span></button><ul class=\"dropdown-menu\" id=\"searchingDropdown\"><li><a href=\"#\">All</a></li><li><a href=\"#\">History</a></li><li><a href=\"#\">Science</a></li><li><a href=\"#\">Math</a></li><li><a href=\"#\">Visual Arts</a></li><li><a href=\"#\">Geography</a></li><li><a href=\"#\">Technology</a></li><li><a href=\"#\">Drama</a></li><li><a href=\"#\">Physical Education</a></li><li><a href=\"#\">Language Arts</a></li><li><a href=\"#\">Music</a></li></ul></div><input type=\"text\" class=\"span8 search-query\"><button type=\"submit\" class=\"btn btn-primary\">Search</button></div></div></div></div><div class=\"modal fade hide\" id=\"signIn\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\">Please Sign In</h4></div><div class=\"modal-body\"><div style=\"text-align:center;\" ><p>You do not need an account to donate!</p></div><form method=\"post\" class=\"loginForm\" id='targetLoginForm'><p>Username: </p><input type=\"text\" name=\"userid\" title=\"Please enter your username\" size=\"15\" id=\"usernameInput\" required><br><p>Password: </p><input type=\"password\" name=\"password\" autocomplete=\"off\" size=\"15\" title=\"Please enter your password\" id=\"passwordInput\" required><br><button name=\"submit\" type=\"submit\" class=\"btn btn-primary btn-success\">Login</button></form><p>Don't have an account and want to volunteer? Create one here!</p><button name=\"modalCreateAccount\" class=\"btn btn-primary\" onclick=\"location.href='createAccount.html';\">Create Account</button></div></div><!-- /.modal-content --></div><!-- /.modal-dialog --></div>");
    $('#searchingDropdown li a').click(function() {
        $("#dropdownBtn").text($(this).text());
    });

    $('#subjectDropdown li a').click(function() {
        $("#subjectBtn").text($(this).text());
    });
}

function addTeacherHeader()
{
    $("#pageHeader").append("<div class=\"navbar navbar-static-top\" id=\"header\" role=\"navigation\"><div class=\"container\"><div class=\"navbar-header\" id=\"header\"><div style=\"float:right; padding-right:10px\" ><button style=\"float:right; padding:5px margin-left: 5px\" class=\"btn btn-default\"  href=\"#signout\" data-toggle=\"modal\">Logout</button><button style=\"float:right; padding:5px margin-left: 5px\" class=\"btn btn-default\" onclick=\"location.href='#';\">View Projects</button><button style=\"float:right; padding:5px margin-left: 5px\" class=\"btn btn-default\" onclick=\"location.href='#';\">Create Project</button><p style=\"float:right; padding:10px\" id=\"fonts\">Welcome, Username</p></div><h1 style=\"float:left;padding-left:10px\" id=\"fonts\">KidTribute<h1><h4 style=\"float:left;padding-left:10px\" id=\"fonts\">Helps schools help kids.<h4></div><br><br><br><div style=\"padding-left:10px\"><div class=\"input-prepend input-append\"><div class=\"btn-group\"><button id=\"dropdownBtn\" class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" >Subject<span class=\"caret\"></span></button><ul class=\"dropdown-menu\" id=\"searchingDropdown\"><li><a href=\"#\">All</a></li><li><a href=\"#\">History</a></li><li><a href=\"#\">Science</a></li><li><a href=\"#\">Math</a></li><li><a href=\"#\">Visual Arts</a></li><li><a href=\"#\">Geography</a></li><li><a href=\"#\">Technology</a></li><li><a href=\"#\">Drama</a></li><li><a href=\"#\">Physical Education</a></li><li><a href=\"#\">Language Arts</a></li><li><a href=\"#\">Music</a></li></ul></div><input type=\"text\" class=\"span8 search-query\"><button type=\"submit\" class=\"btn btn-primary\">Search</button></div></div></div></div>");
    $('#searchingDropdown li a').click(function() {
        $("#dropdownBtn").text($(this).text());
    });

    $('#subjectDropdown li a').click(function() {
        $("#subjectBtn").text($(this).text());
    });
}