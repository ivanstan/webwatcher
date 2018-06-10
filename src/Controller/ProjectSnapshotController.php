<?php

namespace App\Controller;

use App\Entity\Project;
use App\Entity\ProjectSnapshot;
use App\Service\SnapshotService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/project/{project}/snapshot", requirements={"project"="\d+"})
 */
class ProjectSnapshotController extends Controller
{
    /**
     * @Route("/{snapshot}", name="project_snapshot_show", methods="GET", requirements={"snapshot"="\d+"})
     */
    public function show(ProjectSnapshot $snapshot): Response
    {
        return $this->render('pages/project_snapshot/show.html.twig', ['project_snapshot' => $snapshot]);
    }

    /**
     * @Route("/{snapshot}", name="project_snapshot_delete", methods="DELETE", requirements={"snapshot"="\d+"})
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function delete(Request $request, ProjectSnapshot $snapshot): Response
    {
        if ($this->isCsrfTokenValid('delete'.$snapshot->getId(), $request->request->get('_token'))) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($snapshot);
            $em->flush();
        }

        return $this->redirectToRoute('project_show', ['project' => $snapshot->getProject()->getId()]);
    }

    /**
     * @Route("/new", name="project_snapshot_new", methods="GET|POST")
     * @Security("has_role('ROLE_MANAGER')")
     */
    public function newSnapshot(Project $project, SnapshotService $service)
    {
        $em = $this->getDoctrine()->getManager();
        $dateTime = new \DateTime();

        $projectSnapshot = new ProjectSnapshot();
        $projectSnapshot->setTimestamp($dateTime->getTimestamp());
        $projectSnapshot->setProject($project);
        $em->persist($projectSnapshot);

        foreach ($project->getPages() as $page) {
            $snapshot = $service->new($page);
            $snapshot->setTimestamp($dateTime->getTimestamp());
            $snapshot->setProjectSnapshot($projectSnapshot);

            $em->persist($snapshot);
            $em->flush();
        }

        return $this->redirectToRoute('project_show', ['project' => $project->getId()]);
    }
}