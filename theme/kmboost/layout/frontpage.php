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
 * A two column layout for the boost theme.
 *
 * @package   theme_boost
 * @copyright 2016 Damyon Wiese
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

user_preference_allow_ajax_update('drawer-open-nav', PARAM_ALPHA);
require_once($CFG->libdir . '/behat/lib.php');


if (isloggedin()) {
    $navdraweropen = (get_user_preferences('drawer-open-nav', 'true') == 'true');
} else {
    $navdraweropen = false;
}
$extraclasses = [];
if ($navdraweropen) {
    $extraclasses[] = 'drawer-open-left';
}
$bodyattributes = $OUTPUT->body_attributes($extraclasses);
$blockshtml = $OUTPUT->blocks('side-pre');
$hasblocks = strpos($blockshtml, 'data-block=') !== false;
$regionmainsettingsmenu = $OUTPUT->region_main_settings_menu();
$templatecontext = [
    'sitename' => format_string($SITE->shortname, true, ['context' => context_course::instance(SITEID), "escape" => false]),
    'output' => $OUTPUT,
    'sidepreblocks' => $blockshtml,
    'hasblocks' => $hasblocks,
    'bodyattributes' => $bodyattributes,
    'navdraweropen' => $navdraweropen,
    'regionmainsettingsmenu' => $regionmainsettingsmenu,
    'hasregionmainsettingsmenu' => !empty($regionmainsettingsmenu),
    'loggedin' => isloggedin()?0:1,
    'frontpagehtmlblock' => get_translated_frontpagehtmlblock()
];

$templatecontext['flatnavigation'] = $PAGE->flatnav;

//get my courses carusel
$widgets = $PAGE->get_renderer('theme_kmboost', 'widgets');
$templatecontext['mycoursescarusel']=$widgets->my_courses_slick(true);


$urlouth2="";
$authplugin = get_auth_plugin('oauth2');
$potentialidps =  $authplugin->loginpage_idp_list('/');
foreach ($potentialidps as $idp) {
    if ($idp['name']=="Google"){
        $templatecontext['oauth2googleurl']=$idp['url']->out();
	$params=$idp['url']->params();
	$templatecontext['oauth2sesskey']=$params['sesskey'];
	$templatecontext['oauth2wants']=urlencode($params['wantsurl']);
	$templatecontext['oauth2id']=$params['id'];
    }
}

echo $OUTPUT->render_from_template('theme_kmboost/frontpage', $templatecontext);
$PAGE->requires->js_call_amd('theme_kmboost/slick-init', 'init');
// $PAGE->requires->js_call_amd('theme_kmboost/nagishut-init', 'init');
