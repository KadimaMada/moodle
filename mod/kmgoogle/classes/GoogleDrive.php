<?php
declare(strict_types=1);
require $CFG->dirroot.'/mod/kmgoogle/classes/google/vendor/autoload.php';

class GoogleDrive
{
    private $client;
    private $driveClient;
    private $authed = false;
    private $placeToken;

    public static $mimes = [
        'folder' => 'application/vnd.google-apps.folder'
    ];

    public static $roles = [
        'owner' => 'owner',
        'reader' => 'reader',
        'writer' => 'writer',
    ];

    public function __construct($clientId, $clientSecret, $redirectUrl, $placeToken = null)
    {
        if($placeToken != null){
            $this->placeToken = $placeToken;
        }else{
            $this->placeToken = '';
        }

        try {
            $this->client = new Google_Client();
            $this->client->setApplicationName('Devlion Drive');
            $this->client->setClientId($clientId);
            $this->client->setClientSecret($clientSecret);
            $this->client->setRedirectUri($redirectUrl);
            $this->client->addScope(Google_Service_Drive::DRIVE);
            $this->client->setAccessType('offline');
            $this->client->setApprovalPrompt('force');
            //$guzzleClient = new GuzzleHttp\Client(['defaults' => ['verify' => false]]);
            //$this->client->setHttpClient($guzzleClient);
        } catch (\Exception $e) {
            die("GoogleDrive: Error creating client. {$e->getMessage()}, on {$e->getLine()}");
        }
    }

    /**
     * Authenticate user
     */
    public function authenticate()
    {
        if (file_exists($this->placeToken) || !empty($_SESSION['token'])) {
            if (file_exists($this->placeToken)) {
                $token = json_decode(file_get_contents($this->placeToken), true);
            }

            if (empty($token)) {
                $token = $_SESSION['token'];
            }

            try {
                if ($token) {
                    $this->client->setAccessToken($token);

                    if ($this->client->isAccessTokenExpired()) {
                        $refreshTokenSaved = $this->client->getRefreshToken();
                        $this->client->fetchAccessTokenWithRefreshToken($refreshTokenSaved);

                        $updatedToken = $this->client->getAccessToken();
                        $updatedToken['refresh_token'] = $refreshTokenSaved;

                        $_SESSION['token'] = $updatedToken;
                        $token = json_encode($updatedToken);
                        file_put_contents($this->placeToken, $token);
                    }

                    $this->authed = true;
                } else {
                    //$this->makeAuth(); //TODO
                }
            } catch (\Exception $e) {
                //die("GoogleDrive: Error token. {$e->getMessage()}, on {$e->getLine()}");
            }
        } else {
            //$this->makeAuth(); //TODO
        }
    }

    public function authenticateNewJson()
    {
        $authUrl = $this->client->createAuthUrl();
        echo "<p><a class='login' href='$authUrl'>Autification</a></p>";
        die();
    }

    public function sendTokenJson()
    {
        if (isset($_GET['code'])) {
            $token = $this->client->fetchAccessTokenWithAuthCode($_GET['code']);
            $this->client->setAccessToken($token);
            // store in the session also

            header ("Content-Type: application/octet-stream");
            header ("Content-disposition: attachment; filename=token.json");
            echo json_encode($token); //the string that is the file

            return true;
        }
    }

    /**
     *  Make auth page
     *
     * @return bool
     */
    private function makeAuth()
    {
        // Step 2: The user accepted your access now you need to exchange it.
        if (isset($_GET['code']) && !file_exists($this->placeToken)) {
            $token = $this->client->fetchAccessTokenWithAuthCode($_GET['code']);
            $this->client->setAccessToken($token);
            // store in the session also

            $_SESSION['token'] = $token;
            file_put_contents($this->placeToken, json_encode($token));

            header('Location: /'); //TODO

            return true;
        }

        $authUrl = $this->client->createAuthUrl();
        echo "<p><a class='login' href='$authUrl'>Autification</a></p>";
        die();
    }

    /**
     * Get GoogleClient
     *
     * @return Google_Client
     */
    public function getClient()
    {
        return $this->client;
    }

    /**
     * Get GoogleDrive Service
     *
     * @return Google_Service_Drive
     */
    public function getDriveClient()
    {
        return $this->initDrive();
    }

    /**
     * @return bool
     */
    public function isAuthed()
    {
        return $this->authed;
    }

    /**
     * Flush Session
     */
    public function flushSession()
    {
        if (isset($_SESSION['token'])) {
            unset($_SESSION['token']);
        }
    }

    /**
     *  Remove token.json
     */
    public function flushToken()
    {
        if (file_exists($this->placeToken)) {
            unlink($this->placeToken);
        }
    }

    /**
     * Simple Process Errors
     * @todo improve in future using exception classes
     *
     * @param $message
     */
    private function processErrors($message)
    {
        $message = json_decode($message);

        switch ($message->error->code) {
            case 401: {
                $this->flushSession();
                $this->flushToken();

                $this->makeAuth();
            }
                break;
            default: {
                die($message->error->message);
            }
                break;
        }

        die('Unknown Error!');
    }

    /**
     * Init Google Drive Service
     *
     * @return Google_Service_Drive
     */
    public function initDrive()
    {
        if (!empty($this->driveClient)) {
            return $this->driveClient;
        }

        $this->driveClient = new Google_Service_Drive($this->getClient());

        return $this->driveClient;
    }

    /**
     * Get list of files\folders
     *
     * @param array $optParams
     * @return mixed
     */
    public function getAll(array $optParams = [])
    {
        try {
            $optParams = $this->parseParams($optParams);
            $results = $this->getDriveClient()->files->listFiles($optParams);

            return count($results->getFiles()) > 0 ? $results->getFiles() : [];
        } catch (Google_Service_Exception $e) {
            $this->processErrors($e->getMessage());
        }
    }

    /**
     * Get All Files
     *
     * @param array $optParams
     * @return array
     */
    public function getAllFiles(array $optParams = []): array
    {
        $allFiles = $this->getAll($optParams);

        if (!empty($allFiles)) {
            return array_filter($allFiles, function ($item) {
                return $item->getMimeType() !== self::$mimes['folder'];
            });
        }

        return [];
    }

    /**
     * Get Shared With Me Files
     *
     * @param array $optParams
     * @return array
     */
    public function getSharedWithMeFiles(array $optParams = []): array
    {
        $optParams['q'] = "sharedWithMe";

        return $this->getAllFiles($optParams);
    }

    /**
     * Get Own Files
     *
     * @param array $optParams
     * @return array
     */
    public function getOwnFiles(array $optParams = []): array
    {
        $optParams['q'] = "'me' in owners";

        return $this->getAllFiles($optParams);
    }


    /**
     * Get All Folders
     *
     * @param array $optParams
     * @return array
     */
    public function getAllFolders(array $optParams = []): array
    {
        $allFiles = $this->getAll($optParams);

        if (!empty($allFiles)) {
            return array_filter($allFiles, function ($item) {
                return $item->getMimeType() === self::$mimes['folder'];
            });
        }

        return [];
    }

    /**
     * Get Shared With Me Folders
     *
     * @param array $optParams
     * @return array
     */
    public function getSharedWithMeFolders(array $optParams = []): array
    {
        $optParams['q'] = "sharedWithMe";

        return $this->getAllFolders($optParams);
    }

    /**
     * Get own folders
     *
     * @param array $optParams
     * @return array
     */
    public function getOwnFolders(array $optParams = []): array
    {
        $optParams['q'] = "'me' in owners";

        return $this->getAllFolders($optParams);
    }

    /**
     * Create directory
     *
     * @param string $directoryName
     * @param array $params
     * @param array $optParams
     * @return Google_Service_Drive_DriveFile|null
     */
    public function createFolder(string $directoryName, array $params = [], array $optParams = [])
    {
        $params['mimeType'] = 'application/vnd.google-apps.folder';

        return $this->createFile($directoryName, $params, $optParams);
    }

    /**
     * Create file
     *
     * @param string $fileName
     * @param array $params
     * @param array $optParams
     * @return Google_Service_Drive_DriveFile|null
     */
    public function createFile(string $fileName, array $params = [], array $optParams = [])
    {
        $params['name'] = $fileName;

        $file = new Google_Service_Drive_DriveFile($params);


        try {
            return $this->getDriveClient()->files->create($file, $optParams);
        } catch (Google_Service_Exception $e) {
            $this->processErrors($e->getMessage());
        }
    }

    /**
     * Prepare permissions array
     *
     * @param string $email
     * @param string $role
     * @param string $type user|group|domain|anyone
     * @return  array
     */
    public function preparePermissionParams(string $email, string $role, string $type = 'user'): array
    {
        $params = [];
        $params['role'] = $role;
        $params['type'] = $type;
        $params['emailAddress'] = $email;

        return $params;
    }

    /**
     * Get File\Folder Permissions list
     *
     * @param string $fileId
     * @param array $optParams
     * @return Google_Service_Drive_PermissionList
     */
    public function getPermissions(string $fileId, array $optParams = []): Google_Service_Drive_PermissionList
    {
        try {
            return $this->getDriveClient()->permissions->listPermissions($fileId, $optParams);
        } catch (Google_Service_Exception $e) {
            $this->processErrors($e->getMessage());
        }
    }

    /**
     * Set File\Folder Permissions
     *
     * @param string $fileId
     * @param array $params
     * @param array $optParams
     * @return Google_Service_Drive_Permission|null
     */
    public function setPermissions(
        string $fileId,
        array $params = [],
        array $optParams = []
    ) {
        $params['type'] = $params['type'] ?? 'anyone';
        $permission = new Google_Service_Drive_Permission($params);

        try {
            return $this->getDriveClient()->permissions->create($fileId, $permission, $optParams);
        } catch (Google_Service_Exception $e) {
            $this->processErrors($e->getMessage());
        }
    }

    /**
     * Set Owner Permissions
     *
     * @param string $fileId
     * @param string $email
     * @param string $type user|group|domain|anyone
     * @return Google_Service_Drive_Permission|null
     */
    public function setOwnerPermissions(
        string $fileId,
        string $email,
        string $type = 'user'
    ) {
        $params = $this->preparePermissionParams($email, self::$roles['owner'], $type);

        return $this->setPermissions($fileId, $params);
    }

    /**
     * Set Writer Permissions
     *
     * @param string $fileId
     * @param string $email
     * @param string $type user|group|domain|anyone
     * @return Google_Service_Drive_Permission|null
     */
    public function setWriterPermissions(
        string $fileId,
        string $email,
        string $type = 'user'
    ) {
        $params = $this->preparePermissionParams($email, self::$roles['writer'], $type);

        return $this->setPermissions($fileId, $params);
    }

    /**
     * Set Reader Permissions
     *
     * @param string $fileId
     * @param string $email
     * @param string $type user|group|domain|anyone
     * @return Google_Service_Drive_Permission|null
     */
    public function setReaderPermissions(
        string $fileId,
        string $email,
        string $type = 'user'
    ) {
        $params = $this->preparePermissionParams($email, self::$roles['reader'], $type);

        return $this->setPermissions($fileId, $params);
    }


    /**
     * @param array $params
     * @return array
     */
    private function parseParams(array $params = [])
    {
        $q = [];

        if (isset($params['q'])) {
            $q[] = $params['q'];
        }

        if (isset($params['trashed'])) {
            $q[] = $this->trashed($params['trashed']);
            unset($params['trashed']);
        }

        $params['q'] = implode(' and ', $q);

        return $params;
    }

    /**
     * Build q for trashed
     *
     * @param $trashed
     * @return string
     */
    private function trashed($trashed)
    {
        return "trashed=" . var_export($trashed, true);
    }
}
