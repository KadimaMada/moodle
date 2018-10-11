<?php
require_once("../../config.php");
require __DIR__ . '/classes/google/vendor/autoload.php';
require_once __DIR__ . '/classes/GoogleDrive.php';

global $DB, $CFG;
session_start();

$obj = $DB->get_record('config_plugins', array('plugin' => 'mod_kmgoogle', 'name' => 'clientid'));
$clientId = $obj->value;

$obj = $DB->get_record('config_plugins', array('plugin' => 'mod_kmgoogle', 'name' => 'clientsecret'));
$clientSecret = $obj->value;

$redirectUrl = $CFG->wwwroot.'/mod/kmgoogle/postback.php';

$google = new GoogleDrive($clientId, $clientSecret, $redirectUrl);

$google->sendTokenJson();