<?php

namespace App\Entity\Assert;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table("element_exists_assert")
 */
class ElementExistsAssert extends Assert implements AssertInterface
{
    /**
     * @var string
     *
     * @ORM\Column(name="selector", type="string", nullable=false)
     */
    private $selector;

    public function getType(): string
    {
        return Assert::TYPE_ELEMENT_EXISTS;
    }

    public function getSelector(): ?string
    {
        return $this->selector;
    }

    public function setSelector(?string $selector): void
    {
        $this->selector = $selector;
    }
}
