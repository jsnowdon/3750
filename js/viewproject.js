$(document).ready(function() {
    var loggedIn = readCookie("loggedin");
    if(loggedIn != null) {
        var name = readCookie("name");
        var email = readCookie("email");
        var schoolID = readCookie("schoolid");
        $("#nameField").val(name);
        $("#emailField").val(email);
        $("#schoolidField").val(schoolID);
    }
}