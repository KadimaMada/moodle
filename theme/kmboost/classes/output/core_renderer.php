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

namespace theme_kmboost\output;

defined('MOODLE_INTERNAL') || die;

use custom_menu;
use moodle_url;
/**
 * Renderers to align Moodle's HTML with that expected by Bootstrap
 *
 * @package    kmboost
 * @copyright  2012 Bas Brands, www.basbrands.nl
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

class core_renderer extends \theme_boost\output\core_renderer {

    public function get_logo_url(){
        global $PAGE;

        $url = $PAGE->theme->setting_file_url('logo', 'logo');
        if (empty($url)) {
            //TODO REMOVE OB PRODUCTION
            $url = "https://shiur4u.org/pluginfile.php/1/theme_elegance/logo/1535022405/logo.png";
        }

        return $url;
    }

    public function custom_menu($custommenuitems = '') {
        global $CFG,$USER;

        if (empty($custommenuitems) && !empty($CFG->custommenuitems)) {
            $custommenuitems = $CFG->custommenuitems;
        }

        $mycoursespattern="[mycourses]";
        if (strpos($custommenuitems,$mycoursespattern)) {
            $courses = enrol_get_all_users_courses($USER->id, true, null, 'visible DESC, sortorder ASC');
            $mycourses = [];
            if (!empty($courses)) {
                foreach ($courses as $currcourse) {
                    $mycourses[] = "-" . format_string($currcourse->fullname) . "|" . new moodle_url($CFG->wwwroot . "/course/view.php?id=" . $currcourse->id) . "\r\n";
                }
            }
            $text = get_string('mycourses');
            $text .= "\r\n" . implode('', $mycourses);
            $custommenuitems = str_replace($mycoursespattern, $text, $custommenuitems);
        }
        $custommenu = new custom_menu($custommenuitems, current_language());
        return $this->render_custom_menu($custommenu);
    }

    protected function render_custom_menu(custom_menu $menu) {
        global $CFG;

        $langs = get_string_manager()->get_list_of_translations();
        $haslangmenu = $this->lang_menu() != '';

        if (!$menu->has_children() && !$haslangmenu) {
            return '';
        }

        if ($haslangmenu) {
            $strlang = get_string('language');
            $currentlang = current_language();
            if (isset($langs[$currentlang])) {
                $currentlang = $langs[$currentlang];
            } else {
                $currentlang = $strlang;
            }
            $this->language = $menu->add($currentlang, new moodle_url('#'), $strlang, 10000);
            foreach ($langs as $langtype => $langname) {
                $this->language->add($langname, new moodle_url($this->page->url, array('lang' => $langtype)), $langname);
            }
        }

        $content = '';
        foreach ($menu->get_children() as $item) {
            $context = $item->export_for_template($this);
            $content .= $this->render_from_template('core/custom_menu_item', $context);
        }

        return $content;
    }


}
