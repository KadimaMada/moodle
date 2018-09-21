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
use stdClass;
/**
 * Renderers to align Moodle's HTML with that expected by Bootstrap
 *
 * @package    kmboost
 * @copyright  2012 Bas Brands, www.basbrands.nl
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

class core_renderer extends \theme_boost\output\core_renderer {

    public function get_logo_url($maxwidth = NULL, $maxheight = 200){
        global $PAGE,$CFG;

        if (!empty($this->page->theme->settings->logo)) {
            $url = $PAGE->theme->setting_file_url('logo', 'logo');
            // Get a URL suitable for moodle_url.
            $relativebaseurl = preg_replace('|^https?://|i', '//', $CFG->wwwroot);
            $url = str_replace($relativebaseurl, '', $url);

            $relativebaseurl = preg_replace('|^http?://|i', '//', $CFG->wwwroot);
            $url = str_replace($relativebaseurl, '', $url);
            return new moodle_url($url);
        }
        return parent::get_logo_url();
    }

    public function custom_menu($custommenuitems = '') {
        global $CFG,$USER;

        if (empty($custommenuitems) && !empty($CFG->custommenuitems)) {
            $custommenuitems = $CFG->custommenuitems;
        }

        $mycoursespattern="[mycourses]";
        if (strpos($custommenuitems,$mycoursespattern)) {

            if (isloggedin()){
                $courses = enrol_get_all_users_courses($USER->id, true, null, 'visible DESC, sortorder ASC');
                $mycourses = [];
                if (!empty($courses)) {
                    foreach ($courses as $currcourse) {
                        $mycourses[] = "-" . format_string($currcourse->fullname) . "|" . new moodle_url($CFG->wwwroot . "/course/view.php?id=" . $currcourse->id) . "\r\n";
                    }
                }
                $text = get_string('mycourses');
                $text .= "\r\n" . implode('', $mycourses);
            }else{
                $text="";
            }
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


    /**
     * Wrapper for header elements.
     *
     * @return string HTML to display the main header.
     */
    public function full_header() {
        global $PAGE;

        $header = new stdClass();
        $header->settingsmenu = $this->context_header_settings_menu();
        $header->contextheader = $this->context_header();
        $header->hasnavbar = empty($PAGE->layout_options['nonavbar']);
        $header->navbar = $this->navbar();
        $header->pageheadingbutton = $this->page_heading_button();
        $header->courseheader = $this->course_header();
        return $this->render_from_template('theme_kmboost/header', $header);
    }



}
