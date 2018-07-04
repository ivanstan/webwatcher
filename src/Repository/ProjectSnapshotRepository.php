<?php

namespace App\Repository;

use App\Entity\ProjectSnapshot;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bridge\Doctrine\RegistryInterface;

class ProjectSnapshotRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ProjectSnapshot::class);
    }

    public function select(): QueryBuilder
    {
        return $this->createQueryBuilder('project_snapshot');
    }
}
