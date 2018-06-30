<?php

namespace App\Service\Filter;

use TextAnalysis\Interfaces\ITokenTransformation;

class TokenLengthFilter implements ITokenTransformation
{
    protected $length = null;

    public function __construct($length = 3)
    {
        $this->length = $length;
    }

    public function transform($token)
    {
        if(strlen($token) < $this->length) {
            return null;
        }
        return $token;
    }

    public function __destruct()
    {
        unset($this->length);
    }
}
