<?php
require_once("../../config.php");
require $CFG->dirroot.'/mod/kmgoogle/classes/google/vendor/autoload.php';
require_once ($CFG->dirroot.'/mod/kmgoogle/classes/GoogleDrive.php');

global $DB;
session_start();

$obj = $DB->get_record('config_plugins', array('plugin' => 'mod_kmgoogle', 'name' => 'clientid'));
$clientId = $obj->value;

$obj = $DB->get_record('config_plugins', array('plugin' => 'mod_kmgoogle', 'name' => 'clientsecret'));
$clientSecret = $obj->value;

$redirectUrl = $CFG->wwwroot.'/mod/kmgoogle/postback.php';

if(!empty($clientId) && !empty($clientSecret) && !empty($redirectUrl)){

    $google = new GoogleDrive($clientId, $clientSecret, $redirectUrl);
    $google->flushSession();
    //$google->flushToken();
    $google->authenticateNewJson();
}else{
    die("Please enter clientId and clientSecret in kmgoogle settings");
}