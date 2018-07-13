<?php

namespace App\Property;

trait Timestamp
{
    /**
     * @var string $timestamp
     * @ORM\Column(name="timestamp", type="bigint", nullable=true)
     */
    private $timestamp;

    public function getTimestamp(): ?int
    {
        return $this->timestamp;
    }

    public function setTimestamp(?int $timestamp)
    {
        $this->timestamp = $timestamp;
    }
}
