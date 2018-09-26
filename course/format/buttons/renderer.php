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
 * format_buttons_renderer
 *
 * @package    format_buttons
 * @author     Rodrigo Brandão <rodrigo_brandao@me.com>
 * @copyright  2018 Rodrigo Brandão
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot.'/course/format/topics/renderer.php');

/**
 * format_buttons_renderer
 *
 * @package    format_buttons
 * @author     Rodrigo Brandão (rodrigobrandao.com.br)
 * @copyright  2017 Rodrigo Brandão
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class format_buttons_renderer extends format_topics_renderer
{

    /**
     * get_button_section
     *
     * @param stdclass $course
     * @param string $name
     * @return string
     */
    protected function get_color_config($course, $name)
    {
        $return = false;
        if (isset($course->{$name})) {
            $color = str_replace('#', '', $course->{$name});
            $color = substr($color, 0, 6);
            if (preg_match('/^#?[a-f0-9]{6}$/i', $color)) {
                $return = '#'.$color;
            }
        }
        return $return;
    }

    /**
     * get_button_section
     *
     * @param stdclass $course
     * @param string $sectionvisible
     * @return string
     */
    protected function get_button_section($course, $sectionvisible)
    {
        global $PAGE;
        $html = '';
        $css = '';
        if ($colorcurrent = $this->get_color_config($course, 'colorcurrent')) {
            $css .=
            '#buttonsectioncontainer .buttonsection.current {
                background: ' . $colorcurrent . ';
            }
            ';
        }
        if ($colorvisible = $this->get_color_config($course, 'colorvisible')) {
            $css .=
            '#buttonsectioncontainer .buttonsection.sectionvisible {
                background: ' . $colorvisible . ';
            }
            ';
        }
        if ($css) {
            $html .= html_writer::tag('style', $css);
        }
        $withoutdivisor = true;
        for ($k = 1; $k <= 12; $k++) {
            if ($course->{'divisor' . $k}) {
                $withoutdivisor = false;
            }
        }
        if ($withoutdivisor) {
            $course->divisor1 = 999;
        }
        $divisorshow = false;
        $count = 1;
        $currentdivisor = 1;
        $modinfo = get_fast_modinfo($course);
        $inline = '';
        foreach ($modinfo->get_section_info_all() as $section => $thissection) {
            if ($section == 0) {
                continue;
            }
            if ($section > $course->numsections) {
                continue;
            }
            if ($course->hiddensections && !(int)$thissection->visible) {
                continue;
            }
            if (isset($course->{'divisor' . $currentdivisor}) &&
                $count > $course->{'divisor' . $currentdivisor}) {
                $currentdivisor++;
                $count = 1;
            }
            if (isset($course->{'divisor' . $currentdivisor}) &&
                $course->{'divisor' . $currentdivisor} != 0 &&
                !isset($divisorshow[$currentdivisor])) {
                $currentdivisorhtml = $course->{'divisortext' . $currentdivisor};
                $currentdivisorhtml = str_replace('[br]', '<br>', $currentdivisorhtml);
                $currentdivisorhtml = html_writer::tag('div', $currentdivisorhtml, ['class' => 'divisortext']);
                if ($course->inlinesections) {
                    $inline = 'inlinebuttonsections';
                }
                $html .= html_writer::tag('div', $currentdivisorhtml, ['class' => "divisorsection $inline"]);
                $divisorshow[$currentdivisor] = true;
            }
            $id = 'buttonsection-' . $section;
            if ($course->sequential) {
                $name = $section;
            } else {
                if (isset($course->{'divisor' . $currentdivisor}) &&
                $course->{'divisor' . $currentdivisor} == 1) {
                    $name = '&bull;&bull;&bull;';
                } else {
                    $name = $count;
                }
            }
            if ($course->sectiontype == 'alphabet' && is_numeric($name)) {
                $name = $this->number_to_alphabet($name);
            }
            if ($course->sectiontype == 'roman' && is_numeric($name)) {
                $name = $this->number_to_roman($name);
            }
            $class = 'buttonsection';
            $onclick = 'M.format_buttons.show(' . $section . ',' . $course->id . ')';
            if (!$thissection->available &&
                !empty($thissection->availableinfo)) {
                $class .= ' sectionhidden';
            } elseif (!$thissection->uservisible || !$thissection->visible) {
                $class .= ' sectionhidden';
                $onclick = false;
            }
            if ($course->marker == $section) {
                $class .= ' current';
            }
            if ($sectionvisible == $section) {
                $class .= ' sectionvisible';
            }
            if ($PAGE->user_is_editing()) {
                $onclick = false;
            }
            $html .= html_writer::tag('div', $name, ['id' => $id, 'class' => $class, 'onclick' => $onclick]);
            $count++;
        }
        $html = html_writer::tag('div', $html, ['id' => 'buttonsectioncontainer', 'class' => $course->buttonstyle]);
        if ($PAGE->user_is_editing()) {
            $html .= html_writer::tag('div', get_string('editing', 'format_buttons'), ['class' => 'alert alert-warning alert-block fade in']);
        }
        return $html;
    }

    /**
     * get_button_section kadima
     *
     * @param stdclass $course
     * @param string $sectionvisible
     * @return string
     */
    protected function get_button_section_kadima($course, $sectionvisible)
    {
        global $PAGE;
        $html = '';
        $css = '';

        $modinfo = get_fast_modinfo($course);
        $inline = '';
        $count = 1;

        if (!$PAGE->user_is_editing()) {
        // start kadima container render
        $html .= html_writer::start_tag('div',['class' => 'container-fluid buttons']); // don't forget to close it later

        $html .= html_writer::start_tag('div',['class' => 'sections-wrapper justify-content-end']);
        $html .= html_writer::start_tag('ul',['id' => 'sections', 'role' => 'sections-list', 'class' => 'nav slider sections align-items-end align-content-end']);
        }

        foreach ($modinfo->get_section_info_all() as $section => $thissection) {
            if ($section == 0) {
                continue;
            }
            if ($section > $course->numsections) {
                continue;
            }
            if ($course->hiddensections && !(int)$thissection->visible) {
                continue;
            }

            if ($course->sequential) {
                $name = $section;
            } else {
                    $name = $count;
            }
            if ($course->sectiontype == 'alphabet' && is_numeric($name)) {
                $name = $this->number_to_alphabet($name);
            }
            if ($course->sectiontype == 'roman' && is_numeric($name)) {
                $name = $this->number_to_roman($name);
            }

            $class = 'buttonsection';
            if (!$thissection->available &&
            !empty($thissection->availableinfo)) {
            $class .= ' sectionhidden';
            } elseif (!$thissection->uservisible || !$thissection->visible) {
                $class .= ' sectionhidden';
                $onclick = false;
            }
            if ($course->marker == $section) {
                $class .= ' current';
                $currentclass = ' current';
            } else {
                $currentclass = '';
            }
            if (course_get_format($course)->is_section_current($section)) {
                $class = ' active';
            }
            //TODO   open first section remove it after
            if ($section == 2) {
                $class = ' active show';
            }

            if ($sectionvisible == $section) {
                $class .= ' sectionvisible';
            }

            if ($PAGE->user_is_editing()) {
                $onclick = false;
            }
            if(empty($this->get_section_labels($course, $section))){
              continue;
            }
            // get section name and icon name in array. [1] - section name; [2] - icon name / fa class
            $sectionnamearr = course_get_format($course)->get_section_name_and_icon($section);

            $html .= html_writer::start_tag('li',['class' => 'nav-item mb-auto '.$currentclass, 'data-section' => $section]);
            // $html .= html_writer::start_tag('a',['href' => "#section$section",'class' => "nav-link $class", 'aria-controls' => "section-$section"]);
            $html .= html_writer::start_tag('div',['class' => 'd-flex flex-row section-header justify-content-around align-items-center']);
            //$html .= html_writer::tag('span', '', ['class' => 'section-icon d-inline-flex p-3 justify-content-center align-items-center '.$sectionnamearr[2], 'style' => "background: url({$this->courserenderer->image_url('label-default', 'format_buttons')}) no-repeat; background-size: cover;"]);  // SG - previouse variant
            $html .= html_writer::tag('span', '', ['class' => 'section-icon d-inline-flex p-3 justify-content-center align-items-center '.$sectionnamearr[2], 'style' => "font-family: FontAwesome; font-style: normal; font-weight: normal; text-decoration: inherit; line-height:2rem"]);
            $html .= html_writer::start_tag('div',['class' => 'd-flex flex-column section-header-inner']);
            $html .= html_writer::tag('span', $sectionnamearr[1], ['class' => ' section-title']);
            $html .= html_writer::tag('span', $thissection->summary, ['class' => 'section-description']);
            $html .= html_writer::end_tag('div');
            if ($thissection->summary) {
              $html .= html_writer::tag('span', 'i', ['class' => 'section-tooltip d-inline-flex p-1 justify-content-center align-items-center', 'title'=>'section tooltip', 'data-info'=>'Tooltip content', 'data-section' => $section]);
            } else {
              $html .= html_writer::tag('span', '', ['class' => 'd-inline-flex p-2 justify-content-center align-items-center']);
            }
            $html .= html_writer::end_tag('div');
            // $html .= html_writer::end_tag('a');
            $html .= html_writer::end_tag('li');

            $count++;
        }
        $html .= html_writer::end_tag('ul');
        // $html .= html_writer::tag('button', '', ['type' => 'button', 'name' => 'button', 'class' => 'slide-tabs slide-right']);
        $html .= html_writer::end_tag('div');

        if ($PAGE->user_is_editing()) {
            $html .= html_writer::tag('div', get_string('editing', 'format_buttons'), ['class' => 'alert alert-warning alert-block fade in']);
        }
        return $html;
    }

    /**
     * number_to_roman
     *
     * @param integer $number
     * @return string
     */
    protected function number_to_roman($number)
    {
        $number = intval($number);
        $return = '';
        $romanarray = [
            'M' => 1000,
            'CM' => 900,
            'D' => 500,
            'CD' => 400,
            'C' => 100,
            'XC' => 90,
            'L' => 50,
            'XL' => 40,
            'X' => 10,
            'IX' => 9,
            'V' => 5,
            'IV' => 4,
            'I' => 1
        ];
        foreach ($romanarray as $roman => $value) {
            $matches = intval($number / $value);
            $return .= str_repeat($roman, $matches);
            $number = $number % $value;
        }
        return $return;
    }

    /**
     * number_to_alphabet
     *
     * @param integer $number
     * @return string
     */
    protected function number_to_alphabet($number)
    {
        $number = $number - 1;
        $alphabet = range("A", "Z");
        if ($number <= 25) {
            return $alphabet[$number];
        } elseif ($number > 25) {
            $dividend = ($number + 1);
            $alpha = '';
            while ($dividend > 0) {
                $modulo = ($dividend - 1) % 26;
                $alpha = $alphabet[$modulo] . $alpha;
                $dividend = floor((($dividend - $modulo) / 26));
            }
            return $alpha;
        }
    }

    /**
     * start_section_list
     *
     * @return string
     */
    protected function start_section_list()
    {
        return html_writer::start_tag('ul', ['class' => 'buttons']);
    }

    /**
     * section_header
     *
     * @param stdclass $section
     * @param stdclass $course
     * @param bool $onsectionpage
     * @param int $sectionreturn
     * @return string
     */
    protected function section_header($section, $course, $onsectionpage, $sectionreturn = null)
    {
        global $PAGE, $CFG;
        $o = '';
        $currenttext = '';
        $sectionstyle = '';
        if ($section->section != 0) {
            if (!$section->visible) {
                $sectionstyle = ' hidden';
            } elseif (course_get_format($course)->is_section_current($section)) {
                $sectionstyle = ' current';
            }
        }
        $o .= html_writer::start_tag('li', ['id' => 'section-'.$section->section,
        'class' => 'section main clearfix'.$sectionstyle,
        'role' => 'region', 'aria-label' => get_section_name($course, $section)]);
        $o .= html_writer::tag('span', $this->section_title($section, $course), ['class' => 'sectionname']);  // by default - ['class' => 'hidden sectionname']
        $leftcontent = $this->section_left_content($section, $course, $onsectionpage);
        $o .= html_writer::tag('div', $leftcontent, ['class' => 'left side']);
        $rightcontent = $this->section_right_content($section, $course, $onsectionpage);
        $o .= html_writer::tag('div', $rightcontent, ['class' => 'right side']);
        $o .= html_writer::start_tag('div', ['class' => 'content']);
        $hasnamenotsecpg = (!$onsectionpage && ($section->section != 0 || !is_null($section->name)));
        $hasnamesecpg = ($onsectionpage && ($section->section == 0 && !is_null($section->name)));
        $classes = ' accesshide';
        if ($hasnamenotsecpg || $hasnamesecpg) {
            $classes = '';
        }
        $sectionname = html_writer::tag('span', $this->section_title($section, $course));
        if ($course->showdefaultsectionname) {
            $o .= $this->output->heading($sectionname, 3, 'sectionname' . $classes);
        }
        $o .= html_writer::start_tag('div', ['class' => 'summary']);
        $o .= $this->format_summary_text($section);
        $context = context_course::instance($course->id);
        $o .= html_writer::end_tag('div');
        $o .= $this->section_availability_message($section, has_capability('moodle/course:viewhiddensections', $context));
        return $o;
    }

    /**
     * print_multiple_section_page
     *
     * @param stdclass $course
     * @param array $sections (argument not used)
     * @param array $mods (argument not used)
     * @param array $modnames (argument not used)
     * @param array $modnamesused (argument not used)
     */
    public function print_multiple_section_page($course, $sections, $mods, $modnames, $modnamesused)
    {
        global $PAGE;
        $modinfo = get_fast_modinfo($course);
        $course = course_get_format($course)->get_course();
        $context = context_course::instance($course->id);
        $completioninfo = new completion_info($course);
        if (isset($_COOKIE['sectionvisible_'.$course->id])) {
            $sectionvisible = $_COOKIE['sectionvisible_'.$course->id];
        } elseif ($course->marker > 0) {
            $sectionvisible = $course->marker;
        } else {
            $sectionvisible = 1;
        }

        /*
        * Course format options render for frontend
        */
        $csscoloroptions = "";
        $csscoloroptions .= ":root{";
        $csscoloroptions .= "--buttons-course-description: ".$course->course_descr_bg_color.";";
        $csscoloroptions .= "--buttons-section-bg-color: ".$course->section_menu_bg_color.";";
        $csscoloroptions .= "--buttons-section-font-color: ".$course->section_menu_font_color.";";
        $csscoloroptions .= "--buttons-section-icon-color: ".$course->section_menu_icon_color.";";
        $csscoloroptions .= "--buttons-section-info-color: ".$course->section_menu_info_arrows_color.";";
        $csscoloroptions .= "--buttons-section-active-bg: ".$course->selected_section_bg_color.";";
        $csscoloroptions .= "--buttons-section-active-font-color: ".$course->selected_section_font_color.";";
        $csscoloroptions .= "--buttons-section-active-icon-color: ".$course->selected_section_icon_color.";";
        $csscoloroptions .= "--buttons-label-bg: ".$course->label_menu_bg_color.";";
        $csscoloroptions .= "--buttons-label-font-color: ".$course->label_menu_font_color.";";
        $csscoloroptions .= "--buttons-label-icon-color: ".$course->label_menu_icon_color.";";
        $csscoloroptions .= "--buttons-label-controls-color: ".$course->label_menu_arrows_color.";";
        $csscoloroptions .= "--buttons-label-active-bg: ".$course->selected_label_bg_color.";";
        $csscoloroptions .= "--buttons-label-active-font-color: ".$course->selected_label_font_color.";";
        $csscoloroptions .= "--buttons-label-active-icon-color: ".$course->selected_label_icon_color.";";
        $csscoloroptions .= "}";

        echo html_writer::tag('style', $csscoloroptions);

        // old htmlsection
        // $htmlsection = false;
        // foreach ($modinfo->get_section_info_all() as $section => $thissection) {
        //     $htmlsection[$section] = '';
        //     if ($section == 0) {
        //         $section0 = $thissection;
        //         continue;
        //     }
        //     if ($section > $course->numsections) {
        //         continue;
        //     }
        //     /* if is not editing verify the rules to display the sections */
        //     if (!$PAGE->user_is_editing()) {
        //         if ($course->hiddensections && !(int)$thissection->visible) {
        //             continue;
        //         }
        //         if (!$thissection->available && !empty($thissection->availableinfo)) {
        //             $htmlsection[$section] .= $this->section_header($thissection, $course, false, 0);
        //             continue;
        //         }
        //         if (!$thissection->uservisible || !$thissection->visible) {
        //             $htmlsection[$section] .= $this->section_hidden($section, $course->id);
        //             continue;
        //         }
        //     }
        //     $htmlsection[$section] .= $this->section_header($thissection, $course, false, 0);
        //     if ($thissection->uservisible) {

        //         if (!$PAGE->user_is_editing()) {

        //             // our labels output into sections except 0
        //             $htmlsection[$section] .= html_writer::start_tag('div', array('class' => 'labels-wrap'));
        //             $labelscontent = $this->labels_content($course, $thissection);
        //             $htmlsection[$section] .= html_writer::tag('div', $labelscontent, array('class' => 'labels-content'));
        //             $labelslist = $this->labels_list($course, $thissection);
        //             //$htmlsection[$section] .= $this->get_section_labels($course, $thissection, 0);
        //             $htmlsection[$section] .= html_writer::tag('div', $labelslist, array('class' => 'labels-list'));
        //             $htmlsection[$section] .= html_writer::end_tag('div');

        //             //$htmlsection[$section] .= $this->course_section_cm_list($course, $thissection, 0); // first version render
        //         } else {
        //             $htmlsection[$section] .= $this->courserenderer->course_section_cm_list($course, $thissection, 0); // original render
        //             $htmlsection[$section] .= $this->courserenderer->course_section_add_cm_control($course, $section, 0);
        //         }
        //     }

        //     $htmlsection[$section] .= $this->section_footer();
        // }

        // kadima html section
        $htmlsection = false;
        foreach ($modinfo->get_section_info_all() as $section => $thissection) {
            $htmlsection[$section] = '';
            $currentsectionclass = '';
            // TODO
            if ($section == 1) {
                $currentsectionclass = ' active';
            }
            if (course_get_format($course)->is_section_current($section)) {
                $currentsectionclass = ' active';
            }
            if ($section == 0) {
                $section0 = $thissection;
                continue;
            }
            if ($section > $course->numsections) {
                continue;
            }
            /* if is not editing verify the rules to display the sections */
            if (!$PAGE->user_is_editing()) {
                if ($course->hiddensections && !(int)$thissection->visible) {
                    continue;
                }
                if (!$thissection->available && !empty($thissection->availableinfo)) {
                    $htmlsection[$section] .= $this->section_header($thissection, $course, false, 0);
                    continue;
                }
                if (!$thissection->uservisible || !$thissection->visible) {
                    $htmlsection[$section] .= $this->section_hidden($section, $course->id);
                    continue;
                }
            }
            if ($PAGE->user_is_editing()) { // turn on section header only for editing mode
            $htmlsection[$section] .= $this->section_header($thissection, $course, false, 0);
            }

            if ($thissection->uservisible) {

                if (!$PAGE->user_is_editing()) {
                    // our labels output into sections except 0

                    $htmlsection[$section] .=  html_writer::start_tag('div',['id' => "section$section",'class' => "section-content d-none  $currentsectionclass", 'role' => 'section content' ]);
                    $htmlsection[$section] .=  html_writer::start_tag('div',['class' => 'd-flex flex-column flex-md-row']);
                    $htmlsection[$section] .=  html_writer::start_tag('div',['class' => 'col-12 col-md-3 col-lg-3 col-xl-2 labels-wrapper']);
                    $htmlsection[$section] .=  html_writer::start_tag('ul',['class' => 'nav flex-column flex-nowrap align-content-end justify-content-end slider labels', 'role' => 'labels list']);
                    $htmlsection[$section] .=  $this->labels_list($course, $thissection);
                    $htmlsection[$section] .=  html_writer::end_tag('ul');
                    $htmlsection[$section] .=  html_writer::end_tag('div');
                    $htmlsection[$section] .=  html_writer::start_tag('div',['class' => 'label-content-wrapper col-12 col-md-9 col-lg-9 col-xl-10']);
                    $htmlsection[$section] .=  $this->labels_content($course, $thissection);
                    $htmlsection[$section] .=  html_writer::end_tag('div');
                    $htmlsection[$section] .=  html_writer::start_tag('div',['class' => ' label-content-controls d-flex']);
                    $htmlsection[$section] .=  html_writer::tag('button', '', ['class' => ' p-2 col-4 label-prev', 'data-html' => 'true', 'data-content' => ' ']);
                    $htmlsection[$section] .=  html_writer::tag('div', '', ['class' => ' p-2 col-4 label-active']);
                    $htmlsection[$section] .=  html_writer::tag('button', '', ['class' => ' p-2 col-4 label-next', 'data-html' => 'true', 'data-content' => ' ']);
                    $htmlsection[$section] .=  html_writer::end_tag('div');
                    $htmlsection[$section] .=  html_writer::end_tag('div');
                    $htmlsection[$section] .=  html_writer::end_tag('div');

                    //first kadima render
                    // $htmlsection[$section] .= html_writer::start_tag('div', array('class' => 'labels-wrap'));
                    // $labelscontent = $this->labels_content($course, $thissection);
                    // $htmlsection[$section] .= html_writer::tag('div', $labelscontent, array('class' => 'labels-content'));
                    // $labelslist = $this->labels_list($course, $thissection);
                    // //$htmlsection[$section] .= $this->get_section_labels($course, $thissection, 0);
                    // $htmlsection[$section] .= html_writer::tag('div', $labelslist, array('class' => 'labels-list'));
                    // $htmlsection[$section] .= html_writer::end_tag('div');

                    //$htmlsection[$section] .= $this->course_section_cm_list($course, $thissection, 0); // first version render
                } else {
                    // render sections edit mode
                    $htmlsection[$section] .= $this->courserenderer->course_section_cm_list($course, $thissection, 0); // original render
                    $htmlsection[$section] .= $this->courserenderer->course_section_add_cm_control($course, $section, 0);
                }
            }

            if ($PAGE->user_is_editing()) { // show section footer only in editing mode
                $htmlsection[$section] .= $this->section_footer(); //
            }
        }

        if ($section0->summary || !empty($modinfo->sections[0]) || $PAGE->user_is_editing()) {
            $htmlsection0 = $this->section_header($section0, $course, false, 0);
            //$htmlsection0 .= $this->courserenderer->course_section_cm_list($course, $section0, 0); // original render
            $htmlsection0 .= $this->course_section_cm_list($course, $section0, 0); // first version render
            $htmlsection0 .= $this->courserenderer->course_section_add_cm_control($course, 0, 0);
            $htmlsection0 .= $this->section_footer();
        }
        echo $completioninfo->display_help_icon();
        echo $this->output->heading($this->page_title(), 2, 'accesshide');
        echo $this->course_activity_clipboard($course, 0);
        echo $this->start_section_list();
        if ($course->sectionposition == 0 and isset($htmlsection0)) {
            echo html_writer::tag('span', $htmlsection0, ['class' => 'above']);
        }

        // render section buttons here
        if (!$PAGE->user_is_editing()) {
          echo $this->get_button_section_kadima($course, $sectionvisible);
          echo html_writer::start_tag('div',['class' => 'sections-content-wrapper']);  //tab content starts here
        } else {
            echo $this->get_button_section($course, $sectionvisible);
        }

          // putput sections (except 0) - here
          foreach ($htmlsection as $current) {
              echo $current;
          }

          if (!$PAGE->user_is_editing()) {
            // end kadima reder here
            echo html_writer::end_tag('div'); // tab content ends here
            echo html_writer::end_tag('div'); // container-fluid buttons ends here (starts in get_button_section_kadima)
          }

        if ($course->sectionposition == 1 and isset($htmlsection0)) {
            echo html_writer::tag('span', $htmlsection0, ['class' => 'below']);
        }
        if ($PAGE->user_is_editing() and has_capability('moodle/course:update', $context)) {
            foreach ($modinfo->get_section_info_all() as $section => $thissection) {
                if ($section <= $course->numsections or empty($modinfo->sections[$section])) {
                    continue;
                }
                echo $this->stealth_section_header($section);
                echo $this->courserenderer->course_section_cm_list($course, $thissection, 0); // original render
                // echo $this->course_section_cm_list($course, $thissection, 0);  // first version render
                echo $this->stealth_section_footer();
            }
            echo $this->end_section_list();
            echo html_writer::start_tag('div', ['id' => 'changenumsections', 'class' => 'mdl-right']);
            $straddsection = get_string('increasesections', 'moodle');
            $url = new moodle_url('/course/changenumsections.php', ['courseid' => $course->id,
                'increase' => true, 'sesskey' => sesskey()]);
            $icon = $this->output->pix_icon('t/switch_plus', $straddsection);
            echo html_writer::link($url, $icon.get_accesshide($straddsection), ['class' => 'increase-sections']);
            if ($course->numsections > 0) {
                $strremovesection = get_string('reducesections', 'moodle');
                $url = new moodle_url('/course/changenumsections.php', ['courseid' => $course->id,
                    'increase' => false, 'sesskey' => sesskey()]);
                $icon = $this->output->pix_icon('t/switch_minus', $strremovesection);
                echo html_writer::link(
                    $url,
                    $icon.get_accesshide($strremovesection),
                ['class' => 'reduce-sections']
                );
            }
            echo html_writer::end_tag('div');
        } else {
            echo $this->end_section_list();
        }
        echo html_writer::tag('style', '.course-content ul.buttons #section-'.$sectionvisible.' { display: block; }');
        // if (!$PAGE->user_is_editing()) {
        //     $PAGE->requires->js_init_call('M.format_buttons.init', [$course->numsections]);
        // }
        // ==============================================================================
        // don't needed - implemented above
        //echo $this->course_format_buttons_design($course, $section);
    }

     /**
     * Renders HTML to display a list of course modules in a course section
     * Also displays "move here" controls in Javascript-disabled mode
     *
     * This function calls {@link core_course_renderer::course_section_cm()}
     *
     * @param stdClass $course course object
     * @param int|stdClass|section_info $section relative section number or section object
     * @param int $sectionreturn section number to return to
     * @param int $displayoptions
     * @return void
     */
    public function course_section_cm_list($course, $section, $sectionreturn = null, $displayoptions = array()) {
        global $USER, $PAGE;

        $output = '';
        $modinfo = get_fast_modinfo($course);
        if (is_object($section)) {
            $section = $modinfo->get_section_info($section->section);
        } else {
            $section = $modinfo->get_section_info($section);
        }
        $completioninfo = new completion_info($course);

        // check if we are currently in the process of moving a module with JavaScript disabled
        $ismoving = $this->page->user_is_editing() && ismoving($course->id);
        if ($ismoving) {
            $movingpix = new pix_icon('movehere', get_string('movehere'), 'moodle', array('class' => 'movetarget'));
            $strmovefull = strip_tags(get_string("movefull", "", "'$USER->activitycopyname'"));
        }

        // Get the list of modules visible to user (excluding the module being moved if there is one)
        $moduleshtml = array();
        if (!empty($modinfo->sections[$section->section])) {
            foreach ($modinfo->sections[$section->section] as $modnumber) {
                $mod = $modinfo->cms[$modnumber];

                if ($ismoving and $mod->id == $USER->activitycopy) {
                    // do not display moving mod
                    continue;
                }

                // show only 'labels' in sections
                if ($mod->modname == 'label') {
                    if ($modulehtml = $this->courserenderer->course_section_cm_list_item($course, $completioninfo, $mod, $sectionreturn, $displayoptions)) {
                        $moduleshtml[$modnumber] = $modulehtml;
                    }
                } else if ($PAGE->user_is_editing()) { // show other activities ONLY in editing mode, else comment here
                    if ($modulehtml = $this->courserenderer->course_section_cm_list_item($course, $completioninfo, $mod, $sectionreturn, $displayoptions)) {
                        $moduleshtml[$modnumber] = $modulehtml;
                    }
                } //and comment here

            }
        }

        $sectionoutput = '';
        if (!empty($moduleshtml) || $ismoving) {
            foreach ($moduleshtml as $modnumber => $modulehtml) {
                if ($ismoving) {
                    $movingurl = new moodle_url('/course/mod.php', array('moveto' => $modnumber, 'sesskey' => sesskey()));
                    $sectionoutput .= html_writer::tag('li',
                            html_writer::link($movingurl, $this->output->render($movingpix), array('title' => $strmovefull)),
                            array('class' => 'movehere'));
                }

                $sectionoutput .= $modulehtml;
            }

            if ($ismoving) {
                $movingurl = new moodle_url('/course/mod.php', array('movetosection' => $section->id, 'sesskey' => sesskey()));
                $sectionoutput .= html_writer::tag('li',
                        html_writer::link($movingurl, $this->output->render($movingpix), array('title' => $strmovefull)),
                        array('class' => 'movehere'));
            }
        }

        // Always output the section module list.
        $output .= html_writer::tag('ul', $sectionoutput, array('class' => 'section img-text'));

        return $output;
    }

    public function strip_tags_content($text, $tags = '', $invert = FALSE) {
        preg_match_all('/<(.+?)[\s]*\/?[\s]*>/si', trim($tags), $tags);
        $tags = array_unique($tags[1]);
        if(is_array($tags) AND count($tags) > 0) {
          if($invert == FALSE) {
            return preg_replace('@<(?!(?:'. implode('|', $tags) .')\b)(\w+)\b.*?>.*?</\1>@si', '', $text);
          }
          else {
            return preg_replace('@<('. implode('|', $tags) .')\b.*?>.*?</\1>@si', '', $text);
          }
        }
        elseif($invert == FALSE) {
          return preg_replace('@<(\w+)\b.*?>.*?</\1>@si', '', $text);
        }
        return $text;
    }



    /**
     * Function to get all labels for section befor render
     * @param stdClass $course course object
     * @param int|stdClass|section_info $section relative section number or section object
     * @return arr Content parsed for labels render
     */
    public function get_section_labels($course, $section) {
        global $USER, $PAGE;

        $modinfo = get_fast_modinfo($course);
        if (is_object($section)) {
            $section = $modinfo->get_section_info($section->section);
        } else {
            $section = $modinfo->get_section_info($section);
        }

        $lables = array();
        if (!empty($modinfo->sections[$section->section])) {
            foreach ($modinfo->sections[$section->section] as $modnumber) {
                $mod = $modinfo->cms[$modnumber];

                if ($mod->modname == 'label') {
                    if (!$mod->is_visible_on_course_page()) {
                        // nothing to be displayed to the user
                        return $output;
                    }

                    // get and parse label content into header, icon and the rest of the text
                    if ($modulehtml =  $mod->get_formatted_content(array('noclean' => true))) {


                      // $labelBody = $modulehtml;
                      // if (strpos($labelBody, '#name')){
                      //     if(strpos($labelBody, '<br>')>=0&&strpos($labelBody, '<br>')<100){
                      //         $content = explode('<br>', $labelBody, 2);
                      //         $labelName = substr($content[0], strpos($content[0], '#name')+5);
                      //         $labelBody = $content[1];
                      //         // echo $labelName;
                      //     }
                      // }
                      // echo $labelBody;
                      // if (strpos($labelBody, '#icon')){
                      //     echo strpos($labelBody, '#icon');
                      //     if(strpos($labelBody, '<br>')>=0&&strpos($labelBody, '<br>')<100){
                      //         $content = explode('<br>', $labelBody, 2);
                      //         $labelIcon = substr($content[0], strpos($content[0], '#icon')+5);
                      //         $labelBody = $content[1];
                      //         echo $labelIcon;
                      //     }
                      //     // if(strpos($modulehtml, '\n')>=0&&strpos($modulehtml, '<\n>')<100) {
                      //
                      //     // }
                      // }

                        // $reg = '/<h\d>(.*)<\/h\d>.*?\s*(<pre>(.*)<\/pre>)?\s*(.*)<\/div>/sm'; // Regex for <h></h>, <pre></pre> and others. Last <div> is to close no-owerflow div
                        // if (strpos($modulehtml, '#name')){
                        //   if(strpos($modulehtml, '<br>')>=0&&strpos($modulehtml, '<br>')<100){
                        //      $content = explode('<br>', $modulehtml, 2);
                        //      $labelName = substr($content[0], strpos($content[0], '#name')+5);
                        //      $labelBody = $content[1];
                        //      // if (preg_match('/#name(.*?)<br>(.*)<\/div>/im', $modulehtml, $result1)){
                        //      //   $labelName = $this->strip_tags_content($result1[1]);
                        //      //   $labelBody = $result1[2];
                        //      // }
                        //   }
                        // } else {
                        //   $labelName = 'Label'; //default name
                        //   $labelBody = $modulehtml;
                        // }
                        // if (preg_match('/.*?#icon(.*?)<br>(.*?)<\/div>/im', $labelBody, $result2)){
                        //   $labelIcon = $this->strip_tags_content($result2[1]);
                        //   $labelBody = $result2[2];
                        // } else {
                        //   $labelIcon = 'label-default'; //default icon
                        // }
                        // $content = [$modulehtml, $labelName, $labelIcon, $labelBody];



                        // $reg = '/\#name(.*?\s)\#icon(.*?\s.*?)\#content(.*?\s.*?)<\/div>/mix';
                        //$reg = '/#name(.*?)<br>.*?#icon(.*?)<br>(.*?)<\/div>/im';
                        // $reg = '/#name(.*)%name.*?\s*#icon(.*)%icon?\s*(.*)<\/div>/im';
                        // $reg = '/[\s\S]*?\[\[(.*?)\]\][\s\S]*?\{\{(.*?)\}\}[\s\S]*?([\s\S]*)<\/div>/im'; // SG - the lpreviouse regexp 20180830 - '[[name]] {{icon}} rest of the text'
                        $reg = '/[^\[\{]*(?:\[\[(.*?)\]\])?(?:[\s\S]*?\{\{(.*?)\}\})?([\s\S]*?)<\/div>/i'; // SG - the latest regexp 20180917 - '[[name]] {{icon}} rest of the text'. You provide only name or only icon
                        preg_match($reg, $modulehtml, $content);
                        // preg_split($reg, $modulehtml, $content);

                        $lables[$modnumber] = $content;
                    }
                }
            }
        }
        return $lables;

    } // get_section_labels ends

    /**
     * Function to render labels list (menu) on the course page
     * @param stdClass $course course object
     * @param int|stdClass|section_info $section relative section number or section object
     * @return str Output of the labels list
     */
    public function labels_list($course, $section) {
        $labels = $this->get_section_labels($course, $section);
        $output = '';
        foreach ($labels as $modnum => $content) {

            $content[2] = strip_tags($content[2]); // SG - strip any tags for icon name  -leave  only pure text

            // here we fetch icon url or set default one
            // if (empty($content[2])) {
            //     $liconStyle = 'background: url('.$this->courserenderer->image_url('label-default', 'format_buttons').') no-repeat; background-size: cover; padding:14px;';
            //     $liconClass = '';
            // } else {
              if(preg_match('/fa-/im', $content[2]) === 1) {
                // $licon = $this->render_fontawesome($content[2]);
                $liconStyle = 'font-family: FontAwesome; font-style: normal; font-weight: normal; text-decoration: inherit; line-height:2rem;';
                $liconClass = $content[2];
              } else {
                $liconStyle = 'background: url('.$this->courserenderer->image_url($content[2], 'format_buttons').') no-repeat; background-size: cover; padding:14px;';
                $liconClass = '';
              }
            // }

            // kadima render
            $output .=  html_writer::start_tag('li',['class' => 'nav-item label-item', 'data-label'=>$modnum]);
            $output .= html_writer::start_tag('div', ['class'=> 'd-flex flex-row label-header align-items-center']);
            // $output .= html_writer::start_tag('a',['href' => "#label{$modnum}",'class' => "nav-link label-link", 'aria-controls' => "label{$modnum}"]);
            $output .= html_writer::tag('span', '', ['class' => 'label-icon d-inline-flex justify-content-center align-items-center '.$liconClass, 'style' => $liconStyle]);
            $output .= html_writer::start_tag('div', ['class'=> 'd-flex flex-column']);
            $output .= html_writer::tag('span', $content[1], ['class'=>'label-title']);
            $output .= html_writer::end_tag('div');
            // $output .= html_writer::end_tag('a');
            $output .= html_writer::end_tag('div');
            $output .= html_writer::end_tag('li');

            // first test render - for reference
            // $output .= "<div class = 'label_item' id='label_{$modnum}'>";
            // $output .= $content[1];
            // $output .= "&nbsp;<div class='licon' style='background: url({$licon}) no-repeat; background-size: contain;'></div>";
            // $output .= "</div>";
        }

        return $output;
    }

    /**
     * Function to render labels content on the course page
     * @param stdClass $course course object
     * @param int|stdClass|section_info $section relative section number or section object
     * @return str Output of the labels content
     */
    public function labels_content($course, $section) {
        $labels = $this->get_section_labels($course, $section);
        $output = '';
        foreach ($labels as $modnum => $content) {

            $output .= html_writer::tag('div', $content[3], ['id' => "label{$modnum}", 'class' => 'label-content d-none', 'role' => 'label content', 'data-label-content' => $modnum ]);

            // first test render - for reference
            // $output .= "<div class = 'label_content' id='label_content_{$modnum}'>";
            // $output .= $content[3];
            // $output .= "</div>";
        }

        return $output;
    }


}
