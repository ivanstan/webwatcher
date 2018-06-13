<?php

namespace App\Util;

final class DateTimeFormatEnum
{
    private static $formats = [
        'd/m/Y H:i:s'
    ];

    public static function getFormats(): array
    {
        $result = [];

        foreach (self::$formats as $format) {
            $result[date($format)] = $format;
        }

        return $result;
    }
}
