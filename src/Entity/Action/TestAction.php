<?php

namespace App\Entity\Action;

use App\Entity\Assert\AbstractAssert;
use App\Entity\TestResult;
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
     * @ORM\OneToMany(targetEntity="App\Entity\Assert\AbstractAssert", mappedBy="test", cascade={"persist"})
     */
    protected $asserts;

    /**
     * @var TestResult[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\TestResult", mappedBy="test", cascade={"persist"}, fetch="EAGER")
     */
    protected $results;

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
    public function setAsserts(array $asserts): void
    {
        $this->asserts = $asserts;
    }

    /**
     * @return TestResult[]|Collection
     */
    public function getResults()
    {
        return $this->results;
    }

    /**
     * @param TestResult[]|Collection $results
     */
    public function setResults(array $results): void
    {
        $this->results = $results;
    }
}
