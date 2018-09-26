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
 * Plugin version and other meta-data are defined here.
 *
 * @package     local_storylinedata
 * @copyright   2018 Devlion Team
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__.'/../../config.php');
global $DB;

// catching exceptions from moodle while reading params instead of getting standard error in HTML
try {
    // Fetch POST data
    $token = required_param('token', PARAM_ALPHANUMEXT);
    $courseid = required_param('courseid', PARAM_INT);
    $action = required_param('action', PARAM_ALPHANUMEXT);
    $userid = optional_param('userid', '', PARAM_INT);
    $cmid = optional_param('cmid', '', PARAM_INT);
    $value = optional_param('value', '', PARAM_ALPHANUMEXT);
    $data = optional_param('data', '', PARAM_RAW);
} catch (moodle_exception $e) {
    // need to provide correct errror code here
    $answer_err = array('code' => 1, 'msg' => $e->getMessage());
    echo json_encode($answer_err);
    exit();
}

// check for correct token hardcoded - '123456'
if ($token != 'df3k4ogers') {
    $answer_err = array('code' => 0, 'msg' => 'Invalid token');
    echo json_encode($answer_err);
    exit();
}

$record = new stdClass();
$record->courseid = $courseid;
$record->userid = $userid;
$record->cmid = $cmid;
$record->value = $value;
if ($data) {
    $record->data = json_encode($data);
}
$record->timecreated = time();

// define switch operator on action fileld. No functions right now
switch ($action) {
    case "saveavatar":

        $record->action = 'avatar';
        $DB->insert_record('local_storylinedata', $record);
        $answer_ok = array('code' => 1, 'msg' => 'Success','value'=>$avatar[0]->value);
        echo json_encode($answer_ok);
        break;
    case "savestars":
        $record->action = 'stars';
        $DB->insert_record('local_storylinedata', $record);
        $answer_ok = array('code' => 1, 'msg' => 'Success','value'=>$avatar[0]->value);
        echo json_encode($answer_ok);
        break;
    case "saveanswer":
        $record->action = 'answer';
        $DB->insert_record('local_storylinedata', $record);
        $answer_ok = array('code' => 1, 'msg' => 'Success','value'=>$avatar[0]->value);
        echo json_encode($answer_ok);
        break;
    case "getavatar":

        $records = $DB->get_records('local_storylinedata', array('cmid' => $cmid,'userid' => $userid,'courseid' => $courseid, 'action' => 'avatar'),'timecreated DESC');
        if (!empty($records)){
            $raw=reset($records);
            $answer_ok = array('code' => 1, 'msg' => 'Success','value'=>$raw->value,'data'=>$raw->data);
            echo json_encode($answer_ok);
        }else{
            $answer_ok = array('code' => 0, 'msg' => 'No Records','value'=>'');
            echo json_encode($answer_ok);
        }

        break;
    case "getstars":

        $records = $DB->get_records('local_storylinedata', array('cmid' => $cmid,'userid' => $userid,'courseid' => $courseid, 'action' => 'stars'),'timecreated DESC');
        if (!empty($records)){
            $raw=reset($records);
            $answer_ok = array('code' => 1, 'msg' => 'Success','value'=>$raw->value,'data'=>$raw->data);
            echo json_encode($answer_ok);
        }else{
            $answer_ok = array('code' => 0, 'msg' => 'No Records','value'=>'');
            echo json_encode($answer_ok);
        }


        break;
    case "getanswer":

        $records = $DB->get_records('local_storylinedata', array('cmid' => $cmid,'userid' => $userid,'courseid' => $courseid, 'action' => 'answer'),'timecreated DESC');
        if (!empty($records)){
            $raw=reset($records);
            $answer_ok = array('code' => 1, 'msg' => 'Success','value'=>$raw->value,'data'=>$raw->data);
            echo json_encode($answer_ok);
        }else{
            $answer_ok = array('code' => 0, 'msg' => 'No Records','value'=>'');
            echo json_encode($answer_ok);
        }
        break;
    default:
        // send Success message to data sender
        $answer_ok = array('code' => 0, 'msg' => 'Wrong Parametters');
        echo json_encode($answer_ok);

}

?>