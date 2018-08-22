<?php

namespace App\Service\Har;

use App\Service\Har\Property\Comment;
use App\Service\Har\Property\Name;

class Cookie
{
    use Name;
    use Comment;

    private $value = '';
    private $path = '/';
    private $domain = '';
    private $expires;
    private $httpOnly = false;
    private $secure = false;

    public function __construct()
    {
        $this->expires = (new \DateTime())->modify('+3 months');
    }
}
