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

echo "<form method=\"post\" action=\"save.php\" id=\"kmgoogleform\">";
echo '<div>';
echo "<input type=\"hidden\" name=\"id\" value=\"$id\" />";
echo "<input type=\"hidden\" name=\"sesskey\" value=\"".sesskey()."\" />";

echo $OUTPUT->box(format_module_intro('kmgoogle', $kmgoogle, $cm->id), 'generalbox boxaligncenter bowidthnormal', 'intro');
echo '<div>'. get_string('linktoworkhim', 'kmgoogle'). '</div>';

// Get link of google drive.
//If iframe
if($kmgoogle->ififrame){
    $iframewidth = '';
    $iframeheight = '';
    if($kmgoogle->iframewidth != 0 && $kmgoogle->iframewidth <= 600 && $kmgoogle->iframeheight != 0 && $kmgoogle->iframeheight <= 600){
        $iframewidth = ' width:'.$kmgoogle->iframewidth.'; ';
        $iframeheight = ' height:'.$kmgoogle->iframeheight.'; ';
    }

    echo '<iframe style="'.$iframewidth.$iframeheight.'">'.$kmgoogle->copiedgoogleurl.'</iframe>';
}

//If link
if(!$kmgoogle->ififrame){
    $blank = '';
    if(!$kmgoogle->targetiframe){
        $blank = ' target="_blank" ';
    }

    echo '<a href="'.$kmgoogle->copiedgoogleurl.'" '.$blank.'>'.get_string('url').'</a>';
}


if(user_can_answer($cm->instance)){
//$PAGE->requires->js_call_amd('mod_kmgoogle/validation', 'ensureRadiosChosen', array('kmgoogleform'));

    echo '<br />';
    echo '<br />';
    echo '<input type="submit" class="btn btn-primary" value="'.get_string("answer").'" />';
    echo '</div>';
    echo "</form>";
    echo $OUTPUT->footer();
    exit;
}

echo '</div>';
echo "</form>";
echo $OUTPUT->footer();





















exit;




// Check the kmgoogle hasn't already been filled out.
$kmgooglealreadydone = kmgoogle_already_done($kmgoogle->id, $USER->id);
if ($kmgooglealreadydone) {
    // Trigger course_module_viewed event and completion.
    kmgoogle_view($kmgoogle, $course, $cm, $context, 'graph');
} else {
    kmgoogle_view($kmgoogle, $course, $cm, $context, 'form');
}

$strkmgoogle = get_string("modulename", "kmgoogle");
$PAGE->set_title($kmgoogle->name);
$PAGE->set_heading($course->fullname);
echo $OUTPUT->header();
echo $OUTPUT->heading($kmgoogle->name);

// Check to see if groups are being used in this kmgoogle.
if ($groupmode = groups_get_activity_groupmode($cm)) {   // Groups are being used.
    $currentgroup = groups_get_activity_group($cm);
} else {
    $currentgroup = 0;
}
$groupingid = $cm->groupingid;

if (has_capability('mod/kmgoogle:readresponses', $context) or ($groupmode == VISIBLEGROUPS)) {
    $currentgroup = 0;
}

if (has_capability('mod/kmgoogle:readresponses', $context)) {
    $numusers = kmgoogle_count_responses($kmgoogle->id, $currentgroup, $groupingid);
    echo "<div class=\"reportlink\"><a href=\"report.php?id=$cm->id\">".
          get_string("viewkmgoogleresponses", "kmgoogle", $numusers)."</a></div>";
} else if (!$cm->visible) {
    notice(get_string("activityiscurrentlyhidden"));
}

if (!is_enrolled($context)) {
    echo $OUTPUT->notification(get_string("guestsnotallowed", "kmgoogle"));
}

if ($kmgooglealreadydone) {

    $numusers = kmgoogle_count_responses($kmgoogle->id, $currentgroup, $groupingid);

    if ($showscales) {
        // Ensure that graph.php will allow the user to see the graph.
        if (has_capability('mod/kmgoogle:readresponses', $context) || !$groupmode || groups_is_member($currentgroup)) {

            echo $OUTPUT->box(get_string("kmgooglecompleted", "kmgoogle"));
            echo $OUTPUT->box(get_string("peoplecompleted", "kmgoogle", $numusers));

            echo '<div class="resultgraph">';
            kmgoogle_print_graph("id=$cm->id&amp;sid=$USER->id&amp;group=$currentgroup&amp;type=student.png");
            echo '</div>';
        } else {
            echo $OUTPUT->box(get_string("kmgooglecompletednograph", "kmgoogle"));
            echo $OUTPUT->box(get_string("peoplecompleted", "kmgoogle", $numusers));
        }

    } else {

        echo $OUTPUT->box(format_module_intro('kmgoogle', $kmgoogle, $cm->id), 'generalbox', 'intro');
        echo $OUTPUT->spacer(array('height' => 30, 'width' => 1), true);  // Should be done with CSS instead.

        $questions = kmgoogle_get_questions($kmgoogle);
        foreach ($questions as $question) {

            if ($question->type == 0 or $question->type == 1) {
                if ($answer = kmgoogle_get_user_answer($kmgoogle->id, $question->id, $USER->id)) {
                    $table = new html_table();
                    $table->head = array(get_string($question->text, "kmgoogle"));
                    $table->align = array ("left");
                    $table->data[] = array(s($answer->answer1));// No html here, just plain text.
                    echo html_writer::table($table);
                    echo $OUTPUT->spacer(array('height' => 30, 'width' => 1), true);
                }
            }
        }
    }

    echo $OUTPUT->footer();
    exit;
}

echo "<form method=\"post\" action=\"save.php\" id=\"kmgoogleform\">";
echo '<div>';
echo "<input type=\"hidden\" name=\"id\" value=\"$id\" />";
echo "<input type=\"hidden\" name=\"sesskey\" value=\"".sesskey()."\" />";

echo $OUTPUT->box(format_module_intro('kmgoogle', $kmgoogle, $cm->id), 'generalbox boxaligncenter bowidthnormal', 'intro');
echo '<div>'. get_string('allquestionrequireanswer', 'kmgoogle'). '</div>';

// Get all the major questions in order.
$questions = kmgoogle_get_questions($kmgoogle);

global $qnum;  // TODO: ugly globals hack for kmgoogle_print_*().
$qnum = 0;
foreach ($questions as $question) {

    if ($question->type >= 0) {

        $question = kmgoogle_translate_question($question);

        if ($question->multi) {
            kmgoogle_print_multi($question);
        } else {
            kmgoogle_print_single($question);
        }
    }
}

if (!is_enrolled($context)) {
    echo '</div>';
    echo "</form>";
    echo $OUTPUT->footer();
    exit;
}

$PAGE->requires->js_call_amd('mod_kmgoogle/validation', 'ensureRadiosChosen', array('kmgoogleform'));

echo '<br />';
echo '<input type="submit" class="btn btn-primary" value="'.get_string("clicktocontinue", "kmgoogle").'" />';
echo '</div>';
echo "</form>";

echo $OUTPUT->footer();


