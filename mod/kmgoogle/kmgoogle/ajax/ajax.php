<?php

require_once(__DIR__.'/../../../config.php');
require_once ($CFG->dirroot.'/mod/kmgoogle/modlib.php');

if (!defined('AJAX_SCRIPT')) {
    define('AJAX_SCRIPT', true);
}

require_login();

$context = context_system::instance();
$PAGE->set_context($context);

require_sesskey();
$type = required_param('type', PARAM_RAW);
$courseid = required_param('courseid', PARAM_INT);
$instance = required_param('instance', PARAM_INT);

$obj = $DB->get_record('kmgoogle', array('id' => $instance));

$array = array();

if($type == 'group'){
    $array = kmgoogle_get_groups_on_course($courseid);
}

if($type == 'collection'){
    $array = kmgoogle_get_collections_on_course($courseid);
}

$html = '';
foreach($array as $key=>$name){
    if($obj->associationname == $key){
        $html .= '<option selected value="'.$key.'">'.$name.'</option>';
    }else{
        $html .= '<option value="'.$key.'">'.$name.'</option>';
    }
}

echo $html;