<?php

require_once(__DIR__ . '/TZFactory.class.php');
require_once(__DIR__ . '/../BaseException.class.php');

class TZTimeData {
    public $displayed_text;
    public $timestamp;
    public $tzoffset;
    
    function __construct($displayed_text, $timestamp, $tzoffset) {
        $this->displayed_text = $displayed_text;
        $this->timestamp = $timestamp;
        $this->tzoffset = $tzoffset;
    }

    public function to_array() {
        return array(
            'displayed_text' => $this->displayed_text, 
            'timestamp' => $this->timestamp, 
            'tzoffset' => $this->tzoffset
        );
    }
}

class TZConverterException extends BaseException {}

class TZConverter {
    // Format: 2011-06-02 20:38:50 +0800
    private static $format = 'Y-m-d H:i:s O';

    public static function set_time_format($format) {
        self::$format = $format;
    }

    public static function get_server_time_data($tm) {
        $from_tz = TZFactory::create_server_timezone(); 
        $to_tz = $from_tz; 
        return self::convert_timezone($tm, $from_tz, $to_tz);
    }

    public static function utc_time_to_server_time($tm) {
        $from_tz = new DateTimeZone('UTC');
        $to_tz = TZFactory::create_server_timezone(); 
        return self::convert_timezone($tm, $from_tz, $to_tz);
    }

    public static function server_time_to_utc_time($tm) {
        $from_tz = TZFactory::create_server_timezone(); 
        $to_tz = new DateTimeZone('UTC');
        return self::convert_timezone($tm, $from_tz, $to_tz);
    }

    protected static function convert_timezone($tm, $from_tz, $to_tz) {
        $from_dt = self::create_datetime($tm, $from_tz);
        $timestamp = $from_dt->getTimestamp();
        
        $to_dt = self::create_datetime($tm, $to_tz);
        $to_dt->setTimestamp($timestamp);

        $offset = $to_tz->getOffset($to_dt);
        $date_text = $to_dt->format(self::$format);

        if ($date_text === FALSE) {
            $msg = sprintf('Cannot convert %s for format %s', 
                var_export($to_dt, true),
                self::$format
            );
        }
        $time_data = new TZTimeData($date_text, $timestamp, $offset);
        return $time_data;
    }

    protected static function create_datetime($tm, $tz) {
        if (!is_int($tm) && !is_string($tm)) {
            $msg = sprintf('Cannot convert time = %s, timezone = %s to DateTime', 
                var_export($tm, true),
                var_export($tz, true)
            );
            throw new TZConverterException($msg);
        }

        $dt_text = is_int($tm) ? "@" . $tm : $tm;

        try {
            $dt = new DateTime($dt_text, $tz);

            // When type is integer, $tm includes timezone, 
            // $utc timezone will be changed, we have to chage it back.
            $dt->setTimezone($tz);
        }
        catch (Exception $e) {
            $msg = var_export(DateTime::getLastErrors(), true);
            throw new TZConverterException($msg);

        }
        return $dt;
    }
}
