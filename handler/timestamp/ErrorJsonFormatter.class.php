<?php

require_once(__DIR__ . '/ErrorLevel.php');
require_once(__DIR__ . '/BaseException.class.php');

class ErrorJsonFormatterException extends BaseException {}

class ErrorJsonFormatter {

    protected $message;
    protected $error_code;
    protected $error_level;

    function __construct (
        $message_, 
        $error_code_, 
        $error_level_ = ERR_LEVEL_INFO
    ) {
        $this->message = $message_;
        $this->error_code = $error_code_;
        $this->error_level = $error_level_;
    }

    function __destruct () {
        $this->message = NULL;
        $this->error_code = NULL;
        $this->error_level = NULL;
    }

    public function get_json() {
        $body = array(
            'status' => $this->error_code, 
            'message' => $this->message,
            'msglevel' => $this->error_level,
        );
        $json = json_encode($body);
        if ($json === FALSE) {
            $msg = 'json_encode fail';
            throw new ErrorJsonFormatterException($msg);
        }
        return $json;
    }

    public function get_response() {
        return $this->get_json();
    }
}

