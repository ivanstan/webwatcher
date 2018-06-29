<?php

namespace App\Repository;

use App\Entity\ProjectSnapshot;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bridge\Doctrine\RegistryInterface;

class PageSnapshotRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ProjectSnapshot::class);
    }

//    public function select(): QueryBuilder
//    {
//        return
//            $this
//                ->createQueryBuilder('page_snapshot')
//                ->join('page_snapshot.page', 'page')
//            ;
//    }
//
//    public function whereProjectSnapshot(ProjectSnapshot $snapshot)
//    {
//        $builder = $this->select()
//            ->where('page_snapshot.projectSnapshot = :snapshot')
//            ->setParameter('snapshot', $snapshot)
//        ;
//
//        return $builder;
//    }
}
