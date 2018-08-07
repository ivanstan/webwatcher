<?php

namespace App\Controller;

use App\Entity\Authenticator\Authenticator;
use App\Entity\Project;
use App\Entity\ProjectSnapshot;
use App\Service\Snapshot\ProjectSnapshotService;
use Facebook\WebDriver\Exception\NoSuchElementException;
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
        return $this->render('pages/project_snapshot/show.html.twig', [
            'project_snapshot' => $snapshot,
        ]);
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
    public function new(Project $project, ProjectSnapshotService $service)
    {
        try {
            $snapshot = $service->new($project);
        } catch (NoSuchElementException $exception) {
            /** @var Authenticator $authenticator */
            $url = $this->generateUrl('authenticator_edit', [
                'project' => $project->getId(),
                'id' => $project->getAuthenticator()->getId()
            ]);
            $message = sprintf("Error executing <a href='$url'>authenticator</a>. {$exception->getMessage()}");
            $this->addFlash('danger', $message);

            return $this->redirectToRoute('project_show', [
                'project' => $project->getId(),
            ]);
        } catch (\Exception $exception) {
            $this->addFlash('danger', $exception->getMessage());

            return $this->redirectToRoute('project_show', [
                'project' => $project->getId(),
            ]);
        }

        return $this->redirectToRoute('project_snapshot_show', [
            'project' => $project->getId(),
            'snapshot' => $snapshot->getId(),
        ]);
    }
}
