<?php

require_once(__DIR__ . '/exception/TZException.class.php');

/**
 * @class
 *   TZFactory
 *
 * @brief
 *   A factory class generate Timezone
 */
class TZFactory {

    const TZ_SERVER_TIME = 1;

    /**
     * @brief
     *   A factory function generate TZInterface instance
     *
     * @param tz
     *   A timezone enumeration
     *
     * @return DateTimeZone
     *   A concrete timezone object based on input tz
     */
    public static function create_tz($tz) {
        switch ($tz) {

        case self::TZ_SERVER_TIME:
            return self::create_Server_Timezone();
            break;

        default:
            $msg = sprintf('Cannot find timezone = %s', $tz);
            throw new TZException($msg);
        }
    }

    public static function create_server_timezone() {
        // Add @ to suppress timezone warning
        $dt = @date_create();
        return $dt->getTimezone();
    }
}

