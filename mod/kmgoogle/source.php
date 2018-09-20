<?php
require_once("../../config.php");
require_once("lib.php");

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

global $GoogleDrive;
$copyFileId = $GoogleDrive->getFileIdFromGoogleUrl($kmgoogle->copiedgoogleurl);
if($GoogleDrive->typeOfFile($copyFileId) == 'folder'){
    echo '<span><h1>'.$GoogleDrive->nameOfFile($copyFileId).'</h1></span>';
    echo '<br>';
    echo '<iframe src="https://drive.google.com/embeddedfolderview?id='.$copyFileId.'#list" width=100% height=100% align="left"></iframe>';
}else{
    echo '<iframe src="'.$kmgoogle->copiedgoogleurl.'" width=100% height=100% align="left"></iframe>';
}