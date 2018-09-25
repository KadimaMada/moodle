<?php
if (!defined('MOODLE_INTERNAL')) {
    die('Direct access to this script is forbidden.');    ///  It must be included from a Moodle page
}

require_once ($CFG->dirroot.'/course/moodleform_mod.php');

class mod_kmgoogle_mod_form extends moodleform_mod {

    function definition() {
        global $CFG, $DB, $PAGE, $COURSE;

        $PAGE->requires->js_call_amd('mod_kmgoogle/init', 'init', array('courseid' => $COURSE->id, 'instance' => $this->_instance));

        $mform =& $this->_form;

        $strrequired = get_string('required');

        $kmgoogle = $DB->get_record('kmgoogle', array('id' => $this->_instance));

        //Disabled field
        $select_disable = array();
        $input_disable = array();
        $checkbox_disable = array();
        if(kmgoogle_if_users_used_mod()){
            $select_disable = ['class' => 'disable_select'];
            $input_disable =  array("disabled"=>"");
            $checkbox_disable =  array("disabled"=>"");
        }

//-------------------------------------------------------------------------------
        $mform->addElement('header', 'general', get_string('general', 'form'));

        $mform->addElement('text', 'name', get_string('name'), array('size'=>'64'));
        if (!empty($CFG->formatstringstriptags)) {
            $mform->setType('name', PARAM_TEXT);
        } else {
            $mform->setType('name', PARAM_CLEANHTML);
        }
        $mform->addRule('name', null, 'required', null, 'client');

        //Select name of file
        $options = array();
        foreach (kmgoogle_build_select_name_file($COURSE->id) as $name) {
            $options[$name] = $name;
        }
        //$options = array(''=>get_string('choose').'...') + $options;
        $options = array(''=>get_string('default_name', 'kmgoogle')) + $options;
        $mform->addElement('select', 'namefile', get_string("kmgoogleplace", "kmgoogle"), $options, $select_disable);
        //$mform->addRule('namefile', $strrequired, 'required', null, 'client');
        $mform->addHelpButton('namefile', 'kmgoogleplace', 'kmgoogle');

        //Standart intro
        $this->standard_intro_elements(get_string('customintro', 'kmgoogle'));

        //Input Source Google url
        $mform->addElement('text', 'sourcegoogleurl', get_string('sourcegoogleurl', "kmgoogle"), array('size'=>'120') + $input_disable);
        $mform->setType('sourcegoogleurl', PARAM_URL);
        $mform->addRule('sourcegoogleurl', null, 'required', null, 'client');

        //Google Folder
        $mform->addElement('text', 'googlefolderurl', get_string('googlefolder', "kmgoogle"), array('size'=>'120') + $input_disable);
        $mform->setType('googlefolderurl', PARAM_URL);

        //Copied Source Google url
        $mform->addElement('text', 'copiedgoogleurl', get_string('copiedgoogleurl', "kmgoogle"), array('size'=>'120', "readonly"=>""));
        $mform->setType('copiedgoogleurl', PARAM_URL);

        //Display settings
        $mform->addElement('header', 'display', get_string('display', 'kmgoogle'));

        //Checkbox If Iframe
        $mform->addElement('checkbox', 'ififrame', get_string('if_iframe', 'kmgoogle'), ' ');

        //Width Iframe
        $mform->addElement('text', 'iframewidth', get_string('iframewidth', 'kmgoogle'));
        $mform->setType('iframewidth', PARAM_INT);
        $mform->setDefault('iframewidth',600);

        //Height Iframe
        $mform->addElement('text', 'iframeheight', get_string('iframeheight', 'kmgoogle'));
        $mform->setType('iframeheight', PARAM_INT);
        $mform->setDefault('iframeheight',600);

        //Target Iframe
        $options = array('0' => get_string("otherblank", "kmgoogle"),
                         '1' => get_string("sameblank", "kmgoogle"),
                         '2' => get_string("popupblank", "kmgoogle"),
                        );
        $mform->addElement('select', 'targetiframe', get_string("targetiframe", "kmgoogle"), $options);

        $label = get_string("buttonhtml", "kmgoogle");
        $mform->addElement('editor', 'buttonhtml', $label, array('rows' => 10));
        $mform->setType('buttonhtml', PARAM_RAW); // no XSS prevention here, users must be trusted

        //Sharing settings
        $mform->addElement('header', 'sharing', get_string('sharing', 'kmgoogle'));

        //Association Level
        $options = kmgoogle_association_level($COURSE->id);
        $mform->addElement('select', 'association', get_string("association", "kmgoogle"), $options, $select_disable);

        //Primary association's name
        $options = array();
        $mform->addElement('select', 'associationname', get_string("associationname", "kmgoogle"), $options, $select_disable);

        //Set roles
        foreach(kmgoogle_get_roles() as $key=>$name){
            //Primary association's name
            $options = kmgoogle_get_permissions();
            $mform->addElement('select', $name, $name, $options, $select_disable);
        }

        //Serving settings
        $mform->addElement('header', 'serving', get_string('serving', 'kmgoogle'));

        //Checkbox Send for teacher review
        $mform->addElement('checkbox', 'sendtoteacher', get_string('sendtoteacher', 'kmgoogle'), ' ', $checkbox_disable);

        //The nature of serving
        $options = array('0' => get_string("course"),
                         '1' => get_string("activity"),
        );
        $mform->addElement('select', 'natureofserving', get_string("natureofserving", "kmgoogle"), $options, $select_disable);

//        //Requires students to click
//        $options = array('0' => get_string("no"),
//                         '1' => get_string("yes"),
//        );
//        $mform->addElement('select', 'studenttoclick', get_string("studenttoclick", "kmgoogle"), $options, $select_disable);

//        //Student consent is required for the submission statement
//        $options = array('0' => get_string("no"),
//                         '1' => get_string("yes"),
//        );
//        $mform->addElement('select', 'studentconsent', get_string("studentconsent", "kmgoogle"), $options, $select_disable);

        //Submitting mechanism
        $options = array('0' => get_string("automatic", "kmgoogle"),
                         '1' => get_string("manually", "kmgoogle"),
        );
        $mform->addElement('select', 'submitmechanism', get_string("submitmechanism", "kmgoogle"), $options, $select_disable);

        //Disable field
        if(!empty($kmgoogle->submitmechanism) && !$kmgoogle->submitmechanism){
            $input_disable =  array("disabled"=>"");
        }

        //Maximum number of attempts
        $mform->addElement('text', 'numberattempts', get_string('numberattempts', 'kmgoogle'), $input_disable);
        $mform->setType('numberattempts', PARAM_INT);
        $mform->setDefault('numberattempts',10);


        //Standard form elements
        $this->standard_coursemodule_elements();

//-------------------------------------------------------------------------------
        // buttons
        $this->add_action_buttons();
    }

    /**
     * Allows module to modify data returned by get_moduleinfo_data() or prepare_new_moduleinfo_data() before calling set_data()
     * This method is also called in the bulk activity completion form.
     *
     * Only available on moodleform_mod.
     *
     * @param array $default_values passed by reference
     */
    function data_preprocessing(&$default_values){

        //Permissions
        if(isset($default_values['permissions']) && !empty($default_values['permissions'])){
            $permissions = json_decode($default_values['permissions']);
            foreach($permissions as $key=>$name){
                $default_values[$key] = $name;
            }
        }

        //buttonhtml
        if(!empty($default_values['buttonhtml']) && !empty($default_values['buttonhtmlformat'])){
            $tmp['text'] = $default_values['buttonhtml'];
            $tmp['format'] = $default_values['buttonhtmlformat'];
            $default_values['buttonhtml'] = $tmp;
        }
    }

    /**
     * Allows module to modify the data returned by form get_data().
     * This method is also called in the bulk activity completion form.
     *
     * Only available on moodleform_mod.
     *
     * @param stdClass $data the form data to be modified.
     */
    public function data_postprocessing($data) {//echo '<pre>';print_r($data);exit;
        parent::data_postprocessing($data);

        $associationname = optional_param('associationname', 0, PARAM_INT);
        $data->associationname = $associationname;

        $buttonhtml = $data->buttonhtml;
        $data->buttonhtml = $buttonhtml['text'];
        $data->buttonhtmlformat = $buttonhtml['format'];
    }

    /**
     * Add completion rules to form.
     * @return array
     */
//    public function add_completion_rules() {
//        $mform =& $this->_form;
//        $mform->addElement('checkbox', 'completionsubmit', '', get_string('completionsubmit', 'kmgoogle'));
//        // Enable this completion rule by default.
//        $mform->setDefault('completionsubmit', 1);
//        return array('completionsubmit');
//    }

    /**
     * Enable completion rules
     * @param stdclass $data
     * @return array
     */
//    public function completion_rule_enabled($data) {
//        return !empty($data['completionsubmit']);
//    }
}

