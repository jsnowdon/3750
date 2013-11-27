$(document).ready(function() {
    
    var loggedIn = readCookie("name");
    if(loggedIn != null) {
        addTeacherHeader();
        setUsername(loggedIn);
    }
    else {
        addDefaultHeader();
    }
    
    if($("#projectTitle").length > 0) {
        var projectid = readCookie("projectid");
        if(projectid != null) {
            eraseCookie("projectid");
            getProject(projectid);
        }
    }
    
    if($("#yourProjects").length > 0) {
        var userid = readCookie("userid");
        // get the name of the school by it's schoolid
        var parameters = {
        	"teacherId" : userid,
        };
        var requestObject = {
        	"key" : "123kidtribute",
        	"functionName" : "GetAllProjectsForTeacher",
        	"parameters" :  parameters,
        };
        var request = $.ajax({
            dataType: "json",
            method: "POST",
            url: "retrieval.php",
            data: requestObject,
            }
        );
        request.done(function (response, textStatus, jqXHR){
            addTeacherResults(response["results"]);
        });
    }
        
    if($("#schoolidField").length > 0) {
        
        var name = readCookie("name");
        var email = readCookie("email");
        var schoolID = readCookie("schoolid");
        $("#nameField").text(name);
        $("#emailField").text(email);
        // get the name of the school by it's schoolid
        var parameters = {
        	"schoolId" : schoolID,
        };
        var requestObject = {
        	"key" : "123kidtribute",
        	"functionName" : "GetSchool",
        	"parameters" :  parameters,
        };
        var request = $.ajax({
            dataType: "json",
            method: "POST",
            url: "retrieval.php",
            data: requestObject,
            }
        );
        request.done(function (response, textStatus, jqXHR){
            $("#schoolidField").text(response["results"]["name"]);
        });
    }

    if($("#searchResults").length > 0) {

        var subject = readCookie("searchSubject");
        var term = readCookie("searchTerm");
        if(subject != null){

            if(term != ""){
                getSearchResults(subject, term)
            }

            getSearchResults(subject, term);
        }
    }
    
    $('#createProjectForm').submit(function( event ) {
        event.preventDefault();
        
        var parameters = {
        	"id" : null,
        	"schoolId" : readCookie("schoolid"),
            "userId" : readCookie("userid"),
            "userEmail" : $("#emailField").text(),
            "title" : $("#projectTitle").val(),
            "description" : $("#projectDescription").val(),
            "startDate" : $("#projectStartDate").val(),
            "endDate" : $("#projectEndDate").val(),
            "imageUrl" : null,
            "category" : $("#subjectBtn").text(),
        };

        var requestObject = {
        	"key" : "123kidtribute",
        	"functionName" : "CreateProject",
        	"parameters" :  parameters,
        };

        var request = $.ajax({
            dataType: "json",
            method: "PUT",
            url: "retrieval.php",
            data: requestObject,
            }
        );
        request.done(function (response, textStatus, jqXHR){
        // log a message to the console
            alert("Hooray, it worked! going to view projects");
        });
        request.fail(function (jqXHR, textStatus, errorThrown){
            // log the error to the console
            alert(
                "The following error occured: " + jqXHR.responseText + textStatus + errorThrown
            );
        });
        
    });
    
    $('#targetLoginForm').submit(function( event ) {
        event.preventDefault();
        var username = $("#usernameInput").val();
        var password = $("#passwordInput").val();
        
        // username: teacher@s.com
        // password: password
        // http://odin.socs.uoguelph.ca:83/Retrieval.php
        var parameters = {
        	"username" : username,
        	"password" : password,
        };

        var requestObject = {
        	"key" : "123kidtribute",
        	"functionName" : "Login",
        	"parameters" :  parameters,
        };

        var request = $.ajax({
            dataType: "json",
            method: "POST",
            url: "retrieval.php",
            data: requestObject,
            }
        );
        request.done(function (response, textStatus, jqXHR){

            if(response["errors"] == null){
                loginSuccess(response);
            }

            else{
                alert(response["errors"]);
            }
        });
        request.fail(function (jqXHR, textStatus, errorThrown){
            // log the error to the console
            alert(
                "The following error occured: " + jqXHR.responseText + ", " + textStatus + ", " + errorThrown
            );
        });
        /*request.ajaxError(function( event, request, settings ) {
            alert( "Error requesting page " + settings.url );
        });*/
    });
});

function logout()
{
    eraseCookie("userid");
    eraseCookie("name");
    eraseCookie("email");
    eraseCookie("schoolid");
    eraseCookie("loggedin");
    window.location.assign("index.html");
    //addDefaultHeader();
}

function loginSuccess(response)
{
    //alert(response["status"]);
    $('#signIn').modal('hide');
    addTeacherHeader();
    setUsername(response["results"]["name"]);
    if(readCookie("loggedin") == null) {
        createCookie("userid",response["results"]["id"],5);
        createCookie("name",response["results"]["name"],5);
        createCookie("email",response["results"]["email"],5);
        createCookie("schoolid",response["results"]["schoolId"],5);
        createCookie("loggedin",response["results"]["username"],5);
    }
}

function setUsername(username) {
    $('#usernameTag').text(username);
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}


function addDefaultHeader()
{
    $("#pageHeader").empty();
    $("#pageHeader").append("<div class=\"wrap\" id=\"defaultpageHeader\">	    <div class=\"navbarnavbar-static-top\" id=\"header\" role=\"navigation\">	        <div class=\"container\">	          <div class=\"navbar-header\" id=\"header\"><div style=\"float:right; padding-right:10px\" >	                    <button style=\"float:right; padding:5px margin-left: 5px\" class=\"btn btn-default\"  href=\"#signIn\" data-toggle=\"modal\">Sign in</button><button style=\"float:right; padding:5px margin-left: 5px\" class=\"btn btn-default\" onclick=\"location.href='createAccount.html';\">Create Account</button><p style=\"float:right; padding:10px\" id=\"fonts\">Want to get involved? Create an account!</p></div><h1 style=\"float:left;padding-left:10px\"><a onclick=\"location.href='index.html';\" href=\"#\" class=\"homepagetitle\">KidTribute</a></h1><h4 style=\"float:left;padding-left:10px\" id=\"fonts\">Helps schools help kids.</h4></div><br><br><br><div style=\"padding-left:10px\"><div class=\"input-prepend input-append\"><div class=\"btn-group\"><button id=\"dropdownBtn\" class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" >Subject<span class=\"caret\"></span></button><ul class=\"dropdown-menu\" id=\"searchingDropdown\"><li><a href=\"#\">All</a></li><li><a href=\"#\">History</a></li><li><a href=\"#\">Science</a></li><li><a href=\"#\">Math</a></li><li><a href=\"#\">Visual Arts</a></li><li><a href=\"#\">Geography</a></li><li><a href=\"#\">Technology</a></li><li><a href=\"#\">Drama</a></li><li><a href=\"#\">Physical Education</a></li><li><a href=\"#\">Language Arts</a></li><li><a href=\"#\">Music</a></li></ul></div><input type=\"text\" class=\"span8 search-query\"><button type=\"submit\" class=\"btn btn-primary\">Search</button></div></div></div></div><div class=\"modal fade hide\" id=\"signIn\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\">Please Sign In</h4></div><div class=\"modal-body\"><div style=\"text-align:center;\" ><p>You do not need an account to donate!</p></div><form method=\"post\" class=\"loginForm\" id='targetLoginForm'><p>Username: </p><input type=\"text\" name=\"userid\" title=\"Please enter your username\" size=\"15\" id=\"usernameInput\" required><br><p>Password: </p><input type=\"password\" name=\"password\" autocomplete=\"off\" size=\"15\" title=\"Please enter your password\" id=\"passwordInput\" required><br><button name=\"submit\" type=\"submit\" class=\"btn btn-primary btn-success\">Login</button></form><p>Don't have an account and want to volunteer? Create one here!</p><button name=\"modalCreateAccount\" class=\"btn btn-primary\" onclick=\"location.href='createAccount.html';\">Create Account</button></div></div><!-- /.modal-content --></div><!-- /.modal-dialog --></div>");
    $('#searchingDropdown li a').click(function() {
        $("#dropdownBtn").text($(this).text());
    });

    $('#subjectDropdown li a').click(function() {
        $("#subjectBtn").text($(this).text());
    });
}

function addTeacherHeader()
{
    $("#pageHeader").empty();
    $("#pageHeader").append("<div class=\"navbar navbar-static-top\" id=\"header\" role=\"navigation\"><div class=\"container\"><div class=\"navbar-header\" id=\"header\"><div style=\"float:right; padding-right:10px\" ><button style=\"float:right; padding:5px margin-left: 5px\" class=\"btn btn-default\" onclick=\"logout()\" data-toggle=\"modal\">Logout</button><button style=\"float:right; padding:5px margin-left: 5px\" class=\"btn btn-default\" onclick=\"location.href='teacherProjects.html';\">View Projects</button><button style=\"float:right; padding:5px margin-left: 5px\" class=\"btn btn-default\" onclick=\"location.href='createProject.html';\">Create Project</button><p style=\"float:right; padding:5px; padding-top:10px; color:WHITE\" id=\"usernameTag\">Username</p><p style=\"float:right; padding:5px; padding-top:10px;\" id=\"fonts\">Welcome,</p></div><h1 style=\"float:left;padding-left:10px\"><a onclick=\"location.href='index.html';\" href=\"#\" class=\"homepagetitle\">KidTribute</a></h1><h4 style=\"float:left;padding-left:10px\" id=\"fonts\">Helps schools help kids.</h4></div><br><br><br><div style=\"padding-left:10px\"><div class=\"input-prepend input-append\"><div class=\"btn-group\"><button id=\"dropdownBtn\" class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" >Subject<span class=\"caret\"></span></button><ul class=\"dropdown-menu\" id=\"searchingDropdown\"><li><a href=\"#\">All</a></li><li><a href=\"#\">History</a></li><li><a href=\"#\">Science</a></li><li><a href=\"#\">Math</a></li><li><a href=\"#\">Visual Arts</a></li><li><a href=\"#\">Geography</a></li><li><a href=\"#\">Technology</a></li><li><a href=\"#\">Drama</a></li><li><a href=\"#\">Physical Education</a></li><li><a href=\"#\">Language Arts</a></li><li><a href=\"#\">Music</a></li></ul></div><input type=\"text\" class=\"span8 search-query\"><button type=\"submit\" class=\"btn btn-primary\">Search</button></div></div></div></div>");
    $('#searchingDropdown li a').click(function() {
        $("#dropdownBtn").text($(this).text());
    });

    $('#subjectDropdown li a').click(function() {
        $("#subjectBtn").text($(this).text());
    });
}

function viewProject(id)
{
    alert("got id:" + id);
    createCookie("projectid",id,5);
    window.location = "viewProject.html";
}

function getProject(id)
{
    var parameters = {
        "projectId" :  id,
    };

    var requestObject = {
        "key" : "123kidtribute",
        "functionName" : "GetProject",
        "parameters" :  parameters,
    };

    var request = $.ajax({
        dataType: "json",
        method: "POST",
        url: "retrieval.php",
        data: requestObject,
        }
    );
    request.done(function (response, textStatus, jqXHR){
        console.log(response);
        addViewProjectInfo(response["results"]);
    });
    request.fail(function (jqXHR, textStatus, errorThrown){
        // log the error to the console
        alert(
            "The following error occured: " + jqXHR.responseText + textStatus + errorThrown
        );
    });
}

function addViewProjectInfo(result)
{
    $("#projectTitle").text(result["title"]);
    $("#schoolName").text(result["schoolName"]);
    $("#projectDescription").text(result["description"]);
    $("#projectStartDate").text(result["startDate"]);
    $("#projectEndDate").text(result["endDate"]);
    $("#projectTeacherEmail").text(result["userEmail"]);
    
    var parameters = {
        "userId" :  result["userId"],
    };

    var requestObject = {
        "key" : "123kidtribute",
        "functionName" : "GetUser",
        "parameters" :  parameters,
    };

    var request = $.ajax({
        dataType: "json",
        method: "POST",
        url: "retrieval.php",
        data: requestObject,
        }
    );
    request.done(function (response, textStatus, jqXHR){
        console.log(response);
        $("#projectTeacherName").text(response["results"]["name"]);
    });
    request.fail(function (jqXHR, textStatus, errorThrown){
        // log the error to the console
        alert(
            "The following error occured: " + jqXHR.responseText + textStatus + errorThrown
        );
    });
    
}

function addTeacherProjects(resultsArray)
{
    //$("#searchResults").empty();
    if(resultsArray.length == 0){
         $("#searchResults").append("<tr><td><h3>Sorry, no results found<h3></td></tr>")
    }

    for( var i = 0; i < resultsArray.length; i++){
        var startDate = resultsArray[i]["startDate"];
        var endDate = resultsArray[i]["endDate"];
        var title = resultsArray[i]["title"];
        var description = resultsArray[i]["description"];
        var projectid = resultsArray[i]["id"];
        $("#searchResults").append("<tr><td><form><h4 style=\"margin-left:20px\" id=\"Title\"><a href=\"#\" onclick=\"viewProject('" + projectid + "')\">" + title + "</a></h4><p style=\"margin-left:20px\" id=\"startDate\"><i>Date Posted: " + startDate + "</i></p><p style=\"margin-left:20px\" id=\"endDate\"><i>Date Expires: " + endDate + "</i></p><p style=\"margin-left:20px\">Description:</p><textarea name=\"description\" title=\"Description\" style=\"width: 900px; height: 86px; margin-left:20px; resize:none\" maxlength=\"512\" id=\"description\" readonly>" + description + "</textarea></form></td></tr>");
    }
}

function addTeacherResults(resultsArray)
{
    if(resultsArray.length == 0){
         $("#searchResults").append("<tr><td><h3>Sorry, no results found<h3></td></tr>")
    }

    for( var i = 0; i < resultsArray.length; i++){
        var startDate = resultsArray[i]["startDate"];
        var endDate = resultsArray[i]["endDate"];
        var title = resultsArray[i]["title"];
        var description = resultsArray[i]["description"];
        var projectid = resultsArray[i]["id"];
        $("#searchResults").append("<tr><td><form><h4 style=\"margin-left:20px\" id=\"Title\"><a href=\"#\" onclick=\"viewProject('" + projectid + "')\">" + title + "</a></h4><p style=\"margin-left:20px\" id=\"startDate\"><i>Date Posted: " + startDate + "</i></p><p style=\"margin-left:20px\" id=\"endDate\"><i>Date Expires: " + endDate + "</i></p><p style=\"margin-left:20px\">Description:</p><textarea name=\"description\" title=\"Description\" style=\"width: 900px; height: 86px; margin-left:20px; resize:none\" maxlength=\"512\" id=\"description\" readonly>" + description + "</textarea></form></td></tr><td><h5 style=\"margin-left:10px\"><font size=\"4\" style=\"color:green;\">Approved</font></h5></td>");
    }
}

function addSearchResults(resultsArray)
{
    //$("#searchResults").empty();
    if(resultsArray.length == 0){
         $("#searchResults").append("<tr><td><h3>Sorry, no results found<h3></td></tr>")
    }

    for( var i = 0; i < resultsArray.length; i++){
        var startDate = resultsArray[i]["startDate"];
        var endDate = resultsArray[i]["endDate"];
        var title = resultsArray[i]["title"];
        var description = resultsArray[i]["description"];
        var projectid = resultsArray[i]["id"];
        $("#searchResults").append("<tr><td><form><h4 style=\"margin-left:20px\" id=\"Title\"><a href=\"#\" onclick=\"viewProject('" + projectid + "')\">" + title + "</a></h4><p style=\"margin-left:20px\" id=\"startDate\"><i>Date Posted: " + startDate + "</i></p><p style=\"margin-left:20px\" id=\"endDate\"><i>Date Expires: " + endDate + "</i></p><p style=\"margin-left:20px\">Description:</p><textarea name=\"description\" title=\"Description\" style=\"width: 900px; height: 86px; margin-left:20px; resize:none\" maxlength=\"512\" id=\"description\" readonly>" + description + "</textarea></form></td></tr>");
    }
}

function moveToSearchPage(subject, term)
{
    createCookie("searchSubject",subject,5);
    createCookie("searchTerm",term,5);
    window.location = "searchResults.html";
}

function getSearchResults(subject, term)
{
    var parameters;

    if(term == ""){

        parameters = {
            "query" :  subject,
        };
    }

    else{
        
        parameters = {
            "query" :  term,
            "school":  null,
            "teacher": null,
            "title" :  null,
            "subject": subject
        };
    }

    var requestObject = {
        "key" : "123kidtribute",
        "functionName" : "GetAllProjectsWhere",
        "parameters" :  parameters,
    };

    var request = $.ajax({
        dataType: "json",
        method: "POST",
        url: "retrieval.php",
        data: requestObject,
        }
    );
    request.done(function (response, textStatus, jqXHR){
        console.log(response);
        addSearchResults(response["results"]);
        eraseCookie("searchSubject");
        eraseCookie("searchTerm");
    });
    request.fail(function (jqXHR, textStatus, errorThrown){
        // log the error to the console
        alert(
            "The following error occured: " + jqXHR.responseText + textStatus + errorThrown
        );
        eraseCookie("searchSubject");
        eraseCookie("searchTerm");
    });
}
