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
     * @param string $apiDomain 
     */
    public function __construct($login, $password, $apiDomain = 'api.plagtracker.com')
    {
        $this->login = $login;
        $this->password = $password;
        $this->apiDomain = $apiDomain;
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
        return $this->execHttpRequest(
            $this->makeUrl('api/text'), 
            'text=' . urlencode($text)
        );
    }
    /**
     * Add url for checking
     * 
     * @param string $url
     * @return Response 
     */
    public function addUrlForChecking($url)
    {
        return $this->execHttpRequest(
            $this->makeUrl('api/url'), 
            'url=' . urlencode($url)
        );
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
                
        return $this->execHttpRequest(
            $this->makeUrl('api/file'), 
            'file[name]='.urlencode(basename($filePath)) . '&file[data]='.urlencode(base64_encode($fileData))
        );
    }
    
    /**
     * Returns completed percentage of text checking
     * 
     * @param string $hash
     * @return Response 
     */
    public function getTextStatus($hash)
    {
        return $this->execHttpRequest($this->makeUrl("api/text/{$hash}/status/"));
    }
    
    /**
     * Returns checking result
     * 
     * @param string $hash
     * @return Response 
     */
    public function getResult($hash)
    {
        return $this->execHttpRequest($this->makeUrl("api/text/{$hash}/result/"));
    }
    
    /**
     * Returns plagiarism percent
     * 
     * @param string $hash
     * @return Response 
     */
    public function getPlagiarismPercent($hash)
    {
        return $this->execHttpRequest($this->makeUrl("api/text/{$hash}/plagiarism-percent/"));
    }
    
    /**
     * Returns text
     * 
     * @param string $hash
     * @return stdClass 
     */
    public function getText($hash)
    {
        return $this->execHttpRequest($this->makeUrl('api/text/' . $hash));
    }
    
    /**
     *
     * @param string $url
     * @param string $postData
     * @return Response 
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
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        $rawResponse = json_decode($result);
        
        if (!is_object($rawResponse))
        {
            throw new \Exception('Wrong response was got.');
        }
        
        return new Response($httpCode, $rawResponse->message, $rawResponse->data);
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
