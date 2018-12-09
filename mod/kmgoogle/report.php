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
    require "$CFG->libdir/tablelib.php";
    require_once ($CFG->dirroot.'/mod/kmgoogle/classes/comment.php');

/**
 * Test table class to be put in test_table.php of root of Moodle installation.
 *  for defining some custom column names and proccessing
 * Username and Password feilds using custom and other column methods.
 */
class report_table extends table_sql {

    /**
     * Constructor
     * @param int $uniqueid all tables have to have a unique id, this is used
     *      as a key when storing table properties like sort order in the session.
     */
    function __construct($uniqueid) {
        parent::__construct($uniqueid);
        // Define the list of columns to show.
        $columns = array();
        if (!$this->is_downloading()) {
            $columns[] = 'picture';
        }
        $columns[] = 'username';
        $columns[] = 'relation';
        $columns[] = 'activityname';
        $columns[] = 'url';
        $columns[] = 'counter';
        $columns[] = 'comment';
        $columns[] = 'timecreated';
        $this->define_columns($columns);

        //Define the titles of columns to show in header.
        $headers = array();
        if (!$this->is_downloading()) {
            $headers[] = get_string('user_image', 'kmgoogle');
        }
        $headers[] = get_string('first_last_name', 'kmgoogle');
        $headers[] = get_string('relation', 'kmgoogle');
        $headers[] = get_string('activityname', 'kmgoogle');
        $headers[] = get_string('url_google_drive', 'kmgoogle');
        $headers[] = get_string('experience_number', 'kmgoogle');
        $headers[] = get_string('comments');
        $headers[] = get_string('submitted_on', 'kmgoogle');
        $this->define_headers($headers);

        $this->no_sorting('picture');
        $this->no_sorting('relation');
        $this->no_sorting('url');
        $this->no_sorting('comment');
    }

    /**
     * This function is called for each data row to allow processing of the
     * username value.
     *
     * @param object $values Contains object with all the values of record.
     * @return $string Return username with link to profile or username only
     *     when downloading.
     */

    function col_picture($values) {
        global $DB, $OUTPUT;

        if (!$this->is_downloading()) {
            $user = $DB->get_record("user", array('id' => $values->userid));
            return $OUTPUT->user_picture($user, array('popup'=>true));
        }

    }

    function col_relation($values) {
        global $DB, $COURSE;
        $kmgoogle = $DB->get_record("kmgoogle", array('id' => $values->instanceid));

        if($kmgoogle->association == 'course'){
            $obj = get_course($kmgoogle->course);
            $result = $obj->shortname.' ('.get_string('course').')';
        }

        if($kmgoogle->association == 'group'){
            $obj = kmgoogle_get_groups_on_course($kmgoogle->course);
            $result = $obj[$kmgoogle->associationname].' ('.get_string('group').')';
        }

        if($kmgoogle->association == 'collection' ){
            $obj = kmgoogle_get_collections_on_course($kmgoogle->course);
            $result = $obj[$kmgoogle->associationname].' ('.get_string('collection', 'kmgoogle').')';
        }

        return $result;
    }

    function col_url($values) {
        global $DB;

        if ($this->is_downloading()) {
            return $values->url;
        } else {
            return '<a target="__blank" href="'.$values->url.'">'.$values->url.'</a>';
        }
    }

    function col_comment($values) {
        global $DB, $PAGE;

        $kmgoogle = $DB->get_record("kmgoogle", array('id' => $values->instanceid));

        $cmcontext = \context_module::instance($kmgoogle->id);

        $args = new stdClass;
        $args->context   =  $cmcontext;
        $args->area      = 'report_comments';
        //$args->client_id = $values->id;
        $args->special_id = $values->id;
        $args->itemid    = 0;
        $args->component = 'mod_kmgoogle';
        $args->linktext  = get_string('showcomments');
        $args->notoggle  = false;
        $args->autostart = false;
        $args->displaycancel = false;

        $comment = new comment_kmgoogle($args);
        $comment->set_view_permission(true);
        $comment->set_fullwidth();

        return $comment->output(true);
    }

    function col_timecreated($values) {
        return date("Y-m-d H:i:s", $values->timecreated);
    }

    function other_cols($colname, $value) {
        // For security reasons we don't want to show the password hash.
//        if ($colname == 'password') {
//            return "****";
//        }
    }
}

//Initializate table

$id = required_param('id', PARAM_INT);    // Course Module ID.
$download = optional_param('download', '', PARAM_ALPHA);

if (! $cm = get_coursemodule_from_id('kmgoogle', $id)) {
    print_error('invalidcoursemodule');
}

if (! $course = $DB->get_record("course", array("id" => $cm->course))) {
    print_error('coursemisconf');
}

$PAGE->set_url('/mod/kmgoogle/report.php', array('id' => $id));
require_login($course, false, $cm);
$context = context_module::instance($cm->id);

require_capability('mod/kmgoogle:participate', $context);

if (! $kmgoogle = $DB->get_record("kmgoogle", array("id" => $cm->instance))) {
    print_error('invalidkmgoogleid', 'kmgoogle');
}

//$context = context_system::instance();
//$PAGE->set_context($context);
$PAGE->set_url('/mod/kmgoogle/report.php');

$table = new report_table('uniqueid');
$table->is_downloading($download, 'report', 'report');

if (!$table->is_downloading()) {
    // Only print headers if not asked to download data.
    // Print the page header.
    $PAGE->set_title(get_string('report'));
    $PAGE->set_heading(get_string('report'));
    $PAGE->navbar->add(get_string('report'), new moodle_url('/mod/kmgoogle/report.php', array('id' => $id)));
    echo $OUTPUT->header();
    echo $OUTPUT->heading($kmgoogle->name);

    //If student needed click
//    if($kmgoogle->studenttoclick) {
//        echo get_string("Date_of_last_submission", "kmgoogle");
//
//        echo '<form method="post" action="report.php?id=' . $id . '" id="kmgoogleform">';
//        echo '<div>';
//        echo '<input type="hidden" name="id" value="' . $id . '" />';
//        echo '<input type="hidden" name="sesskey" value="' . sesskey() . '" />';
//
//        echo kmgoogle_build_datetime_block($kmgoogle);
//
//        echo '</div>';
//        echo "</form>";
//    }

}


//Work out the sql for the table.
switch ($kmgoogle->natureofserving) {
    case 0:
        $where = ' GROUP BY instanceid, userid ';
        break;
    case 1:
        $where = ' WHERE instanceid='.$cm->instance.' GROUP BY userid ';
        break;
    default:
        $where = ' WHERE instanceid='.$cm->instance.' GROUP BY userid ';
}

$fields = '*';
$from = '
(SELECT * FROM
    (
        SELECT ka.* , CONCAT(u.firstname," ",u.lastname) AS username , k.name AS activityname
        FROM mdl_kmgoogle_answers AS ka
        LEFT JOIN mdl_user AS u ON(u.id=ka.userid)
        LEFT JOIN mdl_kmgoogle AS k ON(k.id=ka.instanceid)
        ORDER BY timecreated ASC
    ) AS answers
    '.$where.'
) AS groups
';

$table->set_sql($fields, $from, 'id');

$table->define_baseurl("$CFG->wwwroot/mod/kmgoogle/report.php?id=$id");

$table->out(10, true);

if (!$table->is_downloading()) {
    echo $OUTPUT->footer();
}