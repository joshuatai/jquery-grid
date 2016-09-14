<?php
require_once(__DIR__ . "/tz/TZConverter.class.php");
require_once(__DIR__ . "/ErrorJsonFormatter.class.php");
require_once(__DIR__ . "/ResponseJSONFormatter.class.php");
require_once(__DIR__ . "/ErrorCodes.php");
require_once(__DIR__ . "/ErrorLevel.php");

function set_format() {
    $format_value = filter_input(INPUT_GET, 'format', FILTER_SANITIZE_ENCODED);
    if ($format_value) {
        $format_value = urldecode($format_value); 
        TZConverter::set_time_format($format_value);
    }
}

function convert_datetime_value_to_array($datetime_value, $is_int) {
    $datetime_array = explode(',', $datetime_value);
    $json_array = array();
    foreach ($datetime_array as $datetime) {
        $datetime = $is_int ? intval($datetime) : $datetime; 
        $time_data = TZConverter::get_server_time_data($datetime);
        $json_array[$datetime] = $time_data->to_array();
    }
    return $json_array;
} 

function process_param_interval_to_array($interval_value, $now_in_sec) {
    $result_in_sec = $now_in_sec + $interval_value;    
    $now_time_data = TZConverter::get_server_time_data($now_in_sec);
    $result_time_data = TZConverter::get_server_time_data($result_in_sec);

    $json_array = array(
        'now' => $now_time_data->to_array(),
        'result' => $result_time_data->to_array(),
        'interval' => $interval_value
    );
    return $json_array;
}

try {
    $status = AJAX_STATUS_SUCCESS;
    $message = "";
    $level = ERR_LEVEL_NONE;

    $formatter = new ResponseJSONFormatter(
        $message,
        $status,
        $level
    );

    // set displayed time format from param "format"
    set_format();

    $now_in_sec = time();
    $now_time_data = TZConverter::get_server_time_data($now_in_sec);
    
    $formatter->set_value('timestamp', $now_time_data->timestamp);
    $formatter->set_value('tzoffset', $now_time_data->tzoffset);
    $formatter->set_value('displayed_text', $now_time_data->displayed_text);

    // Process param "interval"
    $interval_value = filter_input(INPUT_GET, 'interval', FILTER_VALIDATE_INT);
    if ($interval_value !== FALSE && $interval_value !== NULL) {
        $json_array = 
            process_param_interval_to_array($interval_value, $now_in_sec);
        $formatter->set_value('interval', $json_array);
    }
 
    // Process param "serverTimestamp" & "serverTimetext"
    $convert_option_array = array(
        array('option' => 'serverTimestamp', 'is_int' => true), 
        array('option' => 'serverTimetext', 'is_int' => false),
    );
    foreach ($convert_option_array as $option) {
        $option_key = $option['option'];
        $is_int = $option['is_int'];

        $option_value = 
            filter_input(INPUT_GET, $option_key, FILTER_SANITIZE_ENCODED);
        if (!$option_value) {
            continue;
        }
        $option_value = urldecode($option_value);
        $json_array = convert_datetime_value_to_array($option_value, $is_int); 
        $formatter->set_value($option_key, $json_array);
    }

    $result = $formatter->get_response();
}
catch (Exception $e) {
   /* $logger = MW\logger::getInstance();
    if ($logger) {
        $logger->log(ZG_LOG_ERR, '',
            'Caught an exception, %s',
            var_export($e, true)
        );
    }

    $code = AJAX_STATUS_INTERNAL_SERVER_ERROR;
    $msg = "System has encountered an internal error. Contact support for further help.";
    $level = ERR_LEVEL_CRIT;

    $fomatter = new ErrorJsonFormatter($msg, $code, $level);
    $result = $fomatter->get_json();*/
}

Header('Content-Type: application/json');
print $result;


