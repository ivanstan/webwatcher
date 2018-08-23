<?php

namespace App\Entity;

use App\Entity\Action\TestAction;
use App\Entity\Assert\AssertResult;
use App\Property\Id;
use App\Property\Timestamp;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table("test_result")
 */
class TestResult
{
    use Id;
    use Timestamp;

    /**
     * @var TestAction
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Action\TestAction", inversedBy="results", cascade={"persist"})
     * @ORM\JoinColumn(name="test_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    protected $test;

    /**
     * @var AbstractSnapshot
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\AbstractSnapshot", inversedBy="results", cascade={"persist"})
     * @ORM\JoinColumn(name="snapshot_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    protected $snapshot;

    /**
     * @var string
     * @ORM\Column(name="comment", type="text", nullable=true)
     */
    protected $comment;

    /**
     * @var AssertResult[]|Collection
     *
     * @ORM\OneToMany(targetEntity="App\Entity\Assert\AssertResult", mappedBy="result", cascade={"persist"})
     */
    protected $asserts;

    public function getTest(): TestAction
    {
        return $this->test;
    }

    public function setTest(TestAction $test): void
    {
        $this->test = $test;
    }

    public function getSnapshot(): AbstractSnapshot
    {
        return $this->snapshot;
    }

    public function setSnapshot(AbstractSnapshot $snapshot): void
    {
        $this->snapshot = $snapshot;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): void
    {
        $this->comment = $comment;
    }

    /**
     * @return AssertResult[]|Collection
     */
    public function getAsserts()
    {
        return $this->asserts;
    }

    /**
     * @param AssertResult[]|Collection $asserts
     */
    public function setAsserts($asserts): void
    {
        $this->asserts = $asserts;
    }

    public function hasPassed(): bool
    {
        foreach ($this->getAsserts() as $assert) {
            if ($assert->hasPassed() === false) {
                return false;
            }
        }

        return true;
    }
}
