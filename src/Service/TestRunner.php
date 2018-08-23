<?php

namespace App\Service;

use App\Entity\AbstractSnapshot;
use App\Entity\Action\TestAction;
use App\Entity\Assert\AssertResult;
use App\Entity\Assert\HTTP\AssertHttpCode;
use App\Entity\PageSnapshot;
use App\Entity\TestResult;
use Doctrine\ORM\EntityManagerInterface;

class TestRunner
{
    private $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    public function execute(AbstractSnapshot $snapshot, TestAction $test)
    {
        $result = new TestResult();
        $result->setTimestamp(time());
        $result->setSnapshot($snapshot);
        $result->setTest($test);

        foreach ($test->getAsserts() as $assert) {
            $passed = false;

            if ($assert instanceof AssertHttpCode && $snapshot instanceof PageSnapshot) {
                $passed = $assert->getCode() === $snapshot->getStatus();
            }

            $assertResult = new AssertResult();
            $assertResult->setAssert($assert);
            $assertResult->setResult($result);
            $assertResult->setPassed($passed);

            $this->manager->persist($assertResult);
        }

        $this->manager->persist($result);
        $this->manager->flush();

        return $result;
    }
}
