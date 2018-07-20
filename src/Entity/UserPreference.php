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
    public const DEFAULT_DATE_FORMAT = 'd/m/Y ';
    public const DEFAULT_TIME_FORMAT = 'H:i';
    public const DEFAULT_TIMEZONE = 'UTC';
    use Id;

    /**
     * @var string
     *
     * @ORM\Column(name="timezone", type="string", nullable=false, options={"default" : UserPreference::DEFAULT_TIMEZONE})
     */
    protected $timezone = self::DEFAULT_TIMEZONE;

    /**
     * @var string
     *
     * @ORM\Column(name="date_format", type="string", nullable=false, options={"default" : UserPreference::DEFAULT_DATE_FORMAT})
     */
    protected $dateFormat = self::DEFAULT_DATE_FORMAT;

    /**
     * @var string
     *
     * @ORM\Column(name="time_format", type="string", nullable=false, options={"default" : UserPreference::DEFAULT_TIME_FORMAT})
     */
    protected $timeFormat = self::DEFAULT_TIME_FORMAT;

    public function getTimezone(): ?string
    {
        return $this->timezone;
    }

    public function setTimezone(string $timezone): void
    {
        $this->timezone = $timezone;
    }

    public function getDateFormat(): ?string
    {
        return $this->dateFormat;
    }

    public function setDateFormat(string $dateFormat): void
    {
        $this->dateFormat = $dateFormat;
    }

    public function getTimeFormat(): ?string
    {
        return $this->timeFormat;
    }

    public function setTimeFormat(string $timeFormat): void
    {
        $this->timeFormat = $timeFormat;
    }
}
