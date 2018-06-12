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
    use Id;

    /**
     * @var string
     *
     * @ORM\Column(name="timezone", type="string", options={"default" : "d/m/Y h:m:s"})
     */
    private $timezone = 'd/m/Y h:m:s';

    /**
     * @var string
     *
     * @ORM\Column(name="date_time_format", type="string", options={"default" : "UTC"})
     */
    protected $dateTimeFormat = 'UTC';

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
