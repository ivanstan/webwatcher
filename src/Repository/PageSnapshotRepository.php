<?php

namespace App\Repository;

use App\Entity\Link;
use App\Entity\PageSnapshot;
use App\Entity\ProjectSnapshot;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bridge\Doctrine\RegistryInterface;

class PageSnapshotRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, PageSnapshot::class);
    }

    public function select(): QueryBuilder
    {
        $builder = $this
            ->createQueryBuilder('page_snapshot', 'page_snapshot.id')
            ->orderBy('page_snapshot.timestamp', 'DESC')
        ;

        return $builder;
    }

    public function withSeo(QueryBuilder $builder): QueryBuilder
    {
        $builder
            ->leftJoin('page_snapshot.seo', 'seo')
            ->addSelect('seo')
        ;

        return $builder;
    }

    public function withLinks(QueryBuilder $builder): QueryBuilder
    {
        $builder
            ->leftJoin('page_snapshot.links', 'links')
            ->addSelect('links')
        ;

        return $builder;
    }

    public function withPage(QueryBuilder $builder): QueryBuilder
    {
        $builder
            ->leftJoin('page_snapshot.page', 'page')
            ->addSelect('page')
        ;

        return $builder;
    }

    public function whereProjectSnapshot(QueryBuilder $builder, ProjectSnapshot $snapshot): QueryBuilder
    {
        $builder
            ->andWhere('page_snapshot.projectSnapshot = :snapshot')
            ->setParameter('snapshot', $snapshot)
        ;

        return $builder;
    }

    public function getLinkStatistics(PageSnapshot $snapshot)
    {
        $result = $this
            ->createQueryBuilder('snapshot')
            ->select('link.type', 'COUNT(link.id) as count')
            ->join('snapshot.links', 'link')
            ->where('snapshot = :snapshot')->setParameter('snapshot', $snapshot)
            ->groupBy('link.type')
            ->getQuery()
            ->getArrayResult()
        ;

        foreach ($result as &$item) {
            $item['title'] = Link::getTypeTitle($item['type']);
        }

        return $result;
    }
}
