<?php
require_once ($CFG->dirroot.'/mod/kmgoogle/classes/BasicDrive.php');
require_once($CFG->dirroot.'/group/lib.php');

//Set global google drive class
$GLOBALS['GoogleDrive'] = new BasicDrive();

function kmgoogle_get_credentials_file() {
    global $CFG;

    $fs = get_file_storage();
    $files = $fs->get_area_files(1, 'mod_kmgoogle', 'kmgoogle', 0, $sort = false, $includedirs = false);

    if (!count($files)) return false;

    foreach($files as $file) {
        $dir1 = substr($file->get_contenthash(), 0, 2);
        $dir2 = substr($file->get_contenthash(), 2, 2);
        return $CFG->dataroot.'/filedir/'.$dir1.'/'.$dir2.'/'.$file->get_contenthash();
    }
}

function kmgoogle_get_groups_on_course($courseid){

    $result = array();
    $groups = groups_get_all_groups($courseid);
    $groups = array_values($groups);

    foreach($groups as $group){
        $result[$group->id] = $group->name;
    }

    return $result;
}

function kmgoogle_get_collections_on_course($courseid){
    global $DB;

    $result = array();

    $collections = groups_get_all_groupings($courseid);
    foreach($collections as $collection){
        $result[$collection->id] = $collection->name;
    }

    return $result;
}

function kmgoogle_get_users_by_course(){
    global $COURSE, $DB;

    $sql = "
        SELECT u.id as userid, CONCAT(u.firstname,' ',u.lastname) as name
        FROM {user} u
        INNER JOIN {role_assignments} ra ON ra.userid = u.id
        INNER JOIN {context} ct ON ct.id = ra.contextid
        INNER JOIN {course} c ON c.id = ct.instanceid
        INNER JOIN {role} r ON r.id = ra.roleid
        WHERE c.id=?
    ";
    $result = $DB->get_records_sql($sql, array($COURSE->id));
    $result = array_values($result);

    return $result;
}

function kmgoogle_get_users_by_group($groupid){
    global $COURSE, $DB;

    $roles = array();
    $result = array();

    if ($groupmemberroles = groups_get_members_by_role($groupid, $COURSE->id, 'u.id, ' . get_all_user_name_fields(true, 'u'))) {
        foreach ($groupmemberroles as $roleid => $roledata) {
            $shortroledata = new stdClass();
            $shortroledata->name = $roledata->name;
            $shortroledata->users = array();
            foreach ($roledata->users as $member) {
                $shortmember = new stdClass();
                $shortmember->userid = $member->id;
                $shortmember->name = fullname($member, true);
                $shortroledata->users[] = $shortmember;
            }
            $roles[] = $shortroledata;
        }
    }

    if(!empty($roles)){
        foreach ($roles as $role) {
            $result = array_merge($result, $role->users);
        }
    }

    return $result;
}

function kmgoogle_get_users_by_collection($collectionid){
    global $DB;

    $result = array();

    $groups = $DB->get_records('groupings_groups', array('groupingid' => $collectionid));
    foreach ($groups as $group) {
        $users = kmgoogle_get_users_by_group($group->groupid);
        $result = array_merge($result, $users);
    }

    return $result;
}

function kmgoogle_build_select_name_file($courseid){
    $result = kmgoogle_get_groups_on_course($courseid);
    $result = array_merge(kmgoogle_get_collections_on_course($courseid), $result);

    $obj = get_course($courseid);
    //$result[] = $obj->fullname;
    $result[] = $obj->shortname;

    return $result;
}

function kmgoogle_association_level($courseid){
    $result = array();

    $result['course'] = get_string("course");

    if(!empty(kmgoogle_get_groups_on_course($courseid))){
        $result['group'] = get_string("group");
    }

    if(!empty(kmgoogle_get_collections_on_course($courseid))){
        $result['collection'] = get_string("collection", "kmgoogle");
    }

    return $result;
}

function kmgoogle_get_roles(){
    global $DB;

    $exclude = array('frontpage', 'user', 'guest', 'coursecreator');
    $arr = $DB->get_records('role');
    $result = array();
    $lastid = 0;

    foreach($arr as $item){
        if(!in_array($item->shortname, $exclude)){
            $result[$item->id] = $item->shortname;
            $lastid = $item->id;
        }
    }

    //Insert Other student
    $result[$lastid+1] = 'other';
    return $result;
}

function kmgoogle_get_permissions(){
    return array(
        'edit' =>           get_string("edit"),
        'comment' =>        get_string("comment", "kmgoogle"),
        'view' =>           get_string("view"),
        'nopermission' =>   get_string("nopermission", "kmgoogle")
    );
}

function kmgoogle_permissions_grades(){
    return array(
        'edit' =>           1,
        'comment' =>        2,
        'view' =>           3,
        'nopermission' =>   4
    );
}

function kmgoogle_get_users_by_association($kmgoogle){
    //Check if user in selected course or group or collection
    switch ($kmgoogle->association) {
        case 'course':
            $relevantusers = kmgoogle_get_users_by_course();
            break;
        case 'group':
            $relevantusers = kmgoogle_get_users_by_group($kmgoogle->associationname);
            break;
        case 'collection':
            $relevantusers = kmgoogle_get_users_by_collection($kmgoogle->associationname);
            break;
        default:
            $relevantusers = kmgoogle_get_users_by_course();
    }

    $tmp = array();
    foreach($relevantusers as $item){
        $tmp[] = $item->userid;
    }

    return $tmp;
}

function kmgoogle_get_teacher_admin_users(){
    global $DB, $COURSE;

    $tmp = array();

    //Get admins
    $admins = get_admins();
    foreach($admins as $user){
        $tmp[] = $user->id;
    }

    $context = $context = context_course::instance($COURSE->id);
    $users = get_role_users(3 , $context);
    $users = array_merge($users, get_role_users(4 , $context));

    foreach($users as $user){
        $tmp[] = $user->id;
    }

    $tmp = array_unique($tmp);

    return $tmp;
}

function kmgoogle_get_other_users($kmgoogle){
    $courseusers = kmgoogle_get_users_by_course();

    $result = array();
    $users = array();
    $users = array_merge($users, kmgoogle_get_users_by_association($kmgoogle));
    $users = array_merge($users, kmgoogle_get_teacher_admin_users());
    $users = array_unique($users);

    foreach($courseusers as $user){
        if(!in_array($user->userid, $users)){
            $result[] = $user->userid;
        }
    }

    return $result;
}

function kmgoogle_analize_user_permission($id){
    global $DB, $USER, $COURSE, $GoogleDrive;

    $cm = get_coursemodule_from_id('kmgoogle', $id);

    if (! $kmgoogle = $DB->get_record("kmgoogle", array("id" => $cm->instance))) {
        print_error('invalidkmgoogleid', 'kmgoogle');
    }

    $tmp = array();
    $tmp = array_merge($tmp, kmgoogle_get_users_by_association($kmgoogle));
    $tmp = array_merge($tmp, kmgoogle_get_teacher_admin_users());
    $tmp = array_merge($tmp, kmgoogle_get_other_users($kmgoogle));
    $tmp = array_unique($tmp);

    if(!in_array($USER->id, $tmp)){
        $objdelete = $DB->get_record("kmgoogle_permission", array("instanceid" => $cm->instance, "userid" => $USER->id));

        if(!empty($objdelete)){
            $DB->delete_records('kmgoogle_permission', array('id' => $objdelete->id));
        }

        return true;
    }

    $permission_admin = json_decode($kmgoogle->permissions);

    //Not other user
    if(!in_array($USER->id, kmgoogle_get_other_users($kmgoogle))) {
        //Check roles
        $context = context_course::instance($cm->course);
        $roles = get_user_roles($context, $USER->id);
        $grades = kmgoogle_permissions_grades();

        //Check permission grades
        $permission_roles = array();
        foreach ($roles as $role) {
            $shortname = $role->shortname;
            $num = $grades[$permission_admin->$shortname];
            $permission_roles[$num] = $permission_admin->$shortname;

        }

        ksort($permission_roles);
        $permission_roles = array_values($permission_roles);

        if (!empty($permission_roles)) {
            $current_permission = $permission_roles[0];
        } else {
            $current_permission = 'view';
        }
    }else{
        $current_permission = $permission_admin->other;
    }

    $fileID = $GoogleDrive->getFileIdFromGoogleUrl($kmgoogle->copiedgoogleurl);

    $row = $DB->get_record('kmgoogle_permission', array('instanceid' => $kmgoogle->id, 'userid' => $USER->id));
    if($row){
        if($row->permission != $current_permission){
            $permissionId = $GoogleDrive->setPermissionForUser($USER->id, $current_permission, $fileID, $row->permissionid);
            $row->permission = $current_permission;
            $row->permissionid = $permissionId;
            $DB->update_record('kmgoogle_permission', $row);
        }

    }else{
        $permissionId = $GoogleDrive->setPermissionForUser($USER->id, $current_permission, $fileID);

        $obj = new \stdClass();
        $obj->instanceid = $kmgoogle->id;
        $obj->userid = $USER->id;
        $obj->permission = $current_permission;
        $obj->permissionid = $permissionId;
        $obj->url = $kmgoogle->copiedgoogleurl;
        $obj->ifgdupdated = 1;
        $obj->timecreated = time();
        $obj->timemodified = time();

        $DB->insert_record('kmgoogle_permission', $obj);
    }

    return true;
}

function no_permission_for_user($instanceid){
    global $DB, $USER, $COURSE;

    //Check permission
    $permission = $DB->get_record("kmgoogle_permission", array("instanceid" => $instanceid, "userid" => $USER->id));

    if(empty($permission) || $permission->permission == 'nopermission'){
        return true;
    }

    return false;
}

function user_can_answer($instanceid){
    global $DB, $USER, $COURSE;

    $kmgoogle = $DB->get_record("kmgoogle", array("id" => $instanceid));

    //If admin or teacher
    $arrteachers = kmgoogle_get_teacher_admin_users();
    if(in_array($USER->id, $arrteachers)){
        return false;
    }

    //If other students
    $arrotherstudents = kmgoogle_get_other_users($kmgoogle);
    if(in_array($USER->id, $arrotherstudents)){
        return false;
    }

    //If sendtoteacher disable
    if(!$kmgoogle->sendtoteacher){
        return false;
    }



    //If student needed click
//    if(!$kmgoogle->studenttoclick || $kmgoogle->datelastsubmit <= time()) {
//        return false;
//    }

//    $permission = $DB->get_record("kmgoogle_permission", array("instanceid" => $instanceid, "userid" => $USER->id));
//    if(empty($permission) || $permission->permission == 'nopermission' || $permission->permission == 'view'){
//        return false;
//    }

    $isstudent = false;
    $roles = get_user_roles(context_course::instance($COURSE->id), $USER->id, false);
    foreach ($roles as $role) {
        if ($role->shortname == 'student') {
            $isstudent = true;
            break;
        }
    }

    //Count of answers
    if($isstudent && $kmgoogle->submitmechanism && $kmgoogle->numberattempts){
        $answers = $DB->get_record("kmgoogle_answers", array("instanceid" => $instanceid, "userid" => $USER->id));
        if(count($answers) > $kmgoogle->numberattempts){
            return false;
        }
    }

    return true;
}

function if_user_admin_teacher(){
    global $DB, $USER, $COURSE;

    //If admin or teacher
    $arrteachers = kmgoogle_get_teacher_admin_users();
    if(in_array($USER->id, $arrteachers)){
        return true;
    }

    return false;
}

//Check if url is google url
function kmgoogle_if_url_google($url){
    global $GoogleDrive;

    if($GoogleDrive->getFileIdFromGoogleUrl($url)) return true;

    return false;
}

function kmgoogle_copy_google_url($kmgoogle){
    global $DB, $USER, $COURSE, $GoogleDrive;

    $sourceFileId = $GoogleDrive->getFileIdFromGoogleUrl($kmgoogle->sourcegoogleurl);

    //Build name for document
    $name = kmgoogle_build_name_for_document($kmgoogle);

    //If Folder
    if($GoogleDrive->typeOfFile($sourceFileId) == 'folder'){
        $folderid = $GoogleDrive->getFileIdFromGoogleUrl($kmgoogle->googlefolderurl);
        $newFile = $GoogleDrive->createFolder($name, $sourceFileId, $folderid);
        $GoogleDrive->copyFilesFromFolderToFolder($sourceFileId, $newFile->getId());
    }else {
        if (!empty($kmgoogle->googlefolderurl)) {
            $folderid = $GoogleDrive->getFileIdFromGoogleUrl($kmgoogle->googlefolderurl);
            $newFile = $GoogleDrive->copyFileToFolder($sourceFileId, $name, $folderid);
        } else {
            $newFile = $GoogleDrive->copyFileToFolder($sourceFileId, $name, null);
        }
    }

    return str_replace($sourceFileId, $newFile->getId(), $kmgoogle->sourcegoogleurl);
}

//Build name for document
function kmgoogle_build_name_for_document($kmgoogle){
    global $DB, $USER, $COURSE, $GoogleDrive;

    $sourceFileId = $GoogleDrive->getFileIdFromGoogleUrl($kmgoogle->sourcegoogleurl);
    //$originalname = $GoogleDrive->nameOfFile($sourceFileId);
    $originalname = $kmgoogle->name;

    $name = $originalname;
    if(!empty($kmgoogle->namefile)){

        if($kmgoogle->namefile == 'course' && $kmgoogle->namefile == $kmgoogle->association){
            $obj = get_course($COURSE->id);
            $name = $obj->shortname.' '.$originalname;
        }

        if($kmgoogle->namefile == 'group' && $kmgoogle->namefile == $kmgoogle->association){
            $obj = kmgoogle_get_groups_on_course($COURSE->id);
            $name = $obj[$kmgoogle->associationname].' '.$originalname;
        }

        if($kmgoogle->namefile == 'collection' && $kmgoogle->namefile == $kmgoogle->association){
            $obj = kmgoogle_get_collections_on_course($COURSE->id);
            $name = $obj[$kmgoogle->associationname].' '.$originalname;
        }
    }

    return $name;
}

function kmgoogle_update_google_url($kmgoogle, $prevkmgoogle){
    global $DB, $USER, $COURSE, $GoogleDrive;

    if(!empty($prevkmgoogle->copiedgoogleurl)){
        $prevfolderid = $GoogleDrive->getFileIdFromGoogleUrl($kmgoogle->copiedgoogleurl);
        $GoogleDrive->deleteFile($prevfolderid);
    }

    return kmgoogle_copy_google_url($kmgoogle);
}

/**
 * Save the answer for the given survey
 *
 * @param  stdClass $survey   a survey object
 * @param  array $answersrawdata the answers to be saved
 * @param  stdClass $course   a course object (required for trigger the submitted event)
 * @param  stdClass $context  a context object (required for trigger the submitted event)
 * @since Moodle 3.0
 */
function kmgoogle_save_answer($kmgoogle, $answersrawdata, $course, $context, $comment = null) {
    global $DB, $USER;

    $obj = new \stdClass();
    $obj->instanceid = $kmgoogle->id;
    $obj->userid = $USER->id;
    $obj->url = $kmgoogle->copiedgoogleurl;
    $obj->timecreated = time();
    $obj->timemodified = time();

    $answerid = $DB->insert_record('kmgoogle_answers', $obj);

    if($comment != null){
        $commentobj = new \stdClass();
        $commentobj->contextid = $answerid;
        $commentobj->component = 'mod_kmgoogle';
        $commentobj->commentarea = 'report_comments';
        $commentobj->itemid = 0;
        $commentobj->content = $comment;
        $commentobj->format = 0;
        $commentobj->userid = $USER->id;
        $commentobj->timecreated = time();

        $DB->insert_record('comments', $commentobj);
    }
}

function kmgoogle_if_users_used_mod() {
    global $DB, $USER;

    $id = optional_param('update', '0', PARAM_INT);

    if($id){
        if (! $cm = get_coursemodule_from_id('kmgoogle', $id)) {
            return false;
        }

        if (! $kmgoogle = $DB->get_record("kmgoogle", array("id"=>$cm->instance))) {
            return false;
        }

        $rows = $DB->get_records('kmgoogle_answers', array('instanceid' => $kmgoogle->id));

        if(count($rows)){
            return true;
        }
    }

    return false;
}

function kmgoogle_build_datetime_block($kmgoogle) {
    global $DB, $USER;

    //Submit form
    if(!empty($_POST)){
        require_sesskey();
        $minute = required_param('minute', PARAM_INT);
        $hour = required_param('hour', PARAM_INT);
        $year = required_param('year', PARAM_INT);
        $month = required_param('month', PARAM_INT);
        $day = required_param('day', PARAM_INT);

        $str_date = $day.'-'.$month.'-'.$year.' '.$hour.':'.$minute.':00';
        $kmgoogle->datelastsubmit = strtotime($str_date);
        $DB->update_record('kmgoogle', $kmgoogle);

        //echo '<pre>';print_r($_POST);exit;
    }

    $html = '';

    $months = array(
        '1' => get_string("January", "kmgoogle"),
        '2' => get_string("February", "kmgoogle"),
        '3' => get_string("March", "kmgoogle"),
        '4' => get_string("April", "kmgoogle"),
        '5' => get_string("May", "kmgoogle"),
        '6' => get_string("June", "kmgoogle"),
        '7' => get_string("July", "kmgoogle"),
        '8' => get_string("August", "kmgoogle"),
        '9' => get_string("September", "kmgoogle"),
        '10' => get_string("October", "kmgoogle"),
        '11' => get_string("November", "kmgoogle"),
        '12' => get_string("December", "kmgoogle"),
    );

    if($kmgoogle->datelastsubmit){
        $datetime = $kmgoogle->datelastsubmit;
    }else{
        $datetime = time();
    }

    $day = date("j", $datetime);
    $month = date("n", $datetime);
    $year = date("Y", $datetime);
    $hour = date("G", $datetime);
    $minute = date("i", $datetime);

    $html .= '

    <div class="fdate_time_selector d-flex flex-wrap align-items-center">
        <div class="form-group fitem">
            <span data-fieldtype="select">
            <select class="custom-select" name="minute">
            ';

            for($i=0; $i<60; $i++){
                $selected = ($i == $minute)?'selected=""':'';
                $html .= '<option value="'.$i.'" '.$selected.'>'.$i.'</option>';
            }

            $html .= '
            </select>
            </span>
        </div>
        &nbsp;
        <div class="form-group  fitem">
            <span data-fieldtype="select" id="yui_3_17_2_1_1536734849921_936">
            <select class="custom-select" name="hour">
            ';

            for($i=0; $i<24; $i++){
                $selected = ($i == $hour)?'selected=""':'';
                $html .= '<option value="'.$i.'" '.$selected.'>'.$i.'</option>';
            }

            $html .= '
            </select>
            </span>
        </div>
        &nbsp;
        <div class="form-group  fitem">
            <span data-fieldtype="select">
            <select class="custom-select" name="year">
            ';

            $startYear = date("Y", time());
            $endYear = $startYear + 50;
            for($i=$startYear; $i <= $endYear; $i++){
                $selected = ($i == $year)?'selected=""':'';
                $html .= '<option value="'.$i.'" '.$selected.'>'.$i.'</option>';
            }

            $html .= '
            </select>
            </span>
        </div>
        &nbsp;
        <div class="form-group  fitem">
            <span data-fieldtype="select">
            <select class="custom-select" name="month">
            ';

            for($i=1; $i<=12; $i++){
                $selected = ($i == $month)?'selected=""':'';
                $html .= '<option value="'.$i.'" '.$selected.'>'.$months[$i].'</option>';
            }

            $html .= '
            </select>
            </span>
        </div>
        &nbsp;
        <div class="form-group  fitem">

            <span data-fieldtype="select">
            <select class="custom-select" name="day">
            ';

            for($i=1; $i<=31; $i++){
                $selected = ($i == $day)?'selected=""':'';
                $html .= '<option value="'.$i.'" '.$selected.'>'.$i.'</option>';
            }
            $html .= '
            </select>
            </span>
        </div>

        <label class="form-check  fitem  ">
            <input type="submit" class="btn btn-primary" value="'.get_string("change_date", "kmgoogle").'" />
        </label>
    </div>
';


    return $html;
}

function kmgoogle_data_for_student($kmgoogle){
    global $DB, $USER, $COURSE;

    $result = array();

    //Get saved association
    if($kmgoogle->association == 'course'){
        $obj = get_course($COURSE->id);
        $title_association = get_string('course');
        $name_association = $obj->shortname;
    }

    if($kmgoogle->association == 'group'){
        $obj = kmgoogle_get_groups_on_course($COURSE->id);
        $title_association = get_string('group');
        $name_association = $obj[$kmgoogle->associationname];
    }

    if($kmgoogle->association == 'collection'){
        $obj = kmgoogle_get_collections_on_course($COURSE->id);
        $title_association = get_string('collection', 'mod_kmgoogle');
        $name_association = $obj[$kmgoogle->associationname];
    }

    $result['title_association'] = $title_association;
    $result['name_association'] = $name_association;

    //Count of answers
    $answers = $DB->get_record("kmgoogle_answers", array("instanceid" => $kmgoogle->id, "userid" => $USER->id));
    $result['experience_number'] = count($answers) + 1;

    return $result;
}

function kmgoogle_render_activity_content($kmgoogle, $coursemoduleid){
    global $DB, $USER, $COURSE, $GoogleDrive;

    //TODO make choise open/close link
    // $html = '
    //     <a href="/mod/kmgoogle/source.php?id='.$coursemoduleid.'" style="display: block; width:60vw; height:30vh; overflow: hidden;">
    //       <div style = "height: 100%;">
    //       <iframe width="100%" height="100%" src="/mod/kmgoogle/source.php?id='.$coursemoduleid.'" allowfullscreen="true" frameborder="1" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
    //       </div>
    //     </a>';


   $sourceFileId = $GoogleDrive->getFileIdFromGoogleUrl($kmgoogle->copiedgoogleurl);
   $url = 'https://drive.google.com/thumbnail?authuser=0&sz=w320&id='.$sourceFileId;

   $html = '
       <a href="/mod/kmgoogle/source.php?id='.$coursemoduleid.'" style="display: block; width:60vw; height:30vh; overflow: hidden;">
         <div style = "height: 100%;"><iframe style="border: 1px solid #ddd" width="100%" height="100%" src="'.$url.'" allowfullscreen="true" frameborder="1" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe></div>
       </a>';

    return $html;
}
