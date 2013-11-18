$(document).ready(function() {
    
    $('#searchingDropdown li a').click(function() {
        $("#dropdownBtn").text($(this).text());
    });
    
});