<?php
require_once($CFG->dirroot.'/course/format/lib.php');

class classAjax {

    private $method;

    public function __construct() {
        $this->method = required_param('method', PARAM_TEXT);
    }

    public function run()
    {
        //call ajax metod
        if(method_exists($this, $this->method)){
            $method = $this->method;
            return $this->$method();
        }else{
            return 'Wrong method';
        }
    }

    //get event on click
    private function geteventonclick() {
        global $CFG, $USER, $PAGE, $OUTPUT, $DB;

        $userid     = required_param('userid',  PARAM_INT);
        $courseid   = required_param('courseid', PARAM_INT);
        $section    = optional_param('sectionid', '', PARAM_INT);
        $cmid       = optional_param('cmid', '', PARAM_INT);
        $modtype    = optional_param('modtype', '', PARAM_TEXT);  
        $modname    = optional_param('modname', '', PARAM_TEXT);
        $context    = context_course::instance($courseid);

        // prepare new DB record
        $record             = new stdClass();
        $record->userid     = $userid;
        $record->courseid   = $courseid;
        $record->section    = $section;
        $record->cmid       = $cmid;

        // insert or update message
        if ($fbusid = $DB->get_record('format_buttons_userstate', array ('userid' => $userid, 'courseid' => $courseid))) {
            $record->id = $fbusid->id;
            $DB->update_record('format_buttons_userstate', $record);
        } else {
            $DB->insert_record('format_buttons_userstate', $record);
        }
        

        // trigger event, that label or section were viewed 
        $event = \format_buttons\event\log_label_clicked::create(array(
            'context' => $context,
            'userid' => $userid,
            'other' => array (
                'modtype' => $modtype,
                'modname' => $modname,
                'courseid' => $courseid
            )
        ))->trigger();
    }

}
