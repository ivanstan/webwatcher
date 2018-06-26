<?php

namespace App\Repository;

use App\Entity\Link;
use App\Entity\PageSnapshot;
use App\Entity\PageSnapshotSeo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Symfony\Bridge\Doctrine\RegistryInterface;

class PageSnapshotSeoRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, PageSnapshotSeo::class);
    }

    public function getLinkStatistics(PageSnapshot $snapshot)
    {
        $result = $this
            ->createQueryBuilder('s')
            ->select('l.type', 'COUNT(l.id) as count')
            ->join('s.link', 'l')
            ->join(PageSnapshot::class, 'ps', Join::WITH, 'ps.seo = s.id')
            ->where('ps = :snapshot')->setParameter('snapshot', $snapshot)
            ->groupBy('l.type')
            ->getQuery()
            ->getArrayResult()
        ;

        foreach ($result as &$item) {
            $item['title'] = Link::getTypeTitle($item['type']);
        }

        return $result;
    }
}
