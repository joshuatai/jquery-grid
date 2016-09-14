<?php

require_once(__DIR__ . '/ErrorCodes.php');

class BaseException extends Exception {
    public function __construct (
        $message = "", 
        $code = AJAX_STATUS_INTERNAL_SERVER_ERROR, 
        Exception $previous = NULL
    ) {
        parent::__construct($message, $code, $previous);
    } 
}

