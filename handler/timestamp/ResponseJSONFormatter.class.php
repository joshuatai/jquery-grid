<?php

require_once(__DIR__ . '/ErrorLevel.php');
require_once(__DIR__ . '/BaseException.class.php');
require_once(__DIR__ . '/ErrorJsonFormatter.class.php');

class ResponseJSONFormatterException extends ErrorJsonFormatterException {}

class ResponseJSONFormatter extends ErrorJsonFormatter {

    protected $response_array = array();

    public function set_value($key_, $value_) {
        $this->response_array[$key_] = $value_;
    }

    public function get_json() {
        $status_array = array(
            'status' => $this->error_code, 
            'message' => $this->message,
            'msglevel' => $this->error_level,
        );
        $body = array_merge($this->response_array, $status_array);
        
        $json = json_encode($body);
        if ($json === FALSE) {
            $msg = 'json_encode fail';
            throw new ResponseJSONFormatterException($msg);
        }
        return $json;
    }
}

