<?php

//TODO
function kmgoogle_get_groups_on_course($courseid){
    $result = array(
        '1' => 'Group1',
        '2' => 'Group2',
        '3' => 'Group3',
    );

    return $result;
}

//TODO
function kmgoogle_get_collections_on_course($courseid){
    $result = array(
        '4' => 'Collection1',
        '5' => 'Collection2',
        '6' => 'Collection3',
    );

    return $result;
}

//TODO
function kmgoogle_get_users_by_course($courseid){
    $result = array(

    );

    return $result;
}

//TODO
function kmgoogle_get_users_by_group($groupid){
    $result = array(

    );

    return $result;
}

//TODO
function kmgoogle_get_users_by_collection($collectionid){
    $result = array(

    );

    return $result;
}

//TODO
function kmgoogle_build_select_places($courseid){
    $result = kmgoogle_get_groups_on_course($courseid);
    $result = array_merge(kmgoogle_get_collections_on_course($courseid), $result);

    $result[0] = 'DefaultPlace';

    return $result;
}

//TODO
function kmgoogle_association_level(){
    return array(
        'course' => get_string("course"),
        'group' => get_string("group"),
        'collection' => get_string("collection", "kmgoogle"),
    );
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

function user_can_answer($instanceid){

    return true;
}

//TODO
function kmgoogle_if_url_google($url){

    return true;
}

//TODO
function kmgoogle_copy_google_url($url){


    //str or false
    return $url;
}