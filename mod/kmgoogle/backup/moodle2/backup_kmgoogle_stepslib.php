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
 * Define all the backup steps that will be used by the backup_kmgoogle_activity_task
 *
 * @package   mod_kmgoogle
 * @copyright 2012 NetSpot {@link http://www.netspot.com.au}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/mod/kmgoogle/modlib.php');

/**
 * Define the complete choice structure for backup, with file and id annotations
 *
 * @package   mod_kmgoogle
 * @copyright 2012 NetSpot {@link http://www.netspot.com.au}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class backup_kmgoogle_activity_structure_step extends backup_activity_structure_step {

    /**
     * Define the structure for the kmgoogle activity
     * @return void
     */
    protected function define_structure() {

        // Define each element separated.
        $kmgoogle = new backup_nested_element('kmgoogle', array('id'),
                                            array('course',
                                                  'name',
                                                  'intro',
                                                  'introformat',
                                                  'namefile',
                                                  'sourcegoogleurl',
                                                  'copiedgoogleurl',
                                                  'googlefolderurl',
                                                  'ififrame',
                                                  'iframewidth',
                                                  'iframeheight',
                                                  'targetiframe',
                                                  'association',
                                                  'associationname',
                                                  'permissions',
                                                  'sendtoteacher',
                                                  'natureofserving',
                                                  'studenttoclick',
                                                  'datelastsubmit',
                                                  'studentconsent',
                                                  'submitmechanism',
                                                  'numberattempts',
                                                  'completionsubmit'));

        // Define sources.
        $kmgoogle->set_source_table('kmgoogle', array('id' => backup::VAR_ACTIVITYID));

        // Return the root element (choice), wrapped into standard activity structure.
        return $this->prepare_activity_structure($kmgoogle);
    }
}
