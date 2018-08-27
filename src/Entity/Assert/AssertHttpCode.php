<?php

namespace App\Entity\Assert;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\Response;

/**
 * @ORM\Entity
 * @ORM\Table(name="assert_http_code")
 */
class AssertHttpCode extends AbstractAssert
{
    public const TYPE = 'http_status';

    /**
     * @var integer $status
     * @ORM\Column(name="status", type="integer")
     */
    protected $status = Response::HTTP_OK;

    public function getStatus(): int
    {
        return $this->status;
    }

    public function setStatus(int $status): void
    {
        $this->status = $status;
    }
}
