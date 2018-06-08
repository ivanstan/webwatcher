<?php

namespace App\Entity;

use App\Property\Id;
use App\Property\Name;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="date_time_format")
 */
class DateTimeFormat
{
    use Id;

    /**
     * @var string
     *
     * @ORM\Column(name="format", type="string", nullable=false)
     */
    protected $format;

    public function getCountryCode(): string
    {
        return $this->format;
    }
}
