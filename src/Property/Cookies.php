<?php

namespace App\Property;

trait Cookies
{
    /**
     * @var array $cookies
     * @ORM\Column(name="cookies", type="json_array", nullable=true)
     */
    protected $cookies;

    public function getCookies(): array
    {
        return $this->cookies;
    }

    public function hasCookie(string $name): bool
    {
        return isset($this->cookies[$name]);
    }

    public function setCookies(array $cookies): void
    {
        $this->cookies = $cookies;
    }

    public function getCookie(string $name)
    {
        return $this->cookies[$name] ? $this->cookies[$name] : null;
    }
}
