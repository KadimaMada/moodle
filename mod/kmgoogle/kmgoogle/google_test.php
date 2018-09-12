<?php
require_once('../../config.php');

require_once ($CFG->dirroot.'/mod/kmgoogle/modlib.php');
require_once ($CFG->dirroot.'/mod/kmgoogle/classes/google_drive.php');

//
//function qr_loadUrl( $url ) {
//    if(is_callable( 'curl_init' )) {
//        $ch = curl_init();
//        curl_setopt($ch, CURLOPT_HEADER, 0);
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
//        curl_setopt($ch, CURLOPT_URL, $url);
//        $data = curl_exec($ch);
//        curl_close($ch);
//    }
//    if( empty($data) || !is_callable('curl_init') ) {
//        $opts = array('http'=>array('header' => 'Connection: close'));
//        $context = stream_context_create($opts);
//        $headers = get_headers($url);
//        $httpcode = substr($headers[0], 9, 3);
//        if( $httpcode == '200' )
//            $data = file_get_contents($url, false, $context);
//        else{
//            $data = '{"div":"Error ' . $httpcode . ': Invalid Url<br />"}';
//        }
//    }
//    return $data;
//}
//
////$urlcontent = qr_loadUrl( 'https://docs.google.com/document/d/1OA5cqUHeTHBxca8MaodUUPXnAUNm-kpoy3Wk2vVItKU/edit' );
//$urlcontent = qr_loadUrl( 'https://accounts.google.com/CheckCookie?continue=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&followup=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&chtml=LoginDoneHtml&checkedDomains=youtube&checkConnection=youtube%3A291%3A1' );
//echo $urlcontent;
//exit;



$obj = new google_drive();

//$f = $obj->copyFileToFolder('1SPaJ-UN0So5Djdz1gob876Ola4JWd-bbcapiizQBlj0', 'ggg');

//$result = $obj->setPermission('1lSS1A2TszYbmNc2VokrBCr1IiT5FsRL7', 4, 'sdsdsd');
$result = $obj->getAllFilesGDrive();

echo '<pre>';print_r($result);exit;

foreach ($result as $value) {
    $obj->setPermission($value->id, 4, 'sdsdsd');
    echo $value->id."<br>";
}


echo '<pre>';print_r($result);exit;

foreach ($result as $value) {
    $obj->deleteFile($value->id);
    echo $value->id."<br>";
}


exit;

require_once ($CFG->dirroot.'/mod/kmgoogle/classes/google/vendor/autoload.php');

putenv( 'GOOGLE_APPLICATION_CREDENTIALS=classes/google/key/credentials.json' );

$client = new Google_Client();
$client->useApplicationDefaultCredentials();
$client->setScopes(array(
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    //'https://www.googleapis.com/auth/userinfo.email',
    //'https://www.googleapis.com/auth/userinfo.profile'
    ));
$client->setHttpClient( new GuzzleHttp\Client( [ 'verify' => false ] ) );   // disable ssl if necessary

//Create folder
// Get the API client and construct the service object.
$service = new Google_Service_Drive($client);

$fileMetadata = new Google_Service_Drive_DriveFile(array(
    'name' => 'Invoices',
    'mimeType' => 'application/vnd.google-apps.folder'));
$file = $service->files->create($fileMetadata, array(
    'fields' => 'id'));
printf("Folder ID: %s\n", $file->id);
exit;


//saveFileToDisk($service);
$res = retrieveAllFiles($service);

try {
    $file = $service->files->get( '18ncNjiPw9GV1j8Rcjn6tqQXjurQLlliSy2LFF_jsc9A' );
    echo "Title: ", $file->getName();
    echo "Description: ", $file->getDescription();
    echo "MIME type: ", $file->getMimeType();
    echo "ID : ", $file->getID();
} catch (Exception $e) {
    echo "An error occurred: ", $e->getMessage();
}

echo '<br>';

function setPermission(Google_Service_Drive $service) {

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


    $fileId = '1HqXc_Xq5RRAQ2tvs4QD9H-5-PHWhlxrB';
    $service->getClient()->setUseBatch(true);
    try {
        $batch = $service->createBatch();

        $userPermission = new Google_Service_Drive_Permission(array(
            'type' => 'user',
            'role' => 'writer',
            'emailAddress' => 'oleg@devlion.co'
        ));
        $request = $service->permissions->create(
            $fileId, $userPermission, array('fields' => 'id'));
        $batch->add($request, 'user');

//        $domainPermission = new Google_Service_Drive_Permission(array(
//            'type' => 'domain',
//            'role' => 'reader',
//            'domain' => 'example.com'
//        ));
//        $request = $service->permissions->create(
//            $fileId, $domainPermission, array('fields' => 'id'));
//        $batch->add($request, 'domain');

        $results = $batch->execute();

        foreach ($results as $result) {
            if ($result instanceof Google_Service_Exception) {
                // Handle error
                printf($result);
            } else {
                printf("Permission ID: %s\n", $result->id);
            }
        }
    } finally {
        $service->getClient()->setUseBatch(false);
    }
}

function removePermission($service, $fileId='1HqXc_Xq5RRAQ2tvs4QD9H-5-PHWhlxrB', $permissionId='08012222080900041158') {
    try {
        $service->permissions->delete($fileId, $permissionId);
    } catch (Exception $e) {
        print "An error occurred: " . $e->getMessage();
    }
}

echo '<br>';
echo '<br>';
//setPermission($service);
//removePermission($service);
echo '<br>';
echo '<br>';


//Permissions
//$newPermission= new Google_Service_Drive_Permission();
//$newPermission->setType('user');
//$newPermission->setRole('commenter');
//$newPermission->setEmailAddress('oleg@devlion.co');
//
//try {
//    return $service->permissions->create('0Bxl9QgxfWyLza0I5TUJzSThxTmc', $newPermission);
//} catch (Exception $e) {
//    print "An error occurred: " . $e->getMessage();
//}


//echo '<pre>';print_r($res);
exit;

function saveFileToDisk(Google_Service_Drive $service) {
    $mime_type = 'application/pdf';

    $file = new Google_Service_Drive_DriveFile();
    $file->setName('333');
    $file->setDescription('This is a pdf document');
    $file->setMimeType($mime_type);
    $service->files->create(
        $file,
        array(
            'data' => 'dfdfdfdfdf',
            'mimeType' => $mime_type,
            'uploadType' => 'media'
        )
    );

}

function retrieveAllFiles(Google_Service_Drive $service) {
    $result = array();
    $pageToken = null;

    do {
        try {
            $parameters = array();
            if ($pageToken) {
                $parameters['pageToken'] = $pageToken;
            }
            $files = $service->files->listFiles($parameters);

            $result = array_merge($result, $files->getFiles());

            foreach ($files->getFiles() as $file) {
                printf("%s (%s) (%s)\n", $file->getName(), $file->getMimeType(), $file->getId());
            }

            $pageToken = $files->getNextPageToken();
        } catch (Exception $e) {
            print "An error occurred: " . $e->getMessage();
            $pageToken = NULL;
        }
    } while ($pageToken);
    return $result;
}



// Print the names and IDs for up to 10 files.
$optParams = array(
    'pageSize' => 10,
    //'fields' => 'nextPageToken, files(id, name)'
);
$results = $service->files->listFiles($optParams);

echo '<pre>';print_r($results->getFiles());exit;

if (count($results->getFiles()) == 0) {
    print "No files found.\n";
} else {
    print "Files:\n";
    foreach ($results->getFiles() as $file) {
        printf("%s (%s)\n", $file->getName(), $file->getId());
    }
}


//$service = new Google_Service_Books($client);
//$optParams = array('filter' => 'free-ebooks');
//$optParams = array();
//$results = $service->volumes->listVolumes('Henry David Thoreau', $optParams);
//
//foreach ($results as $item) {
//  echo $item['volumeInfo']['title'], "<br /> \n";
//}


/*echo '
<iframe src="https://docs.google.com/viewer?url=https://docs.google.com/document/d/125CJmmlBfy7UgfYuBAmb1_HSCuyz8NV133361KTK1SE/export?format%3Dpdf&id=125CJmmlBfy7UgfYuBAmb1_HSCuyz8NV133361KTK1SE&embedded=true" style="width:680px; height:860px;" frameborder="0"></iframe>
<iframe src="https://docs.google.com/viewer?url=https://docs.google.com/document/d/1GkOWHrZLjFp-YPOAeZmd_lB7KnWBwaJg98I1Oun_vLs/export?format%3Dpdf&id=125CJmmlBfy7UgfYuBAmb1_HSCuyz8NV133361KTK1SE&embedded=true" style="width:680px; height:860px;" frameborder="0"></iframe>
<iframe src="https://docs.google.com/document/d/1GkOWHrZLjFp-YPOAeZmd_lB7KnWBwaJg98I1Oun_vLs/edit" width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
';

echo '<iframe src="https://docs.google.com/spreadsheets/d/13R8O15c_sZKZT2QRHom1z2SDA3E1O5chUvROnqHCkwE/pubhtml?widget=true&amp;headers=true" style="width:100%;height:100%;"></iframe>';
*/

exit;

echo 'sdsd';
