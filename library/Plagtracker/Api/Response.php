<?php

namespace Plagtracker\Api;

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
