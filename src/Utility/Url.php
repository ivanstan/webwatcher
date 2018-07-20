<?php

namespace App\Utility;

final class Url
{
    public static function isAbsolute(string $url): bool
    {
        return parse_url($url, PHP_URL_HOST) !== null;
    }
}
