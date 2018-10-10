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

        $courseid = optional_param('courseid','', PARAM_INT);
        $userid = required_param('userid',  PARAM_INT);
        $modtype = optional_param('modype', '', PARAM_TEXT);  
        $modname = optional_param('modname', '', PARAM_TEXT);

        $context = context_course::instance($courseid);

        // trigger event
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
