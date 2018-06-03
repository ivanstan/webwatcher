<?php

namespace App\Repository;

use App\Entity\Job;
use App\Entity\Project;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Job|null find($id, $lockMode = null, $lockVersion = null)
 * @method Job|null findOneBy(array $criteria, array $orderBy = null)
 * @method Job[]    findAll()
 * @method Job[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class JobQueueRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Job::class);
    }

    public function select()
    {
        return $this->createQueryBuilder('job')
            ->select('job', 'page')
            ->join('job.page', 'page')
            ;
    }

    public function findByProject(Project $project)
    {
        $result = $this->select()
            ->leftJoin('page.project', 'project')
            ->where('project.id = :id')
            ->setParameter('id', $project->getId())
            ->getQuery()
            ->getArrayResult()
        ;

        return $this->indexByPage($result);
    }

    private function indexByPage($result)
    {
        $indexed = [];

        /** @var Job $job */
        foreach ($result as $job) {
            $indexed[$job['page']['id']] = $job;
        }

        return $indexed;
    }
}
