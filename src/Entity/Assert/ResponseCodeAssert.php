<?php

namespace App\Entity\Assert;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table("response_code_assert")
 */
class ResponseCodeAssert extends Assert
{
    /**
     * @var string
     *
     * @ORM\Column(name="code", type="string", nullable=false)
     */
    private $code;

    public function getType()
    {
        return Assert::TYPE_RESPONSE_CODE;
    }
}
