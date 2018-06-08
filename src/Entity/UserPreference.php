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
     * @ORM\OneToOne(targetEntity="App\Entity\Timezone")
     * @ORM\JoinColumn(name="timezone_id", referencedColumnName="id")
     */
    protected $timezone;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Timezone")
     * @ORM\JoinColumn(name="date_time_format_id", referencedColumnName="id")
     */
    protected $dateTimeFormat;
}
