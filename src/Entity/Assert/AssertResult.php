<?php

namespace App\Entity\Assert;

use App\Entity\TestResult;
use App\Property\Id;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table("assert_result")
 */
class AssertResult
{
    use Id;

    /**
     * @var TestResult
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\TestResult", inversedBy="asserts", cascade={"persist"})
     * @ORM\JoinColumn(name="test_result_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    protected $result;

    /**
     * @var AbstractAssert
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Assert\AbstractAssert", cascade={"persist"})
     * @ORM\JoinColumn(name="assert_id", referencedColumnName="id", onDelete="CASCADE", nullable=false)
     */
    protected $assert;

    /**
     * @var boolean
     * @ORM\Column(name="pass", type="boolean", nullable=true)
     */
    protected $passed;

    /**
     * @var string
     * @ORM\Column(name="comment", type="text", nullable=true)
     */
    protected $comment;

    public function getResult(): TestResult
    {
        return $this->result;
    }

    public function setResult(TestResult $result): void
    {
        $this->result = $result;
    }

    public function getAssert(): AbstractAssert
    {
        return $this->assert;
    }

    public function setAssert(AbstractAssert $assert): void
    {
        $this->assert = $assert;
    }

    public function hasPassed(): bool
    {
        return $this->passed;
    }

    public function setPassed(bool $passed): void
    {
        $this->passed = $passed;
    }

    public function getComment(): string
    {
        return $this->comment;
    }

    public function setComment(string $comment): void
    {
        $this->comment = $comment;
    }
}
