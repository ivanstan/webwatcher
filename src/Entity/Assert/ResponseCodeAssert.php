<?php

namespace App\Entity\Assert;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\Response;

/**
 * @ORM\Entity
 * @ORM\Table("response_code_assert")
 */
class ResponseCodeAssert extends Assert
{
    /**
     * @var int
     *
     * @ORM\Column(name="code", type="integer", nullable=false)
     */
    private $code;

    public function __construct()
    {
        $this->code = Response::HTTP_OK;
    }

    public function getType()
    {
        return Assert::TYPE_RESPONSE_CODE;
    }

    public function getCode(): ?int
    {
        return $this->code;
    }

    public function setCode(?int $code): void
    {
        $this->code = $code;
    }
}
