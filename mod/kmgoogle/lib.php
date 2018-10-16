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
 * @package   mod_kmgoogle
 * @copyright 1999 onwards Martin Dougiamas  {@link http://moodle.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Graph size
 * @global int $kmgoogle_GHEIGHT
 */

// STANDARD FUNCTIONS ////////////////////////////////////////////////////////
/**
 * Given an object containing all the necessary data,
 * (defined by the form in mod_form.php) this function
 * will create a new instance and return the id number
 * of the new instance.
 *
 * @global object
 * @param object $kmgoogle
 * @return int|bool
 */

require_once ($CFG->dirroot.'/mod/kmgoogle/modlib.php');

function kmgoogle_add_instance($kmgoogle) {
    global $DB, $COURSE;

    if(!kmgoogle_if_url_google($kmgoogle->sourcegoogleurl)){
        return 0;
    }

    $newurl = kmgoogle_copy_google_url($kmgoogle);
    if(!$newurl){
        return 0;
    }

    //Set permissions
    $roles = kmgoogle_get_roles();
    $permission = array();
    foreach($roles as $name){
        if(isset($kmgoogle->$name)){
            $permission[$name] = $kmgoogle->$name;
        }
    }

    //Checkbox
    if(!isset($kmgoogle->ififrame)){$kmgoogle->ififrame = 0;}
    if(!isset($kmgoogle->sendtoteacher)){$kmgoogle->sendtoteacher = 0;}

    $kmgoogle->firstfolder = $COURSE->fullname;
    $kmgoogle->copiedgoogleurl = $newurl;
    $kmgoogle->permissions = json_encode($permission);
    $kmgoogle->timecreated  = time();
    $kmgoogle->timemodified = time();

    $id = $DB->insert_record("kmgoogle", $kmgoogle);

    //$completiontimeexpected = !empty($kmgoogle->completionexpected) ? $kmgoogle->completionexpected : null;
    //\core_completion\api::update_completion_date_event($kmgoogle->coursemodule, 'kmgoogle', $id, $completiontimeexpected);

    return $id;
}

/**
 * Given an object containing all the necessary data,
 * (defined by the form in mod_form.php) this function
 * will update an existing instance with new data.
 *
 * @global object
 * @param object $kmgoogle
 * @return bool
 */
function kmgoogle_update_instance($kmgoogle) {
    global $DB;

    if (!$row = $DB->get_record("kmgoogle", array("id"=>$kmgoogle->instance))) {
        return 0;
    }

    if(!kmgoogle_if_url_google($kmgoogle->sourcegoogleurl)){
        return 0;
    }

    //Set permissions
    $roles = kmgoogle_get_roles();
    $permission = array();
    foreach($roles as $name){
        if(isset($kmgoogle->$name)){
            $permission[$name] = $kmgoogle->$name;
        }
    }

    //Checkbox
    if(!isset($kmgoogle->ififrame)){$kmgoogle->ififrame = 0;}
    if(!isset($kmgoogle->sendtoteacher)){$kmgoogle->sendtoteacher = 0;}

    if($row->sourcegoogleurl != $kmgoogle->sourcegoogleurl || $row->googlefolderurl != $kmgoogle->googlefolderurl || $row->namefile != $kmgoogle->namefile){
        $newurl = kmgoogle_update_google_url($kmgoogle, $row);

        //Delete all fields in
        $DB->delete_records('kmgoogle_permission');

        if(!$newurl){
            return 0;
        }
        $kmgoogle->copiedgoogleurl = $newurl;
    }

    $kmgoogle->permissions = json_encode($permission);
    $kmgoogle->id = $kmgoogle->instance;
    $kmgoogle->timemodified = time();

//    $completiontimeexpected = !empty($kmgoogle->completionexpected) ? $kmgoogle->completionexpected : null;
//    \core_completion\api::update_completion_date_event($kmgoogle->coursemodule, 'kmgoogle', $kmgoogle->id, $completiontimeexpected);

    return $DB->update_record("kmgoogle", $kmgoogle);
}

/**
 * Given an ID of an instance of this module,
 * this function will permanently delete the instance
 * and any data that depends on it.
 *
 * @global object
 * @param int $id
 * @return bool
 */
function kmgoogle_delete_instance($id) {
    global $DB;

    if (! $kmgoogle = $DB->get_record("kmgoogle", array("id"=>$id))) {
        return false;
    }

    $result = true;

    if (! $DB->delete_records("kmgoogle", array("id"=>$kmgoogle->id))) {
        $result = false;
    }

    if (! $DB->delete_records("kmgoogle_permission", array("instanceid"=>$kmgoogle->id))) {
        $result = false;
    }

    if (! $DB->delete_records("kmgoogle_answers", array("instanceid"=>$kmgoogle->id))) {
        $result = false;
    }

    return $result;
}

/**
 * @global object
 * @param object $course
 * @param object $user
 * @param object $mod
 * @param object $kmgoogle
 * @return $result
 */
function kmgoogle_user_outline($course, $user, $mod, $kmgoogle) {
    global $DB;

//    if ($answers = $DB->get_records("kmgoogle_answers", array('kmgoogle'=>$kmgoogle->id, 'userid'=>$user->id))) {
//        $lastanswer = array_pop($answers);
//
//        $result = new stdClass();
//        $result->info = get_string("done", "kmgoogle");
//        $result->time = $lastanswer->time;
//        return $result;
//    }
    return NULL;
}

function kmgoogle_extend_settings_navigation($settings, $surveynode) {
    global $PAGE;

    if (has_capability('mod/kmgoogle:readresponses', $PAGE->cm->context)) {
        $url = new moodle_url('/mod/kmgoogle/report.php', array('id' => $PAGE->cm->id));

//        $responsesnode = $surveynode->add(get_string("responsereports", "survey"));
//        $responsesnode->add(get_string("summary", "kmgoogle"), $url);

        $surveynode->add(get_string("summary", "kmgoogle"), $url);
    }
}

function kmgoogle_supports($feature) {
    switch($feature) {
        case FEATURE_BACKUP_MOODLE2: return true;
        default:
            return null;
    }
}

function mod_kmgoogle_comment_validate($comment_param) {
    if ($comment_param->commentarea != 'report_comments') {
        throw new comment_exception('invalidcommentarea');
    }
    if ($comment_param->itemid != 0) {
        throw new comment_exception('invalidcommentitemid');
    }
    return true;
}

function mod_kmgoogle_comment_permissions($args) {
    return array('post'=>true, 'view'=>true);
}

function mod_kmgoogle_comment_display($comments, $args) {
    if ($args->commentarea != 'report_comments') {
        throw new comment_exception('invalidcommentarea');
    }
    if ($args->itemid != 0) {
        throw new comment_exception('invalidcommentitemid');
    }
    return $comments;
}