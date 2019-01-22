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
 * Course renderer.
 *
 * @package    theme_kmboost
 * @copyright  2018 Devlion.co
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace theme_kmboost\output\core;

use moodle_url;
use core_text;
use html_writer;
use stdClass;
use coursecat;
use coursecat_helper;
use single_select;
use lang_string;

defined('MOODLE_INTERNAL') || die();
require_once($CFG->dirroot . '/course/renderer.php');


/**
 * Course renderer class.
 *
 * @package    theme_kmboost
 * @copyright  2018 Devlion.co
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class course_renderer extends \core_course_renderer {

    /**
     * Renders HTML to display particular course category - list of it's subcategories and courses
     *
     * Invoked from /course/index.php
     *
     * @param int|stdClass|coursecat $category
     */
    public function course_category($category) {
        global $CFG;
        require_once($CFG->libdir. '/coursecatlib.php');
        $coursecat = coursecat::get(is_object($category) ? $category->id : $category);
        $site = get_site();
        $output = '';
        $chelper = new coursecat_helper();

        if (can_edit_in_category($coursecat->id)) {
            // Add 'Manage' button if user has permissions to edit this category.
            $managebutton = $this->single_button(new moodle_url('/course/management.php',
                array('categoryid' => $coursecat->id)), get_string('managecourses'), 'get');
            $this->page->set_button($managebutton);
        }
        if (!$coursecat->id) {
            if (coursecat::count_all() == 1) {
                // There exists only one category in the system, do not display link to it
                $coursecat = coursecat::get_default();
                $strfulllistofcourses = get_string('fulllistofcourses');
                $this->page->set_title("$site->shortname: $strfulllistofcourses");
            } else {
                $strcategories = get_string('categories');
                $this->page->set_title("$site->shortname: $strcategories");
            }
        } else {
            $title = $site->shortname;
            if (coursecat::count_all() > 1) {
                $title .= ": ". $coursecat->get_formatted_name();
            }
            $this->page->set_title($title);
        }

        // SG - 20180918 -- leave original code for categories preparation and options
        // Prepare parameters for courses and categories lists in the tree
        $chelper->set_show_courses(self::COURSECAT_SHOW_COURSES_AUTO)
        ->set_attributes(array('class' => 'category-browse category-browse-'.$coursecat->id));

        $coursedisplayoptions = array();
        $catdisplayoptions = array();
        $browse = optional_param('browse', null, PARAM_ALPHA);
        $perpage = optional_param('perpage', $CFG->coursesperpage, PARAM_INT);
        $page = optional_param('page', 0, PARAM_INT);
        $baseurl = new moodle_url('/course/index.php');
        if ($coursecat->id) {
            $baseurl->param('categoryid', $coursecat->id);
        }
        if ($perpage != $CFG->coursesperpage) {
            $baseurl->param('perpage', $perpage);
        }
        $coursedisplayoptions['limit'] = $perpage;
        $catdisplayoptions['limit'] = $perpage;
        if ($browse === 'courses' || !$coursecat->has_children()) {
            $coursedisplayoptions['offset'] = $page * $perpage;
            $coursedisplayoptions['paginationurl'] = new moodle_url($baseurl, array('browse' => 'courses'));
            $catdisplayoptions['nodisplay'] = true;
            $catdisplayoptions['viewmoreurl'] = new moodle_url($baseurl, array('browse' => 'categories'));
            $catdisplayoptions['viewmoretext'] = new lang_string('viewallsubcategories');
        } else if ($browse === 'categories' || !$coursecat->has_courses()) {
            $coursedisplayoptions['nodisplay'] = true;
            $catdisplayoptions['offset'] = $page * $perpage;
            $catdisplayoptions['paginationurl'] = new moodle_url($baseurl, array('browse' => 'categories'));
            $coursedisplayoptions['viewmoreurl'] = new moodle_url($baseurl, array('browse' => 'courses'));
            $coursedisplayoptions['viewmoretext'] = new lang_string('viewallcourses');
        } else {
            // we have a category that has both subcategories and courses, display pagination separately
            $coursedisplayoptions['viewmoreurl'] = new moodle_url($baseurl, array('browse' => 'courses', 'page' => 1));
            $catdisplayoptions['viewmoreurl'] = new moodle_url($baseurl, array('browse' => 'categories', 'page' => 1));
        }
        $chelper->set_courses_display_options($coursedisplayoptions)->set_categories_display_options($catdisplayoptions);

        // SG - 20180918 - Start custom main output

        // Add course search form.
        $output .= $this->course_search_form();

        // if (!$category) {
        //     // Display course category tree.
        //     $output .= $this->coursecat_tree($chelper, $coursecat);
        // } else {
            // Start out custom categories output
            $output .= html_writer::start_tag('div', array('id' => 'page-content','class' => 'row'));
                $output .= html_writer::start_tag('div', array('id' => 'region-main-box','class' => 'col-12'));
                    $output .= html_writer::start_tag('a', array('href' => 'href', array('class' => 'category-link')));
                        $output .= html_writer::img($src, '$alt', array('height' => '100', 'class' => 'class1'));
                        $output .= html_writer::tag('h3', $coursecat->get_formatted_name(), array('class' => 'currenct-category-title')); 
                    
                    $output .= html_writer::end_tag('a'); // close .category-link
            // Display categories and their content - courses, if present
                    $output .= $this->coursecat_custom_tree($chelper, $coursecat);
                $output .= html_writer::end_tag('div'); // close #region-main-box .col-12
            $output .= html_writer::end_tag('div'); // close #page-content .row
        // }

        return $output;
    }


    /**
     * Returns HTML to display a custom tree of subcategories and courses in the given category
     *
     * @param coursecat_helper $chelper various display options
     * @param coursecat $coursecat top category (this category's name and description will NOT be added to the tree)
     * @return string
     */
    protected function coursecat_custom_tree(coursecat_helper $chelper, $coursecat) {

        // first, get subcategories for current category (children)
        $subcategories = array();
        if (!$chelper->get_categories_display_option('nodisplay')) {
            $subcategories = $coursecat->get_children($chelper->get_categories_display_options());
        }

        // second, get courses for current category
        $courses = array();
        if (!$chelper->get_courses_display_option('nodisplay')) {
            $courses = $coursecat->get_courses($chelper->get_courses_display_options());
        }

        // Start content generation
        $content = '';
        $content .= html_writer::start_tag('div', array('class' => 'categories-wrapper'));
        // show subcategories
        $content .= html_writer::start_tag('ul', array('class' => 'categories category_banner'));
        foreach ($subcategories as $id => $subcategory) {
            $content .= html_writer::start_tag('li', array('class' => 'category col-md-2 col-xs-4 col-xs-height col-xs-top'));
            
            /* $content .= html_writer::tag('div', $chelper->get_category_formatted_description($subcategory), array('class' => 'category-image')); */

            $url = new moodle_url('/course/index.php', array('categoryid' => $subcategory->id));
            $src = 'https://dummyimage.com/100x100/000/fff.jpg&text=image+here';

            $content .= html_writer::start_tag('a', array('href' => $url,'class' => 'category-label'));
                $content .= html_writer::img($src, '$alt', array('height' => '100', 'class' => 'class2'));
                $content .= html_writer::tag('span', $subcategory->get_formatted_name(),  array('class' => 'сдфіі'));
            $content .= html_writer::end_tag('a'); // close .category-label

            /* $content .= html_writer::link(new moodle_url('/course/index.php', array('categoryid' => $subcategory->id)), $subcategory->get_formatted_name(), array('class' => 'category-label')); */




            $content .= html_writer::end_tag('li'); // close .category
        }
        $content .= html_writer::end_tag('ul'); // close .categories
        // show courses of current category
        $content .= html_writer::start_tag('ul', array('class' => 'categories courses'));
        foreach ($courses as $id => $course) {
            $content .= html_writer::start_tag('li', array('class' => 'category course'));

            $courseImgLink = "background-image: url({$this->get_course_image($course)})";
            $url = new moodle_url('/course/view.php', array('id' => $course->id));

            $content .= html_writer::start_tag('a', array('href' => $url,'class' => 'course_link'));
            $content .= html_writer::tag('span', '',  array('class' => 'course_img', 'style' =>  $courseImgLink));
            $content .= html_writer::tag('span', $chelper->get_course_formatted_name($course),  array('class' => 'course_name'));
            $content .= html_writer::end_tag('a');
            // $content .= html_writer::tag('div', $chelper->get_course_formatted_summary($course), array('class' => 'category-image'));    // SG - show course summary
            //$content .= html_writer::img($this->get_course_image($course), 'category-image', array('class' => 'category-image'));          // SG - show course overview image only
            //$content .= html_writer::link(new moodle_url('/course/view.php', array('id' => $course->id)), $chelper->get_course_formatted_name($course), array('class' => 'category-label'));
            $content .= html_writer::end_tag('li'); // close .category.course
        }
        $content .= html_writer::end_tag('ul'); // close .categories.courses
        $content .= html_writer::end_tag('div'); // close .categories-wrapper

        return $content;
    }

    /**
     * Returns course overview image (used in rendering courses at categories list page)
     *
     * @param course_in_list $course
     * @param array|stdClass $options additional formatting options
     * @return string
     */
    private function get_course_image($course) {

        $coursecoverimgurl = '';
        foreach ($course->get_course_overviewfiles() as $file) {
            $isimage = $file->is_valid_image();
            $coursecoverimgurl = moodle_url::make_pluginfile_url($file->get_contextid(), $file->get_component(), $file->get_filearea(), null, $file->get_filepath(), $file->get_filename());
        }
        // SG - set default course image in theme_kmboost file: /pix/default-bg.jpg - replace it to set another default image
        if (empty($coursecoverimgurl)) {
            $coursecoverimgurl = $this->page->theme->image_url('default-bg', 'theme'); // define default course cover image in theme's pix folder
        }
        return $coursecoverimgurl;
    }

    /**
     * Renders html to display a course search form.
     *
     * @param string $value default value to populate the search field
     * @param string $format display format - 'plain' (default), 'short' or 'navbar'
     * @return string
     */
    public function course_search_form($value = '', $format = 'plain') {
        static $count = 0;
        $formid = 'coursesearch';
        if ((++$count) > 1) {
            $formid .= $count;
        }

        switch ($format) {
            case 'navbar' :
                $formid = 'coursesearchnavbar';
                $inputid = 'navsearchbox';
                $inputsize = 20;
                break;
            case 'short' :
                $inputid = 'shortsearchbox';
                $inputsize = 12;
                break;
            default :
                $inputid = 'coursesearchbox';
                $inputsize = 30;
        }

        $data = (object) [
            'searchurl' => (new moodle_url('/course/search.php'))->out(false),
            'id' => $formid,
            'inputid' => $inputid,
            'inputsize' => $inputsize,
            'value' => $value
        ];

    /*     return $this->render_from_template('theme_boost/course_search_form', $data); */
    }

} // end course_renderer class
