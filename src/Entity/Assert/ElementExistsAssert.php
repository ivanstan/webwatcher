<?php

namespace App\Entity\Assert;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table("element_exists_assert")
 */
class ElementExistsAssert extends Assert
{
    /**
     * @var string
     *
     * @ORM\Column(name="selector", type="string", nullable=false)
     */
    private $selector;

    public function getType()
    {
        return Assert::TYPE_ELEMENT_EXISTS;
    }
}
