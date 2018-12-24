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
 * This file is responsible for saving the results of a users survey and displaying
 * the final message.
 *
 * @package   mod_survey
 * @copyright 1999 onwards Martin Dougiamas  {@link http://moodle.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

    require_once('../../config.php');
    require_once('lib.php');


// Make sure this is a legitimate posting

    if (!$formdata = data_submitted() or !confirm_sesskey()) {
        print_error('cannotcallscript');
    }

    $id = required_param('id', PARAM_INT);    // Course Module ID
    $comment = required_param('comment', PARAM_TEXT);    // comment

    if (! $cm = get_coursemodule_from_id('kmgoogle', $id)) {
        print_error('invalidcoursemodule');
    }

    if (! $course = $DB->get_record("course", array("id"=>$cm->course))) {
        print_error('coursemisconf');
    }

//    if(no_permission_for_user($cm->instance)){
//        print_error('nopermission');
//    }

    if(!user_can_answer($cm->instance)){
        print_error('nopermission');
    }

    $PAGE->set_url('/mod/kmgoogle/save.php', array('id'=>$id));
    require_login($course, false, $cm);

    $context = context_module::instance($cm->id);
    require_capability('mod/kmgoogle:participate', $context);

    if (! $kmgoogle = $DB->get_record("kmgoogle", array("id"=>$cm->instance))) {
        print_error('invalidsurveyid', 'survey');
    }

    $strsurveysaved = get_string('kmgooglesaved', 'kmgoogle');

    $PAGE->set_title($strsurveysaved);
    $PAGE->set_heading($course->fullname);
    echo $OUTPUT->header();
    echo $OUTPUT->heading($kmgoogle->name);

    kmgoogle_save_answer($kmgoogle, $formdata, $course, $context, $comment);

    //Print the page and finish up.
    notice(get_string("thanksforanswers","kmgoogle"), "$CFG->wwwroot/course/view.php?id=$course->id");

    exit;



