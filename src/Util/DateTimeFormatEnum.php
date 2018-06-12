<?php

namespace App\Util;

final class DateTimeFormatEnum
{
    private static $formats = [
        'd/m/Y h:m:s'
    ];

    public static function getFormats(): array
    {
        $result = [];

        foreach (self::$formats as $format) {
            $result[$format] = date($format);
        }

        return $result;
    }
}
