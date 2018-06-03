<?php

namespace App\Controller;

use App\Entity\Job;
use App\Entity\Project;
use App\Repository\JobQueueRepository;
use App\Service\SnapshotService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Spatie\Async\Pool;
use Symfony\Component\Validator\Constraints\DateTime;

class ProcessController extends Controller
{
    /**
     * @Route("/snapshot/project/{project}", name="process_snapshot_project", methods="GET")
     */
    public function snapshotProject(JobQueueRepository $repository, Project $project, SnapshotService $service) {
        $em = $this->getDoctrine()->getManager();
        $pages = array_keys($repository->findByProject($project));

        foreach ($project->getPages() as $page) {
            $job = new Job();
            $job->setPage($page);

            if (!in_array($page->getId(), $pages)) {
                $em->persist($job);
            }
        }

        $em->flush();



//        $pool = Pool::create();

        $dateTime = new \DateTime();

        foreach ($project->getPages() as $page) {

            $service->new($page, $dateTime);

//            $pool->add(function () use ($page, $service, $dateTime) {
//
//
////
//
//
//                // Do a thing
//            })->then(function ($output) {
//
////                echo "<pre>"; print_r($output); echo "</pre>"; die();
//
//                // Handle success
//            });
        }

//        $pool->wait();

        return new JsonResponse(['status' => 'ok']);
    }

    /**
     * @Route("/snapshot/status/{project}", name="process_snapshot_status", methods="GET")
     */
    public function snapshotStatus(JobQueueRepository $repository, Project $project) {
        return new JsonResponse($repository->findByProject($project));
    }
}
