<?php

namespace App\Entity\Action;

use App\Entity\Assert\AbstractAssert;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="action_test")
 */
class TestAction extends AbstractAction
{
    public const TYPE = 'test';

    /**
     * @var AbstractAssert[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\Assert\AbstractAssert", mappedBy="test", cascade={"persist"}, fetch="EAGER")
     */
    protected $asserts;

    /**
     * @return AbstractAssert[]|Collection
     */
    public function getAsserts()
    {
        return $this->asserts;
    }

    /**
     * @param AbstractAssert[]|Collection $asserts
     */
    public function setAsserts($asserts): void
    {
        $this->asserts = $asserts;
    }

    public function __toString(): string
    {
        return $this->getId();
    }
}
