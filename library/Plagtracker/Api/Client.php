<?php

namespace Plagtracker\Api;

class Client 
{
    private $curlTimeout = 120; //120 sec
    private $maxUploadedFileSize = 10485760; //10 mb
    private $allowedExtensions = array('doc', 'csv', 'html', 'odt', 'rtf', 'txt', 'docx');
    private $login = null;
    private $password = null;
    private $response = null;
    private $apiDomain = '';
    
    /**
     *
     * @param string $login
     * @param string $password 
     */
    public function __construct($login, $password, $api_domain = 'api.plagtracker.com')
    {
        $this->login = $login;
        $this->password = $password;
        $this->apiDomain = $api_domain;
    }

    /**
     * 
     * @return string
     */
    public function getSampleText()
    {
        return 'The Simpsons is an American animated sitcom created by Matt Groening for the Fox Broadcasting Company. The series is a satirical parody of a middle class American lifestyle epitomized by its family of the same name, which consists of Homer, Marge, Bart, Lisa and Maggie. The show is set in the fictional town of Springfield and parodies American culture, society and many aspects of the human condition. Since its debut on December 17, 1989, the show has broadcast 500 episodes and the twenty-third season started airing on September 25, 2011. The Simpsons is the longest-running American sitcom, the longest-running American animated program, and in 2009 it surpassed Gunsmoke as the longest-running American primetime, scripted television series. The Simpsons Movie, a feature-length film, was released in theaters worldwide on July 26 and July 27, 2007, and grossed over $527 million.';
    }
    
    /**
     * Add text for checking
     * 
     * @param string $text
     * @return Response 
     */
    public function addTextForChecking($text)
    {
        $response = $this->execHttpRequest(
            $this->makeUrl('api/text'), 
            'text=' . urlencode($text)
        );

        return $this->makeResponse($response);
    }
    /**
     * Add url for checking
     * 
     * @param string $url
     * @return Response 
     */
    public function addUrlForChecking($url)
    {
        $response = $this->execHttpRequest(
            $this->makeUrl('api/url'), 
            'url=' . urlencode($url)
        );

        return $this->makeResponse($response);
    }
    
    /**
     * Add file for checking
     * 
     * @param string $filePath
     * @return Response 
     */
    public function addFileForChecking($filePath)
    {
        if (!in_array(pathinfo($filePath, PATHINFO_EXTENSION), $this->allowedExtensions))
        {
            throw new \Exception('Sorry, you can only upload .doc, .csv, .html, .odt, .rtf, .txt, .docx files');
        }
        
        $fileData = file_get_contents($filePath);
        
        if ($this->maxUploadedFileSize < strlen($fileData))
        {
            throw new \Exception('Maximum size of uploading document is 10 MB.');
        }
                
        $response = $this->execHttpRequest(
            $this->makeUrl('api/file'), 
            'file[name]='.urlencode(basename($filePath)) . '&file[data]='.urlencode(base64_encode($fileData))
        );
        
        return $this->makeResponse($response);
    }
    
    /**
     * Returns completed percentage of text checking
     * 
     * @param string $hash
     * @return Response 
     */
    public function getTextStatus($hash)
    {
        $response = $this->execHttpRequest($this->makeUrl("api/text/{$hash}/status/"));
        
        return $this->makeResponse($response);
    }
    
    /**
     * Returns checking result
     * 
     * @param string $hash
     * @return Response 
     */
    public function getResult($hash)
    {
        $response = $this->execHttpRequest($this->makeUrl("api/text/{$hash}/result/"));
        
        return $this->makeResponse($response);
    }
    
    /**
     * Returns plagiarism percent
     * 
     * @param string $hash
     * @return Response 
     */
    public function getPlagiarismPercent($hash)
    {
        $response = $this->execHttpRequest($this->makeUrl("api/text/{$hash}/plagiarism-percent/"));
        
        return $this->makeResponse($response);
    }
    
    /**
     * Returns text
     * 
     * @param string $hash
     * @return stdClass 
     */
    public function getText($hash)
    {
        $response = $this->execHttpRequest($this->makeUrl('api/text/' . $hash));
        
        return $this->makeResponse($response);
    }
    
    /**
     *
     * @param string $url
     * @param string $postData
     * @return \stdClass 
     */
    private function execHttpRequest($url, $postData = null)
    {
        $ch = curl_init();  
        
        if($postData)
        {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        }
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, $this->curlTimeout);
        curl_setopt($ch, CURLOPT_USERPWD, "{$this->login}:{$this->password}");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        
        $result = curl_exec($ch);
        curl_close($ch);
        
        return json_decode($result);
    }
    
    /**
     *
     * @param \stdClass $rawResponse
     * @return Response
     */
    private function makeResponse($rawResponse)
    {
        if (!is_object($rawResponse))
        {
            throw new \Exception('Wrong response was got.');
        }
        
        return new Response($rawResponse->status, $rawResponse->message, $rawResponse->data);
    }
    /**
     * Create api url
     * 
     * @param string $uri
     * @return string
     */
    private function makeUrl($uri)
    {
        return sprintf("https://%s/%s", $this->apiDomain, $uri);
    }
}


/**
 * Response for REST client
 * 
 */
class Response
{
    const OK = 200;
    const UNAUTHORIZED = 401;
    const FORBIDDEN = 403;
    const NOT_FOUND = 404;
    const INTERNAL_SERVER_ERROR = 500;
    const SERVICE_UNAVAILABLE = 503;
    
    
    private $status;
    private $message;
    private $data;
    
    /**
     *
     * @param int $status
     * @param string $message
     * @param mixed $data 
     */
    public function __construct($status, $message, $data)
    {
        $this->status = $status;
        $this->message = $message;
        $this->data = $data;
    }
    
    /**
     * 
     * 
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }
    
    /**
     * 
     * 
     * @return mixed 
     */
    public function getData()
    {
        return $this->data;
    }
    
    /**
     * 
     * 
     * @return int 
     */
    public function getStatus()
    {
        return $this->status;
    }
    
    /**
     * Returns true if last response was successful
     * 
     * @return bool 
     */
    public function isSuccessfully()
    {
        return $this->status == self::OK;
    }
    
    /**
     * Returns true if happened temporary error
     * 
     * @return bool 
     */
    public function isTemporaryError()
    {
        return $this->status == self::SERVICE_UNAVAILABLE;
    }
}