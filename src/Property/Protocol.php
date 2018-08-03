<?php

namespace App\Property;

trait Protocol
{
    /**
     * @var string
     *
     * @ORM\Column(name="protocol", type="string", nullable=false, options={"default":"https"}, columnDefinition="ENUM('http', 'https')")
     */
    protected $protocol = 'https';

    public function getProtocol(): ?string
    {
        return $this->protocol;
    }

    public function setProtocol(string $protocol): void
    {
        $this->protocol = $protocol;
    }
}
