<?php
require_once("../../config.php");
require_once("lib.php");

global $GoogleDrive;

$id = required_param('id', PARAM_INT);    // Course Module ID.

if (! $cm = get_coursemodule_from_id('kmgoogle', $id)) {
    print_error('invalidcoursemodule');
}

if (! $course = $DB->get_record("course", array("id" => $cm->course))) {
    print_error('coursemisconf');
}

require_login($course, false, $cm);
$context = context_module::instance($cm->id);
require_capability('mod/kmgoogle:participate', $context);

if (! $kmgoogle = $DB->get_record("kmgoogle", array("id" => $cm->instance))) {
    print_error('invalidkmgoogleid', 'kmgoogle');
}

//Analize user permission
kmgoogle_analize_user_permission($id);

//Get permission of user
$permission = $DB->get_record("kmgoogle_permission", array("instanceid" => $kmgoogle->id, "userid" => $USER->id));
$permission = $permission->permission;

//No permission for user
if(no_permission_for_user($cm->instance)) {
    $PAGE->set_url('/mod/kmgoogle/source.php', array('id' => $id));
    $PAGE->set_title($kmgoogle->name);
    $PAGE->set_heading($course->fullname);

    echo $OUTPUT->header();
    echo $OUTPUT->heading($kmgoogle->name);
    echo '<div>' . get_string('nopermission', 'kmgoogle') . '</div>';
    echo $OUTPUT->footer();
    exit;
}

$copyFileId = $GoogleDrive->getFileIdFromGoogleUrl($kmgoogle->copiedgoogleurl);

switch ($GoogleDrive->typeOfFile($copyFileId)) {
    case 'folder':
        echo '<span><h1>'.$GoogleDrive->nameOfFile($copyFileId).'</h1></span>';
        echo '<br>';
        echo '<iframe src="https://drive.google.com/embeddedfolderview?id='.$copyFileId.'#list" width=100% height=100% align="left" frameborder="0"></iframe>';
        break;
    case 'presentation':
        if($permission == 'view'){
            $GoogleDrive->updateRevision($copyFileId, 1);
            echo '<iframe src="https://docs.google.com/presentation/d/'.$copyFileId.'/embed" width=100% height=100% align="left" frameborder="0"></iframe>';
        }else{
            echo '<iframe src="'.$kmgoogle->copiedgoogleurl.'" width=100% height=100% align="left" frameborder="0"></iframe>';
        }
        break;
    default:
        echo '<iframe src="'.$kmgoogle->copiedgoogleurl.'" width=100% height=100% align="left" frameborder="0"></iframe>';
}