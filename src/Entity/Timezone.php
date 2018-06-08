<?php

namespace App\Entity;

use App\Property\Id;
use App\Property\Name;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="timezone")
 */
class Timezone
{
    use Id;
    use Name;

    /**
     * @var string
     *
     * @ORM\Column(name="country_code", type="string", nullable=false, length=2)
     */
    protected $countryCode;

    public function getCountryCode(): string
    {
        return $this->countryCode;
    }
}
