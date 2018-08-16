<?php

namespace App\Entity\Assert\HTTP;

use App\Entity\Assert\AbstractAssert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="assert_http_code")
 */
class AssertHttpCode extends AbstractAssert
{
    public const TYPE = 'http_code';

    /**
     * @var integer $code
     * @ORM\Column(name="code", type="integer")
     */
    protected $code;

    public function __toString(): string
    {
        return $this->code;
    }

    /**
     * @return int
     */
    public function getCode(): int
    {
        return $this->code;
    }

    /**
     * @param int $code
     */
    public function setCode(int $code): void
    {
        $this->code = $code;
    }


}
