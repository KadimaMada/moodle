<?php

require_once ($CFG->dirroot.'/mod/kmgoogle/classes/google/vendor/autoload.php');
require_once ($CFG->dirroot.'/mod/kmgoogle/classes/GoogleDrive.php');

//$credentials_url = kmgoogle_get_credentials_file();
//if($credentials_url){
//    putenv( 'GOOGLE_APPLICATION_CREDENTIALS='.$credentials_url );
//}

session_start();

class BasicDrive {

    private $client;
    private $service;

//    private $clientId = '370911709899-191ugl7isounb2qufiod0f5si0i5htde.apps.googleusercontent.com';
//    private $clientSecret = 'YpJPPT3vDiZs4g6zBCA3c88y';
//    private $redirectUrl = 'http://shiur4u.devlion.co/mod/kmgoogle/postback.php';

    private $clientId;
    private $clientSecret;
    private $redirectUrl;

    public function __construct() {

        global $DB, $CFG;

        $obj = $DB->get_record('config_plugins', array('plugin' => 'mod_kmgoogle', 'name' => 'clientid'));
        $this->clientId = $obj->value;

        $obj = $DB->get_record('config_plugins', array('plugin' => 'mod_kmgoogle', 'name' => 'clientsecret'));
        $this->clientSecret = $obj->value;

        $this->redirectUrl = $CFG->wwwroot.'/mod/kmgoogle/postback.php';

        $credentials_url = kmgoogle_get_credentials_file();
        if($credentials_url){
            //$google->flushSession();
            //$google->flushToken();

            $google = new GoogleDrive($this->clientId, $this->clientSecret, $this->redirectUrl, $credentials_url);
            $google->authenticate();

            if ($google->isAuthed()) {
                $this->service = $google->initDrive();
            }else{
                die("Please authorizate google drive");
            }
        }else{
            die("Please authorizate google drive");
        }
    }

    //Parser Google url
    public function getFileIdFromGoogleUrl($url) {

        $arr = explode('/', $url);
        foreach ($arr as $item){
            if(strlen($item) > 25 && strlen($item) < 60){
                return $item;
            }
        }

        return false;
    }

    //Get Mime type of file
    public function typeOfFile($fileId) {
        try {
            $file = $this->service->files->get($fileId);
            $arr = explode('.', $file->getMimeType());
            return $arr[count($arr)-1];
        } catch (Exception $e) {
            print "An error occurred: " . $e->getMessage();
        }
    }

    //Get Name of file
    public function nameOfFile($fileId) {
        try {
            $file = $this->service->files->get($fileId);
            return $file->getName();
        } catch (Exception $e) {
            print "An error occurred: " . $e->getMessage();
        }
    }

    //Copy file to new place
    public function copyFileToFolder($originFileId, $nameFile, $folderId = null) {

        $copiedFile = new Google_Service_Drive_DriveFile();

        if(!empty($nameFile)){
            $copiedFile->setName($nameFile);
        }else{
            $name = $this->nameOfFile($originFileId);
            $copiedFile->setName($name);
        }

        if($folderId != null){
            $copiedFile->setParents(array($folderId));
        }

        try {
            return $this->service->files->copy($originFileId, $copiedFile);
        } catch (Exception $e) {
            print "An error occurred: " . $e->getMessage();
        }
        return NULL;
    }

    //Create folder
    public function createFolder($nameFile, $fileId = null, $folderId = null) {
        $mimeType = 'application/vnd.google-apps.folder';

//        $list = $this->getAllFilesGDrive();
//        foreach($list as $file){
//            if($file->name == $foldername && $file->mimetype == $mimeType){
//                return $file->id;
//            }
//        }

        $copiedFile = new Google_Service_Drive_DriveFile();

        if(!empty($nameFile)){
            $copiedFile->setName($nameFile);
        }else{
            if($fileId != null){
                $name = $this->nameOfFile($fileId);
                $copiedFile->setName($name);
            }
        }

        if($folderId != null){
            $copiedFile->setParents(array($folderId));
        }

        $copiedFile->setMimeType($mimeType);

        return $this->service->files->create($copiedFile, array('fields' => 'id'));
    }

    //copy files from folder to folder
    public function copyFilesFromFolderToFolder($sourceFileId, $targetFileId) {
        $pageToken = NULL;

        $optParams = array(
            'pageSize' => 10,
            'fields' => "nextPageToken, files(contentHints/thumbnail,fileExtension,iconLink,id,name,size,thumbnailLink,webContentLink,webViewLink,mimeType,parents)",
            'q' => "'".$sourceFileId."' in parents"
        );
        $files = $this->service->files->listFiles($optParams);

        foreach($files as $file){
            $this->copyFileToFolder($file->getId(), $file->getName(), $targetFileId);
        }
    }

    //Delete file or folder from disk
    public function deleteFile($fileId) {
        try {
            $this->service->files->delete($fileId);
        } catch (Exception $e) {
            //print "An error occurred: " . $e->getMessage();
        }
    }

    //Set permission for user
    public function setPermissionForUser($userid, $current_permission, $fileID, $permissionId = null) {
        global $DB, $USER;

        $user = $DB->get_record('user', array('id' => $userid));

        if($permissionId != null){
            $this->removePermissionForUser($fileID, $permissionId);
        }

        if($current_permission == 'edit') $permission = 'writer';
        if($current_permission == 'comment') $permission = 'commenter';
        if($current_permission == 'view') $permission = 'reader';
        if($current_permission == 'nopermission'){
            return '';
        }

        /*
    role	string	The role granted by this permission. While new values may be supported in the future, the following are currently allowed:
    organizer
    owner
    writer
    commenter
    reader
    writable

    type	string	The type of the grantee. Valid values are:
    user
    group
    domain
    anyone
         * */

        $this->service->getClient()->setUseBatch(true);
        try {
            $batch = $this->service->createBatch();

            $userPermission = new Google_Service_Drive_Permission(array(
                'type' => 'user',
                'role' => $permission,
                'emailAddress' => $user->email
            ));
            $request = $this->service->permissions->create(
                $fileID, $userPermission, array('fields' => 'id', 'sendNotificationEmail' => false));
            $batch->add($request, 'user');
            $results = $batch->execute();

            foreach ($results as $result) {
                if ($result instanceof Google_Service_Exception) {
                    // Handle error
                    //printf($result);
                } else {
                    return $result->id;
                    //printf("Permission ID: %s\n", $result->id);
                }
            }
        } finally {
            $this->service->getClient()->setUseBatch(false);
        }

        return false;
    }

    public function removePermissionForUser($fileId, $permissionId) {
        try {
            $this->service->permissions->delete($fileId, $permissionId);
        } catch (Exception $e) {
            //print "An error occurred: " . $e->getMessage();
        }
    }

    //Get files on Googlr Drive TODO not used
    public function getAllFilesGDrive() {
        $list = array();
        $result = array();
        $pageToken = null;

        do {
            try {
                $parameters = array();
                if ($pageToken) {
                    $parameters['pageToken'] = $pageToken;
                }
                $files = $this->service->files->listFiles($parameters);

                $list = array_merge($list, $files->getFiles());

                $pageToken = $files->getNextPageToken();
            } catch (Exception $e) {
                print "An error occurred: " . $e->getMessage();
                $pageToken = NULL;
            }
        } while ($pageToken);

        foreach ($list as $file) {
            $obj = new \stdClass();
            $obj->id = $file->getId();
            $obj->name = $file->getName();
            $obj->mimetype = $file->getMimeType();
            $obj->parent = $file->getParents();

            $result[] = $obj;
        }


        return $result;
    }

}
