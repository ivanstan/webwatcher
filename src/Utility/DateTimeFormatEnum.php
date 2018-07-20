<?php

namespace App\Utility;

final class DateTimeFormatEnum
{
    private static $dateFormats = [
        'd/m/Y',
        'm/d/Y',
        'Y/m/d',
        'd.m.Y',
        'Y-m-d',
        'd M Y',
        'M d Y',
        'Y M d',
    ];

    private static $timeFormats = [
        'H:i',
        'H:i:s',
        'h:i:s a',
        'h:i a',
    ];

    public static function getDateFormats(): array
    {
        $result = [];

        foreach (self::$dateFormats as $format) {
            $result[date($format)] = $format;
        }

        return $result;
    }

    public static function getTimeFormats(): array
    {
        $result = [];

        foreach (self::$timeFormats as $format) {
            $result[date($format)] = $format;
        }

        return $result;
    }
}
