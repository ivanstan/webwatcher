<?php

namespace App\Entity\Assert;

use App\Entity\Action\TestAction;
use App\Property\Id;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="assert")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="type", type="string")
 * @ORM\DiscriminatorMap({
 *     AssertHttpCode::TYPE = "App\Entity\Assert\AssertHttpCode",
 *     AssertHtmlElementExists::TYPE = "App\Entity\Assert\AssertHtmlElementExists",
 * })
 */
abstract class AbstractAssert
{
    use Id;

    /**
     * @var TestAction
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Action\TestAction", inversedBy="asserts", cascade={"persist"}, fetch="EAGER")
     * @ORM\JoinColumn(name="test_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    protected $test;

    /**
     * @return TestAction
     */
    public function getTest(): TestAction
    {
        return $this->test;
    }

    /**
     * @param TestAction $test
     */
    public function setTest(TestAction $test): void
    {
        $this->test = $test;
    }


}
