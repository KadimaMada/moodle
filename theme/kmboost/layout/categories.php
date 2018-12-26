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
require_once($CFG->libdir . '/coursecatlib.php');
require_once($CFG->dirroot. '/course/lib.php');

/*
* SG - 20180918
* Code block for template context.
* Moved it to course_renderer::course_category() function
* TOREMOVE lately

global $categoryid, $courserenderer;
$coursecat = coursecat::get($categoryid);
$chelper = new coursecat_helper();


// Fill with data current category
$currentcat = array(
    'name' => $coursecat->get_formatted_name(),
    'description' => $chelper->get_category_formatted_description($coursecat),
    'image' => get_cat_image($coursecat, $courserenderer)
);

// Fill with data other categories
$allcats = $coursecat->get_children();
$othercats = array();
foreach($allcats as $catid => $catinfo) {
    $othercats[] = array (
        'name' => $catinfo->get_formatted_name(),
        'description'=> $chelper->get_category_formatted_description($catinfo),
        'image' => get_cat_image($coursecat, $courserenderer)
    );
}
*/

/**
 * Function retreives course category summary image
 * @param coursecat $coursecat
 * @param $courserenderer
 *
 * @return url image url
 */
/*
SG - TOREMOVE lately
function get_cat_image($coursecat, $courserenderer) {
    $context = context_coursecat::instance($coursecat->id);
    $fs = get_file_storage();
    if ($files = $fs->get_area_files($context->id, 'coursecat', 'description')) {
        foreach ($files as $file) {
            if ($file->get_filename() != '.'){
                $coursecatimage  = moodle_url::make_pluginfile_url($file->get_contextid(), $file->get_component(), $file->get_filearea(), null, $file->get_filepath(), $file->get_filename());
            }
        }
    }
    $defaultimageurl = $courserenderer->image_url('default-bg', 'theme_kmboost');
    $coursecatimage = isset($coursecatimage ) ? $coursecatimage  : $defaultimageurl;

    return $coursecatimage;
} */


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
    //'currentcat' => $currentcat, // SG TOREMOVE lately
    //'othercats' => $othercats
    // SG TOREMOVE lately
];

$templatecontext['flatnavigation'] = $PAGE->flatnav;

echo $OUTPUT->render_from_template('theme_kmboost/categories', $templatecontext);
