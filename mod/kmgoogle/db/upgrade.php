<?php
// This file keeps track of upgrades to
// the kmgoogle module
//
// Sometimes, changes between versions involve
// alterations to database structures and other
// major things that may break installations.
//
// The upgrade function in this file will attempt
// to perform all the necessary actions to upgrade
// your older installation to the current version.
//
// If there's something it cannot do itself, it
// will tell you what you need to do.
//
// The commands in here will all be database-neutral,
// using the methods of database_manager class
//
// Please do not forget to use upgrade_set_timeout()
// before any action that may take longer time to finish.

defined('MOODLE_INTERNAL') || die();

function xmldb_kmgoogle_upgrade($oldversion) {
    global $DB;

    $dbman = $DB->get_manager(); // Loads ddl manager and xmldb classes.

    if ($oldversion < 2018051402) {
        $table = new xmldb_table('kmgoogle');
        $field = new xmldb_field('googlefolder', XMLDB_TYPE_CHAR, '255', null, null, null, null, 'copiedgoogleurl');

        // Conditionally launch add field completionpass.
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
    }

    if ($oldversion < 2018051404) {
        if (!$dbman->table_exists('kmgoogle_answers')) {
            $table = new xmldb_table('kmgoogle_answers');

            $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
            $table->add_field('instanceid', XMLDB_TYPE_INTEGER, '10', null, null, null, null);
            $table->add_field('userid', XMLDB_TYPE_INTEGER, '10', null, null, null, null);
            $table->add_field('url', XMLDB_TYPE_TEXT, null, null, null, null, null);
            $table->add_field('timecreated', XMLDB_TYPE_INTEGER, '20', null, null, null, null);
            $table->add_field('timemodified', XMLDB_TYPE_INTEGER, '20', null, null, null, null);
            $table->add_key('primary', XMLDB_KEY_PRIMARY, array('id'));

            $dbman->create_table($table);

            //Set indexes
            $index_instanceid = new xmldb_index('instanceid', XMLDB_INDEX_NOTUNIQUE, array('instanceid'));
            $dbman->add_index($table, $index_instanceid);

            $index_userid = new xmldb_index('userid', XMLDB_INDEX_NOTUNIQUE, array('userid'));
            $dbman->add_index($table, $index_userid);
        }
    }

    if ($oldversion < 2018051405) {
        if ($dbman->table_exists('kmgooglepermission')) {
            $table = new xmldb_table('kmgooglepermission');
            $dbman->drop_table($table);
        }


        if (!$dbman->table_exists('kmgoogle_permission')) {
            $table = new xmldb_table('kmgoogle_permission');

            $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
            $table->add_field('instanceid', XMLDB_TYPE_INTEGER, '10', null, true, false, 0);
            $table->add_field('userid', XMLDB_TYPE_INTEGER, '10', null, true, false, 0);
            $table->add_field('permission', XMLDB_TYPE_CHAR, '20', null, true, false, null);
            $table->add_field('url', XMLDB_TYPE_TEXT, null, null, true, false, null);
            $table->add_field('ifgdupdated', XMLDB_TYPE_INTEGER, '2', null, true, false, 0);
            $table->add_field('timecreated', XMLDB_TYPE_INTEGER, '20', null, true, false, 0);
            $table->add_field('timemodified', XMLDB_TYPE_INTEGER, '20', null, true, false, 0);
            $table->add_key('primary', XMLDB_KEY_PRIMARY, array('id'));

            $dbman->create_table($table);

            //Set indexes
            $index_instanceid = new xmldb_index('instanceid', XMLDB_INDEX_NOTUNIQUE, array('instanceid'));
            $dbman->add_index($table, $index_instanceid);

            $index_userid = new xmldb_index('userid', XMLDB_INDEX_NOTUNIQUE, array('userid'));
            $dbman->add_index($table, $index_userid);
        }
    }

    if ($oldversion < 2018051406) {
        $table = new xmldb_table('kmgoogle');
        $field1 = new xmldb_field('firstfolder', XMLDB_TYPE_CHAR, '255', null, null, null, null);
        $field2 = new xmldb_field('secondfolder', XMLDB_TYPE_CHAR, '255', null, null, null, null);

        // Conditionally launch add field completionpass.
        if ($dbman->field_exists($table, $field1)) {
            $dbman->drop_field($table, $field1);
        }

        if ($dbman->field_exists($table, $field2)) {
            $dbman->drop_field($table, $field2);
        }

        $field3 = new xmldb_field('namefile', XMLDB_TYPE_CHAR, '255', null, true, null, null, 'introformat');
        if (!$dbman->field_exists($table, $field3)) {
            $dbman->add_field($table, $field3);
        }

        $field4 = new xmldb_field('googlefolder', XMLDB_TYPE_CHAR, '255', null, null, null, null);
        if ($dbman->field_exists($table, $field4)) {
            $dbman->drop_field($table, $field4);
        }

        $field5 = new xmldb_field('googlefolderurl', XMLDB_TYPE_CHAR, '255', null, true, null, null, 'copiedgoogleurl');
        if (!$dbman->field_exists($table, $field5)) {
            $dbman->add_field($table, $field5);
        }

    }

    if ($oldversion < 2018051407) {
        $table = new xmldb_table('kmgoogle_permission');

        $field = new xmldb_field('permissionid', XMLDB_TYPE_CHAR, '255', null, true, null, null, 'permission');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
    }

    if ($oldversion < 2018051408) {
        $table = new xmldb_table('kmgoogle');

        $field = new xmldb_field('datelastsubmit', XMLDB_TYPE_INTEGER, '10', null, true, null, 0, 'studenttoclick');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
    }

    if ($oldversion < 2018051409) {
        $table = new xmldb_table('kmgoogle');

        $field = new xmldb_field('buttonhtml', XMLDB_TYPE_TEXT, null, null, false, null, null, 'targetiframe');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
    }

    if ($oldversion < 2018051410) {
        $table = new xmldb_table('kmgoogle');

        $field = new xmldb_field('buttonhtmlformat', XMLDB_TYPE_INTEGER, '4', null, false, null, null, 'buttonhtml');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
    }

    if ($oldversion < 2018051411) {
        $table = new xmldb_table('kmgoogle');

        $field1 = new xmldb_field('sourcegoogleurl', XMLDB_TYPE_TEXT, null, null, XMLDB_NOTNULL, null, '', 'namefile');
        $dbman->change_field_type($table, $field1);

        $field2 = new xmldb_field('copiedgoogleurl', XMLDB_TYPE_TEXT, null, null, XMLDB_NOTNULL, null, '', 'sourcegoogleurl');
        $dbman->change_field_type($table, $field2);

        $field3 = new xmldb_field('googlefolderurl', XMLDB_TYPE_TEXT, null, null, XMLDB_NOTNULL, null, '', 'copiedgoogleurl');
        $dbman->change_field_type($table, $field3);

    }

    if ($oldversion < 2018051412) {
        $table = new xmldb_table('kmgoogle_answers');

        $field = new xmldb_field('counter', XMLDB_TYPE_INTEGER, '10', null, true, null, 0, 'url');
        if (!$dbman->field_exists($table, $field)) {
            $dbman->add_field($table, $field);
        }
    }

    return true;
}
