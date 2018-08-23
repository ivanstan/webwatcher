<?php

namespace App\Service\Assert;

use App\Entity\AbstractResource;
use App\Entity\Assert\HTTP\AssertHttpCode;
use App\Entity\Page;

class AssertCollection
{
    public static function get(AbstractResource $resource)
    {
        $asserts = [];

        switch (get_class($resource)) {
            case Page::class:
                $asserts['Assert HTTP status'] = AssertHttpCode::class;
        }

        return $asserts;
    }
}
