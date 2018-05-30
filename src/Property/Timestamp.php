<?php

namespace App\Property;

trait Timestamp
{
    /**
     * @var string $timestamp
     * @ORM\Column(name="timestamp", type="bigint", nullable=false)
     */
    private $timestamp;

    public function getTimestamp(): int
    {
        return $this->timestamp;
    }

    public function setTimestamp(int $timestamp)
    {
        $this->timestamp = $timestamp;
    }
}
