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
        $modype = optional_param('modype', '', PARAM_TEXT);
        $modname = optional_param('modname', '', PARAM_TEXT);

        // $jsondecoded = json_decode($events);
        if (isset($jsondecoded)) {
            // return course_get_format($courseid)->update_options_from_ajax($options);
        } else {
            return "no data or error in parsing";
        }
    }

}
