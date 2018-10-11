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
 * Moodle's Clean theme, an example of how to make a Bootstrap theme
 *
 * DO NOT MODIFY THIS THEME!
 * COPY IT FIRST, THEN RENAME THE COPY AND MODIFY IT INSTEAD.
 *
 * For full information about creating Moodle themes, see:
 * http://docs.moodle.org/dev/Themes_2.0
 *
 * @package   mod_kmgoogle
 * @copyright 2013 Moodle, moodle.org
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

if ($ADMIN->fulltree) {

    //ClientId
    $name = 'mod_kmgoogle/clientid';
    $title = get_string('clientid','mod_kmgoogle');
    $description = get_string('clientiddesc', 'mod_kmgoogle');
    $setting =new admin_setting_configtext($name, $title, $description,'', PARAM_TEXT, 120);
    $settings->add($setting);

    //clientSecret
    $name = 'mod_kmgoogle/clientsecret';
    $title = get_string('clientsecret','mod_kmgoogle');
    $description = get_string('clientsecretdesc', 'mod_kmgoogle');
    $setting =new admin_setting_configtext($name, $title, $description,'', PARAM_TEXT, 120);
    $settings->add($setting);

    //Credentials file setting.
    $name = 'mod_kmgoogle/credentials';
    $title = get_string('credentials','mod_kmgoogle');

    $a = new stdClass();
    $a->url = $CFG->wwwroot.'/mod/kmgoogle/postback.php';
    $description = get_string('credentialsdesc', 'mod_kmgoogle', $a);
    $setting = new admin_setting_configstoredfile($name, $title, $description, 'kmgoogle');
    $setting->set_updatedcallback('theme_reset_all_caches');
    $settings->add($setting);

}
