<?php
 
function xmldb_format_kmbuttons_upgrade($oldversion) {
    global $CFG, $DB;

    $dbman = $DB->get_manager();
 
    if ($oldversion < 2018101002) {

        // Define table format_kmbuttons_userstate to be created.
        $table = new xmldb_table('format_kmbuttons_userstate');

        // Adding fields to table format_kmbuttons_userstate.
        $table->add_field('id', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, XMLDB_SEQUENCE, null);
        $table->add_field('userid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
        $table->add_field('courseid', XMLDB_TYPE_INTEGER, '10', null, XMLDB_NOTNULL, null, null);
        $table->add_field('section', XMLDB_TYPE_INTEGER, '10', null, null, null, null);
        $table->add_field('cmid', XMLDB_TYPE_INTEGER, '10', null, null, null, null);

        // Adding keys to table format_kmbuttons_userstate.
        $table->add_key('primary', XMLDB_KEY_PRIMARY, array('id'));

        // Conditionally launch create table for format_kmbuttons_userstate.
        if (!$dbman->table_exists($table)) {
            $dbman->create_table($table);
        }

        // kmbuttons savepoint reached.
        upgrade_plugin_savepoint(true, 2018101002, 'format', 'kmbuttons');
    }
        
    $result = TRUE;
 
    return $result;
}
?>