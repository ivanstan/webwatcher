<?php

namespace App\Entity;

use App\Property\Id;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="user_preference")
 */
class UserPreference
{
    public const DEFAULT_DATETIME_FORMAT = 'd/m/Y H:i:s';
    public const DEFAULT_TIMEZONE = 'UTC';
    use Id;

    /**
     * @var string
     *
     * @ORM\Column(name="timezone", type="string", options={"default" : "d/m/Y H:i:s"})
     */
    private $timezone = self::DEFAULT_DATETIME_FORMAT;

    /**
     * @var string
     *
     * @ORM\Column(name="date_time_format", type="string", options={"default" : "UTC"})
     */
    protected $dateTimeFormat = self::DEFAULT_TIMEZONE;

    public function getTimezone(): ?string
    {
        return $this->timezone;
    }

    public function setTimezone(string $timezone): void
    {
        $this->timezone = $timezone;
    }

    public function getDateTimeFormat(): string
    {
        return $this->dateTimeFormat;
    }

    public function setDateTimeFormat(string $dateTimeFormat): void
    {
        $this->dateTimeFormat = $dateTimeFormat;
    }
}
