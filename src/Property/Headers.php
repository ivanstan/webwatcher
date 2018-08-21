<?php

namespace App\Property;

trait Headers
{
    /**
     * @var array $headers
     * @ORM\Column(name="headers", type="json_array", nullable=true)
     */
    protected $headers;

    public function getHeaders(): array
    {
        return $this->headers ?? [];
    }

    public function hasHeader(string $name): bool
    {
        return isset($this->headers[$name]);
    }

    public function setHeaders(array $headers): void
    {
        $this->headers = $headers;
    }

    public function getHeader(string $header): string
    {
        return $this->headers[$header] ? $this->headers[$header] : null;
    }

    public function addHeader(string $name, string $value): void
    {
        $this->headers[$name] = $value;
    }
}
