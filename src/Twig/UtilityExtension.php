<?php

namespace App\Twig;

class UtilityExtension extends \Twig_Extension
{
    public function getTests()
    {
        return [
            new \Twig_SimpleTest('instanceof', [$this, 'isInstanceOf']),
        ];
    }

    public function isInstanceOf($class, $instance): bool
    {
        try {
            $reflexionClass = new \ReflectionClass($instance);
        } catch (\ReflectionException $e) {
            return false;
        }

        return $reflexionClass->isInstance($class);
    }
}
