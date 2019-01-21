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
 * format_kmbuttons_renderer
 *
 * @package    format_kmbuttons
 * @author     Rodrigo Brandão <rodrigo_brandao@me.com>
 * @copyright  2018 Rodrigo Brandão
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$string['pluginname'] = 'KM buttons format';
$string['currentsection'] = 'This topic';
$string['editsection'] = 'Edit topic';
$string['deletesection'] = 'Delete topic';
$string['sectionname'] = 'Topic';
$string['section0name'] = 'General';
$string['hidefromothers'] = 'Hide topic';
$string['showfromothers'] = 'Show topic';
$string['showdefaultsectionname'] = 'Show the default sections name';
$string['showdefaultsectionname_help'] = 'If no name is set for the section will not show anything.<br>
By definition an unnamed topic is displayed as <strong>Topic [N]</strong>.';
$string['yes'] = 'Yes';
$string['no'] = 'No';
$string['sectionposition'] = 'Section zero position';
$string['sectionposition_help'] = 'The section 0 will appear together the visible section.<br><br>
<strong>Above the list buttons</strong><br>Use this option if you want to add some text or resource before the buttons list.
<i>Example: Define a picture to illustrate the course.</i><br><br><strong>Below the visible section</strong><br>
Use this option if you want to add some text or resource after the visible section.
<i>Example: Resources or links to be displayed regardless of the visible section.</i><br><br>';
$string['above'] = 'Above the list buttons';
$string['below'] = 'Below the visible section';
$string['divisor'] = 'Number of sections to group - {$a}';
$string['divisortext'] = 'Title of the grouping - {$a}';
$string['divisortext_help'] = 'The grouping sections is used to separate section by type or modules.
<i>Example: The course has 10 sections divided into two modules: Theoretical (with 5 sections) and Practical (with 5 sections).<br>
Define the title like "Teorical" and set the number of sections to 5.</i><br><br>
Tip: if you want to use the tag <strong>&lt;br&gt;</strong>, type [br].';
$string['colorcurrent'] = 'Color of the current section button';
$string['colorcurrent_help'] = 'The current section is the section marked with highlight.<br>Define a color in hexadecimal.
<i>Example: #fab747</i><br>If you want to use the default color, leave empty.';
$string['colorvisible'] = 'Color of the visible section button';
$string['colorvisible_help'] = 'The visible section is the selected section.<br>Define a color in hexadecimal.
<i>Example: #747fab</i><br>If you want to use the default color, leave empty.';
$string['editing'] = 'The buttons are disabled while the edit mode is active.';
$string['sequential'] = 'Sequential';
$string['notsequentialdesc'] = 'Each new group begins counting sections from one.';
$string['sequentialdesc'] = 'Count the section numbers ignoring the grouping.';
$string['sectiontype'] = 'List style';
$string['numeric'] = 'Numeric';
$string['roman'] = 'Roman numerals';
$string['alphabet'] = 'Alphabet';
$string['buttonstyle'] = 'Button style';
$string['buttonstyle_help'] = 'Define the shape style of the buttons.';
$string['circle'] = 'Circle';
$string['square'] = 'Square';
$string['inlinesections'] = 'Inline sections';
$string['inlinesections_help'] = 'Give each section a new line.';
$string['event_log_label_clicked'] = 'Label or section viewed';

// Strings for color options
$string['course_descr_bg_color'] = 'Course descripion background color';
$string['section_menu_bg_color'] = 'Section menu background color';
$string['section_menu_font_color'] = 'Section menu font color';
$string['section_menu_icon_color'] = 'Section menu icon color';
$string['section_menu_arrows_color'] = 'Section menu arrows color';
$string['section_menu_arrows_color_hover'] = 'Section menu arrows hover color';
$string['section_menu_info_icon_color'] = 'Section menu info icon color';
$string['section_menu_info_icon_color_hover'] = 'Section menu info icon hover color';
$string['selected_section_bg_color'] = 'Selected section background color';
$string['selected_section_font_color'] = 'Selected section font color';
$string['selected_section_icon_color'] = 'Selected section icon color';
$string['label_menu_bg_color'] = 'Label menu background color';
$string['label_menu_font_color'] = 'Label menu font color';
$string['label_menu_icon_color'] = 'Label menu icon color';
$string['label_menu_arrows_color'] = 'Label menu arrows color';
$string['selected_label_bg_color'] = 'Selected label background color';
$string['selected_label_font_color'] = 'Selected label font color';
$string['selected_label_icon_color'] = 'Selected label icon color';
