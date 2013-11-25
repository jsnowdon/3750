<?php

include_once dirname(__FILE__) . '/controllers/ProjectController.php';
include_once dirname(__FILE__) . '/controllers/SearchController.php';
include_once dirname(__FILE__) . '/controllers/UserController.php';

include_once dirname(__FILE__) . '/RequestObjects/ProjectRequestObject.php';
include_once dirname(__FILE__) . '/RequestObjects/UserRequestObject.php';

//to handle POST or PUTS looks at the following link: http://www.lornajane.net/posts/2008/accessing-incoming-put-data-from-php
//I am using GETS for now to make this more easily tested via the browser.


if($_GET['key'] != "123kidtribute") {
	echo 'key is bad!';
	return;
}

$function_name = $_GET['functionName'];
$parameters = $_GET['parameters'];
switch ($function_name)
{
	case "Login":
		Login($parameters);
		break;
	
	case "GetUser":
		GetUser($parameters);
		break;
	
	case "CreateUser":
		CreateUser($parameters);
		break;
		
	case "GetProject":
		GetProject($parameters);
		break;
	
	case "CreateProject":
		CreateProject($parameters);
		break;
	
	case "UpdateProject":
		UpdateProject($parameters);
		break;
		
	case "AddCommMember":
		AddCommMember($parameters);
		break;
	
	case "ApproveProject":
		ApproveProject($parameters);
		break;
	
	case "RejectProject":
		RejectProject($parameters);
		break;
	
	case "GetAllUnapprovedProjects":
		GetAllUnapprovedProjects($parameters);
		break;
	
	case "GetAllProjectsForTeacher":
		GetAllProjectsForTeacher($parameters);
		break;
	
	case "GetAllProjectsForPrincipal":
		GetAllProjectsForPrincipal($parameters);
		break;
	
	case "GetAllProjectsForCommunityMember":
		GetAllProjectsForCommunityMember($parameters);
		break;
	
	case "GetAllProjectsWhere":
		GetAllProjectsWhere($parameters);
		break;
	
	case "VetCommunityMember":
		VetCommunityMember($parameters);
		break;
	
	case "GetSchool":
		GetSchool($parameters);
		break;
	
	case "GetAllSchools":
		GetAllSchools($parameters);
		break;
	
	case "GetProjectMembers":
		GetProjectMembers($parameters);
		break;
	
	case "UpdateUser":
		UpdateUser($parameters);
		break;
	
	default:
		echo "Function not found";
}

function Login($parameters)
{
	controller_Login($parameters["username"], $parameters['password']);
}

function GetUser($parameters)
{
	controller_GetUser($parameters->userId);
}

function CreateUser($parameters)
{
	$school_id = $parameters["school_id"];
	$userType = $parameters["userType"];
	$email = $parameters["email"];
	$password = $parameters["password"];
	$name = $parameters["name"];
	$title = $parameters["title"];
	$skills = $parameters["skills"];
	$isVetted = $parameters["isVetted"];
	$bio = $parameters["bio"];
	$associatedProjects = $parameters["associatedProjects"];
	$imageUrl = $parameters["imageUrl"];
    $username = $parameters["username"];
	$userObject = new userRequest(null, $school, $userType, $email, $password, $name, $title, $skills, $isVetted, $bio, $associatedProjects, $imageUrl, $username);
	controller_CreateUser($userObject);
}

function GetProject($parameters)
{
	controller_GetProject($parameters["projectId"]);
}

function CreateProject($parameters)
{
    $school_id = $parameters["schoolId"];
    $teacher_id = $parameters["userId"];
    $title = $parameters["title"];
    $description = $parameters["description"];
	$startDate = $parameters["startDate"];
    $endDate = $parameters["endDate"];
    $imageUrl = $parameters["imageUrl"];
    $user_email = $parameters["userEmail"];
    $category = $parameters["category"];
	$projectObject = new projectRequest(null, $school_id, $teacher_id, $title, $description, $startDate, $endDate, $imageUrl, $user_email, $category);
	controller_CreateProject($projectObject);
}

function UpdateProject($parameters)
{
    $project_id = $parameters->id;
    $school_id = $parameters->schoolId;
    $teacher_id = $parameters->userId;
    $title = $parameters->title;
    $description = $parameters->description;
	$startDate = $parameters->startDate;
    $endDate = $parameters->endDate;
    $imageUrl = $parameters->imageUrl;
    $user_email = $parameters->category;
    $category = $parameters->userEmail;
	$projectObject = new projectRequest($project_id, $school_id, $teacher_id, $title, $description, $startDate, $endDate, $imageUrl, $user_email, $category);
	controller_UpdateProject($projectObject);
}

function AddCommMember($parameters)
{
	controller_AddCommMember($parameters->projectId, $parameters->userId);
}

function ApproveProject($parameters)
{
	controller_ApproveProject($parameters->projectId);
}

function RejectProject($parameters)
{
	controller_RejectProject($parameters->projectId);
}

function GetAllUnapprovedProjects($parameters)
{
	controller_GetAllUnapprovedProjects($parameters->principalId);
}

function GetAllProjectsForTeacher($parameters)
{
	controller_GetAllProjectsForTeacher($parameters['teacherId']);
}

function GetAllProjectsForPrincipal($parameters)
{
	controller_GetAllProjectsForPrincipal($parameters['principalId']);
}

function GetAllProjectsForCommunityMember($parameters)
{
	controller_GetAllProjectsForCommunityMember($parameters->communityMemberId);
}

function GetAllProjectsWhere($parameters)
{
	/*
	if (isset($parameters["school"]))
	{
		$school = $parameters["school"];
	}
	else
	{
		$school = null;
	}
	if (isset($parameters["teacher"]))
	{
		$teacher = $parameters["teacher"];
	}
	else
	{
		$teacher = null;
	}
	if (isset($parameters["title"]))
	{
		$title = $parameters["title"];
	}
	else
	{
		$title = null;
	}
	if (isset($parameters["subject"]))
	{
		$subject = $parameters["subject"];
	}
	else
	{
		$subject = null;
	} */	
	controller_GetAllProjectsWhere($parameters["query"], null, null, null, null);
}

function VetCommunityMember($parameters)
{
	controller_VetCommunityMember($parameters->communityMemberID);
}

function GetSchool($parameters)
{
	controller_GetSchool($parameters["schoolId"]);
}

function GetAllSchools($parameters)
{
	controller_GetAllSchools($parameters["schoolBoardId"]);
}

function GetProjectMembers($parameters)
{
	controller_GetProjectMembers($parameters->projectId);
}

function UpdateUser($parameters)
{
    $id = $parameters->id;
	$school = $parameters->schoolId;
	$userType = $parameters->userType;
	$email = $parameters->email;
	$password = $parameters->password;
	$name = $parameters->name;
	$title = $parameters->title;
	$skills = $parameters->skills;
	$isVetted = $parameters->isVetted;
	$bio = $parameters->bio;
	$associatedProjects = $parameters->associatedProjects;
	$imageUrl = $parameters->imageUrl;
    $username = $parameters->username;
	$userObject = new userRequest($id, $school, $userType, $email, $password, $name, $title, $skills, $isVetted, $bio, $associatedProjects, $imageUrl, $username);
	controller_UpdateUser($userObject);
}

function BuildResponse($status, $statusMessage, $errors, $results)
{
	$response = 
	array("status"=>$status,"statusMessage"=>$statusMessage,
		  "errors"=>$errors,"results"=>$results);
	echo json_encode($response);
}


?>