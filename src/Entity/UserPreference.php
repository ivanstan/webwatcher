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
     * @ORM\Column(name="timezone", type="string", nullable=true)
     */
    private $timezone;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\DateTimeFormat")
     * @ORM\JoinColumn(name="date_time_format_id", referencedColumnName="id")
     */
    protected $dateTimeFormat;

    public function getTimezone(): ?string
    {
        return $this->timezone;
    }

    public function setTimezone(string $timezone): void
    {
        $this->timezone = $timezone;
    }
}
