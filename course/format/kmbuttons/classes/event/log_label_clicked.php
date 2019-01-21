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
 * The storylinedata ajaxdata_saved event.
 *
 * @package    format_kmbuttons
 * @copyright  2018 Devlion Team
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
namespace format_kmbuttons\event;
defined('MOODLE_INTERNAL') || die();
/**
 * The format_kmbuttons log_label_clicks event class.
 *
 * @property-read array $other {
 *      Extra information about event.
 *       - int courseid 
 *       - string action 
 *       - int userid 
 *       - string value 
 * }
 *
 * @since     Moodle 3.0
 * @copyright 2018 Devlion Team
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 **/
class log_label_clicked extends \core\event\base {
    protected function init() {
        $this->data['crud'] = 'r'; // c(reate), r(ead), u(pdate), d(elete)
        $this->data['edulevel'] = self::LEVEL_PARTICIPATING;
    }
 
    public static function get_name() {
        return get_string('event_log_label_clicked', 'format_kmbuttons');
    }
 
    public function get_description() {
        return "The user with id {$this->userid} clicked on {$this->other['modtype']} with name \"{$this->other['modname']}\" in course with id {$this->courseid}.";
    }
 
    public function get_url() {
        // return new \moodle_url('....', array('parameter' => 'value', ...));
        return null;
    }
 
    public function get_legacy_logdata() {
        // Override if you are migrating an add_to_log() call.
        // return array($this->courseid, 'PLUGINNAME', 'LOGACTION',
        //     '...........',
        //     $this->objectid, $this->contextinstanceid);
        return null;
    }
 
    public static function get_legacy_eventname() {
        // Override ONLY if you are migrating events_trigger() call.
        // return 'MYPLUGIN_OLD_EVENT_NAME';
        return null;
    }
 
    protected function get_legacy_eventdata() {
        // Override if you migrating events_trigger() call.
        // $data = new \stdClass();
        // $data->id = $this->objectid;
        // $data->userid = $this->relateduserid;
        // return $data;
        return null;
    }
}