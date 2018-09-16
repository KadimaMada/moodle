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

require_once($CFG->dirroot. '/course/format/topics/lib.php');

/**
 * format_buttons
 *
 * @package    format_buttons
 * @author     Rodrigo Brandão (rodrigobrandao.com.br)
 * @copyright  2017 Rodrigo Brandão
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class format_buttons extends format_topics
{

    /**
     * course_format_options
     *
     * @param bool $foreditform
     * @return array
     */
    public function course_format_options($foreditform = false)
    {
        global $PAGE;
        static $courseformatoptions = false;
        if ($courseformatoptions === false) {
            $courseconfig = get_config('moodlecourse');
            // SG - Add course options for format_buttons
            $courseformatoptions['course_descr_bg_color'] = array(
                'default' => '#7af2ff',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['section_menu_bg_color'] = array(
                'default' => '#ddd',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['section_menu_font_color'] = array(
                'default' => '#000',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['section_menu_icon_color'] = array(
                'default' => '#000',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['section_menu_info_arrows_color'] = array(
                'default' => '#7bc0de',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['selected_section_bg_color'] = array(
                'default' => '#fff',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['selected_section_font_color'] = array(
                'default' => '#000',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['selected_section_icon_color'] = array(
                'default' => '#000',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['label_menu_bg_color'] = array(
                'default' => '#7af2ff',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['label_menu_font_color'] = array(
                'default' => '#000',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['label_menu_icon_color'] = array(
                'default' => '#000',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['label_menu_arrows_color'] = array(
                'default' => '#7bc0de',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['selected_label_bg_color'] = array(
                'default' => '#85c7ce',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['selected_label_font_color'] = array(
                'default' => '#000',
                'type' => PARAM_RAW,
            );
            $courseformatoptions['selected_label_icon_color'] = array(
                'default' => '#000',
                'type' => PARAM_RAW,
            );



            $courseformatoptions['numsections'] = array(
                'default' => $courseconfig->numsections,
                'type' => PARAM_INT,
            );
            $courseformatoptions['hiddensections'] = array(
                'default' => $courseconfig->hiddensections,
                'type' => PARAM_INT,
            );
            $courseformatoptions['showdefaultsectionname'] = array(
                'default' => get_config('format_buttons', 'showdefaultsectionname'),
                'type' => PARAM_INT,
            );
            $courseformatoptions['sectionposition'] = array(
                'default' => get_config('format_buttons', 'sectionposition'),
                'type' => PARAM_INT,
            );
            $courseformatoptions['inlinesections'] = array(
                'default' => get_config('format_buttons', 'inlinesections'),
                'type' => PARAM_INT,
            );
            $courseformatoptions['sequential'] = array(
                'default' => get_config('format_buttons', 'sequential'),
                'type' => PARAM_INT,
            );
            $courseformatoptions['sectiontype'] = array(
                'default' => get_config('format_buttons', 'sectiontype'),
                'type' => PARAM_TEXT,
            );
            $courseformatoptions['buttonstyle'] = array(
                'default' => get_config('format_buttons', 'buttonstyle'),
                'type' => PARAM_TEXT,
            );
            for ($i = 1; $i <= 12; $i++) {
                $divisortext = get_config('format_buttons', 'divisortext'.$i);
                if (!$divisortext) {
                    $divisortext = '';
                }
                $courseformatoptions['divisortext'.$i] = array(
                    'default' => $divisortext,
                    'type' => PARAM_TEXT,
                );
                $courseformatoptions['divisor'.$i] = array(
                    'default' => get_config('format_buttons', 'divisor'.$i),
                    'type' => PARAM_INT,
                );
            }
            $colorcurrent = get_config('format_buttons', 'colorcurrent');
            if (!$colorcurrent) {
                $colorcurrent = '';
            }
            $courseformatoptions['colorcurrent'] = array(
                'default' => $colorcurrent,
                'type' => PARAM_TEXT,
            );
            $colorvisible = get_config('format_buttons', 'colorvisible');
            if (!$colorvisible) {
                $colorvisible = '';
            }
            $courseformatoptions['colorvisible'] = array(
                'default' => $colorvisible,
                'type' => PARAM_TEXT,
            );
        }
        if ($foreditform && !isset($courseformatoptions['coursedisplay']['label'])) {

            // SG - Add course options for format_buttons
            $courseformatoptionsedit['course_descr_bg_color'] = array(
                'label' => get_string('course_descr_bg_color', 'format_buttons'),
                'element_type' => 'text',
                //'element_color' => true // SG - option for $this->create_edit_form_elements. TOREMOVE lately
            );
            $courseformatoptionsedit['section_menu_bg_color'] = array(
                'label' => get_string('section_menu_bg_color', 'format_buttons'),
                'element_type' => 'text',
            );
            $courseformatoptionsedit['section_menu_font_color'] = array(
                'label' => get_string('section_menu_font_color', 'format_buttons'),
                'element_type' => 'text',
            );
            $courseformatoptionsedit['section_menu_icon_color'] = array(
                'label' => get_string('section_menu_icon_color', 'format_buttons'),
                'element_type' => 'text',
            );
            $courseformatoptionsedit['section_menu_info_arrows_color'] = array(
                'label' => get_string('section_menu_info_arrows_color', 'format_buttons'),
                'element_type' => 'text',
            );
            $courseformatoptionsedit['selected_section_bg_color'] = array(
                'label' => get_string('selected_section_bg_color', 'format_buttons'),
                'element_type' => 'text',
            );
            $courseformatoptionsedit['selected_section_font_color'] = array(
                'label' => get_string('selected_section_font_color', 'format_buttons'),
                'element_type' => 'text',
            );
            $courseformatoptionsedit['selected_section_icon_color'] = array(
                'label' => get_string('selected_section_icon_color', 'format_buttons'),
                'element_type' => 'text',
            );
            $courseformatoptionsedit['label_menu_bg_color'] = array(
                'label' => get_string('label_menu_bg_color', 'format_buttons'),
                'element_type' => 'text',
            );
            $courseformatoptionsedit['label_menu_font_color'] = array(
                'label' => get_string('label_menu_font_color', 'format_buttons'),
                'element_type' => 'text',
            );
            $courseformatoptionsedit['label_menu_icon_color'] = array(
                'label' => get_string('label_menu_icon_color', 'format_buttons'),
                'element_type' => 'text',
            );
            $courseformatoptionsedit['label_menu_arrows_color'] = array(
                'label' => get_string('label_menu_arrows_color', 'format_buttons'),
                'element_type' => 'text',
            );
            $courseformatoptionsedit['selected_label_bg_color'] = array(
                'label' => get_string('selected_label_bg_color', 'format_buttons'),
                'element_type' => 'text',
            );
            $courseformatoptionsedit['selected_label_font_color'] = array(
                'label' => get_string('selected_label_font_color', 'format_buttons'),
                'element_type' => 'text',
            );
            $courseformatoptionsedit['selected_label_icon_color'] = array(
                'label' => get_string('selected_label_icon_color', 'format_buttons'),
                'element_type' => 'text',
            );


            $courseconfig = get_config('moodlecourse');
            $max = $courseconfig->maxsections;
            if (!isset($max) || !is_numeric($max)) {
                $max = 52;
            }
            $sectionmenu = array();
            for ($i = 0; $i <= $max; $i++) {
                $sectionmenu[$i] = "$i";
            }
            $courseformatoptionsedit['numsections'] = array(
                'label' => new lang_string('numberweeks'),
                'element_type' => 'select',
                'element_attributes' => array($sectionmenu),
            );
            $courseformatoptionsedit['hiddensections'] = array(
                'label' => new lang_string('hiddensections'),
                'help' => 'hiddensections',
                'help_component' => 'moodle',
                'element_type' => 'select',
                'element_attributes' => array(
                    array(
                        0 => new lang_string('hiddensectionscollapsed'),
                        1 => new lang_string('hiddensectionsinvisible')
                    )
                ),
            );
            $courseformatoptionsedit['showdefaultsectionname'] = array(
                'label' => get_string('showdefaultsectionname', 'format_buttons'),
                'help' => 'showdefaultsectionname',
                'help_component' => 'format_buttons',
                'element_type' => 'select',
                'element_attributes' => array(
                    array(
                        1 => get_string('yes', 'format_buttons'),
                        0 => get_string('no', 'format_buttons'),
                    ),
                ),
            );
            $courseformatoptionsedit['sectionposition'] = array(
                'label' => get_string('sectionposition', 'format_buttons'),
                'help' => 'sectionposition',
                'help_component' => 'format_buttons',
                'element_type' => 'select',
                'element_attributes' => array(
                    array(
                        0 => get_string('above', 'format_buttons'),
                        1 => get_string('below', 'format_buttons'),
                    ),
                ),
            );
            $courseformatoptionsedit['inlinesections'] = array(
                'label' => get_string('inlinesections', 'format_buttons'),
                'help' => 'inlinesections',
                'help_component' => 'format_buttons',
                'element_type' => 'select',
                'element_attributes' => array(
                    array(
                        1 => get_string('yes', 'format_buttons'),
                        0 => get_string('no', 'format_buttons'),
                    ),
                ),
            );
            $courseformatoptionsedit['sequential'] = array(
                'label' => get_string('sequential', 'format_buttons'),
                'help_component' => 'format_buttons',
                'element_type' => 'select',
                'element_attributes' => array(
                    array(
                        0 => get_string('notsequentialdesc', 'format_buttons'),
                        1 => get_string('sequentialdesc', 'format_buttons'),
                    ),
                ),
            );
            $courseformatoptionsedit['sectiontype'] = array(
                'label' => get_string('sectiontype', 'format_buttons'),
                'help_component' => 'format_buttons',
                'element_type' => 'select',
                'element_attributes' => array(
                    array(
                        'numeric' => get_string('numeric', 'format_buttons'),
                        'roman' => get_string('roman', 'format_buttons'),
                        'alphabet' => get_string('alphabet', 'format_buttons'),
                    ),
                ),
            );
            $courseformatoptionsedit['buttonstyle'] = array(
                'label' => get_string('buttonstyle', 'format_buttons'),
                'help_component' => 'format_buttons',
                'element_type' => 'select',
                'element_attributes' => array(
                    array(
                        'circle' => get_string('circle', 'format_buttons'),
                        'square' => get_string('square', 'format_buttons'),
                    ),
                ),
            );
            for ($i = 1; $i <= 12; $i++) {
                $courseformatoptionsedit['divisortext'.$i] = array(
                    'label' => get_string('divisortext', 'format_buttons', $i),
                    'help' => 'divisortext',
                    'help_component' => 'format_buttons',
                    'element_type' => 'text',
                );
                $courseformatoptionsedit['divisor'.$i] = array(
                    'label' => get_string('divisor', 'format_buttons', $i),
                    'help' => 'divisortext',
                    'help_component' => 'format_buttons',
                    'element_type' => 'select',
                    'element_attributes' => array($sectionmenu),
                );
            }
            $courseformatoptionsedit['colorcurrent'] = array(
                'label' => get_string('colorcurrent', 'format_buttons'),
                'help' => 'colorcurrent',
                'help_component' => 'format_buttons',
                'element_type' => 'text',
            );
            $courseformatoptionsedit['colorvisible'] = array(
                'label' => get_string('colorvisible', 'format_buttons'),
                'help' => 'colorvisible',
                'help_component' => 'format_buttons',
                'element_type' => 'text',
            );
            $courseformatoptions = array_merge_recursive($courseformatoptions, $courseformatoptionsedit);
        }
        return $courseformatoptions;
    }

    /**
     * update_course_format_options
     *
     * @param stdclass|array $data
     * @param stdClass $oldcourse
     * @return bool
     */
    public function update_course_format_options($data, $oldcourse = null)
    {
        global $DB;
        $data = (array)$data;
        if ($oldcourse !== null) {
            $oldcourse = (array)$oldcourse;
            $options = $this->course_format_options();
            foreach ($options as $key => $unused) {
                if (!array_key_exists($key, $data)) {
                    if (array_key_exists($key, $oldcourse)) {
                        $data[$key] = $oldcourse[$key];
                    } elseif ($key === 'numsections') {
                        $maxsection = $DB->get_field_sql('SELECT max(section) from
                        {course_sections} WHERE course = ?', array($this->courseid));
                        if ($maxsection) {
                            $data['numsections'] = $maxsection;
                        }
                    }
                }
            }
        }
        $changed = $this->update_format_options($data);
        if ($changed && array_key_exists('numsections', $data)) {
            $numsections = (int)$data['numsections'];
            $maxsection = $DB->get_field_sql('SELECT max(section) from {course_sections}
                        WHERE course = ?', array($this->courseid));
            for ($sectionnum = $maxsection; $sectionnum > $numsections; $sectionnum--) {
                if (!$this->delete_section($sectionnum, false)) {
                    break;
                }
            }
        }
        return $changed;
    }

    /**
     * get_view_url
     *
     * @param int|stdclass $section
     * @param array $options
     * @return null|moodle_url
     */
    public function get_view_url($section, $options = array())
    {
        global $CFG;
        $course = $this->get_course();
        $url = new moodle_url('/course/view.php', array('id' => $course->id));

        $sr = null;
        if (array_key_exists('sr', $options)) {
            $sr = $options['sr'];
        }
        if (is_object($section)) {
            $sectionno = $section->section;
        } else {
            $sectionno = $section;
        }
        if ($sectionno !== null) {
            if ($sr !== null) {
                if ($sr) {
                    $usercoursedisplay = COURSE_DISPLAY_MULTIPAGE;
                    $sectionno = $sr;
                } else {
                    $usercoursedisplay = COURSE_DISPLAY_SINGLEPAGE;
                }
            } else {
                $usercoursedisplay = 0;
            }
            if ($sectionno != 0 && $usercoursedisplay == COURSE_DISPLAY_MULTIPAGE) {
                $url->param('section', $sectionno);
            } else {
                if (empty($CFG->linkcoursesections) && !empty($options['navigation'])) {
                    return null;
                }
                $url->set_anchor('section-'.$sectionno);
            }
        }
        return $url;
    }

    /**
     * Returns the display name of the given section that the course prefers and icon name / fa class.
     *
     * Use section name is specified by user. Otherwise use default ("Topic #")
     *
     * @param int|stdClass $section Section object from database or just field section.section
     * @return array  Array: [0] - raw name or empty, [1] - section name, [2] - icon name / fa class
     */
    public function get_section_name_and_icon($section) {
        $section = $this->get_section($section);
        if ((string)$section->name !== '') {
            $sectionnamearr = $this->parse_section_name($section->name);
            $sectionnamearr[1] = format_string($sectionnamearr[1], true,
                    array('context' => context_course::instance($this->courseid)));
            return $sectionnamearr;
        } else {
            $sectionnamearr = array();
            $sectionnamearr[1] = $this->get_default_section_name($section);
            $sectionnamearr[2] = 'fa-cog'; // set the default icon name here (for default section name)
            return $sectionnamearr;
        }
    }

    /**
     * Parse section name to divide it for section name and icon name
     *
     * @param str Raw string name from DB
     * @return array Array: [0] - raw name, [1] - section name, [2] - icon name / fa class
     */
    public function parse_section_name($sectionnameraw) {

        $reg = '/(.*?)\{\{(.*?)\}\}/im'; // SG - regexp 20180830 - 'sectionname {{icon}}'
        preg_match($reg, $sectionnameraw, $sectionnamearr);

        return $sectionnamearr; // 0 - raw name, 1 - section name, 2 - icon name
    }

    /**
     * Adds format options elements to the course/section edit form.
     *
     * This function is called from {@link course_edit_form::definition_after_data()}.
     *
     * @param MoodleQuickForm $mform form the elements are added to.
     * @param bool $forsection 'true' if this is a section edit form, 'false' if this is course edit form.
     * @return array array of references to the added form elements.
     */
    public function create_edit_form_elements(&$mform, $forsection = false) {
        global $COURSE, $PAGE;

        //SG - code examples (alternative function realization). Let it be here for a while. TOREMOVE lately
        /*
        //$elements = parent::create_edit_form_elements($mform, $forsection);
        //print_object($this->course_format_options(true));

        //print_object($elements);
        // foreach ($elements as $arr => $element) {
        //     if (get_class($element) === 'MoodleQuickForm_text'){

        //         print_object($element);
        //     }
        // }

        // SG - show already uploaded picturelink image in filemanager
        $context = context_course::instance($COURSE->id);
        $picturelinkimagedraftid = file_get_submitted_draft_itemid('picturelinkimage');
        file_prepare_draft_area($picturelinkimagedraftid, $context->id, 'format_picturelink', 'picturelinkimage', $COURSE->id,
                        array('subdirs' => false));
        $mform->setDefault('picturelinkimage', $picturelinkimagedraftid);

        // SG - allow only 1 file upload - ugly hack
        foreach ($elements as $arr => $element) {
            if (get_class($element) === 'MoodleQuickForm_filemanager'){
                $element->setMaxfiles(1);
                $element->setSubdirs(false);
            }
        }
        */

        $elements = array();
        if ($forsection) {
            $options = $this->section_format_options(true);
        } else {
            $options = $this->course_format_options(true);
        }
        foreach ($options as $optionname => $option) {
            if (!isset($option['element_type'])) {
                $option['element_type'] = 'text';
            }
            $args = array($option['element_type'], $optionname, $option['label']);
            if (!empty($option['element_attributes'])) {
                $args = array_merge($args, $option['element_attributes']);
            }
            $elements[] = call_user_func_array(array($mform, 'addElement'), $args);
            if (isset($option['help'])) {
                $helpcomponent = 'format_'. $this->get_format();
                if (isset($option['help_component'])) {
                    $helpcomponent = $option['help_component'];
                }
                $mform->addHelpButton($optionname, $option['help'], $helpcomponent);
            }
            if (isset($option['type'])) {
                $mform->setType($optionname, $option['type']);
            }
            if (isset($option['default']) && !array_key_exists($optionname, $mform->_defaultValues)) {
                // Set defaults for the elements in the form.
                // Since we call this method after set_data() make sure that we don't override what was already set.
                $mform->setDefault($optionname, $option['default']);
            }
            // SG - tryed to add native color picker here. Have a problem with html semantic in js. TOREMOVE letely
            //if (isset($option['element_color'])) {
                //$PAGE->requires->js_init_call('M.util.init_colour_picker', array('id_'.$optionname, array('selector'=>'.fitem', 'style'=>'backgroundColor')));
                //$elements[] = call_user_func_array(array($mform, 'addElement'), array('html', '<div class="admin_colourpicker"></div>'));
                //$mform->addElement('html', '<div class="admin_colourpicker"></div>');
            //}
        }

        if (!$forsection && empty($this->courseid)) {
            // Check if course end date form field should be enabled by default.
            // If a default date is provided to the form element, it is magically enabled by default in the
            // MoodleQuickForm_date_time_selector class, otherwise it's disabled by default.
            if (get_config('moodlecourse', 'courseenddateenabled')) {
                // At this stage (this is called from definition_after_data) course data is already set as default.
                // We can not overwrite what is in the database.
                $mform->setDefault('enddate', $this->get_default_course_enddate($mform));
            }
        }

        return $elements;
    }

}

/**
 * Implements callback inplace_editable() allowing to edit values in-place
 *
 * @param string $itemtype
 * @param int $itemid
 * @param mixed $newvalue
 * @return \core\output\inplace_editable
 */
function format_buttons_inplace_editable($itemtype, $itemid, $newvalue)
{
    global $DB, $CFG;
    require_once($CFG->dirroot . '/course/lib.php');
    if ($itemtype === 'sectionname' || $itemtype === 'sectionnamenl') {
        $section = $DB->get_record_sql(
            'SELECT s.* FROM {course_sections} s JOIN {course} c ON s.course = c.id WHERE s.id = ? AND c.format = ?',
            array($itemid, 'buttons'),
            MUST_EXIST
        );
        return course_get_format($section->course)->inplace_editable_update_section_name($section, $itemtype, $newvalue);
    }
}
