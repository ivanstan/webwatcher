<?php

namespace App\Service;

use App\Entity\AbstractSnapshot;
use App\Entity\Action\TestAction;
use App\Entity\Assert\AssertResult;
use App\Entity\TestResult;
use App\Service\Assert\AssertService;
use Doctrine\ORM\EntityManagerInterface;

class TestRunner
{
    private $manager;
    private $service;

    public function __construct(EntityManagerInterface $manager, AssertService $service)
    {
        $this->manager = $manager;
        $this->service = $service;
    }

    public function execute(AbstractSnapshot $snapshot, TestAction $test)
    {
        if ($snapshot->getResult()) {
            $this->manager->remove($snapshot->getResult());
            $this->manager->flush();
        }

        $result = new TestResult();
        $result->setTimestamp(time());
        $result->setSnapshot($snapshot);
        $result->setTest($test);
        $snapshot->setResult($result);

        foreach ($test->getAsserts() as $assert) {
            $service = $this->service->getService($assert);
            $passed = $service->assert($snapshot, $assert);

            $assertResult = new AssertResult();
            $assertResult->setAssert($assert);
            $assertResult->setResult($result);
            $assertResult->setPassed($passed);
            $assertResult->setComment($service->getComment($passed, $snapshot, $assert));

            $this->manager->persist($assertResult);
        }

        $this->manager->persist($result);
        $this->manager->flush();

        return $result;
    }
}
