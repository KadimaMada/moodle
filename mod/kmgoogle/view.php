<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * This file is responsible for displaying the kmgoogle
 *
 * @package   mod_kmgoogle
 * @copyright 1999 onwards Martin Dougiamas  {@link http://moodle.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once("../../config.php");
require_once("lib.php");

$id = required_param('id', PARAM_INT);    // Course Module ID.

if (! $cm = get_coursemodule_from_id('kmgoogle', $id)) {
    print_error('invalidcoursemodule');
}

if (! $course = $DB->get_record("course", array("id" => $cm->course))) {
    print_error('coursemisconf');
}

$PAGE->set_url('/mod/kmgoogle/view.php', array('id' => $id));
require_login($course, false, $cm);
$context = context_module::instance($cm->id);

require_capability('mod/kmgoogle:participate', $context);

if (! $kmgoogle = $DB->get_record("kmgoogle", array("id" => $cm->instance))) {
    print_error('invalidkmgoogleid', 'kmgoogle');
}

$PAGE->set_title($kmgoogle->name);
$PAGE->set_heading($course->fullname);
echo $OUTPUT->header();
echo $OUTPUT->heading($kmgoogle->name);

echo '<form method="post" action="save.php" id="kmgoogleform">';
echo '<div>';
echo '<input type="hidden" name="id" value="'.$id.'" />';
echo '<input type="hidden" name="sesskey" value="'.sesskey().'" />';

echo $OUTPUT->box(format_module_intro('kmgoogle', $kmgoogle, $cm->id), 'generalbox boxaligncenter bowidthnormal', 'intro');

//Analize user permission
kmgoogle_analize_user_permission($id);

//No permission for user
if(no_permission_for_user($cm->instance)) {
    echo '<div>' . get_string('nopermission', 'kmgoogle') . '</div>';
    echo $OUTPUT->footer();
    exit;
}

// Get link of google drive.

if(!empty(strip_tags($kmgoogle->buttonhtml))) {
    $buttonhtml = $kmgoogle->buttonhtml;
}else{
    $buttonhtml = '<center>'.get_string('linktoworkwithdocument', 'kmgoogle').'</center>';
}

//If iframe
if($kmgoogle->ififrame){
    $iframewidth = '';
    $iframeheight = '';
    if($kmgoogle->iframewidth != 0 && $kmgoogle->iframeheight != 0){
        $iframewidth = ' width='.$kmgoogle->iframewidth.'px ';
        $iframeheight = ' height='.$kmgoogle->iframeheight.'px ';
    }

    echo '<center><iframe '.$iframewidth.$iframeheight.' src="/mod/kmgoogle/source.php?id='.$id.'" allowfullscreen="true" frameborder="1" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe></center>';
    echo '<br>';

    if(in_array($kmgoogle->targetiframe, array(0, 1))) {
        $blank = '';
        if (!$kmgoogle->targetiframe) {
            $blank = ' target="_blank" ';
        }

        echo '<a href="/mod/kmgoogle/source.php?id=' . $id . '"' . $blank . '>' . $buttonhtml . '</a>';
    }

    if($kmgoogle->targetiframe == 2) {
        $onclick_popup = "window.open('".$CFG->wwwroot."/mod/kmgoogle/source.php?id=".$id."','popup','width=600,height=600'); return false;";
        echo '<a href="#" target="popup" onclick="'.$onclick_popup.'">'.$buttonhtml.'</a>';
    }

}

//If link
if(!$kmgoogle->ififrame){

    if(in_array($kmgoogle->targetiframe, array(0, 1))) {
        $blank = '';
        if (!$kmgoogle->targetiframe) {
            $blank = ' target="_blank" ';
        }

        echo '<a href="/mod/kmgoogle/source.php?id=' . $id . '"' . $blank . '>' . $buttonhtml . '</a>';
    }

    if($kmgoogle->targetiframe == 2) {
        $onclick_popup = "window.open('".$CFG->wwwroot."/mod/kmgoogle/source.php?id=".$id."','popup','width=600,height=600'); return false;";
        echo '<a href="#" target="popup" onclick="'.$onclick_popup.'">'.$buttonhtml.'</a>';
    }
}

if(user_can_answer($cm->instance)){

    $templatecontext = kmgoogle_data_for_student($kmgoogle);
    echo $OUTPUT->render_from_template('mod_kmgoogle/student-info', $templatecontext);

    echo '<center><input type="submit" class="btn btn-primary" value="'.get_string("answer", 'kmgoogle').'" /></center>';
    echo '</div>';
    echo "</form>";
    echo $OUTPUT->footer();
    exit;
}

if(if_user_admin_teacher()){
    echo '<br />';
    echo '<br />';
    echo '<center><a href="'.$CFG->wwwroot.'/mod/kmgoogle/report.php?id='.$id.'" class="btn btn-primary">'.get_string("to_view", 'kmgoogle').'</a></center>';
    echo '</div>';
    echo "</form>";
    echo $OUTPUT->footer();
    exit;
}

echo '</div>';
echo "</form>";
echo $OUTPUT->footer();

//$PAGE->requires->js_call_amd('mod_kmgoogle/validation', 'ensureRadiosChosen', array('kmgoogleform'));